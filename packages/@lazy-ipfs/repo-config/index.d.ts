export interface IRepoConfig {
    [k: string]: any;
}
export declare function getRepoConfigPath(repoPath: string): string;
export declare function existsRepoConfig(repoPath: string): Promise<boolean>;
export declare function existsRepoConfigSync(repoPath: string): boolean;
export declare function _readRepoConfigFile<T extends IRepoConfig>(file: string): Promise<T>;
export declare function _readRepoConfigFileSync<T extends IRepoConfig>(file: string): T;
export declare function _writeRepoConfigFile<T extends IRepoConfig>(file: string, config: T): Promise<void>;
export declare function _writeRepoConfigFileSync<T extends IRepoConfig>(file: string, config: T): void;
export declare function readRepoConfig<T extends IRepoConfig>(repoPath: string): Promise<T>;
export declare function readRepoConfigSync<T extends IRepoConfig>(repoPath: string): T;
export declare function writeRepoConfig<T extends IRepoConfig>(repoPath: string, config: T): Promise<void>;
export declare function writeRepoConfigSync<T extends IRepoConfig>(repoPath: string, config: T): void;
