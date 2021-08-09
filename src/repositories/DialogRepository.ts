import { IDialogRepository } from '../interfaces/IDialogRepository';

export class DialogRepository implements IDialogRepository {
	private chatUsers: Map<string, Map<string, string>>;

	constructor() {
		this.chatUsers = new Map<string, Map<string, string>>();
	}

	initUser = (userId: string): void => {
		this.chatUsers.set(userId, new Map<string, string>());
	};

	setDialog = (
		chatId: string,
		firstUserId: string,
		secondUserId: string
	): void => {
		this.chatUsers.get(firstUserId)?.set(secondUserId, chatId);
		this.chatUsers.get(secondUserId)?.set(firstUserId, chatId);
	};

	getDialogOrUndefined = (
		firstUserId: string,
		secondUserId: string
	): string | undefined => {
		return this.chatUsers.get(firstUserId)?.get(secondUserId);
	};

	dialogExists = (firstUserId: string, secondUserId: string): boolean => {
		return this.getDialogOrUndefined(firstUserId, secondUserId) !== undefined;
	};
}

export default new DialogRepository();
