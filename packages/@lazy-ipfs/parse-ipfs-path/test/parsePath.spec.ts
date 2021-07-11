import { parsePath } from '../lib/parsePath';
import CID from 'cids';

test('should parse input as string CID', () => {
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('')
	expect(path.toString()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.toJSON()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')

	expect(path).toMatchSnapshot()
})

test('should parse input as buffer CID', () => {
	const input = Buffer.from('017012207252523e6591fb8fe553d67ff55a86f84044b46a3e4176e10c58fa529a4aabd5', 'hex')
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toMatchSnapshot()
	expect(path.path).toBe('')
	expect(path.toString()).toBe(`/ipfs/${path.hash}`)
	expect(path.toJSON()).toBe(`/ipfs/${path.hash}`)

	expect(path).toMatchSnapshot()
})

test('should parse input as CID instance', () => {
	const input = new CID('zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
	expect(path.path).toBe('')
	expect(path.toString()).toBe('/ipfs/zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')
	expect(path.toJSON()).toBe('/ipfs/zdpuArHMUAYi3VtD3f7iSkXxYK9xo687SoNf5stAQNCMzd77k')

	expect(path).toMatchSnapshot()
})

test('should parse input as string with path and without namespace', () => {
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(path.toString()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
	expect(path.toJSON()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

	expect(path).toMatchSnapshot()
})

test('should parse input as string without leading slash', () => {
	const input = 'ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to'
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(path.toString()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
	expect(path.toJSON()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

	expect(path).toMatchSnapshot()
})

test('should parse input as string with trailing slash', () => {
	const input = '/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to/'
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn')
	expect(path.path).toBe('/path/to')
	expect(path.toString()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')
	expect(path.toJSON()).toBe('/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/path/to')

	expect(path).toMatchSnapshot()
})

test('should not alter CID encoding', () => {
	// base32 encoded CID
	const input = 'bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64'
	const path = parsePath(input)

	expect(path.ns).toBe('ipfs')
	expect(path.hash).toBe('bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
	expect(path.path).toBe('')
	expect(path.toString()).toBe('/ipfs/bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')
	expect(path.toJSON()).toBe('/ipfs/bafybeic7rclblnrf76dtmmrdfxix2aq7hnvms5hlb3f7zko52kvv42mb64')

	expect(path).toMatchSnapshot()
})

test('should allow IPNS path', () => {
	const input = '/ipns/yourdomain.name'
	const path = parsePath(input)

	expect(path.ns).toBe('ipns')
	expect(path.hash).toBe('yourdomain.name')
	expect(path.path).toBe('')
	expect(path.toString()).toBe('/ipns/yourdomain.name')
	expect(path.toJSON()).toBe('/ipns/yourdomain.name')
})

test('should throw on unknown namespace', () => {
	const input = '/junk/stuff'
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid CID in string', () => {
	const input = '/ipfs/notACID/some/path'
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid CID in buffer', () => {
	const input = Buffer.from('notaCID')
	expect(() => parsePath(input)).toThrow()
})

test('should throw on invalid path', () => {
	const input = 42
	// @ts-expect-error
	expect(() => parsePath(input)).toThrow()
})

test('should only enumerate certain properties', () => {
	const input = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn'
	const path = parsePath(input)
	const enumerable = ['ns', 'path', 'hash']
	expect(Object.keys(path)).toHaveLength(enumerable.length)
	expect(Object.keys(path).every(k => enumerable.includes(k))).toBeTruthy()

	expect(Object.keys(path)).toMatchSnapshot()
})
