import './Contacts.css';
import ContactsContainer from './ContactsContainer';
import ContactsSearchBar from './ContactsSearchBar';

const Contacts = () => {
	return (
		<div className='contacts'>
			<ContactsContainer />
			<ContactsSearchBar />
		</div>
	);
};

export default Contacts;
