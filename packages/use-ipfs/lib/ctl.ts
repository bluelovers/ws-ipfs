import { createController } from 'ipfsd-ctl';
import { checkForRunningApi } from 'ipfsd-ctl/src/utils';
import IpfsClient from 'ipfs-http-client';
import { unlinkIPFSApi } from './util/fs';
import { IOptions } from './types';
import { fixIPFSOptions } from './util/ipfsd';
import { checkIPFS } from 'ipfs-util-lib';
import createDefaultAddresses, { getDefaultAddressesPorts } from 'ipfs-defaults/addresses';
import getPort from 'get-port';
import defaultsDeep from 'lodash/defaultsDeep';

export async function startIPFS(options?: IOptions)
{
	options = fixIPFSOptions(options);

	if (options?.disposable)
	{
		let ports = getDefaultAddressesPorts({}, options.type);

		ports.Swarm = await getPort({port: ports.Swarm as number});
		ports.Swarm2 = await getPort({port: ports.Swarm2 as number});
		ports.API = await getPort({port: ports.API as number});
		ports.Gateway = await getPort({port: ports.Gateway as number});

		options.ipfsOptions.config = defaultsDeep(options.ipfsOptions.config, {
			Addresses: {
				...createDefaultAddresses(ports, options.type),
			},
		})
	}

	let ipfsd = await createController(options);

	let addr = await checkForRunningApi(ipfsd.path);
	if (addr)
	{
		let ipfs;
		try
		{
			ipfs = await IpfsClient(addr);
			await checkIPFS(ipfs);
		}
		catch (e)
		{
			try
			{
				await ipfs.stop();
			}
			catch (e)
			{}

			await unlinkIPFSApi(ipfsd.path);
		}
		finally
		{
			try
			{
				//await ipfs.stop();
			}
			catch (e)
			{}

			ipfs = void 0;
		}
	}

	!ipfsd.initialized && await ipfsd.init();
	!ipfsd.started && await ipfsd.start();

	await checkIPFS(ipfsd.api);

	return ipfsd
}

export default startIPFS
