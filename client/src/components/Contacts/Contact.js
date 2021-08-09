import { getAvatarSrc } from '../../Helpers';
import './Contact.css';

const Contact = ({
	id,
	avatar,
	userName,
	description,
	online,
	setContact,
	isBot,
}) => {
	return (
		<div
			className='contact'
			onClick={() => {
				setContact({ id, userName, avatar, online, description, isBot });
			}}
		>
			<div className='contact-avatar-container'>
				<img
					className='contact-avatar'
					src={getAvatarSrc(avatar)}
					alt='contact-avatar'
				/>
				{online && <div className='online-badge'></div>}
			</div>
			<div className='contact-info'>
				<div className='contact-name'>{userName}</div>
				<div className='contact-description'>{description}</div>
			</div>
		</div>
	);
};

export default Contact;
