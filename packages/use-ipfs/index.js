"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = __importDefault(require("@bluelovers/ipfs-http-client"));
const core_1 = require("@bluelovers/ipfs-http-client/core");
const ctl_1 = __importDefault(require("./lib/ctl"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const util_1 = require("./lib/util");
const types_1 = require("./lib/types");
const ipfs_http_client_2 = __importDefault(require("ipfs-http-client"));
let _cached;
/**
 * get IPFS, if not exists, create or connect it
 */
async function useIPFS(options, optionsExtra = {}) {
    if (typeof _cached === 'undefined' || typeof _cached === null) {
        let ret = await getIPFS(options);
        //console.dir({ ipfs, ipfsType })
        let { stop: closeFnOld, ipfs } = ret;
        await util_1.checkIPFS(ipfs)
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
async function getIPFS(options, optionsExtra = {}) {
    return new Promise(async (resolve, reject) => {
        let ipfs;
        let ipfsd;
        let ipfsType = types_1.EnumIPFSType.Unknown;
        await (async () => {
            let fallbackServerArgvs;
            if (typeof optionsExtra.fallbackServer !== 'undefined') {
                let fallbackServer = optionsExtra.fallbackServer;
                fallbackServerArgvs = [fallbackServer];
            }
            try {
                ipfs = await ipfs_http_client_1.default();
                await util_1.checkIPFS(ipfs);
                ipfsType = types_1.EnumIPFSType.Client;
            }
            catch (e) {
                if (optionsExtra.useFallbackFirst && fallbackServerArgvs && fallbackServerArgvs.length) {
                    ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs])
                        .then(ipfs => {
                        //checkIPFS(ipfs);
                        ipfsType = types_1.EnumIPFSType.ClientFallback;
                        return ipfs;
                    })
                        .catch(e => null);
                    if (ipfs) {
                        return;
                    }
                }
                //console.error(e)
                try {
                    ipfsd = await ctl_1.default(options);
                    ipfs = ipfsd.api;
                    await util_1.checkIPFS(ipfs);
                    ipfsType = types_1.EnumIPFSType.Controller;
                }
                catch (e) {
                    await stop();
                    if (fallbackServerArgvs && fallbackServerArgvs.length) {
                        ipfsd = undefined;
                        ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs])
                            .then(ipfs => {
                            //checkIPFS(ipfs);
                            ipfsType = types_1.EnumIPFSType.ClientFallback;
                            return ipfs;
                        });
                        if (ipfs) {
                            return;
                        }
                    }
                    else {
                        console.error(e);
                    }
                    return reject(e);
                }
            }
        })();
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
                let addr = await util_1.ipfsAddresses(ipfs);
                return cloneDeep_1.default(addr);
            },
        });
    });
}
exports.getIPFS = getIPFS;
exports.default = useIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUF1RztBQUN2Ryw0REFBeUQ7QUFDekQsb0RBQWtDO0FBQ2xDLGlFQUF5QztBQUN6QyxxQ0FBc0Q7QUFDdEQsdUNBQW9FO0FBQ3BFLHdFQUE4QztBQWE5QyxJQUFJLE9BQXNCLENBQUM7QUFFM0I7O0dBRUc7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWtCLEVBQUUsZUFBOEIsRUFBRTtJQUVqRixJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQzdEO1FBQ0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsaUNBQWlDO1FBQ2pDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVyQyxNQUFNLGdCQUFTLENBQUMsSUFBSSxDQUFDO2FBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFbEIsTUFBTSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0Y7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1lBRXhCLE9BQU8sSUFBSSxJQUFJLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFFVixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQ3BDO29C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Q2xpZW50LCB7IElJUEZTQ2xpZW50QWRkcmVzc2VzLCBJSVBGU0NsaWVudFBhcmFtZXRlcnMgfSBmcm9tICdAYmx1ZWxvdmVycy9pcGZzLWh0dHAtY2xpZW50JztcbmltcG9ydCB7IHNvbWUgfSBmcm9tICdAYmx1ZWxvdmVycy9pcGZzLWh0dHAtY2xpZW50L2NvcmUnO1xuaW1wb3J0IHN0YXJ0SVBGUyBmcm9tICcuL2xpYi9jdGwnO1xuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2gvY2xvbmVEZWVwJztcbmltcG9ydCB7IGNoZWNrSVBGUywgaXBmc0FkZHJlc3NlcyB9IGZyb20gJy4vbGliL3V0aWwnO1xuaW1wb3J0IHsgRW51bUlQRlNUeXBlLCBJT3B0aW9ucywgSU9wdGlvbnNFeHRyYSB9IGZyb20gJy4vbGliL3R5cGVzJztcbmltcG9ydCBfaXBmc0h0dHBNb2R1bGUgZnJvbSAnaXBmcy1odHRwLWNsaWVudCdcbmltcG9ydCB7IElJUEZTQWRkcmVzc2VzIH0gZnJvbSAnaXBmcy10eXBlcyc7XG5cbmludGVyZmFjZSBJQ2FjaGVkT2JqZWN0IGV4dGVuZHMgUmVhZG9ubHk8e1xuXHRpcGZzLFxuXHRpcGZzVHlwZTogRW51bUlQRlNUeXBlLFxuXHRzdG9wKC4uLmFyZ3YpOiBQcm9taXNlPHZvaWQ+LFxuXHRhZGRyZXNzKCk6IFByb21pc2U8UmVhZG9ubHk8SUlQRlNBZGRyZXNzZXM+PlxufT5cbntcblxufVxuXG5sZXQgX2NhY2hlZDogSUNhY2hlZE9iamVjdDtcblxuLyoqXG4gKiBnZXQgSVBGUywgaWYgbm90IGV4aXN0cywgY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUlQRlMob3B0aW9ucz86IElPcHRpb25zLCBvcHRpb25zRXh0cmE6IElPcHRpb25zRXh0cmEgPSB7fSlcbntcblx0aWYgKHR5cGVvZiBfY2FjaGVkID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgX2NhY2hlZCA9PT0gbnVsbClcblx0e1xuXHRcdGxldCByZXQgPSBhd2FpdCBnZXRJUEZTKG9wdGlvbnMpO1xuXHRcdC8vY29uc29sZS5kaXIoeyBpcGZzLCBpcGZzVHlwZSB9KVxuXHRcdGxldCB7IHN0b3A6IGNsb3NlRm5PbGQsIGlwZnMgfSA9IHJldDtcblxuXHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKVxuXHRcdFx0LmNhdGNoKGFzeW5jIChlKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRhd2FpdCBjbG9zZUZuT2xkKCkuY2F0Y2goZSA9PiBudWxsKTtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xuXHRcdFx0fSlcblx0XHQ7XG5cblx0XHRsZXQgYm9vbCA9IHRydWU7XG5cblx0XHRjb25zdCBzdG9wID0gKC4uLmFyZ3YpID0+XG5cdFx0e1xuXHRcdFx0cmV0dXJuIGJvb2wgJiYgY2xvc2VGbk9sZCguLi5hcmd2KVxuXHRcdFx0XHQudGhlbigoKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ym9vbCA9IHZvaWQgMDtcblx0XHRcdFx0XHRpZiAoX2NhY2hlZCAmJiBfY2FjaGVkLmlwZnMgPT09IGlwZnMpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0X2NhY2hlZCA9IHZvaWQgMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aXBmcyA9IHZvaWQgMDtcblx0XHRcdFx0XHRjbG9zZUZuT2xkID0gdm9pZCAwO1xuXHRcdFx0XHRcdC8vY29uc29sZS5kZWJ1ZyhgcmVzZXQgX2NhY2hlZCA9PiBudWxsYClcblx0XHRcdFx0fSlcblx0XHR9O1xuXG5cdFx0X2NhY2hlZCA9IE9iamVjdC5mcmVlemUoe1xuXHRcdFx0Li4ucmV0LFxuXHRcdFx0c3RvcCxcblx0XHR9KTtcblxuXHRcdHJldCA9IHZvaWQgMDtcblx0fVxuXG5cdHJldHVybiBfY2FjaGVkXG59XG5cbi8qKlxuICogY3JlYXRlIG9yIGNvbm5lY3QgaXRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldElQRlMob3B0aW9ucz86IElPcHRpb25zLCBvcHRpb25zRXh0cmE6IElPcHRpb25zRXh0cmEgPSB7fSlcbntcblx0cmV0dXJuIG5ldyBQcm9taXNlPElDYWNoZWRPYmplY3Q+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+XG5cdHtcblx0XHRsZXQgaXBmcztcblx0XHRsZXQgaXBmc2Q7XG5cdFx0bGV0IGlwZnNUeXBlOiBFbnVtSVBGU1R5cGUgPSBFbnVtSVBGU1R5cGUuVW5rbm93bjtcblxuXHRcdGF3YWl0IChhc3luYyAoKSA9PlxuXHRcdHtcblx0XHRcdGxldCBmYWxsYmFja1NlcnZlckFyZ3ZzOiBJSVBGU0NsaWVudFBhcmFtZXRlcnM7XG5cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uc0V4dHJhLmZhbGxiYWNrU2VydmVyICE9PSAndW5kZWZpbmVkJylcblx0XHRcdHtcblx0XHRcdFx0bGV0IGZhbGxiYWNrU2VydmVyID0gb3B0aW9uc0V4dHJhLmZhbGxiYWNrU2VydmVyO1xuXG5cdFx0XHRcdGZhbGxiYWNrU2VydmVyQXJndnMgPSBbZmFsbGJhY2tTZXJ2ZXJdXG5cdFx0XHR9XG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzID0gYXdhaXQgSXBmc0NsaWVudCgpO1xuXHRcdFx0XHRhd2FpdCBjaGVja0lQRlMoaXBmcyk7XG5cdFx0XHRcdGlwZnNUeXBlID0gRW51bUlQRlNUeXBlLkNsaWVudDtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAob3B0aW9uc0V4dHJhLnVzZUZhbGxiYWNrRmlyc3QgJiYgZmFsbGJhY2tTZXJ2ZXJBcmd2cyAmJiBmYWxsYmFja1NlcnZlckFyZ3ZzLmxlbmd0aClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlwZnMgPSBhd2FpdCBzb21lKF9pcGZzSHR0cE1vZHVsZSwgW2ZhbGxiYWNrU2VydmVyQXJndnNdKVxuXHRcdFx0XHRcdFx0LnRoZW4oaXBmcyA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vY2hlY2tJUEZTKGlwZnMpO1xuXHRcdFx0XHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5DbGllbnRGYWxsYmFjaztcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGlwZnM7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKGUgPT4gbnVsbClcblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRpZiAoaXBmcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9jb25zb2xlLmVycm9yKGUpXG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXBmc2QgPSBhd2FpdCBzdGFydElQRlMob3B0aW9ucyk7XG5cdFx0XHRcdFx0aXBmcyA9IGlwZnNkLmFwaTtcblx0XHRcdFx0XHRhd2FpdCBjaGVja0lQRlMoaXBmcyk7XG5cdFx0XHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ29udHJvbGxlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGF3YWl0IHN0b3AoKTtcblxuXHRcdFx0XHRcdGlmIChmYWxsYmFja1NlcnZlckFyZ3ZzICYmIGZhbGxiYWNrU2VydmVyQXJndnMubGVuZ3RoKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlwZnNkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRcdFx0XHRpcGZzID0gYXdhaXQgc29tZShfaXBmc0h0dHBNb2R1bGUsIFtmYWxsYmFja1NlcnZlckFyZ3ZzXSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oaXBmcyA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly9jaGVja0lQRlMoaXBmcyk7XG5cdFx0XHRcdFx0XHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ2xpZW50RmFsbGJhY2s7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGlwZnM7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdGlmIChpcGZzKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiByZWplY3QoZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pKCk7XG5cblx0XHRhc3luYyBmdW5jdGlvbiBzdG9wKClcblx0XHR7XG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmc2QgJiYgYXdhaXQgaXBmc2Quc3RvcCgpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cblx0XHRcdH1cblxuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdGlwZnMgJiYgYXdhaXQgaXBmcy5zdG9wKCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSlcblx0XHRcdHtcblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHByb2Nlc3Mub25jZSgnU0lHSU5UJywgKC4uLmFyZ3YpID0+XG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmRlYnVnKCdbU0lHSU5UXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ1NJR1RFUk0nLCAoLi4uYXJndikgPT5cblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdURVJNXScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRwcm9jZXNzLm9uY2UoJ2V4aXQnLCAoLi4uYXJndikgPT5cblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tleGl0XScsICdzaHV0dGluZyBkb3duLi4uJywgYXJndik7XG5cdFx0XHRyZXR1cm4gc3RvcCgpXG5cdFx0fSk7XG5cblx0XHRyZXNvbHZlKHtcblx0XHRcdGlwZnMsXG5cdFx0XHRpcGZzVHlwZSxcblx0XHRcdHN0b3AsXG5cdFx0XHRhc3luYyBhZGRyZXNzKClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGFkZHIgPSBhd2FpdCBpcGZzQWRkcmVzc2VzKGlwZnMpO1xuXHRcdFx0XHRyZXR1cm4gY2xvbmVEZWVwKGFkZHIpXG5cdFx0XHR9LFxuXHRcdH0pXG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VJUEZTXG4iXX0=