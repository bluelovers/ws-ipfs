import Daemon from 'ipfs/src/cli/daemon';
import ipfsEnv from 'ipfs-env';

export interface IOptions
{
	initConfig?: Record<any, any>,
	initProfile?: Record<any, any>,
	daemonOptions?: Partial<IIPFSDaemonOptions>,

	enablePubsub?: boolean,
	enableNamesysPubsub?: boolean,
	enableDhtExperiment?: boolean,
	enableShardingExperiment?: boolean,
	enablePreload?: boolean,
	migrate?: boolean,

	/**
	 * `.jsipfs`
	 */
	repoPath?: string,

	disposable?: boolean;
}

export interface IIPFSDaemonOptions
{
	config,
	silent?: boolean,
	repo: string,
	repoAutoMigrate?: boolean,
	offline?: boolean,
	pass?,
	preload?: { enabled?: boolean, },
	EXPERIMENTAL: {
		pubsub?,
		ipnsPubsub?,
		dht?,
		sharding?
		[k: string]: any,
	},
	init: { profiles? } | boolean
}

export type IIPFSDaemon = Daemon;

export function getIPFSDaemonOptions(options?: IOptions)
{
	options = options || {};
	let { daemonOptions = {} as IIPFSDaemonOptions } = options;

	let repo: string;
	if (options.disposable)
	{

	}
	else
	{
		repo = options.repoPath ?? ipfsEnv().IPFS_PATH;
	}

	daemonOptions = {
		preload: { enabled: options?.enablePreload ?? true },
		init: options.initProfile ? { profiles: options.initProfile } : daemonOptions.init ?? true,

		...daemonOptions,

		config: options.initConfig ?? daemonOptions.config,
		repo,

		repoAutoMigrate: options.migrate ?? daemonOptions.repoAutoMigrate ?? true,

		EXPERIMENTAL: {
			...daemonOptions.EXPERIMENTAL,
			pubsub: options.enablePubsub ?? daemonOptions.EXPERIMENTAL?.pubsub ?? true,
			ipnsPubsub: options.enableNamesysPubsub ?? daemonOptions.EXPERIMENTAL?.ipnsPubsub ?? true,
			dht: options.enableDhtExperiment ?? daemonOptions.EXPERIMENTAL?.dht ?? true,
			sharding: options?.enableShardingExperiment ?? daemonOptions.EXPERIMENTAL?.sharding ?? true,
		},

	}

	return daemonOptions
}

/**
 * start js ipfs daemon
 */
export function startIPFSDaemon(options?: IOptions): IIPFSDaemon
{
	const daemonOptions = getIPFSDaemonOptions(options);
	const daemon = new Daemon(daemonOptions)

	return daemon
}

export default startIPFSDaemon
