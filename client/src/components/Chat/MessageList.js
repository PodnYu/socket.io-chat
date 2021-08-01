import Message from './Message';
import './MessageList.css';

const MessageList = () => {
	const messages = [
		{
			userName: 'Cheems',
			sentTimestamp: '4:20PM',
			message: 'Nice Flex!',
			isOwn: false,
		},
		{
			userName: 'Doge',
			sentTimestamp: '4:22PM',
			message: 'Welcome',
			isOwn: true,
			seenTimestamp: '4:25PM',
		},
		{
			userName: 'Cheems',
			sentTimestamp: '4:20PM',
			message: 'Nice Flex!',
			isOwn: false,
		},
		{
			userName: 'Doge',
			sentTimestamp: '4:22PM',
			message:
				'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwddddddddddddddddddddddddddd',
			isOwn: true,
			seenTimestamp: '4:20PM',
		},
		{
			userName: 'Doge',
			sentTimestamp: '4:22PM',
			message: 'Welcome',
			isOwn: true,
			seenTimestamp: '4:25PM',
		},
	];

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
