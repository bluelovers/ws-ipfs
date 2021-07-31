import { ICIDValue } from '@lazy-ipfs/detect-cid-lib/lib/types';

export function cidStartAndEnd(value: string, sep: string = '…')
{
	const chars = value.split('');

	if (chars.length <= 9) throw new TypeError(`cid.length < 9`)

	const start = chars.slice(0, 4).join('');
	const end = chars.slice(chars.length - 4).join('');

	return {
		value,

		start,
		end,

		sep,

	}
}

export function cidEllipsis(value: ICIDValue, sep?: string)
{
	let result = cidStartAndEnd(value?.toString(), sep);

	return `${result.start}${result.sep}${result.end}`
}

export default cidEllipsis
