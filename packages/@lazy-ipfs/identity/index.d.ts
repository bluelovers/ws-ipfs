import { IRepoConfig } from '@lazy-ipfs/repo-config/index';
export interface IRepoIdentity {
    PeerID: string;
    PrivKey: string;
}
export declare function recommendIdentityFilename(): ".identity.json";
export declare function getIdentityPath(targetPath: string): string;
export declare function existsIdentityPath(targetPath: string): Promise<boolean>;
export declare function existsIdentityPathSync(targetPath: string): boolean;
export declare function getIdentityFromConfig(config: any): IRepoIdentity;
export declare function assertIdentity(Identity: IRepoIdentity): asserts Identity is IRepoIdentity;
export declare function setIdentityToConfig<T extends IRepoConfig>(config: T, Identity: IRepoIdentity): T & {
    Identity: IRepoIdentity;
};
export declare function readIdentityFile(file: string): Promise<IRepoIdentity>;
export declare function readIdentityFileSync(file: string): IRepoIdentity;
export declare function writeIdentityFile(file: string, Identity: IRepoIdentity): Promise<void>;
export declare function writeIdentityFileSync(file: string, Identity: IRepoIdentity): void;
export declare function readIdentityFromRepoConfig(repoPath: string): Promise<IRepoIdentity>;
export declare function readIdentityFromRepoConfigSync(repoPath: string): IRepoIdentity;
export declare function setIdentityToRepoConfig(repoPath: string, Identity: IRepoIdentity): Promise<void>;
export declare function setIdentityToRepoConfigSync(repoPath: string, Identity: IRepoIdentity): void;
/**
 * file path of .identity.json
 */
export declare function backupIdentityFromRepoToFile(repoPath: string, file: string): Promise<void>;
/**
 * file path of .identity.json
 */
export declare function backupIdentityFromRepoToFileSync(repoPath: string, file: string): void;
/**
 * targetPath for save .identity.json
 */
export declare function backupIdentityFromRepoToPath(repoPath: string, targetPath: string): Promise<void>;
/**
 * targetPath for save .identity.json
 */
export declare function backupIdentityFromRepoToPathSync(repoPath: string, targetPath: string): void;
