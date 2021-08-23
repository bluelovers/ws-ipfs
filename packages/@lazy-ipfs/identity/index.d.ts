export interface IRepoIdentity {
    PeerID: string;
    PrivKey: string;
}
export declare function recommendIdentityFilename(): ".identity.json";
export declare function getIdentityPath(targetPath: string): string;
export declare function getIdentityFromConfig(config: any): IRepoIdentity;
export declare function setIdentityToConfig<T>(config: T, Identity: IRepoIdentity): T & {
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
