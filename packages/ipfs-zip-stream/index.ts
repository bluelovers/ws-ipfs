/**
 * Created by user on 2020/3/27.
 */

import JSZip, { JSZipLoadOptions } from 'jszip'
import { ITSResolvable } from 'ts-type';
import { ReadStream } from "fs";

export interface IOptions
{
	jsZipLoadOptions?: JSZipLoadOptions,
	prefixPath?: string,
}

export function fromBuffer(buf: ITSResolvable<Buffer>, options?: IOptions)
{
	return fromJSZip(Promise.resolve(buf)
		.then(data => JSZip.loadAsync(data, options?.jsZipLoadOptions)), options)
}

export function fromString(base64: ITSResolvable<string>, options?: IOptions)
{
	return fromJSZip(Promise.resolve(base64)
		.then(data => JSZip.loadAsync(data, {
			base64: true,
			...options?.jsZipLoadOptions,
		})), options)
}

export async function * fromJSZip(zip: ITSResolvable<JSZip>, options?: IOptions)
{
	zip = await zip;
	const keys = Object.keys(zip.files)
	const { prefixPath = '' } = options || {} as IOptions;

	for (const file of keys)
	{
		const path = prefixPath + file;
		const zfo = zip.files[file];

		if (zfo.dir)
		{
			continue;
		}

		const fo = {
			path,
			content: await zfo.async('array'),
			mode: undefined,
			mtime: zfo.date,
		}

		yield fo
	}
}

export default fromBuffer
