import { useRef } from 'react';
import { useEffect } from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages }) => {
	const messagesEndRef = useRef(null);

	useEffect(() => {
		// causes weird shift to contacts sections if flex wrapped
		// if (messages.length > 0 && messages[messages.length - 1].isOwn) {
		// 	messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		// }
	}, [messages]);

	return (
		<div className='messages'>
			<div className='message-container'>
				{messages.map((message, index) => (
					<Message key={index} {...message} />
				))}
				<div ref={messagesEndRef}></div>
			</div>
		</div>
	);
};

export default MessageList;
