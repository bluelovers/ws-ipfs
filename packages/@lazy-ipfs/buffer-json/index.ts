export function parse<T>(dataBuffer: Buffer): T
{
	return JSON.parse(Buffer.from(dataBuffer).toString())
}

export function stringify<T>(dataValue: T): Buffer
{
	return Buffer.from(JSON.stringify(dataValue))
}

export default {
	parse,
	stringify,
}
