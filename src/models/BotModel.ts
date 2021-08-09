class BotModel {
	public online: boolean;
	public isBot: boolean;

	constructor(
		public id: string,
		public userName: string,
		public description: string,
		public avatar: string
	) {
		this.online = true;
		this.isBot = true;
	}
}

export default BotModel;
