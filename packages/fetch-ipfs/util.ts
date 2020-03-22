import AbortController from 'abort-controller';

export function newAbortController(timeout: number)
{
	const controller = new AbortController();
	const timer = setTimeout(
		() => controller.abort(),
		timeout,
	);
	return {
		controller,
		timer,
	}
}
