import { Server, Socket } from 'socket.io';
import { IBot, Msg } from '../interfaces/IBot';
import { IChatMessageService } from '../interfaces/IChatMessageService';
import { IDialogService } from '../interfaces/IDialogService';

/**
 * SpamBot
 * 'start' to start spamming
 * 'stop' to stop
 */
class SpamBot extends IBot {
	lowTimerLimit = 10; // 10
	hightTimerLimit = 120; // 120
	timers = new Map<string, NodeJS.Timeout>();

	constructor(
		dialogService: IDialogService,
		chatMessageService: IChatMessageService
	) {
		super(dialogService, chatMessageService);
	}

	getRandomInterval(): number {
		return (
			(Math.random() * (this.hightTimerLimit - this.lowTimerLimit) +
				this.lowTimerLimit) *
			1000
		);
	}

	getSomeMessage(): string {
		return 'hi there';
	}

	respond(
		io: Server,
		socket: Socket,
		data: Msg,
		cb: (data: Msg) => void
	): void {
		if (data.message === 'stop') {
			const timer = this.timers.get(socket.id);
			if (timer) clearTimeout(timer);
		} else if (data.message === 'start') {
			this.timers.set(
				socket.id,
				setTimeout(() => {
					this.sendMessage(socket, { message: this.getSomeMessage() });
					this.respond(io, socket, data, cb);
				}, this.getRandomInterval())
			);
		}
	}

	get name(): string {
		return 'SpamBot';
	}
	get description(): string {
		return 'SpamBot';
	}
	get avatar(): string {
		return 'cheems.jpg';
	}
}

export default SpamBot;
