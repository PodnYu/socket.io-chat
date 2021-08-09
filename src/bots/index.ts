import EchoBot from './EchoBot';
import ReverseBot from './ReverseBot';
import IgnoreBot from './IgnoreBot';
import SpamBot from './SpamBot';
import DialogService from '../services/DialogService';
import dialogRepository from '../repositories/DialogRepository';
import chatMessagesRepository from '../repositories/ChatMessagesRepository';
import ChatMessageService from '../services/ChatMessageService';

// using ServiceFactory here causes circular dependency
const dialogService = new DialogService(dialogRepository);
const chatMessageService = new ChatMessageService(
	chatMessagesRepository,
	dialogService
);

const bots = [
	new EchoBot(dialogService, chatMessageService),
	new ReverseBot(dialogService, chatMessageService),
	new IgnoreBot(dialogService, chatMessageService),
	new SpamBot(dialogService, chatMessageService),
];

export default bots;
