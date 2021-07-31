import { EnumParsePathResultNs, parsePath, resultToPath } from '../lib/parsePath';
import toCID from '@lazy-ipfs/to-cid';

test('should parse input as string CID', () =>
{
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('')
	expect(resultToPath(path)).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')

})

test('should parse input as buffer CID', () =>
{
	const input = Buffer.from('017012207252523e6591fb8fe553d67ff55a86f84044b46a3e4176e10c58fa529a4aabd5', 'hex')

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)

	expect(path.path).toBe('')
	expect(resultToPath(path)).toBe(`/ipfs/${path.hash}`)

})

test('should parse input as CID instance', () =>
{
	const input = toCID('bafyreicxcphiuj57amuzbb2lq7gzxodccrxrbmjcx4jitkoegcaxffkvj4')

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)
	expect(path.hash).toBe('bafyreicxcphiuj57amuzbb2lq7gzxodccrxrbmjcx4jitkoegcaxffkvj4')
	expect(path.path).toBe('')
	expect(resultToPath(path)).toBe('/ipfs/bafyreicxcphiuj57amuzbb2lq7gzxodccrxrbmjcx4jitkoegcaxffkvj4')

})

test('should parse input as string with path and without namespace', () =>
{
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(resultToPath(path)).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

})

test('should parse input as string without leading slash', () =>
{
	const input = 'ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(resultToPath(path)).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

})

test('should parse input as string with trailing slash', () =>
{
	const input = '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to/'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(resultToPath(path)).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

})

test('should not alter CID encoding', () =>
{
	// base32 encoded CID
	const input = 'bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipfs)
	expect(path.hash).toBe('bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
	expect(path.path).toBe('')
	expect(resultToPath(path)).toBe('/ipfs/bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')

	expect(path).toMatchSnapshot()
})

test('should allow IPNS path', () =>
{
	const input = '/ipns/yourdomain.name'

	const path = _check(input);

	expect(path.ns).toBe(EnumParsePathResultNs.ipns)
	expect(path.hash).toBe('yourdomain.name')
	expect(path.path).toBe('')
	expect(resultToPath(path)).toBe('/ipns/yourdomain.name')

})

test('should throw on unknown namespace', () =>
{
	const input = '/junk/stuff'
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid CID in string', () =>
{
	const input = '/ipfs/notACID/some/path'
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid CID in buffer', () =>
{
	const input = Buffer.from('notaCID')
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid path', () =>
{
	const input = 42
	// @ts-expect-error
	expect(() => parsePath(input)).toThrow()
})

test('should only enumerate certain properties', () =>
{
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'

	_check(input)

})

describe('should parse url', () =>
{

	test('ipfs.io/ipfs/', () =>
	{

		const input = 'https://ipfs.io/ipfs/QmZuXEbnWnxft26Ehf3rDhZTFXULE7guWa1dG5d8UDJuQP?filename=novel-opds-now.cids.json'

		_check(input)

	})

	test('.on.fleek.co', () =>
	{

		const input = 'https://bafybeihq3roumey5wn3xktx57gkvm7cgqdndeaqa52guvotn5dud4pktqm.on.fleek.co/wenku8/2536/'

		_check(input)

	})

	test('.ipfs.dweb.link', () =>
	{

		const input = 'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link'

		_check(input)

	})

	test('.ipns.dweb.link', () =>
	{

		const input = 'http://bafybeiabc2xofh6tdi6vutusorpumwcikw3hf3st4ecjugo6j52f6xwc6q.ipns.dweb.link'

		_check(input)

	})

})

function _check(input)
{
	const path = parsePath(input)

	const enumerable = ['ns', 'path', 'hash']
	expect(Object.keys(path)).toHaveLength(enumerable.length)
	expect(Object.keys(path).every(k => enumerable.includes(k))).toBeTruthy()

	expect(Object.keys(path)).toMatchSnapshot()

	expect(resultToPath(path)).toMatchSnapshot()

	expect(path).toMatchSnapshot()

	return path
}
