/**
 * Created by user on 2020/3/24.
 */

import { readFile } from 'fs-extra';
import { filterList } from 'ipfs-server-list';
import { inspect } from 'util';
import publishToIPFSRace from '../lib/put/race';

readFile(`./res/demo.png`)
	.then((data) =>
	{
		return publishToIPFSRace(data, [
			...filterList('API'),
		])
	})
	.then(data =>
	{
		console.dir(data, {
			colors: true,
			depth: 3,
		})
	})
;

