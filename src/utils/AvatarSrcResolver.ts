import { existsSync } from 'fs';
import path from 'path';

/**
 * AvatarSrcResolver
 * returns path to avatar
 */
export class AvatarSrcResolver {
	private constructor(
		private _avatarsDir: string,
		private _defaultAvatarFileName: string
	) {
		this.checkInit();
		this.checkFs();
	}

	private static instance: AvatarSrcResolver | null = null;

	public static getInstance(
		avatarsDir?: string,
		defaultAvatarFileName?: string
	): AvatarSrcResolver {
		if (this.instance === null)
			this.instance = new AvatarSrcResolver(
				avatarsDir || '',
				defaultAvatarFileName || ''
			);
		return this.instance;
	}

	public get avatarsDir(): string {
		return path.resolve(this._avatarsDir);
	}

	public get defaultAvatarFileName(): string {
		return this._defaultAvatarFileName;
	}

	private checkInit() {
		if (
			this._avatarsDir === undefined ||
			this._avatarsDir === null ||
			this._defaultAvatarFileName === undefined ||
			this._defaultAvatarFileName === null
		) {
			throw new Error(
				`AvatarSrcResolver: wrong configuration
          avatarsDir: ${this._avatarsDir}
          defaultAvatarFileName: ${this._defaultAvatarFileName}
        `
			);
		}
	}

	private checkFs() {
		const pathToDefaultAvatar = path.join(
			this.avatarsDir,
			this._defaultAvatarFileName
		);

		const defaultAvatarExists = existsSync(pathToDefaultAvatar);

		if (!defaultAvatarExists) {
			throw new Error(
				`AvatarSrcResolver: default avatar file ${pathToDefaultAvatar} does not exist!`
			);
		}
	}

	public resolvePath(avatarFileName: string): string {
		return path.join(this.avatarsDir, avatarFileName);
	}

	public getDefaultAvatarPath(): string {
		return path.resolve(
			path.join(this.avatarsDir, this._defaultAvatarFileName)
		);
	}
}

export function configureAvatarResolver(
	avatarsDir: string,
	defaultAvatarFileName: string
): void {
	AvatarSrcResolver.getInstance(avatarsDir, defaultAvatarFileName);
}
