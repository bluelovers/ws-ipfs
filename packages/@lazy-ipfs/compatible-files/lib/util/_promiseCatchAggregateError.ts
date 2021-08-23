
import { AggregateErrorExtra, SymbolErrStackMeta } from 'lazy-aggregate-error';

export function _promiseCatchAggregateError<P extends Promise<any>>(p: P, err?: AggregateErrorExtra)
{
	return p.catch(e => {
		if (e instanceof AggregateErrorExtra)
		{
			err = e;
		}
		else
		{
			err ??= new AggregateErrorExtra();
			err.push(e);
		}

		return Promise.reject(err)
	}) as P
}
