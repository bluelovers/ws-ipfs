
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
}

export interface IIPFSEnvRuntime extends IIPFSEnv
{
	[key: string]: string
}

let process = void 0

export function ipfsEnv(env?: Record<any, any>): IIPFSEnvRuntime
{
	env = env ?? (typeof process !== 'undefined' && process?.env) ?? {};

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
