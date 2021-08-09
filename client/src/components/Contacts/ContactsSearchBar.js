import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/debounce';
import './ContactsSearchBar.css';

const ContactsSearchBar = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState('');

	const debouncedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		onSearch(debouncedValue);
	}, [debouncedValue]);

	const inputOnChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div className='search-box-container'>
			<input
				type='text'
				className='search-box-input'
				placeholder='Search...'
				onChange={inputOnChange}
			/>
		</div>
	);
};

export default ContactsSearchBar;
