export interface IDialogService {
	initUser(userId: string): void;

	setDialog(firstUserId: string, secondUserId: string, chatId?: string): void;

	getDialogOrUndefined(
		firstUserId: string,
		secondUserId: string
	): string | undefined;

	dialogExists(firstUserId: string, secondUserId: string): boolean;
}
