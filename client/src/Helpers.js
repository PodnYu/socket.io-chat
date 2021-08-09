export const getFormatedTime = (timestamp) => {
	if (!timestamp) return '';

	return new Date(+timestamp).toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
};

export const getServerAddress = () => {
	return 'http://localhost:8080';
};

export const getAvatarSrc = (avatar) => {
	return `${getServerAddress()}/avatars/${avatar}`;
};
