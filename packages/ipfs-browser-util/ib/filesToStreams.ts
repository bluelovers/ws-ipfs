import fileReader from 'pull-file-reader2'

export async function filesToStreams(files: File[])
{
	const streams: {
		path: string,
		content,
		size: number,
	}[] = []

	for (const file of files)
	{
		const stream = fileReader(file)

		streams.push({
			// @ts-ignore
			path: file.filepath || file.webkitRelativePath || file.name,
			content: stream,
			size: file.size,
		})
	}

	return streams
}

export default filesToStreams
