import { IBot } from '../interfaces/IBot';
import { IChatMessageService } from '../interfaces/IChatMessageService';
import { IDialogService } from '../interfaces/IDialogService';

class IgnoreBot extends IBot {
	constructor(
		dialogService: IDialogService,
		chatMessageService: IChatMessageService
	) {
		super(dialogService, chatMessageService);
	}

	respond(): void {
		return;
	}

	get name(): string {
		return 'IgnoreBot';
	}
	get description(): string {
		return 'IgnoreBot';
	}
	get avatar(): string {
		return 'cheems.jpg';
	}
}

export default IgnoreBot;
