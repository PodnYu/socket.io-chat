import { IBot } from './IBot';

export interface IBotRepository {
	getById(botId: string): Promise<IBot | undefined>;
	getAll(): Promise<IBot[]>;
}
