import { useState } from 'react';
import './ChatContainer.css';
import Chat from '../Chat';
import Contacts from '../Contacts';

const ChatContainer = () => {
	const [contact, setContact] = useState(null);

	const contactChanged = (user) => {
		if (contact === null || contact.id !== user.id) {
			setContact(user);
		}
	};

	return (
		<div className='container chat-container'>
			<Chat contact={contact} />
			<Contacts setContact={contactChanged} />
		</div>
	);
};

export default ChatContainer;
