import { IDialogService } from '../interfaces/IDialogService';
import { v4 as uuidv4 } from 'uuid';
import ChatMessageModel from '../models/ChatMessageModel';
import { IChatMessagesRepository } from '../interfaces/IChatMessagesRepository';
import { IChatMessageService } from '../interfaces/IChatMessageService';

class ChatMessageService implements IChatMessageService {
	constructor(
		private messageRepository: IChatMessagesRepository,
		private dialogService: IDialogService
	) {}

	getTimestamp = (): number => {
		return Date.now();
	};

	addMessage = async (
		from: string,
		to: string,
		text: string
	): Promise<void> => {
		let chatId = this.dialogService.getDialogOrUndefined(from, to);

		if (chatId === undefined) {
			chatId = uuidv4();
			this.dialogService.setDialog(from, to, chatId);
		}

		await this.messageRepository.addMessage(chatId, {
			from,
			message: text,
			timestamp: this.getTimestamp(),
		});
	};

	getMessages = async (
		from: string,
		to: string
	): Promise<ChatMessageModel[]> => {
		const chatId = this.dialogService.getDialogOrUndefined(from, to);
		if (chatId === undefined) return [];

		return await this.messageRepository.getMessages(chatId);
	};

	getMessagesFromIndex = async (
		chatId: string,
		index: number
	): Promise<ChatMessageModel[]> => {
		return await this.messageRepository.getMessagesFromIndex(chatId, index);
	};
}

export default ChatMessageService;
