/**
 * Created by user on 2020/2/21.
 */

import useIPFS from 'use-ipfs';
import { BufferStream } from "scramjet";
import Bluebird from 'bluebird';
import { createWriteStream } from 'fs';
import catIPFS from '../ipfs';
import { outputFile } from 'fs-extra';

useIPFS({
	//disposable: true,
})
	.then(async ({
		ipfs,
		stop,
	}) =>
	{

		let cid = `Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`;
		let timeout = 60 * 1000;

		await catIPFS(cid, ipfs, timeout)
			.then(buf => outputFile('./temp/temp001.png', buf))
			.catch(e => console.error(e))
		;

		return Bluebird.resolve()
			.then(v => BufferStream.from(async function* ()
			{
				console.log(222) // should print 222, but nothing
				for await (const chunk of ipfs.cat(cid, { timeout }))
				{
					console.log(chunk.length); // should print, but nothing
					yield chunk
				}
			}, createWriteStream('./temp/temp3.png')))
			.tapCatch(e => console.error(e))
			.finally(() =>
			{
				console.log(777) // only see 777
				return stop()
			})
	})
;

