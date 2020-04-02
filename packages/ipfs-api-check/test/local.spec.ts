/**
 * Created by user on 2020/4/1.
 */

import useIPFS, { ICachedObject } from 'use-ipfs';
import { IIPFSPromiseApi } from 'ipfs-types';
import checkAll from '../index';

it('check local', async () =>
{
	return useIPFS({
		disposable: true,
	})
		.then(async ({
			ipfs,
			ipfsType,
			stop,
			ipfsd,
		}: ICachedObject<IIPFSPromiseApi>) => {

			let ret = await checkAll(ipfs)

			expect(ret).toMatchSnapshot();

			return stop();
		})
	;
});
