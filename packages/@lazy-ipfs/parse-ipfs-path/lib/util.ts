
export function _isStringObject(input): input is string
{
	return (input instanceof String || Object.prototype.toString.call(input) === '[object String]')
}
