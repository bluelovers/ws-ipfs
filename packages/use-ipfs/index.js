"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const ipfsd_ctl_1 = require("ipfsd-ctl");
var EnumIPFSType;
(function (EnumIPFSType) {
    EnumIPFSType[EnumIPFSType["Unknown"] = 0] = "Unknown";
    EnumIPFSType[EnumIPFSType["Client"] = 1] = "Client";
    EnumIPFSType[EnumIPFSType["Controller"] = 2] = "Controller";
})(EnumIPFSType = exports.EnumIPFSType || (exports.EnumIPFSType = {}));
/**
 * check ipfs is work
 */
async function checkIPFS(ipfs) {
    await ipfs.id();
    return true;
}
exports.checkIPFS = checkIPFS;
let _cached;
/**
 * get IPFS, if not exists, create or connect it
 */
async function useIPFS(options) {
    if (typeof _cached === 'undefined' || typeof _cached === null) {
        let ret = await getIPFS(options);
        //console.dir({ ipfs, ipfsType })
        let { stop: closeFnOld, ipfs } = ret;
        await checkIPFS(ipfs)
            .catch(async (e) => {
            await closeFnOld().catch(e => null);
            return Promise.reject(e);
        });
        let bool = true;
        const stop = (...argv) => {
            return bool && closeFnOld(...argv)
                .then(() => {
                bool = void 0;
                if (_cached && _cached.ipfs === ipfs) {
                    _cached = void 0;
                }
                ipfs = void 0;
                closeFnOld = void 0;
                //console.debug(`reset _cached => null`)
            });
        };
        _cached = Object.freeze({
            ...ret,
            stop,
        });
        ret = void 0;
    }
    return _cached;
}
exports.useIPFS = useIPFS;
/**
 * create or connect it
 */
