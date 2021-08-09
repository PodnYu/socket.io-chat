import { v4 as uuidv4 } from 'uuid';
import { IDialogRepository } from '../interfaces/IDialogRepository';
import { IDialogService } from '../interfaces/IDialogService';

class DialogService implements IDialogService {
	constructor(private dialogRepository: IDialogRepository) {}

	initUser = (userId: string): void => {
		this.dialogRepository.initUser(userId);
	};

	setDialog = (
		firstUserId: string,
		secondUserId: string,
		chatId?: string
	): void => {
		if (!chatId) {
			chatId = uuidv4();
		}

		this.dialogRepository.setDialog(chatId, firstUserId, secondUserId);
	};

	getDialogOrUndefined = (
		firstUserId: string,
		secondUserId: string
	): string | undefined => {
		return this.dialogRepository.getDialogOrUndefined(
			firstUserId,
			secondUserId
		);
	};

	dialogExists = (firstUserId: string, secondUserId: string): boolean => {
		return this.dialogRepository.dialogExists(firstUserId, secondUserId);
	};
}

export default DialogService;
