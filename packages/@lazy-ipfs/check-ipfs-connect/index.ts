import Bluebird from 'bluebird';
import { IPFS } from 'ipfs-core-types';
import { AggregateErrorExtra } from 'lazy-aggregate-error';
import err_code from 'err-code';
import { IPFSHTTPClient } from 'ipfs-http-client';

export function checkIPFS(ipfs)
{
	return assertCheckIPFS(ipfs)
		.catch(() => null as null)
}

export function assertCheckIPFS(ipfs)
{
	let _error: AggregateErrorExtra;

	return Bluebird.resolve(ipfs as IPFS)
		.then(async (ipfs) =>
		{
			let bool: boolean;
			const timeout = 2000;

			bool = await ipfs
				.version({
					timeout,
				})
				.then(v => !!v)
				.catch(e =>
				{
					_error ??= new AggregateErrorExtra();
					_error.push(e);

					return null as null
				})
			;

			if (!bool)
			{
				bool = await ipfs
					.id({
						timeout,
					})
					.then(v => !!v)
					.catch(e =>
					{
						_error ??= new AggregateErrorExtra();
						_error.push(e);

						return null as null
					})
				;
			}

			if (!bool)
			{
				let e = err_code(new Error('Invalid ipfs'), {
					endpointConfig: (ipfs as IPFSHTTPClient).getEndpointConfig?.(),
				});

				_error ??= new AggregateErrorExtra();
				_error.push(e);

				throw _error
			}

			return bool
		})
		.catch(e => {
			if (!(e instanceof AggregateErrorExtra))
			{
				_error ??= new AggregateErrorExtra();
				_error.push(e);
			}
			else
			{
				_error = e
			}

			return Promise.reject(_error)
		})
		;
}
