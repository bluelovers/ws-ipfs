import { createController } from 'ipfsd-ctl';
import { checkForRunningApi } from 'ipfsd-ctl/src/utils';
import IpfsClient from 'ipfs-http-client';
import { IOptions } from './types';
import { fixIPFSOptions } from './util/ipfsd';
import { checkIPFS } from 'ipfs-util-lib';
import createDefaultAddresses, { getDefaultAddressesPorts, IPort } from 'ipfs-defaults/addresses';
import getPort from 'get-port';
import defaultsDeep from 'lodash/defaultsDeep';
// @ts-ignore
import findFreePort from 'find-free-port-sync-fixed';
import { unlinkIPFSApi } from 'fix-ipfs/lib/ipfsd-ctl/unlinkIPFSApi';
import { getCreateClientFn } from '@bluelovers/ipfs-http-client/core';

const usedPort = new Set<number>();

export async function getPort2(options: {
	port: number
})
{
	let port: number = await findFreePort({
		start: options.port,
	});

	let start = port;

	while (usedPort.has(port))
	{
		start += 100;
		port = await findFreePort({
			start,
		})
	}

	usedPort.add(port);

	return port
}

export async function startIPFS(options?: IOptions)
{
	options = fixIPFSOptions(options);

	if (options?.disposable)
	{
		let ports = getDefaultAddressesPorts({}, options.type);

		let Swarm2 = 0;

		/*
		Swarm2 = await getPort2({ port: ports.Swarm2 as number });

		if (Swarm2 != ports.Swarm2)
		{
			Swarm2 = 10000;
		}
		else
		{
			Swarm2 = 0;
		}

		 */

		ports.Swarm = await getPort2({ port: ports.Swarm as number + Swarm2 });

		ports.Swarm2 = await getPort2({ port: ports.Swarm2 as number + Swarm2 });

		ports.API = await getPort2({ port: ports.API as number + Swarm2 });
		ports.Gateway = await getPort2({ port: ports.Gateway as number + Swarm2 });

		//console.dir(ports)

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
			ipfs = await getCreateClientFn(IpfsClient)(addr);
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
