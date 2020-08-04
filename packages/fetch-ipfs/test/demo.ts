/**
 * Created by user on 2020/2/21.
 */
import { outputFile } from 'fs-extra';
import fetchIPFS from 'fetch-ipfs';
import { statSync } from 'fs';
import { publishToIPFSAll } from '../lib/put/all';
import { filterList } from 'ipfs-server-list';

console.log(`fs.stat`, statSync('./temp/111.png').size)

fetchIPFS(`QmdPAhQRxrDKqkGPvQzBvjYe3kU8kiEEAd2J6ETEamKAD9`)
	.then(async (buf) => {

		console.log(`fetch ipfs cid`, buf.length, `QmdPAhQRxrDKqkGPvQzBvjYe3kU8kiEEAd2J6ETEamKAD9`)

		await publishToIPFSAll(buf, [
			...filterList('API'),
		])
			.then(result => {
				console.log(`add to ipfs again`, result[0].value[0].size, result[0].value[0].cid.toString());
			})
		;

		return outputFile('./temp/111.png', buf)
	})
	.catch(e => console.trace(e))
;
