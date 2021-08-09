import { IBot } from '../interfaces/IBot';
import ChatMessageService from '../services/ChatMessageService';
import DialogService from '../services/DialogService';

class IgnoreBot extends IBot {
	constructor(
		dialogService: DialogService,
		chatMessageService: ChatMessageService
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
