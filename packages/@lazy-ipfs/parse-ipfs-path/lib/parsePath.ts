import isValidDomain from 'is-valid-domain';
import CID from 'cids';
import { isCID, toCID } from '@lazy-ipfs/to-cid';

export const enum EnumParsePathResultNs
{
	'ipfs' = 'ipfs',
	'ipns' = 'ipns',
}

export interface IParsePathResult
{
	ns: 'ipfs' | 'ipns' | EnumParsePathResultNs;
	hash: string;
	path: string;

	toString(): string;

	toJSON(): string;
}

/**
 * @see https://github.com/tableflip/dweb-path
 */
export function parsePath(input: string | Buffer | CID)
{
	let ns: string, hash: string, path: string

	if (Buffer.isBuffer(input) || isCID(input))
	{
		hash = toCID(input).toBaseEncodedString()

		ns = EnumParsePathResultNs.ipfs
		path = ''
	}
	else if (typeof input === 'string' || Object.prototype.toString.call(input) === '[object String]')
	{
		// Ensure leading slash
		if (input[0] !== '/')
		{
			input = `/${input}`
		}

		// Remove trailing slash
		if (input[input.length - 1] === '/')
		{
			input = input.slice(0, -1)
		}

		const parts = input.split('/')

		if (parts[1] === EnumParsePathResultNs.ipfs || parts[1] === EnumParsePathResultNs.ipns)
		{
			try
			{
				hash = strToCidToStr(parts[2])
			}
			catch (err)
			{
				// If IPNS then this could be a domain name
				if (parts[1] === EnumParsePathResultNs.ipns && isValidDomain(parts[2]))
				{
					hash = parts[2]
				}
				else
				{
					throw err
				}
			}

			ns = parts[1]
			path = parts.slice(3).join('/')
		}
		else
		{
			// Is parts[1] a CID?
			try
			{
				hash = strToCidToStr(parts[1])
			}
			catch (err)
			{
				throw new Error(`Unknown namespace: ${parts[1]}`)
			}

			ns = EnumParsePathResultNs.ipfs
			path = parts.slice(2).join('/')
		}

		// Ensure leading slash on non empty path
		if (path.length)
		{
			path = `/${path}`
		}
	}
	else
	{
		throw new Error('Invalid path') // What even is this?
	}

	const toString = () => `/${ns}/${hash}${path}`

	return Object.defineProperties({} as IParsePathResult, {
		ns: { value: ns, enumerable: true },
		hash: { value: hash, enumerable: true },
		path: { value: path, enumerable: true },
		toString: { value: toString },
		toJSON: { value: toString },
	})
}

export function resultToPath(result: IParsePathResult)
{
	return `/${result.ns}/${result.hash}${result.path}`
}

export function strToCidToStr(str: string)
{
	return toCID(str).toString()
}
