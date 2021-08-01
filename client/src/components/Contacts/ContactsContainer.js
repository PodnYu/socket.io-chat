import './ContactsContainer.css';
import Contact from './Contact';
import { Tabs } from './Tabs';
import { TabItem } from './Tabs';

const ContactsContainer = () => {
	const contacts = [
		{
			name: 'Cheems!',
			description: 'Cheems is a very good dogo!',
			avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
			isOnline: true,
		},
		{
			name: 'Doge!',
			description: 'test',
			avatarSrc:
				'https://s.yimg.com/uu/api/res/1.2/j.IuW7t1ZkqNb32aj9xaDw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/Benzinga/fec49aa7467e3735885162a33b8e83d9',
			isOnline: false,
		},
		{
			name: 'Cheems!',
			description: 'Cheems is a very good dogo!',
			avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
			isOnline: true,
		},
		{
			name: 'Doge!',
			description: 'test',
			avatarSrc:
				'https://s.yimg.com/uu/api/res/1.2/j.IuW7t1ZkqNb32aj9xaDw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/Benzinga/fec49aa7467e3735885162a33b8e83d9',
		},
		{
			name: 'Cheems!',
			description: 'Cheems is a very good dogo!',
			avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
			isOnline: true,
		},
		{
			name: 'Doge!',
			description: 'test',
			avatarSrc:
				'https://s.yimg.com/uu/api/res/1.2/j.IuW7t1ZkqNb32aj9xaDw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/Benzinga/fec49aa7467e3735885162a33b8e83d9',
			isOnline: false,
		},
		{
			name: 'Cheems!',
			description: 'Cheems is a very good dogo!',
			avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
			isOnline: true,
		},
		{
			name: 'Doge!',
			description: 'test',
			avatarSrc:
				'https://s.yimg.com/uu/api/res/1.2/j.IuW7t1ZkqNb32aj9xaDw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/Benzinga/fec49aa7467e3735885162a33b8e83d9',
			isOnline: false,
		},
		{
			name: 'Cheems!',
			description: 'Cheems is a very good dogo!',
			avatarSrc: 'https://i.redd.it/kga8zxvvmh751.jpg',
			isOnline: true,
		},
		{
			name: 'Doge!',
			description: 'test',
			avatarSrc:
				'https://s.yimg.com/uu/api/res/1.2/j.IuW7t1ZkqNb32aj9xaDw--~B/aD00MDA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/Benzinga/fec49aa7467e3735885162a33b8e83d9',
			isOnline: true,
		},
	];

	return (
		<Tabs defaultIndex='1'>
			<TabItem label='Online' index='1'>
				{contacts.map((contact, index) => (
					<Contact key={`contact-${index}`} {...contact} />
				))}
			</TabItem>
			<TabItem label='All' index='2'></TabItem>
		</Tabs>
	);
};

export default ContactsContainer;
