import { useContext, useEffect, useState } from 'react';
import { socketContext } from '../../SocketContext';
import './Chat.css';
import ChatInputs from './ChatInputs';
import MessageList from './MessageList';
import UserInfo from './UserInfo';

const UserTypingStatus = ({ userName }) => {
	return <div className='user-typing-status'>{userName} is typing...</div>;
};

const Chat = ({ messageTo }) => {
	const { socket } = useContext(socketContext);

	const getFormatedTime = (timestamp) => {
		if (!timestamp) return '';

		return new Date(+timestamp).toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
	};

	const userInfo = {
		avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
		name: 'Cheems',
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    Rem eaque corrupti at, doloribus suscipit similique minima. 
    Velit veritatis expedita iure! 
    Quibusdam deserunt nisi distinctio exercitationem iusto veniam? 
    Ut, consequatur eos!`,
	};

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('user:message', ({ from, message, timestamp }) => {
			console.log('user:message:');
			console.log({ from, message, timestamp });
			setMessages((prevMessages) => [
				...prevMessages,
				{
					userName: 'kek' /* messageTo.userName */,
					isOwn: false,
					message,
					sentTimestamp: getFormatedTime(timestamp),
				},
			]);
		});

		return () => {
			socket.removeAllListeners('user:message');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sendMessage = (message) => {
		if (message.trim() === '') {
			return;
		}

		socket.emit('user:message', { to: messageTo.id, message }, (timestamp) => {
			const time = getFormatedTime(timestamp);
			setMessages((prevMessages) => [
				...prevMessages,
				{
					userName: 'me',
					isOwn: true,
					message,
					sentTimestamp: time,
				},
			]);
		});
	};

	const inputsDisabled = messageTo === null;

	return (
		<div className='chat'>
			<UserInfo {...userInfo} />

			<MessageList messages={messages} />

			<UserTypingStatus userName='Reverse bot' />

			<ChatInputs disabled={inputsDisabled} sendMessage={sendMessage} />
		</div>
	);
};

export default Chat;
