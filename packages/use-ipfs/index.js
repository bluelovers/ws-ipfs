"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const ctl_1 = __importDefault(require("./lib/ctl"));
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
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
    options = defaultsDeep_1.default({}, options, {
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
            async address() {
                let addr = await ipfs.config.get('Addresses');
                return cloneDeep_1.default(addr);
            }
        });
    });
}
exports.getIPFS = getIPFS;
exports.default = useIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUFzRDtBQUN0RCxvREFBa0M7QUFDbEMsdUVBQStDO0FBQy9DLGlFQUF5QztBQUV6QyxJQUFZLFlBS1g7QUFMRCxXQUFZLFlBQVk7SUFFdkIscURBQU8sQ0FBQTtJQUNQLG1EQUFNLENBQUE7SUFDTiwyREFBVSxDQUFBO0FBQ1gsQ0FBQyxFQUxXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBS3ZCO0FBRUQ7O0dBRUc7QUFDSSxLQUFLLFVBQVUsU0FBUyxDQUFDLElBQUk7SUFFbkMsTUFBTSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFaEIsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDO0FBTEQsOEJBS0M7QUFFRCxJQUFJLE9BVUYsQ0FBQztBQUVIOztHQUVHO0FBQ0ksS0FBSyxVQUFVLE9BQU8sQ0FBQyxPQUFrQjtJQUUvQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQzdEO1FBQ0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsaUNBQWlDO1FBQ2pDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVyQyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDbkIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQixNQUFNLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDRjtRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixNQUFNLElBQUks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Q3ZCLENBQUM7U0FDRCxDQUFDLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUEvRUQsMEJBK0VDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElwZnNDbGllbnQgZnJvbSAnQGJsdWVsb3ZlcnMvaXBmcy1odHRwLWNsaWVudCc7XG5pbXBvcnQgc3RhcnRJUEZTIGZyb20gJy4vbGliL2N0bCc7XG5pbXBvcnQgZGVmYXVsdHNEZWVwIGZyb20gJ2xvZGFzaC9kZWZhdWx0c0RlZXAnO1xuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2gvY2xvbmVEZWVwJztcblxuZXhwb3J0IGVudW0gRW51bUlQRlNUeXBlXG57XG5cdFVua25vd24sXG5cdENsaWVudCxcblx0Q29udHJvbGxlcixcbn1cblxuLyoqXG4gKiBjaGVjayBpcGZzIGlzIHdvcmtcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrSVBGUyhpcGZzKVxue1xuXHRhd2FpdCBpcGZzLmlkKCk7XG5cblx0cmV0dXJuIHRydWVcbn1cblxubGV0IF9jYWNoZWQ6IFJlYWRvbmx5PHtcblx0aXBmcyxcblx0aXBmc1R5cGU6IEVudW1JUEZTVHlwZSxcblx0c3RvcCguLi5hcmd2KTogUHJvbWlzZTx2b2lkPixcblx0YWRkcmVzcygpOiBQcm9taXNlPFJlYWRvbmx5PHtcblx0XHRTd2FybTogc3RyaW5nW10sXG5cdFx0QVBJOiBzdHJpbmcsXG5cdFx0R2F0ZXdheTogc3RyaW5nLFxuXHRcdERlbGVnYXRlczogc3RyaW5nW11cblx0fT4+XG59PjtcblxuLyoqXG4gKiBnZXQgSVBGUywgaWYgbm90IGV4aXN0cywgY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUlQRlMob3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRpZiAodHlwZW9mIF9jYWNoZWQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBfY2FjaGVkID09PSBudWxsKVxuXHR7XG5cdFx0bGV0IHJldCA9IGF3YWl0IGdldElQRlMob3B0aW9ucyk7XG5cdFx0Ly9jb25zb2xlLmRpcih7IGlwZnMsIGlwZnNUeXBlIH0pXG5cdFx0bGV0IHsgc3RvcDogY2xvc2VGbk9sZCwgaXBmcyB9ID0gcmV0O1xuXG5cdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGUpID0+IHtcblx0XHRcdFx0YXdhaXQgY2xvc2VGbk9sZCgpLmNhdGNoKGUgPT4gbnVsbCk7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcblx0XHRcdH0pXG5cdFx0O1xuXG5cdFx0bGV0IGJvb2wgPSB0cnVlO1xuXG5cdFx0Y29uc3Qgc3RvcCA9ICguLi5hcmd2KSA9PiB7XG5cdFx0XHRyZXR1cm4gYm9vbCAmJiBjbG9zZUZuT2xkKC4uLmFyZ3YpXG5cdFx0XHRcdC50aGVuKCgpID0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRib29sID0gdm9pZCAwO1xuXHRcdFx0XHRcdGlmIChfY2FjaGVkICYmIF9jYWNoZWQuaXBmcyA9PT0gaXBmcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRfY2FjaGVkID0gdm9pZCAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpcGZzID0gdm9pZCAwO1xuXHRcdFx0XHRcdGNsb3NlRm5PbGQgPSB2b2lkIDA7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmRlYnVnKGByZXNldCBfY2FjaGVkID0+IG51bGxgKVxuXHRcdFx0XHR9KVxuXHRcdH07XG5cblx0XHRfY2FjaGVkID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFx0XHQuLi5yZXQsXG5cdFx0XHRzdG9wLFxuXHRcdH0pO1xuXG5cdFx0cmV0ID0gdm9pZCAwO1xuXHR9XG5cblx0cmV0dXJuIF9jYWNoZWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT5cbntcblx0dHlwZT86IHN0cmluZyB8ICdqcycgfCAnZ28nIHwgJ3Byb2MnO1xuXHRpcGZzTW9kdWxlPzogYW55O1xuXHRpcGZzSHR0cE1vZHVsZT86IGFueTtcblx0aXBmc0Jpbj86IHN0cmluZztcblx0aXBmc09wdGlvbnM/OiB7XG5cdFx0RVhQRVJJTUVOVEFMPzoge1xuXHRcdFx0cHVic3ViPzogYm9vbGVhbjtcblx0XHRcdGlwbnNQdWJzdWI/OiBib29sZWFuO1xuXHRcdFx0c2hhcmRpbmc/OiBib29sZWFuO1xuXHRcdFx0ZGh0PzogYm9vbGVhbjtcblx0XHR9O1xuXHRcdHJlbGF5Pzoge1xuXHRcdFx0ZW5hYmxlZD86IGJvb2xlYW47XG5cdFx0XHRob3A/OiB7XG5cdFx0XHRcdGVuYWJsZWQ/OiBib29sZWFuO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdFtrOiBzdHJpbmddOiBhbnlcblx0fTtcblx0ZGlzcG9zYWJsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhJUEZTT3B0aW9ucyhvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdG9wdGlvbnMgPSBkZWZhdWx0c0RlZXAoe30sIG9wdGlvbnMsIHtcblx0XHR0eXBlOiAnanMnLFxuXHRcdC8vaXBmc01vZHVsZTogcmVxdWlyZSgnaXBmcycpLFxuXHRcdC8vaXBmc0h0dHBNb2R1bGU6IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKSxcblx0XHQvL2lwZnNCaW46IHJlcXVpcmUucmVzb2x2ZSgnaXBmcy9zcmMvY2xpL2Jpbi5qcycpLFxuXHRcdGlwZnNPcHRpb25zOiB7XG5cdFx0XHRFWFBFUklNRU5UQUw6IHtcblx0XHRcdFx0cHVic3ViOiB0cnVlLFxuXHRcdFx0XHRpcG5zUHVic3ViOiB0cnVlLFxuXHRcdFx0XHRzaGFyZGluZzogdHJ1ZSxcblx0XHRcdFx0ZGh0OiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHJlbGF5OiB7XG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdGhvcDoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGRpc3Bvc2FibGU6IGZhbHNlLFxuXHR9KTtcblxuXHRpZiAob3B0aW9ucy50eXBlID09PSdqcycgfHwgb3B0aW9ucy50eXBlID09PSdwcm9jJylcblx0e1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzTW9kdWxlID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNNb2R1bGUgPSByZXF1aXJlKCdpcGZzJylcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmlwZnNIdHRwTW9kdWxlID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNIdHRwTW9kdWxlID0gcmVxdWlyZSgnaXBmcy1odHRwLWNsaWVudCcpXG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzQmluID09PSAndW5kZWZpbmVkJylcblx0XHR7XG5cdFx0XHRvcHRpb25zLmlwZnNCaW4gPSByZXF1aXJlLnJlc29sdmUoJ2lwZnMvc3JjL2NsaS9iaW4uanMnKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvcHRpb25zO1xufVxuXG4vKipcbiAqIGNyZWF0ZSBvciBjb25uZWN0IGl0XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJUEZTKG9wdGlvbnM/OiBJT3B0aW9ucylcbntcblx0cmV0dXJuIG5ldyBQcm9taXNlPHR5cGVvZiBfY2FjaGVkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IGlwZnM7XG5cdFx0bGV0IGlwZnNkO1xuXHRcdGxldCBpcGZzVHlwZTogRW51bUlQRlNUeXBlID0gRW51bUlQRlNUeXBlLlVua25vd247XG5cblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpcGZzID0gYXdhaXQgSXBmc0NsaWVudCgpO1xuXHRcdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpO1xuXHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ2xpZW50O1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSlcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCA9IGF3YWl0IHN0YXJ0SVBGUyhvcHRpb25zKTtcblx0XHRcdFx0aXBmcyA9IGlwZnNkLmFwaTtcblx0XHRcdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpO1xuXHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5Db250cm9sbGVyO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRcdGF3YWl0IHN0b3AoKTtcblxuXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGUpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXN5bmMgZnVuY3Rpb24gc3RvcCgpXG5cdFx0e1xuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdGlwZnNkICYmIGF3YWl0IGlwZnNkLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXG5cdFx0XHR9XG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzICYmIGF3YWl0IGlwZnMuc3RvcCgpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cblx0XHRcdH1cblx0XHR9XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR0lOVCcsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdJTlRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub25jZSgnU0lHVEVSTScsICguLi5hcmd2KSA9PiB7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdURVJNXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ2V4aXQnLCAoLi4uYXJndikgPT4ge1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbZXhpdF0nLCAnc2h1dHRpbmcgZG93bi4uLicsIGFyZ3YpO1xuXHRcdFx0cmV0dXJuIHN0b3AoKVxuXHRcdH0pO1xuXG5cdFx0cmVzb2x2ZSh7XG5cdFx0XHRpcGZzLFxuXHRcdFx0aXBmc1R5cGUsXG5cdFx0XHRzdG9wLFxuXHRcdFx0YXN5bmMgYWRkcmVzcygpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBhZGRyID0gYXdhaXQgaXBmcy5jb25maWcuZ2V0KCdBZGRyZXNzZXMnKTtcblx0XHRcdFx0cmV0dXJuIGNsb25lRGVlcChhZGRyKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VJUEZTXG4iXX0=