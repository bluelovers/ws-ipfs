/**
 * Created by user on 2020/2/21.
 */
import { outputFile } from 'fs-extra';
import fetchIPFS from '../index';

fetchIPFS(`/ipfs/Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`)
	.then(buf => outputFile('./temp/1.png', buf))
;
