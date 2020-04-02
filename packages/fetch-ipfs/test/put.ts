/**
 * Created by user on 2020/3/24.
 */

import { publishToIPFSAll } from '../put';
import { readFile } from 'fs-extra';
import { filterList } from 'ipfs-server-list';
import { inspect } from 'util';

readFile(`D:\\Users\\Downloads\\下載圖\\Screenshots\\ShareX_2020-03-24-12-21-16-193.png`)
	.then((data) => {
		return publishToIPFSAll(data, [
			...filterList('API'),
		])
	})
	.then(data => {
		console.dir(data, {
			colors: true,
			depth: 3,
		})
	})
;

