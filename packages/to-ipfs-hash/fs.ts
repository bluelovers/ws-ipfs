/**
 * Created by user on 2020/2/21.
 */

import { readFile } from 'fs-extra';
import ipfsHash, { IOptions } from './index';

export function fromFile(file: string | Buffer | number, options?: IOptions)
{
	return readFile(file).then(buf => ipfsHash(buf, options))
}

export default fromFile
