import bots from '../bots';
import { IBot } from '../interfaces/IBot';
import { IBotRepository } from '../interfaces/IBotRepository';

class BotRepository implements IBotRepository {
	private _bots: Map<string, IBot>;

	constructor(bots: IBot[]) {
		this._bots = new Map<string, IBot>();

		bots.forEach((bot) => this._bots.set(bot.id, bot));
	}

	getById = async (botId: string): Promise<IBot | undefined> => {
		return this._bots.get(botId);
	};

	getAll = async (): Promise<IBot[]> => {
		return Array.from(this._bots.values());
	};
}

export default new BotRepository(bots);
