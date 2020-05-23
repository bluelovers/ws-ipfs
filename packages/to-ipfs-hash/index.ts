import { of as hashOf } from 'ipfs-only-hash';

export interface IOptions
{

}

export function ipfsHash(input: Buffer | string | AsyncIterable<Buffer>, options?: IOptions): Promise<string>
{
	return hashOf(input, options)
}

export default ipfsHash
