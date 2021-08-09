import { IBot } from '../interfaces/IBot';
import { IBotRepository } from '../interfaces/IBotRepository';
import { IBotService } from '../interfaces/IBotService';

class BotService implements IBotService {
	constructor(private botRepository: IBotRepository) {}

	getBotById = async (botId: string): Promise<IBot | undefined> => {
		return await this.botRepository.getById(botId);
	};

	getAllBots = async (): Promise<IBot[]> => {
		return await this.botRepository.getAll();
	};
}

export default BotService;
