export const ConnectionErrorMessage = ({ message }) => {
	return (
		<h1
			style={{
				color: 'red',
				textAlign: 'center',
			}}
		>
			{message}
		</h1>
	);
};

export const WaitingMessage = ({ message }) => {
	return (
		<h1
			style={{
				textAlign: 'center',
				color: '#fff',
			}}
		>
			{message}
		</h1>
	);
};
