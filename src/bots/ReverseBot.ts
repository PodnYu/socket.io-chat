import { Server, Socket } from 'socket.io';
import { IBot, Msg } from '../interfaces/IBot';
import ChatMessageService from '../services/ChatMessageService';
import DialogService from '../services/DialogService';

class ReverseBot extends IBot {
	private _timeout = 3000;

	constructor(
		dialogService: DialogService,
		chatMessageService: ChatMessageService
	) {
		super(dialogService, chatMessageService);
	}

	respond(io: Server, socket: Socket, data: Msg): void {
		socket.emit('user:startedTyping', { userId: this.id });
		setTimeout(() => {
			socket.emit('user:stoppedTyping', { userId: this.id });
			this.sendMessage(socket, {
				message: this.reverseString(data.message),
			});
		}, this._timeout);
	}

	reverseString(str: string): string {
		return str.split('').reverse().join('');
	}

	get name(): string {
		return 'ReverseBot';
	}
	get description(): string {
		return 'ReverseBot';
	}
	get avatar(): string {
		return 'floppa.jpg';
	}
}

export default ReverseBot;
