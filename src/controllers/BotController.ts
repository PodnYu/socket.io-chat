import { Server, Socket } from 'socket.io';
import debug from 'debug';

import { Msg } from '../interfaces/IBot';
import { ServiceFactory } from '../services/ServiceFactory';
import BotService from '../services/BotService';
import BotRepository from '../repositories/BotRepository';

const botControllerDebug = debug('chat:botController');

// const botService = ServiceFactory.createBotService();
const botService = new BotService(BotRepository);

class BotController {
	constructor(private socket: Socket, private io: Server) {}

	onMessage = async (
		data: { to: string; message: string },
		cb: (data: Msg) => void
	): Promise<void> => {
		botControllerDebug(`message to bot from ${this.socket.id}: ${data}`);

		if (!data.to) return;
		const bot = await botService.getBotById(data.to);

		bot?.onMessage(this.io, this.socket, data, cb);
	};

	respondWithTimestamp = (data: Msg, cb: (timestamp: number) => void): void => {
		const timestamp = Date.now();
		cb(timestamp);
	};
}

export default BotController;
