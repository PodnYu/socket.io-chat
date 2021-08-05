import './Message.css';
import classNames from 'classnames';

const Message = ({
	userName,
	sentTimestamp,
	message,
	isOwn,
	seenTimestamp,
}) => {
	const messageStyle = classNames({
		message: true,
		'own-message': isOwn,
	});

	return (
		<div className={messageStyle}>
			<div className='message-header'>
				<div className='username'>{userName}</div>
				<div className='sent-timestamp'>{sentTimestamp}</div>
			</div>
			<div className='message-content'>{message}</div>
			{/* {isOwn && <div className='seen-timestamp'>Seen at {seenTimestamp}</div>} */}
		</div>
	);
};

export default Message;
