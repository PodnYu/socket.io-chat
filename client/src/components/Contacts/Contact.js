import './Contact.css';

const Contact = ({ avatarSrc, name, description, isOnline }) => {
	return (
		<div className='contact'>
			<div className='contact-avatar-container'>
				<img className='contact-avatar' src={avatarSrc} alt='contact-avatar' />
				{isOnline && <div className='online-badge'></div>}
			</div>
			<div className='contact-info'>
				<div className='contact-name'>{name}</div>
				<div className='contact-description'>{description}</div>
			</div>
		</div>
	);
};

export default Contact;
