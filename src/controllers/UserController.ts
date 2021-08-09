import { Server, Socket } from 'socket.io';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import userRepository from '../repositories/UserRepository';
import debug from 'debug';

import ChatMessageModel from '../models/ChatMessageModel';
import DialogService from '../services/DialogService';
import dialogRepository from '../repositories/DialogRepository';
import BotService from '../services/BotService';
import botRepository from '../repositories/BotRepository';
import BotModel from '../models/BotModel';

import ChatMessageService from '../services/ChatMessageService';
import chatMessagesRepository from '../repositories/ChatMessagesRepository';
import { AvatarSrcResolver } from '../utils/AvatarSrcResolver';

const chatIncomeEvents = debug('chat:incomeEvents');
const chatMessages = debug('chat:messages');
const chatConnectionsEvents = debug('chat:connections');
const chatDebugger = debug('chat:debug');

const dialogService = new DialogService(dialogRepository);
const botService = new BotService(botRepository);

const chatMessageService = new ChatMessageService(
	chatMessagesRepository,
	dialogService
);

const userService = new UserService(
	userRepository,
	AvatarSrcResolver.getInstance().defaultAvatarFileName
);

class UserController {
	private io: Server;
	private socket: Socket;

	constructor(io: Server, socket: Socket) {
		this.io = io;
		this.socket = socket;
	}

	onConnection = (): void => {
		chatConnectionsEvents('user connected:', this.socket.id);
	};

	onRegister = async (
		cb: ({ id, userName }: { id: string; userName: string }) => void
	): Promise<void> => {
		console.log(`user registered ${this.socket.id}`);

		const user = await userService.createUser(this.socket.id);
		dialogService.initUser(this.socket.id);

		this.socket.broadcast.emit('user:join', user);

		cb({ userName: user.userName, id: user.id });
	};

	onGetUserName = async (cb: (userName: string) => void): Promise<void> => {
		const user = await userService.getUserById(this.socket.id);
		const userName = user.userName;
		cb(userName);
	};

	onGetAllOtherUsers = async (
		cb: (users: UserModel[]) => void
	): Promise<void> => {
		const users = await userService.getAllUsers();
		const thisUser = await userService.getUserById(this.socket.id);
		if (thisUser === undefined) return;

		cb(users.filter((user) => user.id !== thisUser.id));
	};

	onGetMyself = async (cb: (user: UserModel) => void): Promise<void> => {
		cb(await userService.getUserById(this.socket.id));
	};

	onGetBots = async (cb: (bots: BotModel[]) => void): Promise<void> => {
		const bots = await botService.getAllBots();
		cb(bots.map((bot) => bot.asBotModel()));
	};

	onGetAllOtherUsersAndBots = async (
		cb: (contacts: (BotModel | UserModel)[]) => void
	): Promise<void> => {
		await this.onGetAllOtherUsers((users) =>
			this.onGetBots((bots) => cb([...bots, ...users]))
		);
	};

	onMessage = async (
		{ to, message }: { to: string; message: string },
		cb: (data: string) => void
	): Promise<void> => {
		console.log(`got message '${message}' from ${this.socket.id} to ${to}.`);
		chatMessages(`got message '${message}' from ${this.socket.id} to ${to}.`);

		if (to === undefined || to === null) return;

		const user = await userService.getUserById(this.socket.id);
		const now = Date.now();

		await chatMessageService.addMessage(this.socket.id, to, message);

		cb(now.toString());

		this.io.to(to).emit('user:message', {
			from: {
				userId: this.socket.id,
				userName: user.userName,
			},
			message,
			timestamp: now,
		});
	};

	onGetDialogHistory = async (
		{ recipientId }: { recipientId: string },
		cb: (messages: ChatMessageModel[] | undefined) => void
	): Promise<void> => {
		if (recipientId === null || recipientId === undefined) {
			return;
		}

		const history = await chatMessageService.getMessages(
			this.socket.id,
			recipientId
		);

		cb(history);
	};

	onUserStartedTyping = ({ recipientId }: { recipientId: string }): void => {
		if (!recipientId) {
			return;
		}

		chatDebugger(`${this.socket.id} is typing to ${recipientId}`);

		this.io
			.to(recipientId)
			.emit('user:startedTyping', { userId: this.socket.id });
	};

	onUserStoppedTyping = ({ recipientId }: { recipientId: string }): void => {
		if (!recipientId) {
			return;
		}

		chatDebugger(`${this.socket.id} stopped typing to ${recipientId}`);

		this.io
			.to(recipientId)
			.emit('user:stoppedTyping', { userId: this.socket.id });
	};

	onAny = (eventName: string): void => {
		chatIncomeEvents(eventName);
	};

	onDisconnect = async (): Promise<void> => {
		chatConnectionsEvents('user disconnected:', this.socket.id);

		const user = await userService.getUserById(this.socket.id);

		this.io.emit('user:leave', user);

		await userService.deleteUserById(this.socket.id);
	};
}

export default UserController;
