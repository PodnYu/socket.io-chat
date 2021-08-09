import MessageModel from './MessageModel';

type ChatMessageModel = Omit<MessageModel, 'to'>;

export default ChatMessageModel;
