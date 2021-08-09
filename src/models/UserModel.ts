class UserModel {
	id: string;
	userName: string;
	avatar: string;
	online: boolean;

	constructor(id: string, userName: string, avatar: string) {
		this.id = id;
		this.userName = userName;
		this.avatar = avatar;
		this.online = true;
	}
}

export default UserModel;
