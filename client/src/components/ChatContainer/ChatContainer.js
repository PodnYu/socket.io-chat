import './ChatContainer.css';
import Chat from '../Chat';
import Contacts from '../Contacts';

const ChatContainer = () => {
  return (
    <div className="container chat-container">
      <Chat />
      <Contacts />
    </div>
  );
}

export default ChatContainer;