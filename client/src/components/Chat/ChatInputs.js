import classNames from 'classnames';
import { useRef } from 'react';
import './ChatInputs.css';

const ChatInputs = ({ sendMessage, disabled = false }) => {
	const messageInputRef = useRef(null);

	const handleInputKeyUp = (e) => {
		if (e.key === 'Enter') {
			handleSendButtonClick();
		}
	};

	const handleSendButtonClick = () => {
		if (disabled) return;
		const message = messageInputRef.current.value;
		if (message.trim() === '') {
			return;
		}

		messageInputRef.current.value = '';
		sendMessage(message);
	};

	const buttonStyles = classNames('send-message-btn', {
		disabled: disabled,
	});

	return (
		<div className='chat-inputs'>
			<input
				ref={messageInputRef}
				type='text'
				className='message-input'
				placeholder='Start chatting!'
				onKeyUp={handleInputKeyUp}
			/>
			<button
				type='button'
				className={buttonStyles}
				onClick={handleSendButtonClick}
			>
				Send message
			</button>
		</div>
	);
};

export default ChatInputs;
