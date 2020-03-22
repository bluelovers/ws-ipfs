import { IIPFSNameApi } from 'ipfs-types/lib/ipfs/name';
import { runSubCheck } from '../util';
import { IIPFSKeyApi } from 'ipfs-types/lib/ipfs/key';

export async function key(ipfs: IIPFSKeyApi)
{
	const name = 'my-key';
	const name_new = name + '_new';

	let gen = await runSubCheck(async () =>
	{
		const result = await ipfs.key.gen(name, {
			type: 'rsa',
			size: 2048,
		})

		//console.dir(result)

		return result.name === name
	});

	let list = await runSubCheck(async () =>
	{
		const result = await ipfs.key.list()

		//console.dir(result)

		return typeof result.length === 'number'
	});

	let rm = await runSubCheck(async () =>
	{
		const result = await ipfs.key.rm(name)

		//console.dir(result)

		return result.name === name
	});

	let rename = await runSubCheck(async () =>
	{
		const result = await ipfs.key.rename(name, name_new)

		//console.dir(result)

		return result.was === name
			&& result.now === name_new
	});

	let keyExport = await runSubCheck(async () =>
	{
		const result = await ipfs.key.export(name, name_new)

		//console.dir(result)

		return result.length
	});

	let keyImport = await runSubCheck(async () =>
	{
		const result = await ipfs.key.import('clone', 'password')

		//console.dir(result)

		return result.name === 'clone'
	});

	return {
		gen,
		list,
		rm,
		rename,
		export: keyExport,
		import: keyImport,
	}
}

export default key
