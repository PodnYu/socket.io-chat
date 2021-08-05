import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages }) => {
	return (
		<div className='messages'>
			<div className='message-container'>
				{messages.map((message, index) => (
					<Message key={index} {...message} />
				))}
			</div>
		</div>
	);
};

export default MessageList;