async function getIPFS(options) {
    return new Promise(async (resolve, reject) => {
        let ipfs;
        let ipfsd;
        let ipfsType = EnumIPFSType.Unknown;
        try {
            ipfs = await ipfs_http_client_1.default();
            await checkIPFS(ipfs);
            ipfsType = EnumIPFSType.Client;
        }
        catch (e) {
            //console.error(e)
            try {
                ipfsd = await ipfsd_ctl_1.createController({
                    type: 'js',
                    ipfsModule: require('ipfs'),
                    ipfsHttpModule: require('ipfs-http-client'),
                    ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
                    ipfsOptions: {
                        EXPERIMENTAL: {
                            pubsub: true,
                            ipnsPubsub: true,
                            sharding: true,
                            dht: true,
                        },
                        relay: {
                            enabled: true,
                            hop: {
                                enabled: true
                            }
                        },
                    },
                    disposable: false,
                });
                await ipfsd.start();
                ipfs = ipfsd.api;
                await checkIPFS(ipfs);
                ipfsType = EnumIPFSType.Controller;
            }
            catch (e) {
                //console.error(e)
                await stop();
                return reject(e);
            }
        }
        async function stop() {
            try {
                ipfsd && await ipfsd.stop();
                ipfs && await ipfs.stop();
                //console.debug(`ipfs closed`)
            }
            catch (e) {
            }
        }
        process.once('SIGINT', (...argv) => {
            //console.debug('[SIGINT]', 'shutting down...', argv);
            return stop();
        });
        process.once('SIGTERM', (...argv) => {
            //console.debug('[SIGTERM]', 'shutting down...', argv);
            return stop();
        });
        process.once('exit', (...argv) => {
            //console.debug('[exit]', 'shutting down...', argv);
            return stop();
        });
        resolve({
            ipfs,
            ipfsType,
            stop,
        });
    });
}
exports.getIPFS = getIPFS;
exports.default = useIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFzRDtBQUN0RCx5Q0FBNkM7QUFFN0MsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBRXZCLHFEQUFPLENBQUE7SUFDUCxtREFBTSxDQUFBO0lBQ04sMkRBQVUsQ0FBQTtBQUNYLENBQUMsRUFMVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUt2QjtBQUVEOztHQUVHO0FBQ0ksS0FBSyxVQUFVLFNBQVMsQ0FBQyxJQUFJO0lBRW5DLE1BQU0sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRWhCLE9BQU8sSUFBSSxDQUFBO0FBQ1osQ0FBQztBQUxELDhCQUtDO0FBRUQsSUFBSSxPQUlGLENBQUM7QUFFSDs7R0FFRztBQUNJLEtBQUssVUFBVSxPQUFPLENBQUMsT0FBZ0I7SUFFN0MsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxPQUFPLEtBQUssSUFBSSxFQUM3RDtRQUNDLElBQUksR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLGlDQUFpQztRQUNqQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFFckMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsTUFBTSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0Y7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxF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QUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDbkMsdURBQXVEO1lBQ3ZELE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUNoQyxvREFBb0Q7WUFDcEQsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDO1lBQ1AsSUFBSTtZQUNKLFFBQVE7WUFDUixJQUFJO1NBQ0osQ0FBQyxDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBMUZELDBCQTBGQztBQUVELGtCQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJcGZzQ2xpZW50IGZyb20gJ0BibHVlbG92ZXJzL2lwZnMtaHR0cC1jbGllbnQnO1xuaW1wb3J0IHsgY3JlYXRlQ29udHJvbGxlciB9IGZyb20gJ2lwZnNkLWN0bCc7XG5cbmV4cG9ydCBlbnVtIEVudW1JUEZTVHlwZVxue1xuXHRVbmtub3duLFxuXHRDbGllbnQsXG5cdENvbnRyb2xsZXIsXG59XG5cbi8qKlxuICogY2hlY2sgaXBmcyBpcyB3b3JrXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0lQRlMoaXBmcylcbntcblx0YXdhaXQgaXBmcy5pZCgpO1xuXG5cdHJldHVybiB0cnVlXG59XG5cbmxldCBfY2FjaGVkOiBSZWFkb25seTx7XG5cdGlwZnMsXG5cdGlwZnNUeXBlOiBFbnVtSVBGU1R5cGUsXG5cdHN0b3AoLi4uYXJndik6IFByb21pc2U8dm9pZD4sXG59PjtcblxuLyoqXG4gKiBnZXQgSVBGUywgaWYgbm90IGV4aXN0cywgY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUlQRlMob3B0aW9ucz86IG9iamVjdClcbntcblx0aWYgKHR5cGVvZiBfY2FjaGVkID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgX2NhY2hlZCA9PT0gbnVsbClcblx0e1xuXHRcdGxldCByZXQgPSBhd2FpdCBnZXRJUEZTKG9wdGlvbnMpO1xuXHRcdC8vY29uc29sZS5kaXIoeyBpcGZzLCBpcGZzVHlwZSB9KVxuXHRcdGxldCB7IHN0b3A6IGNsb3NlRm5PbGQsIGlwZnMgfSA9IHJldDtcblxuXHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlKSA9PiB7XG5cdFx0XHRcdGF3YWl0IGNsb3NlRm5PbGQoKS5jYXRjaChlID0+IG51bGwpO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG5cdFx0XHR9KVxuXHRcdDtcblxuXHRcdGxldCBib29sID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHN0b3AgPSAoLi4uYXJndikgPT4ge1xuXHRcdFx0cmV0dXJuIGJvb2wgJiYgY2xvc2VGbk9sZCguLi5hcmd2KVxuXHRcdFx0XHQudGhlbigoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ym9vbCA9IHZvaWQgMDtcblx0XHRcdFx0XHRpZiAoX2NhY2hlZCAmJiBfY2FjaGVkLmlwZnMgPT09IGlwZnMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0X2NhY2hlZCA9IHZvaWQgMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXBmcyA9IHZvaWQgMDtcblx0XHRcdFx0XHRjbG9zZUZuT2xkID0gdm9pZCAwO1xuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgcmVzZXQgX2NhY2hlZCA9PiBudWxsYClcblx0XHRcdFx0fSlcblx0XHR9O1xuXG5cdFx0X2NhY2hlZCA9IE9iamVjdC5mcmVlemUoe1xuXHRcdFx0Li4ucmV0LFxuXHRcdFx0c3RvcCxcblx0XHR9KTtcblxuXHRcdHJldCA9IHZvaWQgMDtcblx0fVxuXG5cdHJldHVybiBfY2FjaGVkXG59XG5cbi8qKlxuICogY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldElQRlMob3B0aW9ucz86IG9iamVjdClcbntcblx0cmV0dXJuIG5ldyBQcm9taXNlPHR5cGVvZiBfY2FjaGVkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IGlwZnM7XG5cdFx0bGV0IGlwZnNkO1xuXHRcdGxldCBpcGZzVHlwZTogRW51bUlQRlNUeXBlID0gRW51bUlQRlNUeXBlLlVua25vd247XG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpcGZzID0gYXdhaXQgSXBmc0NsaWVudCgpO1xuXHRcdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpO1xuXHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ2xpZW50O1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSlcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCA9IGF3YWl0IGNyZWF0ZUNvbnRyb2xsZXIoe1xuXHRcdFx0XHRcdHR5cGU6ICdqcycsXG5cdFx0XHRcdFx0aXBmc01vZHVsZTogcmVxdWlyZSgnaXBmcycpLFxuXHRcdFx0XHRcdGlwZnNIdHRwTW9kdWxlOiByZXF1aXJlKCdpcGZzLWh0dHAtY2xpZW50JyksXG5cdFx0XHRcdFx0aXBmc0JpbjogcmVxdWlyZS5yZXNvbHZlKCdpcGZzL3NyYy9jbGkvYmluLmpzJyksXG5cdFx0XHRcdFx0aXBmc09wdGlvbnM6IHtcblx0XHRcdFx0XHRcdEVYUEVSSU1FTlRBTDoge1xuXHRcdFx0XHRcdFx0XHRwdWJzdWI6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGlwbnNQdWJzdWI6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHNoYXJkaW5nOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRkaHQ6IHRydWUsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cmVsYXk6IHtcblx0XHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0aG9wOiB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZGlzcG9zYWJsZTogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGF3YWl0IGlwZnNkLnN0YXJ0KCk7XG5cdFx0XHRcdGlwZnMgPSBpcGZzZC5hcGk7XG5cdFx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblxuXHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5Db250cm9sbGVyO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vY29uc29sZS5lcnJvcihlKVxuXHRcdFx0XHRhd2FpdCBzdG9wKCk7XG5cblx0XHRcdFx0cmV0dXJuIHJlamVjdChlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIHN0b3AoKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCAmJiBhd2FpdCBpcGZzZC5zdG9wKCk7XG5cdFx0XHRcdGlwZnMgJiYgYXdhaXQgaXBmcy5zdG9wKCk7XG5cdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgaXBmcyBjbG9zZWRgKVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cblx0XHRcdH1cblx0XHR9XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR0lOVCcsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdJTlRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub25jZSgnU0lHVEVSTScsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdURVJNXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ2V4aXQnLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbZXhpdF0nLCAnc2h1dHRpbmcgZG93bi4uLicsIGFyZ3YpO1xuXHRcdFx0cmV0dXJuIHN0b3AoKVxuXHRcdH0pO1xuXG5cdFx0cmVzb2x2ZSh7XG5cdFx0XHRpcGZzLFxuXHRcdFx0aXBmc1R5cGUsXG5cdFx0XHRzdG9wLFxuXHRcdH0pXG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VJUEZTXG4iXX0=