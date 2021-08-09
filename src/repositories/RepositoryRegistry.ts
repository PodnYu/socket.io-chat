import { IBotRepository } from '../interfaces/IBotRepository';
import { IChatMessagesRepository } from '../interfaces/IChatMessagesRepository';
import { IDialogRepository } from '../interfaces/IDialogRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

import botRepository from './BotRepository';
import chatMessagesRepository from './ChatMessagesRepository';
import dialogRepository from './DialogRepository';
import userRepository from './UserRepository';

export class RepositoryRegistry {
	static getUserRepository(): IUserRepository {
		return userRepository;
	}

	static getDialogRepository(): IDialogRepository {
		return dialogRepository;
	}

	static getChatMessagesRepository(): IChatMessagesRepository {
		return chatMessagesRepository;
	}

	static getBotRepository(): IBotRepository {
		return botRepository;
	}
}
