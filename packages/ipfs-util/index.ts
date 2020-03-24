export * from './api';

export function isBufferMaybe(buf): buf is Buffer
{
	return buf?.length && typeof buf?.[0] === 'number'
}
