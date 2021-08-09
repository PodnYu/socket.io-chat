import ChatMessageModel from '../models/ChatMessageModel';

export interface IChatMessageService {
	addMessage(from: string, to: string, text: string): Promise<void>;

	getMessages(from: string, to: string): Promise<ChatMessageModel[]>;

	getMessagesFromIndex(
		chatId: string,
		index: number
	): Promise<ChatMessageModel[]>;
}
