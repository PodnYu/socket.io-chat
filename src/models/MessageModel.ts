class MessageModel {
	constructor(
		public from: string,
		public to: string,
		public message: string,
		public timestamp: number
	) {}
}

export default MessageModel;
