import User from '../models/UserModel';

export interface IUserRepository {
	getAll(): Promise<User[]>;
	getById(id: string): Promise<User>;
	add(user: User): Promise<void>;
	update(user: User): Promise<void>;
	delete(id: string): Promise<void>;
}
