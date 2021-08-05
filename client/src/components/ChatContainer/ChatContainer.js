import { useEffect, useState } from 'react';
import './ChatContainer.css';
import Chat from '../Chat';
import Contacts from '../Contacts';

const ChatContainer = () => {
	const [messageTo, setMessageTo] = useState(null);

	useEffect(() => {
		console.log('messageTo:', messageTo);
	}, [messageTo]);

	const messageToChanged = (contact) => {
		if (messageTo === null || contact.id !== messageTo.id) {
			setMessageTo(contact);
		}
	};

	return (
		<div className='container chat-container'>
			<Chat messageTo={messageTo} />
			<Contacts setMessageTo={messageToChanged} />
		</div>
	);
};

export default ChatContainer;
