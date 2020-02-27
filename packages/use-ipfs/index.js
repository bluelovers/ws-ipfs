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
                    ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs], true)
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
                        ipfs = await core_1.some(ipfs_http_client_2.default, [fallbackServerArgvs], true)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9GQUF1RztBQUN2Ryw0REFBeUQ7QUFDekQsb0RBQWtDO0FBQ2xDLGlFQUF5QztBQUN6QyxxQ0FBc0Q7QUFDdEQsdUNBQW9FO0FBQ3BFLHdFQUE4QztBQWE5QyxJQUFJLE9BQXNCLENBQUM7QUFFM0I7O0dBRUc7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWtCLEVBQUUsZUFBOEIsRUFBRTtJQUVqRixJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLE9BQU8sS0FBSyxJQUFJLEVBQzdEO1FBQ0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsaUNBQWlDO1FBQ2pDLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUVyQyxNQUFNLGdCQUFTLENBQUMsSUFBSSxDQUFDO2FBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFbEIsTUFBTSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0Y7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1lBRXhCLE9BQU8sSUFBSSxJQUFJLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFFVixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQ3BDO29CQUNDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNkLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDcEIsd0NBQXdDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDO1FBRUYsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdkIsR0FBRyxHQUFHO1lBQ04sSUFBSTtTQUNKLENBQUMsQ0FBQztRQUVILEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUNiO0lBRUQsT0FBTyxPQUFPLENBQUE7QUFDZixDQUFDO0FBM0NELDBCQTJDQztBQUVEOztHQUVHO0FBQ0ksS0FBSyxVQUFVLE9BQU8sQ0FBQyxPQUFrQixFQUFFLGVBQThCLEVBQUU7SUFFakYsT0FBTyxJQUFJLE9BQU8sQ0FBZ0IsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUUzRCxJQUFJLElBQUksQ0FBQztRQUNULElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxRQUFRLEdBQWlCLG9CQUFZLENBQUMsT0FBTyxDQUFDO1FBRWxELE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUVqQixJQUFJLG1CQUEwQyxDQUFDO1lBRS9DLElBQUksT0FBTyxZQUFZLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFDdEQ7Z0JBQ0MsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQztnQkFFakQsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUN0QztZQUVELElBQ0E7Z0JBQ0MsSUFBSSxHQUFHLE1BQU0sMEJBQVUsRUFBRSxDQUFDO2dCQUMxQixNQUFNLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLFFBQVEsR0FBRyxvQkFBWSxDQUFDLE1BQU0sQ0FBQzthQUMvQjtZQUNELE9BQU8sQ0FBQyxFQUNSO2dCQUNDLElBQUksWUFBWSxDQUFDLGdCQUFnQixJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixDQUFDLE1BQU0sRUFDdEY7b0JBQ0MsSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLDBCQUFlLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLElBQUksQ0FBQzt5QkFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIsUUFBUSxHQUFHLG9CQUFZLENBQUMsY0FBYyxDQUFDO3dCQUN2QyxPQUFPLElBQUksQ0FBQztvQkFDYixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQ2pCO29CQUVELElBQUksSUFBSSxFQUNSO3dCQUNDLE9BQU87cUJBQ1A7aUJBQ0Q7Z0JBRUQsa0JBQWtCO2dCQUNsQixJQUNBO29CQUNDLEtBQUssR0FBRyxNQUFNLGFBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQ2pCLE1BQU0sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEIsUUFBUSxHQUFHLG9CQUFZLENBQUMsVUFBVSxDQUFDO2lCQUNuQztnQkFDRCxPQUFPLENBQUMsRUFDUjtvQkFDQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUViLElBQUksbUJBQW1CLElBQUksbUJBQW1CLENBQUMsTUFBTSxFQUNyRDt3QkFDQyxLQUFLLEdBQUcsU0FBUyxDQUFDO3dCQUVsQixJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsMEJBQWUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsSUFBSSxDQUFDOzZCQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQ1osa0JBQWtCOzRCQUNsQixRQUFRLEdBQUcsb0JBQVksQ0FBQyxjQUFjLENBQUM7NEJBQ3ZDLE9BQU8sSUFBSSxDQUFDO3dCQUNiLENBQUMsQ0FBQyxDQUNGO3dCQUVELElBQUksSUFBSSxFQUNSOzRCQUNDLE9BQU87eUJBQ1A7cUJBQ0Q7eUJBRUQ7d0JBQ0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDakI7b0JBRUQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ2hCO2FBQ0Q7UUFDRixDQUFDLENBQUMsRUFBRSxDQUFDO1FBRUwsS0FBSyxVQUFVLElBQUk7WUFFbEIsSUFDQTtnQkFDQyxLQUFLLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDNUI7WUFDRCxPQUFPLENBQUMsRUFDUjthQUVDO1lBRUQsSUFDQTtnQkFDQyxJQUFJLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUI7WUFDRCxPQUFPLENBQUMsRUFDUjthQUVDO1FBQ0YsQ0FBQztRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUVsQyxzREFBc0Q7WUFDdEQsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1lBRW5DLHVEQUF1RDtZQUN2RCxPQUFPLElBQUksRUFBRSxDQUFBO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFFaEMsb0RBQW9EO1lBQ3BELE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQztZQUNQLElBQUk7WUFDSixRQUFRO1lBQ1IsSUFBSTtZQUNKLEtBQUssQ0FBQyxPQUFPO2dCQUVaLElBQUksSUFBSSxHQUFHLE1BQU0sb0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsT0FBTyxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3ZCLENBQUM7U0FDRCxDQUFDLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFySUQsMEJBcUlDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElwZnNDbGllbnQsIHsgSUlQRlNDbGllbnRBZGRyZXNzZXMsIElJUEZTQ2xpZW50UGFyYW1ldGVycyB9IGZyb20gJ0BibHVlbG92ZXJzL2lwZnMtaHR0cC1jbGllbnQnO1xuaW1wb3J0IHsgc29tZSB9IGZyb20gJ0BibHVlbG92ZXJzL2lwZnMtaHR0cC1jbGllbnQvY29yZSc7XG5pbXBvcnQgc3RhcnRJUEZTIGZyb20gJy4vbGliL2N0bCc7XG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC9jbG9uZURlZXAnO1xuaW1wb3J0IHsgY2hlY2tJUEZTLCBpcGZzQWRkcmVzc2VzIH0gZnJvbSAnLi9saWIvdXRpbCc7XG5pbXBvcnQgeyBFbnVtSVBGU1R5cGUsIElPcHRpb25zLCBJT3B0aW9uc0V4dHJhIH0gZnJvbSAnLi9saWIvdHlwZXMnO1xuaW1wb3J0IF9pcGZzSHR0cE1vZHVsZSBmcm9tICdpcGZzLWh0dHAtY2xpZW50J1xuaW1wb3J0IHsgSUlQRlNBZGRyZXNzZXMgfSBmcm9tICdpcGZzLXR5cGVzJztcblxuaW50ZXJmYWNlIElDYWNoZWRPYmplY3QgZXh0ZW5kcyBSZWFkb25seTx7XG5cdGlwZnMsXG5cdGlwZnNUeXBlOiBFbnVtSVBGU1R5cGUsXG5cdHN0b3AoLi4uYXJndik6IFByb21pc2U8dm9pZD4sXG5cdGFkZHJlc3MoKTogUHJvbWlzZTxSZWFkb25seTxJSVBGU0FkZHJlc3Nlcz4+XG59Plxue1xuXG59XG5cbmxldCBfY2FjaGVkOiBJQ2FjaGVkT2JqZWN0O1xuXG4vKipcbiAqIGdldCBJUEZTLCBpZiBub3QgZXhpc3RzLCBjcmVhdGUgb3IgY29ubmVjdCBpdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXNlSVBGUyhvcHRpb25zPzogSU9wdGlvbnMsIG9wdGlvbnNFeHRyYTogSU9wdGlvbnNFeHRyYSA9IHt9KVxue1xuXHRpZiAodHlwZW9mIF9jYWNoZWQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBfY2FjaGVkID09PSBudWxsKVxuXHR7XG5cdFx0bGV0IHJldCA9IGF3YWl0IGdldElQRlMob3B0aW9ucyk7XG5cdFx0Ly9jb25zb2xlLmRpcih7IGlwZnMsIGlwZnNUeXBlIH0pXG5cdFx0bGV0IHsgc3RvcDogY2xvc2VGbk9sZCwgaXBmcyB9ID0gcmV0O1xuXG5cdFx0YXdhaXQgY2hlY2tJUEZTKGlwZnMpXG5cdFx0XHQuY2F0Y2goYXN5bmMgKGUpID0+XG5cdFx0XHR7XG5cdFx0XHRcdGF3YWl0IGNsb3NlRm5PbGQoKS5jYXRjaChlID0+IG51bGwpO1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG5cdFx0XHR9KVxuXHRcdDtcblxuXHRcdGxldCBib29sID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHN0b3AgPSAoLi4uYXJndikgPT5cblx0XHR7XG5cdFx0XHRyZXR1cm4gYm9vbCAmJiBjbG9zZUZuT2xkKC4uLmFyZ3YpXG5cdFx0XHRcdC50aGVuKCgpID0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRib29sID0gdm9pZCAwO1xuXHRcdFx0XHRcdGlmIChfY2FjaGVkICYmIF9jYWNoZWQuaXBmcyA9PT0gaXBmcylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRfY2FjaGVkID0gdm9pZCAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpcGZzID0gdm9pZCAwO1xuXHRcdFx0XHRcdGNsb3NlRm5PbGQgPSB2b2lkIDA7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmRlYnVnKGByZXNldCBfY2FjaGVkID0+IG51bGxgKVxuXHRcdFx0XHR9KVxuXHRcdH07XG5cblx0XHRfY2FjaGVkID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFx0XHQuLi5yZXQsXG5cdFx0XHRzdG9wLFxuXHRcdH0pO1xuXG5cdFx0cmV0ID0gdm9pZCAwO1xuXHR9XG5cblx0cmV0dXJuIF9jYWNoZWRcbn1cblxuLyoqXG4gKiBjcmVhdGUgb3IgY29ubmVjdCBpdFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SVBGUyhvcHRpb25zPzogSU9wdGlvbnMsIG9wdGlvbnNFeHRyYTogSU9wdGlvbnNFeHRyYSA9IHt9KVxue1xuXHRyZXR1cm4gbmV3IFByb21pc2U8SUNhY2hlZE9iamVjdD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT5cblx0e1xuXHRcdGxldCBpcGZzO1xuXHRcdGxldCBpcGZzZDtcblx0XHRsZXQgaXBmc1R5cGU6IEVudW1JUEZTVHlwZSA9IEVudW1JUEZTVHlwZS5Vbmtub3duO1xuXG5cdFx0YXdhaXQgKGFzeW5jICgpID0+XG5cdFx0e1xuXHRcdFx0bGV0IGZhbGxiYWNrU2VydmVyQXJndnM6IElJUEZTQ2xpZW50UGFyYW1ldGVycztcblxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zRXh0cmEuZmFsbGJhY2tTZXJ2ZXIgIT09ICd1bmRlZmluZWQnKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgZmFsbGJhY2tTZXJ2ZXIgPSBvcHRpb25zRXh0cmEuZmFsbGJhY2tTZXJ2ZXI7XG5cblx0XHRcdFx0ZmFsbGJhY2tTZXJ2ZXJBcmd2cyA9IFtmYWxsYmFja1NlcnZlcl1cblx0XHRcdH1cblxuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdGlwZnMgPSBhd2FpdCBJcGZzQ2xpZW50KCk7XG5cdFx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHRcdFx0aXBmc1R5cGUgPSBFbnVtSVBGU1R5cGUuQ2xpZW50O1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChvcHRpb25zRXh0cmEudXNlRmFsbGJhY2tGaXJzdCAmJiBmYWxsYmFja1NlcnZlckFyZ3ZzICYmIGZhbGxiYWNrU2VydmVyQXJndnMubGVuZ3RoKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXBmcyA9IGF3YWl0IHNvbWUoX2lwZnNIdHRwTW9kdWxlLCBbZmFsbGJhY2tTZXJ2ZXJBcmd2c10sIHRydWUpXG5cdFx0XHRcdFx0XHQudGhlbihpcGZzID0+IHtcblx0XHRcdFx0XHRcdFx0Ly9jaGVja0lQRlMoaXBmcyk7XG5cdFx0XHRcdFx0XHRcdGlwZnNUeXBlID0gRW51bUlQRlNUeXBlLkNsaWVudEZhbGxiYWNrO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaXBmcztcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuY2F0Y2goZSA9PiBudWxsKVxuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdGlmIChpcGZzKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSlcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpcGZzZCA9IGF3YWl0IHN0YXJ0SVBGUyhvcHRpb25zKTtcblx0XHRcdFx0XHRpcGZzID0gaXBmc2QuYXBpO1xuXHRcdFx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5Db250cm9sbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0YXdhaXQgc3RvcCgpO1xuXG5cdFx0XHRcdFx0aWYgKGZhbGxiYWNrU2VydmVyQXJndnMgJiYgZmFsbGJhY2tTZXJ2ZXJBcmd2cy5sZW5ndGgpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aXBmc2QgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRcdGlwZnMgPSBhd2FpdCBzb21lKF9pcGZzSHR0cE1vZHVsZSwgW2ZhbGxiYWNrU2VydmVyQXJndnNdLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHQudGhlbihpcGZzID0+IHtcblx0XHRcdFx0XHRcdFx0XHQvL2NoZWNrSVBGUyhpcGZzKTtcblx0XHRcdFx0XHRcdFx0XHRpcGZzVHlwZSA9IEVudW1JUEZTVHlwZS5DbGllbnRGYWxsYmFjaztcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaXBmcztcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0aWYgKGlwZnMpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHJlamVjdChlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkoKTtcblxuXHRcdGFzeW5jIGZ1bmN0aW9uIHN0b3AoKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRpcGZzZCAmJiBhd2FpdCBpcGZzZC5zdG9wKCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSlcblx0XHRcdHtcblxuXHRcdFx0fVxuXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0aXBmcyAmJiBhd2FpdCBpcGZzLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cHJvY2Vzcy5vbmNlKCdTSUdJTlQnLCAoLi4uYXJndikgPT5cblx0XHR7XG5cdFx0XHQvL2NvbnNvbGUuZGVidWcoJ1tTSUdJTlRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub25jZSgnU0lHVEVSTScsICguLi5hcmd2KSA9PlxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5kZWJ1ZygnW1NJR1RFUk1dJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub25jZSgnZXhpdCcsICguLi5hcmd2KSA9PlxuXHRcdHtcblx0XHRcdC8vY29uc29sZS5kZWJ1ZygnW2V4aXRdJywgJ3NodXR0aW5nIGRvd24uLi4nLCBhcmd2KTtcblx0XHRcdHJldHVybiBzdG9wKClcblx0XHR9KTtcblxuXHRcdHJlc29sdmUoe1xuXHRcdFx0aXBmcyxcblx0XHRcdGlwZnNUeXBlLFxuXHRcdFx0c3RvcCxcblx0XHRcdGFzeW5jIGFkZHJlc3MoKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgYWRkciA9IGF3YWl0IGlwZnNBZGRyZXNzZXMoaXBmcyk7XG5cdFx0XHRcdHJldHVybiBjbG9uZURlZXAoYWRkcilcblx0XHRcdH0sXG5cdFx0fSlcblx0fSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUlQRlNcbiJdfQ==