/**
 * Created by user on 2020/4/1.
 */

import useIPFS, { ICachedObject } from 'use-ipfs';
import { IIPFSPromiseApi } from 'ipfs-types';
import checkAll from '../index';
import { jest } from '@jest/globals'

jest.setTimeout(1000 * 60 * 20);

let _stop;

afterEach(() => {
	_stop?.();
	_stop = undefined;
});

it('check local', async (done) =>
{
	await useIPFS({
		disposable: true,
	})
		.then(async ({
			ipfs,
			ipfsType,
			stop,
			ipfsd,
		}: ICachedObject<IIPFSPromiseApi>) =>
		{
			_stop = stop;

			let ret = await checkAll(ipfs)

			function testCheck(obj)
			{
				if ('success' in obj)
				{
					expect(obj).toMatchObject({
						spendTime: expect.any(Number),
						success: expect.any(Boolean),
					});
				}
				else
				{
					Object.keys(obj)
						.forEach(key =>
						{
							testCheck(obj[key])
						})
					;
				}
			}

			testCheck(ret);

			return stop();
		})
		.then(done)
		.catch(done)
	;
});
