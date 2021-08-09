import dotenv from 'dotenv';
dotenv.config();

import {
	AvatarSrcResolver,
	configureAvatarResolver,
} from './utils/AvatarSrcResolver';

// must be configured before anything else
configureAvatarResolver('./public/avatars', 'default_avatar.png');
import path from 'path';
import { configureSockets } from './configureSockets';

import fastify from 'fastify';
import fastifySocketIO from 'fastify-socket.io';
import fastifyStatic from 'fastify-static';

const app = fastify();

const PORT = process.env.PORT || 8080;

app.register(fastifyStatic, {
	root: AvatarSrcResolver.getInstance().avatarsDir,
	prefix: '/avatars',
});

app.register(fastifyStatic, {
	root: path.join(__dirname, '../client/build'),
	prefix: '/',
	decorateReply: false,
});

app.register(fastifySocketIO, {
	cors: {
		origin: '*',
		methods: '*',
	},
});

app.ready((err) => {
	if (err) throw err;

	configureSockets(app.io);
});

app.listen(PORT, (err: Error, addr: string) => {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
	console.log(`listening on ${addr}...`);
});
