
export interface IIPFSEnv
{
	IPFS_ADDRESSES_API?: string;
	IPFS_PATH?: string;

	/**
	 * @see https://github.com/ipfs/js-ipfsd-ctl#ipfs_js_exec-and-ipfs_go_exec
	 */
	IPFS_JS_EXEC?: string;
	/**
	 * @see https://github.com/ipfs/js-ipfsd-ctl#ipfs_js_exec-and-ipfs_go_exec
	 */
	IPFS_GO_EXEC?: string;

	/**
	 * @see https://github.com/ipfs/js-ipfs/blob/master/packages/ipfs/src/cli/daemon.js
	 */
	IPFS_MONITORING?: string;

	/**
	 * @see https://github.com/ipfs/npm-go-ipfs/blob/3fd83aa6f42521410908bae5f6d2f32e8ac2fba5/src/download.js#L32
	 */
	NPM_GO_IPFS_CACHE?: string;
}

declare global
{
	namespace NodeJS
	{
		interface ProcessEnv extends IIPFSEnv
		{

		}
	}
}

export interface IIPFSEnvRuntime extends IIPFSEnv
{
	[key: string]: string
}

export function ipfsEnv(env?: Record<any, any>): IIPFSEnvRuntime
{
	env ??= (typeof process !== 'undefined' && process?.env) ?? {};

	return Object.entries(env as IIPFSEnvRuntime)
		.reduce((a, [k, v]) =>
		{

			if (k.startsWith('IPFS_'))
			{
				a[k] = v;
			}

			return a
		}, {} as IIPFSEnvRuntime)
	;
}

export default ipfsEnv
