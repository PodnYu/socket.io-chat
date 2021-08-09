import { IBot } from '../interfaces/IBot';

export interface IBotService {
	getBotById(botId: string): Promise<IBot | undefined>;

	getAllBots(): Promise<IBot[]>;
}
