import IpfsClient, {
	IIPFSClientAddresses,
	IIPFSClientParameters,
	IIPFSClientReturn,
} from '@bluelovers/ipfs-http-client';
import { some } from '@bluelovers/ipfs-http-client/core';
import startIPFS from './lib/ctl';
import cloneDeep from 'lodash/cloneDeep';
import { checkIPFS, ipfsAddresses } from './lib/util';
import { EnumIPFSType, IOptions, IOptionsExtra } from './lib/types';
import _ipfsHttpModule from 'ipfs-http-client'
import { IIPFSAddresses } from 'ipfs-types';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';

export type ICachedObject<IPFS = IIPFSClientReturn> = Readonly<{
	ipfs: IPFS,
	ipfsType: EnumIPFSType,
	stop(...argv): Promise<void>,
	address(): Promise<Readonly<IIPFSAddresses>>,
	/**
	 * ipfsd-ctl
	 */
	ipfsd,
}>;

let _cached: ICachedObject<IIPFSClientReturn>;

/**
 * get IPFS, if not exists, create or connect it
 */
export async function useIPFS<IPFS = IIPFSClientReturn>(options?: IOptions, optionsExtra: IOptionsExtra = {})
{
	if (typeof _cached === 'undefined' || typeof _cached === null)
	{
		let ret = await getIPFS(options, optionsExtra);
		//console.dir({ ipfs, ipfsType })
		let { stop: closeFnOld, ipfs } = ret;

		await checkIPFS(ipfs)
			.catch(async (e) =>
			{
				if (optionsExtra?.skipCheck)
				{
					e && console.warn(`[checkIPFS]`, String(e))
				}
				else
				{
					await closeFnOld().catch(e => null);
					return Promise.reject(e);
				}
			})
		;

		let bool = true;

		const stop = (...argv) =>
		{
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

	return _cached as ICachedObject<IPFS>
}

/**
 * create or connect it
 */
export async function getIPFS<IPFS = IIPFSClientReturn>(options?: IOptions, optionsExtra: IOptionsExtra = {})
{
	return new Promise<ICachedObject<IPFS>>(async (resolve, reject) =>
	{
		let ipfs: IIPFSClientReturn;
		let ipfsd;
		let ipfsType: EnumIPFSType = EnumIPFSType.Unknown;

		await (async () =>
		{
			let fallbackServerArgvs: IIPFSClientParameters;

			if (typeof optionsExtra.fallbackServer !== 'undefined')
			{
				let fallbackServer = optionsExtra.fallbackServer;

				fallbackServerArgvs = [fallbackServer]
			}

			try
			{
				ipfs = await IpfsClient(optionsExtra?.serverAddr);
				if (!(optionsExtra?.skipCheck && optionsExtra?.serverAddr))
				{
					await checkIPFS(ipfs)
				}
				ipfsType = EnumIPFSType.Client;
			}
			catch (e)
			{
				if (optionsExtra.useFallbackFirst && fallbackServerArgvs && fallbackServerArgvs.length)
				{
					ipfs = await some(_ipfsHttpModule, [fallbackServerArgvs], true)
						.then(ipfs =>
						{
							//checkIPFS(ipfs);
							ipfsType = EnumIPFSType.ClientFallback;
							return ipfs;
						})
						.catch(e => null)
					;

					if (ipfs)
					{
						return;
					}
				}

				//console.error(e)
				try
				{
					ipfsd = await startIPFS(options);
					ipfs = ipfsd.api;
					await checkIPFS(ipfs);
					ipfsType = EnumIPFSType.Controller;
				}
				catch (e)
				{
					await stop(true);

					if (fallbackServerArgvs && fallbackServerArgvs.length)
					{
						ipfsd = undefined;

						ipfs = await some(_ipfsHttpModule, [fallbackServerArgvs], true)
							.then(ipfs =>
							{
								//checkIPFS(ipfs);
								ipfsType = EnumIPFSType.ClientFallback;
								return ipfs;
							})
						;

						if (ipfs)
						{
							return;
						}
					}
					else
					{
						console.error(e);
					}

					return reject(e)
				}
			}
		})();

		let { skipClose } = optionsExtra;

		async function stop(force?: boolean)
		{
			if (force || ipfsd && !skipClose)
			{
				try
				{
					await ipfsd.clean();
				}
				catch (e)
				{

				}
				try
				{
					await ipfsd.stop();
				}
				catch (e)
				{

				}

				try
				{
					ipfs && await ipfs.stop();
				}
				catch (e)
				{

				}
			}
		}

		process.once('SIGINT', (...argv) =>
		{
			//console.debug('[SIGINT]', 'shutting down...', argv);
			return stop()
		});

		process.once('SIGTERM', (...argv) =>
		{
			//console.debug('[SIGTERM]', 'shutting down...', argv);
			return stop()
		});

		process.once('exit', (...argv) =>
		{
			//console.debug('[exit]', 'shutting down...', argv);
			return stop()
		});

		resolve({
			ipfs,
			ipfsType,
			stop,
			async address()
			{
				let addr = await ipfsAddresses(ipfs);
				return cloneDeep(addr)
			},
			get ipfsd()
			{
				return ipfsd
			},
		})
	});
}

export default useIPFS
