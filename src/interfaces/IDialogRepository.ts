export interface IDialogRepository {
	initUser(userId: string): void;

	setDialog(chatId: string, firstUserId: string, secondUserId: string): void;

	getDialogOrUndefined(
		firstUserId: string,
		secondUserId: string
	): string | undefined;

	dialogExists(firstUserId: string, secondUserId: string): boolean;
}
