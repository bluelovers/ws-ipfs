/**
 * Created by user on 2020/3/25.
 */
/// <reference types="node" />
import { StatsBase } from "fs";
export interface IGlobSourceOptions {
    /**
     * Recursively glob all paths in directories
     */
    recursive?: boolean;
    /**
     * Include .dot files in matched paths
     */
    hidden?: boolean;
    /**
     * Glob paths to ignore
     */
    ignore?: string[];
    /**
     * follow symlinks
     */
    followSymlinks?: boolean;
    /**
     * preserve mode
     */
    preserveMode?: boolean;
    /**
     * preserve mtime
     */
    preserveMtime?: boolean;
    /**
     * mode to use - if preserveMode is true this will be ignored
     */
    mode?: StatsBase<any>["mode"];
    /**
     * mtime to use - if preserveMtime is true this will be ignored
     */
    mtime?: StatsBase<any>["mtime"];
}
