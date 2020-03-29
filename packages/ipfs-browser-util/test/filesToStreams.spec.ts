/**
 * Created by user on 2020/3/29.
 */

import { filesToStreams } from '..';
import { IFile } from 'pull-file-reader2/types';
import { IFilesToStreams } from '../lib/filesToStreams';

it('drop one directory', async () =>
{
	const input: IFile[] = [
		{
			size: 215786,
			filepath: 'Dir/T.pdf',
			webkitRelativePath: 'Dir/T.pdf',
		},
		{
			size: 1511696,
			filepath: 'Dir/T2.pdf',
			webkitRelativePath: 'Dir/T2.pdf',
		},
	]

	const expected: Partial<IFilesToStreams>[] = [
		{
			size: 215786,
			path: 'Dir/T.pdf',
		},
		{
			size: 1511696,
			path: 'Dir/T2.pdf',
		},
	]

	const output = await filesToStreams(input)

	expect(output).toMatchObject(expected)
	expect(output).toMatchSnapshot()
});

