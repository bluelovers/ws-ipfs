import useIPFS, { ICachedObject } from 'use-ipfs';
import ipfsServerList from 'ipfs-server-list';
import { IIPFSPromiseApi } from 'ipfs-types/lib/ipfs/index';
import checkAll from '../index';
import { inspect } from 'util';

inspect.defaultOptions.colors = true;
inspect.defaultOptions.depth = 5;

useIPFS({
	disposable: true,
}, {
	//serverAddr: ipfsServerList['infura.io'].API,
	//skipCheck: true,
})
	.then(async ({
		ipfs,
		ipfsType,
		stop,
		ipfsd,
	}: ICachedObject<IIPFSPromiseApi>) => {

		console.log(`[ipfsType]`, ipfsType)
		console.log(`[ipfsd.path]`, ipfsd?.path)

		console.dir(await checkAll(ipfs))

		console.log(await ipfs.id().catch(err => String(err)))

		return stop();
	})
;
