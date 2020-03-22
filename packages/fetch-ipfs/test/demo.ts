/**
 * Created by user on 2020/2/21.
 */
import { outputFile } from 'fs-extra';
import fetchIPFS from 'fetch-ipfs';

fetchIPFS(`Qmdbkxdh8tUA7zcnmcU6Nu7B7bNtubYTBjUHes799tgu83`)
	.then(buf => outputFile('./temp/111.png', buf))
	.catch(e => console.trace(e))
;
