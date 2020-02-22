"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const ctl_1 = __importDefault(require("./lib/ctl"));
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
        //ipfsModule: require('ipfs'),
        //ipfsHttpModule: require('ipfs-http-client'),
        //ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
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
                ipfsd = await ctl_1.default(options);
                ipfs = ipfsd.api;
                await checkIPFS(ipfs);
                ipfsType = EnumIPFSType.Controller;
            }
            catch (e) {
                console.error(e);
                await stop();
                return reject(e);
            }
        }
        async function stop() {
            try {
                ipfsd && await ipfsd.stop();
            }
            catch (e) {
            }
            try {
                ipfs && await ipfs.stop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFzRDtBQUN0RCw4RUFBK0M7QUFDL0Msb0RBQWtDO0FBRWxDLElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUV2QixxREFBTyxDQUFBO0lBQ1AsbURBQU0sQ0FBQTtJQUNOLDJEQUFVLENBQUE7QUFDWCxDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRDs7R0FFRztBQUNJLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBSTtJQUVuQyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVoQixPQUFPLElBQUksQ0FBQTtBQUNaLENBQUM7QUFMRCw4QkFLQztBQUVELElBQUksT0FJRixDQUFDO0FBRUg7O0dBRUc7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWtCO0lBRS9DLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sT0FBTyxLQUFLLElBQUksRUFDN0Q7UUFDQyxJQUFJLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxpQ0FBaUM7UUFDakMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQzthQUNuQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNGO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FB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LWNsaWVudCc7XG5pbXBvcnQgZGVmYXVsdHNEZWVwIGZyb20gJ2xvZGFzaC5kZWZhdWx0c2RlZXAnO1xuaW1wb3J0IHN0YXJ0SVBGUyBmcm9tICcuL2xpYi9jdGwnO1xuXG5leHBvcnQgZW51bSBFbnVtSVBGU1R5cGVcbntcblx0VW5rbm93bixcblx0Q2xpZW50LFxuXHRDb250cm9sbGVyLFxufVxuXG4vKipcbiAqIGNoZWNrIGlwZnMgaXMgd29ya1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tJUEZTKGlwZnMpXG57XG5cdGF3YWl0IGlwZnMuaWQoKTtcblxuXHRyZXR1cm4gdHJ1ZVxufVxuXG5sZXQgX2NhY2hlZDogUmVhZG9ubHk8e1xuXHRpcGZzLFxuXHRpcGZzVHlwZTogRW51bUlQRlNUeXBlLFxuXHRzdG9wKC4uLmFyZ3YpOiBQcm9taXNlPHZvaWQ+LFxufT47XG5cbi8qKlxuICogZ2V0IElQRlMsIGlmIG5vdCBleGlzdHMsIGNyZWF0ZSBvciBjb25uZWN0IGl0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1c2VJUEZTKG9wdGlvbnM/OiBJT3B0aW9ucylcbntcblx0aWYgKHR5cGVvZiBfY2FjaGVkID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgX2NhY2hlZCA9PT0gbnVsbClcblx0e1xuXHRcdGxldCByZXQgPSBhd2FpdCBnZXRJUEZTKG9wdGlvbnMpO1xuXHRcdC8vY29uc29sZS5kaXIoeyBpcGZzLCBpcGZzVHlwZSB9KVxuXHRcdGxldCB7IHN0b3A6IGNsb3NlRm5PbGQsIGlwZnMgfSA9IHJldDtcblxuXHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlKSA9PiB7XG5cdFx0XHRcdGF3YWl0IGNsb3NlRm5PbGQoKS5jYXRjaChlID0+IG51bGwpO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG5cdFx0XHR9KVxuXHRcdDtcblxuXHRcdGxldCBib29sID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHN0b3AgPSAoLi4uYXJndikgPT4ge1xuXHRcdFx0cmV0dXJuIGJvb2wgJiYgY2xvc2VGbk9sZCguLi5hcmd2KVxuXHRcdFx0XHQudGhlbigoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ym9vbCA9IHZvaWQgMDtcblx0XHRcdFx0XHRpZiAoX2NhY2hlZCAmJiBfY2FjaGVkLmlwZnMgPT09IGlwZnMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0X2NhY2hlZCA9IHZvaWQgMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXBmcyA9IHZvaWQgMDtcblx0XHRcdFx0XHRjbG9zZUZuT2xkID0gdm9pZCAwO1xuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgcmVzZXQgX2NhY2hlZCA9PiBudWxsYClcblx0XHRcdFx0fSlcblx0XHR9O1xuXG5cdFx0X2NhY2hlZCA9IE9iamVjdC5mcmVlemUoe1xuXHRcdFx0Li4ucmV0LFxuXHRcdFx0c3RvcCxcblx0XHR9KTtcblxuXHRcdHJldCA9IHZvaWQgMDtcblx0fVxuXG5cdHJldHVybiBfY2FjaGVkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+XG57XG5cdHR5cGU/OiBzdHJpbmcgfCAnanMnIHwgJ2dvJyB8ICdwcm9jJztcblx0aXBmc01vZHVsZT86IGFueTtcblx0aXBmc0h0dHBNb2R1bGU/OiBhbnk7XG5cdGlwZnNCaW4/OiBzdHJpbmc7XG5cdGlwZnNPcHRpb25zPzoge1xuXHRcdEVYUEVSSU1FTlRBTD86IHtcblx0XHRcdHB1YnN1Yj86IGJvb2xlYW47XG5cdFx0XHRpcG5zUHVic3ViPzogYm9vbGVhbjtcblx0XHRcdHNoYXJkaW5nPzogYm9vbGVhbjtcblx0XHRcdGRodD86IGJvb2xlYW47XG5cdFx0fTtcblx0XHRyZWxheT86IHtcblx0XHRcdGVuYWJsZWQ/OiBib29sZWFuO1xuXHRcdFx0aG9wPzoge1xuXHRcdFx0XHRlbmFibGVkPzogYm9vbGVhbjtcblx0XHRcdH07XG5cdFx0fTtcblx0XHRbazogc3RyaW5nXTogYW55XG5cdH07XG5cdGRpc3Bvc2FibGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZml4SVBGU09wdGlvbnMob3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRvcHRpb25zID0gZGVmYXVsdHNEZWVwKHt9LCBvcHRpb25zLCB7XG5cdFx0dHlwZTogJ2pzJyxcblx0XHQvL2lwZnNNb2R1bGU6IHJlcXVpcmUoJ2lwZnMnKSxcblx0XHQvL2lwZnNIdHRwTW9kdWxlOiByZXF1aXJlKCdpcGZzLWh0dHAtY2xpZW50JyksXG5cdFx0Ly9pcGZzQmluOiByZXF1aXJlLnJlc29sdmUoJ2lwZnMvc3JjL2NsaS9iaW4uanMnKSxcblx0XHRpcGZzT3B0aW9uczoge1xuXHRcdFx0RVhQRVJJTUVOVEFMOiB7XG5cdFx0XHRcdHB1YnN1YjogdHJ1ZSxcblx0XHRcdFx0aXBuc1B1YnN1YjogdHJ1ZSxcblx0XHRcdFx0c2hhcmRpbmc6IHRydWUsXG5cdFx0XHRcdGRodDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRyZWxheToge1xuXHRcdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0XHRob3A6IHtcblx0XHRcdFx0XHRlbmFibGVkOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblx0XHRkaXNwb3NhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0aWYgKG9wdGlvbnMudHlwZSA9PT0nanMnIHx8IG9wdGlvbnMudHlwZSA9PT0ncHJvYycpXG5cdHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc01vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzTW9kdWxlID0gcmVxdWlyZSgnaXBmcycpXG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc0JpbiA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzQmluID0gcmVxdWlyZS5yZXNvbHZlKCdpcGZzL3NyYy9jbGkvYmluLmpzJylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxuLyoqXG4gKiBjcmVhdGUgb3IgY29ubmVjdCBpdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SVBGUyhvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdHJldHVybiBuZXcgUHJvbWlzZTx0eXBlb2YgX2NhY2hlZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBpcGZzO1xuXHRcdGxldCBpcGZzZDtcblx0XHRsZXQgaXBmc1R5cGU6IEVudW1JUEZTVHlwZSA9IEVudW1JUEZTVHlwZS5Vbmtub3duO1xuXG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aXBmcyA9IGF3YWl0IElwZnNDbGllbnQoKTtcblx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHRcdGlwZnNUeXBlID0gRW51bUlQRlNUeXBlLkNsaWVudDtcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmVycm9yKGUpXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmc2QgPSBhd2FpdCBzdGFydElQRlMob3B0aW9ucyk7XG5cdFx0XHRcdGlwZnMgPSBpcGZzZC5hcGk7XG5cdFx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ29udHJvbGxlcjtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0XHRhd2FpdCBzdG9wKCk7XG5cblx0XHRcdFx0cmV0dXJuIHJlamVjdChlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIHN0b3AoKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCAmJiBhd2FpdCBpcGZzZC5zdG9wKCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSlcblx0XHRcdHtcblxuXHRcdFx0fVxuXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmcyAmJiBhd2FpdCBpcGZzLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbU0lHSU5UXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR1RFUk0nLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbU0lHVEVSTV0nLCAnc2h1dHRpbmcgZG93bi4uLicsIGFyZ3YpO1xuXHRcdFx0cmV0dXJuIHN0b3AoKVxuXHRcdH0pO1xuXG5cdFx0cHJvY2Vzcy5vbmNlKCdleGl0JywgKC4uLmFyZ3YpID0+IHtcblx0XHRcdC8vY29uc29sZS5kZWJ1ZygnW2V4aXRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHJlc29sdmUoe1xuXHRcdFx0aXBmcyxcblx0XHRcdGlwZnNUeXBlLFxuXHRcdFx0c3RvcCxcblx0XHR9KVxuXHR9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlSVBGU1xuIl19