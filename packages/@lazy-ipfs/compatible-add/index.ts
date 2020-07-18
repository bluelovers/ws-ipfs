
export function addAll(ipfs, ...argv)
{
	return (ipfs.addAll ?? ipfs.add)(...argv)
}

export default addAll
