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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFzRDtBQUN0RCx5Q0FBNkM7QUFDN0MsOEVBQStDO0FBRS9DLElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUV2QixxREFBTyxDQUFBO0lBQ1AsbURBQU0sQ0FBQTtJQUNOLDJEQUFVLENBQUE7QUFDWCxDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRDs7R0FFRztBQUNJLEtBQUssVUFBVSxTQUFTLENBQUMsSUFBSTtJQUVuQyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVoQixPQUFPLElBQUksQ0FBQTtBQUNaLENBQUM7QUFMRCw4QkFLQztBQUVELElBQUksT0FJRixDQUFDO0FBRUg7O0dBRUc7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWtCO0lBRS9DLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sT0FBTyxLQUFLLElBQUksRUFDN0Q7UUFDQyxJQUFJLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxpQ0FBaUM7UUFDakMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJDLE1BQU0sU0FBUyxDQUFDLElBQUksQ0FBQzthQUNuQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNGO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FB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QUNKLENBQUM7QUF0RUQsMEJBc0VDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElwZnNDbGllbnQgZnJvbSAnQGJsdWVsb3ZlcnMvaXBmcy1odHRwLWNsaWVudCc7XG5pbXBvcnQgeyBjcmVhdGVDb250cm9sbGVyIH0gZnJvbSAnaXBmc2QtY3RsJztcbmltcG9ydCBkZWZhdWx0c0RlZXAgZnJvbSAnbG9kYXNoLmRlZmF1bHRzZGVlcCc7XG5cbmV4cG9ydCBlbnVtIEVudW1JUEZTVHlwZVxue1xuXHRVbmtub3duLFxuXHRDbGllbnQsXG5cdENvbnRyb2xsZXIsXG59XG5cbi8qKlxuICogY2hlY2sgaXBmcyBpcyB3b3JrXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0lQRlMoaXBmcylcbntcblx0YXdhaXQgaXBmcy5pZCgpO1xuXG5cdHJldHVybiB0cnVlXG59XG5cbmxldCBfY2FjaGVkOiBSZWFkb25seTx7XG5cdGlwZnMsXG5cdGlwZnNUeXBlOiBFbnVtSVBGU1R5cGUsXG5cdHN0b3AoLi4uYXJndik6IFByb21pc2U8dm9pZD4sXG59PjtcblxuLyoqXG4gKiBnZXQgSVBGUywgaWYgbm90IGV4aXN0cywgY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUlQRlMob3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRpZiAodHlwZW9mIF9jYWNoZWQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBfY2FjaGVkID09PSBudWxsKVxuXHR7XG5cdFx0bGV0IHJldCA9IGF3YWl0IGdldElQRlMob3B0aW9ucyk7XG5cdFx0Ly9jb25zb2xlLmRpcih7IGlwZnMsIGlwZnNUeXBlIH0pXG5cdFx0bGV0IHsgc3RvcDogY2xvc2VGbk9sZCwgaXBmcyB9ID0gcmV0O1xuXG5cdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGUpID0+IHtcblx0XHRcdFx0YXdhaXQgY2xvc2VGbk9sZCgpLmNhdGNoKGUgPT4gbnVsbCk7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcblx0XHRcdH0pXG5cdFx0O1xuXG5cdFx0bGV0IGJvb2wgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc3RvcCA9ICguLi5hcmd2KSA9PiB7XG5cdFx0XHRyZXR1cm4gYm9vbCAmJiBjbG9zZUZuT2xkKC4uLmFyZ3YpXG5cdFx0XHRcdC50aGVuKCgpID0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRib29sID0gdm9pZCAwO1xuXHRcdFx0XHRcdGlmIChfY2FjaGVkICYmIF9jYWNoZWQuaXBmcyA9PT0gaXBmcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRfY2FjaGVkID0gdm9pZCAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpcGZzID0gdm9pZCAwO1xuXHRcdFx0XHRcdGNsb3NlRm5PbGQgPSB2b2lkIDA7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmRlYnVnKGByZXNldCBfY2FjaGVkID0+IG51bGxgKVxuXHRcdFx0XHR9KVxuXHRcdH07XG5cblx0XHRfY2FjaGVkID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFx0XHQuLi5yZXQsXG5cdFx0XHRzdG9wLFxuXHRcdH0pO1xuXG5cdFx0cmV0ID0gdm9pZCAwO1xuXHR9XG5cblx0cmV0dXJuIF9jYWNoZWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT5cbntcblx0dHlwZT86IHN0cmluZztcblx0aXBmc01vZHVsZT86IGFueTtcblx0aXBmc0h0dHBNb2R1bGU/OiBhbnk7XG5cdGlwZnNCaW4/OiBzdHJpbmc7XG5cdGlwZnNPcHRpb25zPzoge1xuXHRcdEVYUEVSSU1FTlRBTD86IHtcblx0XHRcdHB1YnN1Yj86IGJvb2xlYW47XG5cdFx0XHRpcG5zUHVic3ViPzogYm9vbGVhbjtcblx0XHRcdHNoYXJkaW5nPzogYm9vbGVhbjtcblx0XHRcdGRodD86IGJvb2xlYW47XG5cdFx0fTtcblx0XHRyZWxheT86IHtcblx0XHRcdGVuYWJsZWQ/OiBib29sZWFuO1xuXHRcdFx0aG9wPzoge1xuXHRcdFx0XHRlbmFibGVkPzogYm9vbGVhbjtcblx0XHRcdH07XG5cdFx0fTtcblx0fTtcblx0ZGlzcG9zYWJsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhJUEZTT3B0aW9ucyhvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdG9wdGlvbnMgPSBkZWZhdWx0c0RlZXAoe30sIG9wdGlvbnMsIHtcblx0XHR0eXBlOiAnanMnLFxuXHRcdGlwZnNNb2R1bGU6IHJlcXVpcmUoJ2lwZnMnKSxcblx0XHRpcGZzSHR0cE1vZHVsZTogcmVxdWlyZSgnaXBmcy1odHRwLWNsaWVudCcpLFxuXHRcdGlwZnNCaW46IHJlcXVpcmUucmVzb2x2ZSgnaXBmcy9zcmMvY2xpL2Jpbi5qcycpLFxuXHRcdGlwZnNPcHRpb25zOiB7XG5cdFx0XHRFWFBFUklNRU5UQUw6IHtcblx0XHRcdFx0cHVic3ViOiB0cnVlLFxuXHRcdFx0XHRpcG5zUHVic3ViOiB0cnVlLFxuXHRcdFx0XHRzaGFyZGluZzogdHJ1ZSxcblx0XHRcdFx0ZGh0OiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHJlbGF5OiB7XG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdGhvcDoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGRpc3Bvc2FibGU6IGZhbHNlLFxuXHR9KTtcblxuXHRpZiAob3B0aW9ucy50eXBlID09PSdqcycgfHwgb3B0aW9ucy50eXBlID09PSdwcm9jJylcblx0e1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzTW9kdWxlID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNNb2R1bGUgPSByZXF1aXJlKCdpcGZzJylcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmlwZnNIdHRwTW9kdWxlID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNIdHRwTW9kdWxlID0gcmVxdWlyZSgnaXBmcy1odHRwLWNsaWVudCcpXG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzQmluID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNCaW4gPSByZXF1aXJlLnJlc29sdmUoJ2lwZnMvc3JjL2NsaS9iaW4uanMnKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvcHRpb25zO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBvciBjb25uZWN0IGl0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJUEZTKG9wdGlvbnM/OiBJT3B0aW9ucylcbntcblx0cmV0dXJuIG5ldyBQcm9taXNlPHR5cGVvZiBfY2FjaGVkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IGlwZnM7XG5cdFx0bGV0IGlwZnNkO1xuXHRcdGxldCBpcGZzVHlwZTogRW51bUlQRlNUeXBlID0gRW51bUlQRlNUeXBlLlVua25vd247XG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpcGZzID0gYXdhaXQgSXBmc0NsaWVudCgpO1xuXHRcdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpO1xuXHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ2xpZW50O1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSlcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCA9IGF3YWl0IGNyZWF0ZUNvbnRyb2xsZXIoZml4SVBGU09wdGlvbnMob3B0aW9ucykpO1xuXG5cdFx0XHRcdCFpcGZzZC5zdGFydGVkICYmIGF3YWl0IGlwZnNkLnN0YXJ0KCk7XG5cdFx0XHRcdGlwZnMgPSBpcGZzZC5hcGk7XG5cdFx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblxuXHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5Db250cm9sbGVyO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vY29uc29sZS5lcnJvcihlKVxuXHRcdFx0XHRhd2FpdCBzdG9wKCk7XG5cblx0XHRcdFx0cmV0dXJuIHJlamVjdChlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGFzeW5jIGZ1bmN0aW9uIHN0b3AoKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCAmJiBhd2FpdCBpcGZzZC5zdG9wKCk7XG5cdFx0XHRcdGlwZnMgJiYgYXdhaXQgaXBmcy5zdG9wKCk7XG5cdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgaXBmcyBjbG9zZWRgKVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cblx0XHRcdH1cblx0XHR9XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR0lOVCcsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdJTlRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub25jZSgnU0lHVEVSTScsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdURVJNXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ2V4aXQnLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbZXhpdF0nLCAnc2h1dHRpbmcgZG93bi4uLicsIGFyZ3YpO1xuXHRcdFx0cmV0dXJuIHN0b3AoKVxuXHRcdH0pO1xuXG5cdFx0cmVzb2x2ZSh7XG5cdFx0XHRpcGZzLFxuXHRcdFx0aXBmc1R5cGUsXG5cdFx0XHRzdG9wLFxuXHRcdH0pXG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VJUEZTXG4iXX0=