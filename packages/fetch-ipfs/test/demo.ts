/**
 * Created by user on 2020/2/21.
 */
import { outputFile } from 'fs-extra';
import fetchIPFS from 'fetch-ipfs';

fetchIPFS(`QmdPAhQRxrDKqkGPvQzBvjYe3kU8kiEEAd2J6ETEamKAD9`)
	.then(buf => outputFile('./temp/111.png', buf))
	.catch(e => console.trace(e))
;
