import './Contact.css';

const Contact = ({
	id,
	avatar,
	userName,
	description,
	online,
	setMessageTo,
}) => {
	return (
		<div
			className='contact'
			onClick={() => {
				setMessageTo({ id, userName, avatar, online, description });
			}}
		>
			<div className='contact-avatar-container'>
				<img
					className='contact-avatar'
					src={`http://localhost:8080/avatars/${avatar}`}
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
