import './ContactsContainer.css';
import Contact from './Contact';
import { Tabs } from './Tabs';
import { TabItem } from './Tabs';
import { useEffect, useState, useContext } from 'react';
import { socketContext } from '../../SocketContext';

const ContactsContainer = ({ setMessageTo }) => {
	const [contacts, setContacts] = useState([]);
	const { socket } = useContext(socketContext);

	useEffect(() => {
		socket.emit('getAllOtherUsers', (users) => {
			console.log({ users });
			setContacts(users);
		});

		socket.on('user:join', (user) => {
			console.log('user:join:', user);
			setContacts((prevContacts) => [...prevContacts, user]);
		});

		socket.on('user:leave', (user) => {
			console.log('user:leave', user);
			setContacts((prevContacts) =>
				prevContacts.filter((contact) => contact.id !== user.id)
			);
		});

		return () => {
			socket.removeAllListeners('user:join');
			socket.removeAllListeners('user:leave');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Tabs defaultIndex='1'>
			<TabItem label='Online' index='1'>
				{contacts.map((contact, index) => (
					<Contact
						key={`contact-${contact.id}`}
						{...contact}
						setMessageTo={setMessageTo}
					/>
				))}
			</TabItem>
			<TabItem label='All' index='2'></TabItem>
		</Tabs>
	);
};

export default ContactsContainer;
