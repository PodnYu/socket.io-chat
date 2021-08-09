import { IChatMessagesRepository } from '../interfaces/IChatMessagesRepository';
import ChatMessageModel from '../models/ChatMessageModel';

export class ChatMessagesRepository implements IChatMessagesRepository {
	private chatMessages: Map<string, ChatMessageModel[]>;

	constructor() {
		this.chatMessages = new Map<string, ChatMessageModel[]>();
	}

	initMessagesIfNone = (chatId: string): void => {
		if (!this.chatMessages.has(chatId)) {
			this.chatMessages.set(chatId, []);
		}
	};

	addMessage = async (
		chatId: string,
		message: ChatMessageModel
	): Promise<void> => {
		this.initMessagesIfNone(chatId);

		this.chatMessages.get(chatId)?.push(message);
	};

	getMessages = async (chatId: string): Promise<ChatMessageModel[]> => {
		this.initMessagesIfNone(chatId);

		return this.chatMessages.get(chatId) || [];
	};

	getMessagesFromIndex = async (
		chatId: string,
		index: number
	): Promise<ChatMessageModel[]> => {
		return (await this.getMessages(chatId)).slice(index);
	};
}

export default new ChatMessagesRepository();
