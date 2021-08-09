import UserModel from '../models/UserModel';
import { IUserRepository } from '../interfaces/IUserRepository';
import { getRandomName } from '../utils/helpers';

export class UserService {
	constructor(
		private userRepository: IUserRepository,
		private defaultAvatarFileName: string
	) {}

	async createUser(id: string, avatarSrc?: string): Promise<UserModel> {
		if (id === undefined) throw new Error('user id is undefined!');
		try {
			const userName = await getRandomName();
			const user = new UserModel(
				id,
				userName,
				avatarSrc || this.defaultAvatarFileName
			);

			await this.userRepository.add(user);

			return user;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	async getAllUsers(): Promise<UserModel[]> {
		return this.userRepository.getAll();
	}

	async getUserById(id: string): Promise<UserModel> {
		return this.userRepository.getById(id);
	}

	async deleteUserById(id: string): Promise<void> {
		this.userRepository.delete(id);
	}
}

export default UserService;
