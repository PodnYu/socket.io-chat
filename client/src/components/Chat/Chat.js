import { useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext';
import './Chat.css';
import ChatInputs from './ChatInputs';
import MessageList from './MessageList';
import UserInfo from './UserInfo';
import { getAvatarSrc, getFormatedTime } from '../../Helpers';
import UserTypingStatus from './UserTypingStatus';

const Chat = ({ contact }) => {
	const { socket } = useAppContext();

	const userInfo = contact
		? {
				avatarSrc: getAvatarSrc(contact.avatar),
				name: contact.userName,
				description: contact.description,
		  }
		: {};

	const [messages, setMessages] = useState([]);
	const [contactIsTyping, setContactIsTyping] = useState(false);
	const { me } = useAppContext();

	// too large
	useEffect(() => {
		if (contact === null) return;

		setMessages([]);
		setContactIsTyping(false);

		socket.on('user:message', ({ from, message, timestamp }) => {
			console.log('user:message:', { from, message, timestamp });

			// drop message because it doesn't belong to current chat
			if (contact === null || from.userId !== contact.id) {
				return;
			}

			setMessages((prevMessages) => [
				...prevMessages,
				{
					userName: from.userName,
					isOwn: false,
					message,
					sentTimestamp: getFormatedTime(timestamp),
				},
			]);
		});

		socket.on('bot:message', ({ message, botId, timestamp }) => {
			if (botId === contact.id) {
				setMessages((prevMessages) => [
					...prevMessages,
					{
						userName: contact.userName,
						isOwn: false,
						message,
						sentTimestamp: getFormatedTime(timestamp),
					},
				]);
			}
		});

		socket.on('user:startedTyping', ({ userId }) => {
			console.log('user:startedTyping:', userId);
			if (contact.id === userId) {
				setContactIsTyping(true);
			}
		});

		socket.on('user:stoppedTyping', ({ userId }) => {
			console.log('user:stoppedTyping:', userId);
			if (contact.id === userId) {
				setContactIsTyping(false);
			}
		});

		socket.emit('getDialogHistory', { recipientId: contact.id }, (history) => {
			console.log('getDialogHistory:', history);

			const messages = history.map((message) => ({
				userName: me.id === message.from ? 'me' : contact.userName,
				isOwn: me.id === message.from,
				message: message.message,
				sentTimestamp: getFormatedTime(message.timestamp),
			}));

			setMessages(messages);
		});

		return () => {
			socket.removeAllListeners('user:message');
			socket.removeAllListeners('bot:message');
			socket.removeAllListeners('user:startedTyping');
			socket.removeAllListeners('user:stoppedTyping');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contact]);

	const sendMessage = (message) => {
		if (message.trim() === '') {
			return;
		}

		const eventName = (contact.isBot ? 'bot' : 'user') + ':message';
		socket.emit(eventName, { to: contact.id, message }, (timestamp) => {
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

	const inputsDisabled = contact === null;

	const onStartTyping = () => {
		socket.emit('user:startedTyping', { recipientId: contact.id });
	};

	const onStopTyping = () => {
		socket.emit('user:stoppedTyping', { recipientId: contact.id });
	};

	return (
		<div className='chat'>
			{contact && (
				<>
					<UserInfo {...userInfo} />
					<MessageList messages={messages} />

					<UserTypingStatus
						isTyping={contactIsTyping}
						userName={contact.userName}
					/>

					<ChatInputs
						disabled={inputsDisabled}
						sendMessage={sendMessage}
						onStartTyping={onStartTyping}
						onStopTyping={onStopTyping}
					/>
				</>
			)}
		</div>
	);
};

export default Chat;
