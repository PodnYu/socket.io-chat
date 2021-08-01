import './Chat.css';
import ChatInputs from './ChatInputs';
import MessageList from './MessageList';
import UserInfo from './UserInfo';

const UserTypingStatus = ({ userName }) => {
	return <div className='user-typing-status'>{userName} is typing...</div>;
};

const Chat = () => {
	const userInfo = {
		avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
		name: 'Cheems',
		description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    Rem eaque corrupti at, doloribus suscipit similique minima. 
    Velit veritatis expedita iure! 
    Quibusdam deserunt nisi distinctio exercitationem iusto veniam? 
    Ut, consequatur eos!`,
	};

	return (
		<div className='chat'>
			<UserInfo {...userInfo} />

			<MessageList />

			<UserTypingStatus userName='Reverse bot' />

			<ChatInputs />
		</div>
	);
};

export default Chat;
