import { createContext, useEffect, useState, useContext } from 'react';
import { ConnectionErrorMessage, WaitingMessage } from './StartMessages';
import io from 'socket.io-client';
import { getServerAddress } from './Helpers';

const defaultValue = {};
export const appContext = createContext(defaultValue);

export const useAppContext = () => useContext(appContext);

const AppContext = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [socketError, setSocketError] = useState(new Error('Connecting...'));
	const [me, setMe] = useState(null);

	useEffect(() => {
		console.log('connecting...');
		setSocket(io(getServerAddress()));

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

			socket.emit('user:register', (myself) => {
				console.log('myself:', myself);
				if (myself) {
					setMe(myself);
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
		<appContext.Provider value={{ socket, me }}>
			{socketError ? (
				<ConnectionErrorMessage message={socketError.message} />
			) : me !== null ? (
				children
			) : (
				<WaitingMessage message='Wait a bit please...' />
			)}
		</appContext.Provider>
	);
};

export default AppContext;
