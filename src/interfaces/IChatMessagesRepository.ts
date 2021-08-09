import ChatMessageModel from '../models/ChatMessageModel';

export interface IChatMessagesRepository {
	addMessage(chatId: string, message: ChatMessageModel): Promise<void>;

	getMessages(chatId: string): Promise<ChatMessageModel[]>;

	getMessagesFrom(chatId: string, index: number): Promise<ChatMessageModel[]>;
}
