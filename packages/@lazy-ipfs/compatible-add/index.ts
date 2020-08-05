import last from 'it-last';

export function addAll<T>(ipfs, ...argv): Promise<T[]>
{
	return (ipfs.addAll ?? ipfs.add)(...argv)
}

export function add<T>(ipfs, ...argv): Promise<T>
{
	return last(addAll(ipfs, ...argv))
}

export default addAll
