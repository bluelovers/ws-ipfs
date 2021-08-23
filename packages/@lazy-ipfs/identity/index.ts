import {
	pathExists,
	pathExistsSync,
	readJSON,
	readJSONSync,
	writeJSON,
	writeJSONSync,
} from 'fs-extra';
import {
	getRepoConfigPath,
	IRepoConfig,
	readRepoConfig,
	readRepoConfigSync,
	writeRepoConfig,
	writeRepoConfigSync,
} from '@lazy-ipfs/repo-config/index';
import { join } from 'path';

export interface IRepoIdentity
{
	PeerID: string;
	PrivKey: string;
}

export function recommendIdentityFilename()
{
	return '.identity.json' as const
}

export function getIdentityPath(targetPath: string)
{
	return join(targetPath, recommendIdentityFilename())
}

export function existsIdentityPath(targetPath: string)
{
	return pathExists(getIdentityPath(targetPath))
}

export function existsIdentityPathSync(targetPath: string)
{
	return pathExistsSync(getIdentityPath(targetPath))
}

export function getIdentityFromConfig(config): IRepoIdentity
{
	return config.Identity
}

export function assertIdentity(Identity: IRepoIdentity): asserts Identity is IRepoIdentity
{
	if (!Identity?.PeerID?.length || !Identity?.PrivKey?.length)
	{
		throw new TypeError(`Identity should include PeerID, PrivKey`)
	}
}

export function setIdentityToConfig<T extends IRepoConfig>(config: T, Identity: IRepoIdentity): T & {
	Identity: IRepoIdentity,
}
{
	assertIdentity(Identity);

	// @ts-ignore
	config.Identity = Identity

	return config as any
}

export function readIdentityFile(file: string): Promise<IRepoIdentity>
{
	return readJSON(file)
}

export function readIdentityFileSync(file: string): IRepoIdentity
{
	return readJSONSync(file)
}

export function writeIdentityFile(file: string, Identity: IRepoIdentity)
{
	return writeJSON(file, Identity, {
		spaces: 2,
	})
}

export function writeIdentityFileSync(file: string, Identity: IRepoIdentity)
{
	return writeJSONSync(file, Identity, {
		spaces: 2,
	})
}

export function readIdentityFromRepoConfig(repoPath: string)
{
	return readRepoConfig(repoPath).then(getIdentityFromConfig)
}

export function readIdentityFromRepoConfigSync(repoPath: string): IRepoIdentity
{
	const config = readRepoConfigSync(repoPath)

	return getIdentityFromConfig(config)
}

export function setIdentityToRepoConfig(repoPath: string, Identity: IRepoIdentity)
{
	return readRepoConfig(repoPath)
		.then(config =>
		{
			config = setIdentityToConfig(config, Identity);

			return writeRepoConfig(repoPath, config)
		})
}

export function setIdentityToRepoConfigSync(repoPath: string, Identity: IRepoIdentity)
{
	let config = readRepoConfigSync(repoPath);

	config = setIdentityToConfig(config, Identity);

	return writeRepoConfigSync(repoPath, config)
}

/**
 * file path of .identity.json
 */
export function backupIdentityFromRepoToFile(repoPath: string, file: string)
{
	return readIdentityFromRepoConfig(repoPath).then(Identity => writeIdentityFile(file, Identity))
}

/**
 * file path of .identity.json
 */
export function backupIdentityFromRepoToFileSync(repoPath: string, file: string)
{
	let Identity = readIdentityFromRepoConfigSync(repoPath)

	return writeIdentityFileSync(file, Identity)
}

/**
 * targetPath for save .identity.json
 */
export function backupIdentityFromRepoToPath(repoPath: string, targetPath: string)
{
	return backupIdentityFromRepoToFile(repoPath, getIdentityPath(targetPath))
}

/**
 * targetPath for save .identity.json
 */
export function backupIdentityFromRepoToPathSync(repoPath: string, targetPath: string)
{
	return backupIdentityFromRepoToFileSync(repoPath, getIdentityPath(targetPath))
}
