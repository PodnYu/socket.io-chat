import './ChatInputs.css';

const ChatInputs = () => {
	return (
		<div className='chat-inputs'>
			<input
				type='text'
				className='message-input'
				placeholder='Start chatting!'
			/>
			<button type='button' className='send-message-btn'>
				Send message
			</button>
		</div>
	);
};

export default ChatInputs;
