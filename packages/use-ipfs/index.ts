import IpfsClient from '@bluelovers/ipfs-http-client';
import { createController } from 'ipfsd-ctl';
import defaultsDeep from 'lodash.defaultsdeep';

export enum EnumIPFSType
{
	Unknown,
	Client,
	Controller,
}

/**
 * check ipfs is work
 */
export async function checkIPFS(ipfs)
{
	await ipfs.id();

	return true
}

let _cached: Readonly<{
	ipfs,
	ipfsType: EnumIPFSType,
	stop(...argv): Promise<void>,
}>;

/**
 * get IPFS, if not exists, create or connect it
 */
export async function useIPFS(options?: IOptions)
{
	if (typeof _cached === 'undefined' || typeof _cached === null)
	{
		let ret = await getIPFS(options);
		//console.dir({ ipfs, ipfsType })
		let { stop: closeFnOld, ipfs } = ret;

		await checkIPFS(ipfs)
			.catch(async (e) => {
				await closeFnOld().catch(e => null);
				return Promise.reject(e);
			})
		;

		let bool = true;

		const stop = (...argv) => {
			return bool && closeFnOld(...argv)
				.then(() =>
				{
					bool = void 0;
					if (_cached && _cached.ipfs === ipfs)
					{
						_cached = void 0;
					}
					ipfs = void 0;
					closeFnOld = void 0;
					//console.debug(`reset _cached => null`)
				})
		};

		_cached = Object.freeze({
			...ret,
			stop,
		});

		ret = void 0;
	}

	return _cached
}

export interface IOptions extends Record<string, any>
{
	type?: string;
	ipfsModule?: any;
	ipfsHttpModule?: any;
	ipfsBin?: string;
	ipfsOptions?: {
		EXPERIMENTAL?: {
			pubsub?: boolean;
			ipnsPubsub?: boolean;
			sharding?: boolean;
			dht?: boolean;
		};
		relay?: {
			enabled?: boolean;
			hop?: {
				enabled?: boolean;
			};
		};
	};
	disposable?: boolean;
}

export function fixIPFSOptions(options?: IOptions)
{
	options = defaultsDeep({}, options, {
		type: 'js',
		//ipfsModule: require('ipfs'),
		//ipfsHttpModule: require('ipfs-http-client'),
		//ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
		ipfsOptions: {
			EXPERIMENTAL: {
				pubsub: true,
				ipnsPubsub: true,
				sharding: true,
				dht: true,
			},
			relay: {
				enabled: true,
				hop: {
					enabled: true
				}
			},
		},
		disposable: false,
	});

	if (options.type ==='js' || options.type ==='proc')
	{
		if (typeof options.ipfsModule === 'undefined')
		{
			options.ipfsModule = require('ipfs')
		}
		if (typeof options.ipfsHttpModule === 'undefined')
		{
			options.ipfsHttpModule = require('ipfs-http-client')
		}
		if (typeof options.ipfsBin === 'undefined')
		{
			options.ipfsBin = require.resolve('ipfs/src/cli/bin.js')
		}
	}

	return options;
}

/**
 * create or connect it
 */
export async function getIPFS(options?: IOptions)
{
	return new Promise<typeof _cached>(async (resolve, reject) => {
		let ipfs;
		let ipfsd;
		let ipfsType: EnumIPFSType = EnumIPFSType.Unknown;

		try
		{
			ipfs = await IpfsClient();
			await checkIPFS(ipfs);
			ipfsType = EnumIPFSType.Client;
		}
		catch (e)
		{
			//console.error(e)
			try
			{
				ipfsd = await createController(fixIPFSOptions(options));

				!ipfsd.started && await ipfsd.start();
				ipfs = ipfsd.api;
				await checkIPFS(ipfs);

				ipfsType = EnumIPFSType.Controller;
			}
			catch (e)
			{
				//console.error(e)
				await stop();

				return reject(e)
			}
		}

		async function stop()
		{
			try
			{
				ipfsd && await ipfsd.stop();
				ipfs && await ipfs.stop();
				//console.debug(`ipfs closed`)
			}
			catch (e)
			{

			}
		}

		process.once('SIGINT', (...argv) => {
			//console.debug('[SIGINT]', 'shutting down...', argv);
			return stop()
		});

		process.once('SIGTERM', (...argv) => {
			//console.debug('[SIGTERM]', 'shutting down...', argv);
			return stop()
		});

		process.once('exit', (...argv) => {
			//console.debug('[exit]', 'shutting down...', argv);
			return stop()
		});

		resolve({
			ipfs,
			ipfsType,
			stop,
		})
	});
}

export default useIPFS
