import { useState } from 'react';
import './Contacts.css';
import ContactsContainer from './ContactsContainer';
import ContactsSearchBar from './ContactsSearchBar';

const Contacts = ({ setContact }) => {
	const [searchUserName, setSearchUserName] = useState('');

	return (
		<div className='contacts'>
			<ContactsContainer
				setContact={setContact}
				searchedUserName={searchUserName}
			/>
			<ContactsSearchBar onSearch={setSearchUserName} />
		</div>
	);
};

export default Contacts;
