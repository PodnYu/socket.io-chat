const UserTypingStatus = ({ userName, isTyping }) => {
	console.log(isTyping);
	return (
		<div className='user-typing-status'>
			{isTyping ? `${userName} is typing...` : ''}
		</div>
	);
};

export default UserTypingStatus;
