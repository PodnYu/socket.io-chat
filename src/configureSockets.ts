import { Server } from 'socket.io';
import UserController from './controllers/UserController';
import BotController from './controllers/BotController';

export function configureSockets(io: Server): void {
	io.on('connection', async (socket) => {
		const userController = new UserController(io, socket);
		const botController = new BotController(socket, io);

		userController.onConnection();

		socket.on('user:register', userController.onRegister);

		socket.on('getAllOtherUsers', userController.onGetAllOtherUsers);

		socket.on('getBots', userController.onGetBots);

		socket.on(
			'getAllOtherUsersAndBots',
			userController.onGetAllOtherUsersAndBots
		);

		socket.on('getMyself', userController.onGetMyself);

		socket.on('user:message', userController.onMessage);

		socket.on('getDialogHistory', userController.onGetDialogHistory);

		socket.on('user:startedTyping', userController.onUserStartedTyping);

		socket.on('user:stoppedTyping', userController.onUserStoppedTyping);

		socket.on('bot:message', (data: any, cb: (data: any) => void) => {
			botController.respondWithTimestamp(data, cb);
			botController.onMessage(data, cb);
		});

		socket.onAny(userController.onAny);

		socket.on('disconnect', userController.onDisconnect);
	});
}
