import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRef } from 'react';
import './ChatInputs.css';
import useDebounce from '../../hooks/debounce';

const ChatInputs = ({
	sendMessage,
	disabled = false,
	onStartTyping,
	onStopTyping,
}) => {
	const [message, setMessage] = useState('');
	const [isTyping, setIsTyping] = useState(false);

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
		messageInputRef.current.focus();
		sendMessage(message);
	};

	const value = useDebounce(message, 1000);

	useEffect(() => {
		if (onStopTyping) onStopTyping();
		setIsTyping(false);
	}, [value]);

	const buttonStyles = classNames('send-message-btn', {
		disabled: disabled,
	});

	const inputOnChange = (e) => {
		if (!isTyping) {
			if (onStartTyping) onStartTyping();
			setIsTyping(true);
		}
		setMessage(e.target.value);
	};

	return (
		<div className='chat-inputs'>
			<input
				ref={messageInputRef}
				type='text'
				className='message-input'
				placeholder='Start chatting!'
				onChange={inputOnChange}
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
