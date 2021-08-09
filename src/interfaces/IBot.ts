import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import BotModel from '../models/BotModel';
import ChatMessageService from '../services/ChatMessageService';
import DialogService from '../services/DialogService';

export type Msg = {
	message: string;
	[key: string]: unknown;
};

export abstract class IBot {
	protected _id: string;
	protected _online: boolean;

	constructor(
		private dialogService: DialogService,
		private chatMessageService: ChatMessageService
	) {
		this._id = uuidv4();
		this._online = true;

		this.dialogService.initUser(this.id);
	}

	onMessage(
		io: Server,
		socket: Socket,
		data: Msg,
		cb: (data: Msg) => void
	): void {
		this.chatMessageService.addMessage(socket.id, this.id, data.message);
		this.respond(io, socket, data, cb);
	}

	sendMessage(socket: Socket, data: Msg): void {
		this.chatMessageService.addMessage(this.id, socket.id, data.message);
		data['botId'] = this.id;
		data['timestamp'] = this.getTimestamp();
		socket.emit('bot:message', data);
	}

	abstract respond(
		io: Server,
		socket: Socket,
		data: Msg,
		cb: (data: Msg) => void
	): void;

	get id(): string {
		return this._id;
	}

	get online(): boolean {
		return this._online;
	}

	get isBot(): boolean {
		return true;
	}

	asBotModel(): BotModel {
		return new BotModel(this.id, this.name, this.description, this.avatar);
	}

	getTimestamp(): number {
		return Date.now();
	}

	abstract get name(): string;

	abstract get description(): string;

	abstract get avatar(): string;
}
