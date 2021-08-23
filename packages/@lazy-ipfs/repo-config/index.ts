import { join } from 'path';
import {
	pathExists, pathExistsSync,
	readJSON,
	readJSONSync,
	writeJSON,
	writeJSONSync,
} from 'fs-extra';

export function getRepoConfigPath(repoPath: string)
{
	return join(repoPath, 'config')
}

export function existsRepoConfig(repoPath: string)
{
	return pathExists(getRepoConfigPath(repoPath))
}

export function existsRepoConfigSync(repoPath: string)
{
	return pathExistsSync(getRepoConfigPath(repoPath))
}

export function _readRepoConfigFile<T>(file: string): Promise<T>
{
	return readJSON(file)
}

export function _readRepoConfigFileSync<T>(file: string): T
{
	return readJSONSync(file)
}

export function _writeRepoConfigFile<T>(file: string, config: T)
{
	return writeJSON(file, config, {
		spaces: 2,
	})
}

export function _writeRepoConfigFileSync<T>(file: string, config: T)
{
	return writeJSONSync(file, config, {
		spaces: 2,
	})
}

export function readRepoConfig<T>(repoPath: string)
{
	return _readRepoConfigFile<T>(getRepoConfigPath(repoPath))
}

export function readRepoConfigSync<T>(repoPath: string)
{
	return _readRepoConfigFileSync<T>(getRepoConfigPath(repoPath))
}

export function writeRepoConfig<T>(repoPath: string, config: T)
{
	return _writeRepoConfigFile<T>(getRepoConfigPath(repoPath), config)
}

export function writeRepoConfigSync<T>(repoPath: string, config: T)
{
	return _writeRepoConfigFileSync<T>(getRepoConfigPath(repoPath), config)
}
