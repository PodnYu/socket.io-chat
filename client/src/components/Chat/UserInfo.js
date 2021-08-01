import './UserInfo.css';

const UserInfo = ({ avatarSrc, name, description }) => {
	return (
		<div className='user-info'>
			<div className='avatar'>
				<img className='avatar-img' src={avatarSrc} alt='avatar' />
			</div>
			<div className='info'>
				<div className='name'>{name}</div>
				<div className='description'>{description}</div>
			</div>
		</div>
	);
};

export default UserInfo;
