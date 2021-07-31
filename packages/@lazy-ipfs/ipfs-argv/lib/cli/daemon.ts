export interface ISharedOptionsAndArgv
{
	argv?: string[],

	silent?: boolean,
	offline?: boolean,
	pass?: string,
}

export interface IDaemonOptions extends ISharedOptionsAndArgv
{

	repo?: string,
	repoAutoMigrate?: boolean,

	preload?: {
		enabled?: boolean,
	},

	EXPERIMENTAL?: {
		ipnsPubsub?: boolean,
		sharding?: boolean,
	},

	init?: boolean | {
		profiles?: boolean,
	},

}

export interface IDaemonArgv extends ISharedOptionsAndArgv
{

	migrate?: boolean,

	enablePreload?: boolean,
	enableShardingExperiment?: boolean,
	enableNamesysPubsub?: boolean,

	initProfile?: boolean,

}

export const _OptionsAndArgvKeyMap: readonly [ipfsOptionsKey: string, argvOptionsKey: string][] = [
	['silent', 'silent'],
	['repoAutoMigrate', 'migrate'],
	['offline', 'offline'],
	['pass', 'pass'],
	['argv', 'argv'],
];

/**
 * @see https://github.com/ipfs/js-ipfs/blob/63d4d353c606e4fd487811d8a0014bb2173f11be/packages/ipfs/src/cli/commands/daemon.js#L48
 */
export function argv2opts<T extends IDaemonOptions>(argvOptions: IDaemonArgv, ipfsOptions: T = {} as T)
{

	_OptionsAndArgvKeyMap
		.forEach(([ipfsOptionsKey, argvOptionsKey]) =>
		{
			ipfsOptions[ipfsOptionsKey] = argvOptions[argvOptionsKey] ?? ipfsOptions[ipfsOptionsKey];
		})
	;

	ipfsOptions.preload = argvOptions.enablePreload ? {
		enabled: argvOptions.enablePreload,
	} : ipfsOptions.preload;

	ipfsOptions.EXPERIMENTAL ??= {};
	ipfsOptions.EXPERIMENTAL.ipnsPubsub = argvOptions.enableNamesysPubsub ?? ipfsOptions.EXPERIMENTAL.ipnsPubsub;
	ipfsOptions.EXPERIMENTAL.sharding = argvOptions.enableShardingExperiment ?? ipfsOptions.EXPERIMENTAL.sharding;

	/*
	ipfsOptions.init = argvOptions.initProfile ? {
		profiles: argvOptions.initProfile,
	} : (ipfsOptions.init ?? true);
	 */

	return ipfsOptions
}

export function opts2argv<T extends IDaemonArgv>(ipfsOptions: IDaemonOptions, argvOptions: T = {} as T)
{
	_OptionsAndArgvKeyMap
		.forEach(([ipfsOptionsKey, argvOptionsKey]) =>
		{
			argvOptions[ipfsOptionsKey] = ipfsOptions[argvOptionsKey] ?? argvOptions[ipfsOptionsKey];
		})
	;

	argvOptions.enablePreload = ipfsOptions.preload?.enabled ?? argvOptions.enablePreload;

	argvOptions.enableNamesysPubsub = ipfsOptions.EXPERIMENTAL?.ipnsPubsub ?? argvOptions.enableNamesysPubsub;

	argvOptions.enableShardingExperiment = ipfsOptions.EXPERIMENTAL?.sharding ?? argvOptions.enableShardingExperiment;

	/*
		if (!isNullOrUndefined(ipfsOptions.init))
		{
			if (typeof ipfsOptions.init === 'boolean')
			{
				argvOptions.initProfile = ipfsOptions.init;
			}
			else if (typeof ipfsOptions.init.profiles === 'boolean')
			{
				argvOptions.initProfile = ipfsOptions.init.profiles
			}
		}
	 */

	return argvOptions
}

export function opts2cli(ipfsOptions: IDaemonOptions)
{
	return argv2cli(opts2argv(ipfsOptions))
}

export function argv2cli(argvOptions: IDaemonArgv)
{
	let args = [] as any[];

	if (argvOptions.argv?.length)
	{
		args.push(...argvOptions.argv);
	}

	if (argvOptions.pass)
	{
		args.push('--pass', argvOptions.pass)
	}

	if (argvOptions.offline)
	{
		args.push('--offline')
	}

	if (typeof argvOptions.enablePreload === 'boolean')
	{
		args.push('--enable-preload', argvOptions.enablePreload)
	}

	if (argvOptions.enableShardingExperiment)
	{
		args.push('--enable-sharding-experiment')
	}

	if (argvOptions.enableNamesysPubsub)
	{
		args.push('--enable-namesys-pubsub')
	}

	if (argvOptions.migrate)
	{
		args.push('--migrate')
	}

	return args as string[]
}

