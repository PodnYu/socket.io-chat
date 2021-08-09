import MessageModel from '../models/MessageModel';

export class MessageRepository {
	private messages: Record<string, MessageModel[]> = {};

	get = async (userId: string): Promise<MessageModel[]> => {
		if (this.messages[userId] === undefined) {
			this.messages[userId] = [];
		}
		return this.messages[userId];
	};

	getTo = async (
		userId: string,
		recipientId: string
	): Promise<MessageModel[]> => {
		return (await this.get(userId)).filter((msg) => msg.to === recipientId);
	};

	add = async (userId: string, message: MessageModel): Promise<void> => {
		if (this.messages[userId] === undefined) {
			this.messages[userId] = [];
		}
		this.messages[userId].push(message);
	};
}

export default new MessageRepository();
