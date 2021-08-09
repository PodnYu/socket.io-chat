import UserModel from '../models/UserModel';

export interface IUserService {
	createUser(id: string, avatarSrc?: string): Promise<UserModel>;

	getAllUsers(): Promise<UserModel[]>;

	getUserById(id: string): Promise<UserModel>;

	deleteUserById(id: string): Promise<void>;
}
