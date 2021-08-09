import { IBotService } from '../interfaces/IBotService';
import { IChatMessageService } from '../interfaces/IChatMessageService';
import { IDialogService } from '../interfaces/IDialogService';
import { IUserService } from '../interfaces/IUserService';

import BotService from './BotService';
import ChatMessageService from './ChatMessageService';
import DialogService from './DialogService';
import UserService from './UserService';

import { AvatarSrcResolver } from '../utils/AvatarSrcResolver';

import { RepositoryFactory } from '../repositories/RepositoryFactory';

export class ServiceFactory {
	static createUserService(): IUserService {
		return new UserService(
			RepositoryFactory.getUserRepository(),
			AvatarSrcResolver.getInstance().defaultAvatarFileName
		);
	}

	static createDialogService(): IDialogService {
		return new DialogService(RepositoryFactory.getDialogRepository());
	}

	static createChatMessageService(): IChatMessageService {
		return new ChatMessageService(
			RepositoryFactory.getChatMessagesRepository(),
			RepositoryFactory.getDialogRepository()
		);
	}

	static createBotService(): IBotService {
		return new BotService(RepositoryFactory.getBotRepository());
	}
}
