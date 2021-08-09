import https from 'https';

export const getRandomName = (): Promise<string> =>
	new Promise<string>((resolve, reject) =>
		https.get(
			'https://namey.muffinlabs.com/name.json?count=1&type=surname&frequency=all',
			(res) => {
				let body = '';
				res.on('data', (data) => (body += data));
				res.on('end', () => {
					const names = JSON.parse(body);
					resolve(names[0]);
				});
				res.on('error', (err) => reject(err));
			}
		)
	);
