import {
	readJSON,
	readJSONSync,
	writeJSON,
	writeJSONSync,
} from 'fs-extra';
import {
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

export function getIdentityFromConfig(config): IRepoIdentity
{
	return config.Identity
}

export function setIdentityToConfig<T extends IRepoConfig>(config: T, Identity: IRepoIdentity): T & {
	Identity: IRepoIdentity,
}
{
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
