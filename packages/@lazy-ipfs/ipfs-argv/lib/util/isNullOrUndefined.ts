export function isNullOrUndefined(value): value is null | undefined
{
	return value === void 0 || value === null
}
