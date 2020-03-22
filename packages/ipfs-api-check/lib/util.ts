/**
 * Created by user on 2020/3/21.
 */
import Bluebird from 'bluebird';

export type IRunCheck<E extends Error = Error> = {
	success: boolean;
	spendTime: number;
	error: E;
}

export async function runSubCheck<T, E extends Error = Error>(fn: () => T)
{
	let error: E;
	const startTime = Date.now();

	const success = await Bluebird.resolve()
		.then(fn)
		.timeout(10 * 1000)
		.catch(e => {
			error = e
		})
		.then(success => !!success)
	;

	return {
		success,
		spendTime: Date.now() - startTime,
		error,
	} as IRunCheck<E>
}

