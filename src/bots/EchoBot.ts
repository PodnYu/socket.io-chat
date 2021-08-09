import { Server, Socket } from 'socket.io';
import { IBot, Msg } from '../interfaces/IBot';
import { IChatMessageService } from '../interfaces/IChatMessageService';
import { IDialogService } from '../interfaces/IDialogService';

class EchoBot extends IBot {
	constructor(
		dialogService: IDialogService,
		chatMessageService: IChatMessageService
	) {
		super(dialogService, chatMessageService);
	}

	respond(io: Server, socket: Socket, data: Msg): void {
		this.sendMessage(socket, {
			message: data.message,
		});
	}

	get name(): string {
		return 'EchoBot';
	}

	get description(): string {
		return 'EchoBot';
	}

	get avatar(): string {
		return 'cheems.jpg';
	}
}

export default EchoBot;
