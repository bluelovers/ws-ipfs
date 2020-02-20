"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const ipfsd_ctl_1 = require("ipfsd-ctl");
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
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
function fixIPFSOptions(options) {
    options = lodash_defaultsdeep_1.default({}, options, {
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
    if (options.type === 'js' || options.type === 'proc') {
        if (typeof options.ipfsModule === 'undefined') {
            options.ipfsModule = require('ipfs');
        }
        if (typeof options.ipfsHttpModule === 'undefined') {
            options.ipfsHttpModule = require('ipfs-http-client');
        }
        if (typeof options.ipfsBin === 'undefined') {
            options.ipfsBin = require.resolve('ipfs/src/cli/bin.js');
        }
    }
    return options;
}
exports.fixIPFSOptions = fixIPFSOptions;
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
                ipfsd = await ipfsd_ctl_1.createController(fixIPFSOptions(options));
                !ipfsd.started && await ipfsd.start();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFzRDtBQUN0RCx5Q0FBNkM7QUFDN0MsOEVBQStDO0FBRS9DLElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUV2QixxREFBTyxDQUFBO0lBQ1AsbURBQU0sQ0FBQTtJQUNOLDJEQUFVLENBQUE7QUFDWCxDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRDs7R0FFRztBQUNJLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBSTtJQUVuQyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVoQixPQUFPLElBQUksQ0FBQTtBQUNaLENBQUM7QUFMRCw4QkFLQztBQUVELElBQUksT0FJRixDQUFDO0FBRUg7O0dBRUc7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWdCO0lBRTdDLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sT0FBTyxLQUFLLElBQUksRUFDN0Q7UUFDQyxJQUFJLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxpQ0FBaUM7UUFDakMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQzthQUNuQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNGO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FB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QUNKLENBQUM7QUF0RUQsMEJBc0VDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElwZnNDbGllbnQgZnJvbSAnQGJsdWVsb3ZlcnMvaXBmcy1odHRwLWNsaWVudCc7XG5pbXBvcnQgeyBjcmVhdGVDb250cm9sbGVyIH0gZnJvbSAnaXBmc2QtY3RsJztcbmltcG9ydCBkZWZhdWx0c0RlZXAgZnJvbSAnbG9kYXNoLmRlZmF1bHRzZGVlcCc7XG5cbmV4cG9ydCBlbnVtIEVudW1JUEZTVHlwZVxue1xuXHRVbmtub3duLFxuXHRDbGllbnQsXG5cdENvbnRyb2xsZXIsXG59XG5cbi8qKlxuICogY2hlY2sgaXBmcyBpcyB3b3JrXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0lQRlMoaXBmcylcbntcblx0YXdhaXQgaXBmcy5pZCgpO1xuXG5cdHJldHVybiB0cnVlXG59XG5cbmxldCBfY2FjaGVkOiBSZWFkb25seTx7XG5cdGlwZnMsXG5cdGlwZnNUeXBlOiBFbnVtSVBGU1R5cGUsXG5cdHN0b3AoLi4uYXJndik6IFByb21pc2U8dm9pZD4sXG59PjtcblxuLyoqXG4gKiBnZXQgSVBGUywgaWYgbm90IGV4aXN0cywgY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUlQRlMob3B0aW9ucz86IG9iamVjdClcbntcblx0aWYgKHR5cGVvZiBfY2FjaGVkID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgX2NhY2hlZCA9PT0gbnVsbClcblx0e1xuXHRcdGxldCByZXQgPSBhd2FpdCBnZXRJUEZTKG9wdGlvbnMpO1xuXHRcdC8vY29uc29sZS5kaXIoeyBpcGZzLCBpcGZzVHlwZSB9KVxuXHRcdGxldCB7IHN0b3A6IGNsb3NlRm5PbGQsIGlwZnMgfSA9IHJldDtcblxuXHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlKSA9PiB7XG5cdFx0XHRcdGF3YWl0IGNsb3NlRm5PbGQoKS5jYXRjaChlID0+IG51bGwpO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG5cdFx0XHR9KVxuXHRcdDtcblxuXHRcdGxldCBib29sID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHN0b3AgPSAoLi4uYXJndikgPT4ge1xuXHRcdFx0cmV0dXJuIGJvb2wgJiYgY2xvc2VGbk9sZCguLi5hcmd2KVxuXHRcdFx0XHQudGhlbigoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ym9vbCA9IHZvaWQgMDtcblx0XHRcdFx0XHRpZiAoX2NhY2hlZCAmJiBfY2FjaGVkLmlwZnMgPT09IGlwZnMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0X2NhY2hlZCA9IHZvaWQgMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXBmcyA9IHZvaWQgMDtcblx0XHRcdFx0XHRjbG9zZUZuT2xkID0gdm9pZCAwO1xuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgcmVzZXQgX2NhY2hlZCA9PiBudWxsYClcblx0XHRcdFx0fSlcblx0XHR9O1xuXG5cdFx0X2NhY2hlZCA9IE9iamVjdC5mcmVlemUoe1xuXHRcdFx0Li4ucmV0LFxuXHRcdFx0c3RvcCxcblx0XHR9KTtcblxuXHRcdHJldCA9IHZvaWQgMDtcblx0fVxuXG5cdHJldHVybiBfY2FjaGVkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+XG57XG5cdHR5cGU/OiBzdHJpbmc7XG5cdGlwZnNNb2R1bGU/OiBhbnk7XG5cdGlwZnNIdHRwTW9kdWxlPzogYW55O1xuXHRpcGZzQmluPzogc3RyaW5nO1xuXHRpcGZzT3B0aW9ucz86IHtcblx0XHRFWFBFUklNRU5UQUw/OiB7XG5cdFx0XHRwdWJzdWI/OiBib29sZWFuO1xuXHRcdFx0aXBuc1B1YnN1Yj86IGJvb2xlYW47XG5cdFx0XHRzaGFyZGluZz86IGJvb2xlYW47XG5cdFx0XHRkaHQ/OiBib29sZWFuO1xuXHRcdH07XG5cdFx0cmVsYXk/OiB7XG5cdFx0XHRlbmFibGVkPzogYm9vbGVhbjtcblx0XHRcdGhvcD86IHtcblx0XHRcdFx0ZW5hYmxlZD86IGJvb2xlYW47XG5cdFx0XHR9O1xuXHRcdH07XG5cdH07XG5cdGRpc3Bvc2FibGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZml4SVBGU09wdGlvbnMob3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRvcHRpb25zID0gZGVmYXVsdHNEZWVwKHt9LCBvcHRpb25zLCB7XG5cdFx0dHlwZTogJ2pzJyxcblx0XHRpcGZzTW9kdWxlOiByZXF1aXJlKCdpcGZzJyksXG5cdFx0aXBmc0h0dHBNb2R1bGU6IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKSxcblx0XHRpcGZzQmluOiByZXF1aXJlLnJlc29sdmUoJ2lwZnMvc3JjL2NsaS9iaW4uanMnKSxcblx0XHRpcGZzT3B0aW9uczoge1xuXHRcdFx0RVhQRVJJTUVOVEFMOiB7XG5cdFx0XHRcdHB1YnN1YjogdHJ1ZSxcblx0XHRcdFx0aXBuc1B1YnN1YjogdHJ1ZSxcblx0XHRcdFx0c2hhcmRpbmc6IHRydWUsXG5cdFx0XHRcdGRodDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRyZWxheToge1xuXHRcdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0XHRob3A6IHtcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblx0XHRkaXNwb3NhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0aWYgKG9wdGlvbnMudHlwZSA9PT0nanMnIHx8IG9wdGlvbnMudHlwZSA9PT0ncHJvYycpXG5cdHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc01vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzTW9kdWxlID0gcmVxdWlyZSgnaXBmcycpXG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc0JpbiA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzQmluID0gcmVxdWlyZS5yZXNvbHZlKCdpcGZzL3NyYy9jbGkvYmluLmpzJylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxuLyoqXG4gKiBjcmVhdGUgb3IgY29ubmVjdCBpdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SVBGUyhvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdHJldHVybiBuZXcgUHJvbWlzZTx0eXBlb2YgX2NhY2hlZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBpcGZzO1xuXHRcdGxldCBpcGZzZDtcblx0XHRsZXQgaXBmc1R5cGU6IEVudW1JUEZTVHlwZSA9IEVudW1JUEZTVHlwZS5Vbmtub3duO1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aXBmcyA9IGF3YWl0IElwZnNDbGllbnQoKTtcblx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHRcdGlwZnNUeXBlID0gRW51bUlQRlNUeXBlLkNsaWVudDtcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmVycm9yKGUpXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmc2QgPSBhd2FpdCBjcmVhdGVDb250cm9sbGVyKGZpeElQRlNPcHRpb25zKG9wdGlvbnMpKTtcblxuXHRcdFx0XHQhaXBmc2Quc3RhcnRlZCAmJiBhd2FpdCBpcGZzZC5zdGFydCgpO1xuXHRcdFx0XHRpcGZzID0gaXBmc2QuYXBpO1xuXHRcdFx0XHRhd2FpdCBjaGVja0lQRlMoaXBmcyk7XG5cblx0XHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ29udHJvbGxlcjtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXHRcdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSlcblx0XHRcdFx0YXdhaXQgc3RvcCgpO1xuXG5cdFx0XHRcdHJldHVybiByZWplY3QoZSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRhc3luYyBmdW5jdGlvbiBzdG9wKClcblx0XHR7XG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmc2QgJiYgYXdhaXQgaXBmc2Quc3RvcCgpO1xuXHRcdFx0XHRpcGZzICYmIGF3YWl0IGlwZnMuc3RvcCgpO1xuXHRcdFx0XHQvL2NvbnNvbGUuZGVidWcoYGlwZnMgY2xvc2VkYClcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbU0lHSU5UXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR1RFUk0nLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbU0lHVEVSTV0nLCAnc2h1dHRpbmcgZG93bi4uLicsIGFyZ3YpO1xuXHRcdFx0cmV0dXJuIHN0b3AoKVxuXHRcdH0pO1xuXG5cdFx0cHJvY2Vzcy5vbmNlKCdleGl0JywgKC4uLmFyZ3YpID0+IHtcblx0XHRcdC8vY29uc29sZS5kZWJ1ZygnW2V4aXRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHJlc29sdmUoe1xuXHRcdFx0aXBmcyxcblx0XHRcdGlwZnNUeXBlLFxuXHRcdFx0c3RvcCxcblx0XHR9KVxuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlSVBGU1xuIl19