import { Server, Socket } from 'socket.io';
import { IBot, Msg } from '../interfaces/IBot';
import ChatMessageService from '../services/ChatMessageService';
import DialogService from '../services/DialogService';

class EchoBot extends IBot {
	constructor(
		dialogService: DialogService,
		chatMessageService: ChatMessageService
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
