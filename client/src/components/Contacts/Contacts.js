import './Contacts.css';
import ContactsContainer from './ContactsContainer';
import ContactsSearchBar from './ContactsSearchBar';

const Contacts = ({ setMessageTo }) => {
	return (
		<div className='contacts'>
			<ContactsContainer setMessageTo={setMessageTo} />
			<ContactsSearchBar />
		</div>
	);
};

export default Contacts;
