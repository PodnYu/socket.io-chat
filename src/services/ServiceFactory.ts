import { IBotService } from '../interfaces/IBotService';
import { IChatMessageService } from '../interfaces/IChatMessageService';
import { IDialogService } from '../interfaces/IDialogService';
import { IUserService } from '../interfaces/IUserService';

import BotService from './BotService';
import ChatMessageService from './ChatMessageService';
import DialogService from './DialogService';
import UserService from './UserService';

import { AvatarSrcResolver } from '../utils/AvatarSrcResolver';

import { RepositoryRegistry } from '../repositories/RepositoryRegistry';

export class ServiceFactory {
	static createUserService(): IUserService {
		return new UserService(
			RepositoryRegistry.getUserRepository(),
			AvatarSrcResolver.getInstance().defaultAvatarFileName
		);
	}

	static createDialogService(): IDialogService {
		return new DialogService(RepositoryRegistry.getDialogRepository());
	}

	static createChatMessageService(): IChatMessageService {
		return new ChatMessageService(
			RepositoryRegistry.getChatMessagesRepository(),
			RepositoryRegistry.getDialogRepository()
		);
	}

	static createBotService(): IBotService {
		return new BotService(RepositoryRegistry.getBotRepository());
	}
}
