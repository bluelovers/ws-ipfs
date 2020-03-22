/**
 * Created by user on 2020/3/21.
 */

export type IRunCheck<E extends Error = Error> = {
	success: boolean;
	spendTime: number;
	error: E;
}

export async function runSubCheck<T, E extends Error = Error>(fn: () => T)
{
	let error: E;
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
	} as IRunCheck<E>
}

export function isBufferMaybe(buf): buf is Buffer
{
	return buf?.length && typeof buf?.[0] === 'number'
}
