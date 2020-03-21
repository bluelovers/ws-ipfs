/**
 * Created by user on 2020/3/21.
 */

export async function runSubCheck<T>(fn: () => T)
{
	let error: Error;
	const startTime = Date.now();

	const success = await Promise.resolve()
		.then(fn)
		.then(success => !!success)
		.catch(e => {
			error = e
		})
	;

	return {
		success,
		spendTime: Date.now() - startTime,
		error,
	}
}

export function isBufferMaybe(buf): buf is Buffer
{
	return buf?.length && typeof buf?.[0] === 'number'
}
