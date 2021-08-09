import './ContactsContainer.css';
import Contact from './Contact';
import { Tabs } from './Tabs';
import { TabItem } from './Tabs';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext';
import './Tabs/Tabs.css';

const ContactsContainer = ({ setContact, searchedUserName }) => {
	const [contacts, setContacts] = useState([]);
	const { socket } = useAppContext();

	useEffect(() => {
		socket.emit('getAllOtherUsersAndBots', (usersAndBots) => {
			console.log('getAllOtherUserAndBots:', usersAndBots);
			setContacts(usersAndBots);
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

	const searchedContacts = searchedUserName
		? contacts.filter((contact) =>
				contact.userName.toLowerCase().includes(searchedUserName)
		  )
		: contacts;

	const onlineContacts = searchedContacts.filter(
		(contact) => contact.online === true
	);

	return (
		<Tabs defaultIndex='1'>
			<TabItem tabItem={true} label='Online' index='1'>
				{onlineContacts.map((contact) => (
					<Contact
						key={`contact-${contact.id}`}
						{...contact}
						setContact={setContact}
					/>
				))}
			</TabItem>
			<TabItem tabItem={true} label='All' index='2'>
				{searchedContacts.map((contact) => (
					<Contact
						key={`contact-${contact.id}`}
						{...contact}
						setContact={setContact}
					/>
				))}
			</TabItem>
		</Tabs>
	);
};

export default ContactsContainer;
