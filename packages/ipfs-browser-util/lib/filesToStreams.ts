import fileReader from 'pull-file-reader2'
import { IFile, IFileLike } from 'pull-file-reader2/types';
import { isSource } from 'pull-file-reader2/isSource';

export interface IFilesToStreams
{
	path: string,
	content(end, cb),
	size: number,
}

export async function filesToStreams(files: IFile[])
{
	const streams: IFilesToStreams[] = []

	for (const file of files as IFileLike[])
	{
		const stream = fileReader(file)

		streams.push({
			path: file.filepath || file.webkitRelativePath || file.name,
			content: stream,
			size: file.size,
		})
	}

	return streams
}

export default filesToStreams
