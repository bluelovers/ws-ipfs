/// <reference types="node" />
import { Stats } from "fs";
export declare function _assertIsFile(api: string, stat: Stats): void;
export declare function _pathIpfsRunningApi(ipfsPath: string): string;
export declare function unlinkIPFSApi(ipfsPath: string): void;
export declare function unlinkIPFSApiAsync(ipfsPath: string): Promise<void>;
