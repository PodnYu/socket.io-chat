import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react/cjs/react.production.min';
import io from 'socket.io-client';

const defaultValue = {};
export const socketContext = createContext(defaultValue);

const ConnectionErrorMessage = ({ message }) => {
	return (
		<h1
			style={{
				color: 'red',
				textAlign: 'center',
			}}
		>
			{message}
		</h1>
	);
};

const WaitingMessage = ({ message }) => {
	return (
		<h1
			style={{
				textAlign: 'center',
				color: '#fff',
			}}
		>
			{message}
		</h1>
	);
};

const SocketContext = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [socketError, setSocketError] = useState(new Error('Connecting...'));
	const [userName, setUserName] = useState(null);

	useEffect(() => {
		console.log('connecting...');
		setSocket(io('/'));

		return () => {
			socket.emit('disconnect');
			socket.off();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (socket === null) return;

		socket.on('connect', () => {
			console.log('connected successfully');

			socket.emit('user:register', (userName) => {
				console.dir({ userName });
				if (userName) {
					setUserName(userName);
				}
			});

			setSocketError(null);
		});

		socket.on('connect_error', () => {
			console.error('socket connection error!');
			setSocketError(new Error('Connection error!'));
		});

		socket.on('disconnect', (reason) => {
			console.error('socket disconnection:', reason);
			setSocketError(new Error(reason));
		});
	}, [socket]);

	return (
		<socketContext.Provider value={{ socket }}>
			{socketError ? (
				<ConnectionErrorMessage message={socketError.message} />
			) : userName !== null ? (
				children
			) : (
				<WaitingMessage message='Wait a bit please...' />
			)}
		</socketContext.Provider>
	);
};

export default SocketContext;
