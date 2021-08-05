import './Header.css';
import { useEffect, useContext } from 'react';
import { socketContext } from '../../SocketContext';

const Header = () => {
	const { socket } = useContext(socketContext);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<header>
			<div className='container'>
				<span className='header-logo'>Chat bots 2.0</span>
			</div>
		</header>
	);
};

export default Header;
