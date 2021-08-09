import { IUserRepository } from '../interfaces/IUserRepository';
import User from '../models/UserModel';

class UserRepository implements IUserRepository {
	private readonly users: Record<string, User> = {};

	async getAll() {
		return Object.values(this.users);
	}

	async getById(id: string) {
		return this.users[id];
	}

	async add(user: User) {
		this.users[user.id] = user;
	}

	async update(user: User) {
		this.users[user.id] = user;
	}

	async delete(id: string) {
		delete this.users[id];
	}
}

export default new UserRepository();
