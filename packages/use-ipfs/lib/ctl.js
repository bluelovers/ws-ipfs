"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfsd_ctl_1 = require("ipfsd-ctl");
const utils_1 = require("ipfsd-ctl/src/utils");
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const fs_1 = require("./util/fs");
const util_1 = require("./util");
const ipfsd_1 = require("./util/ipfsd");
async function startIPFS(options) {
    let ipfsd = await ipfsd_ctl_1.createController(ipfsd_1.fixIPFSOptions(options));
    let addr = utils_1.checkForRunningApi(ipfsd.path);
    if (addr) {
        let ipfs;
        try {
            ipfs = await ipfs_http_client_1.default(addr);
            await util_1.checkIPFS(ipfs);
        }
        catch (e) {
            try {
                await ipfs.stop();
            }
            catch (e) { }
            await fs_1.unlinkIPFSApi(ipfsd.path);
        }
        finally {
            try {
                await ipfs.stop();
            }
            catch (e) { }
            ipfs = void 0;
        }
    }
    !ipfsd.initialized && await ipfsd.init();
    !ipfsd.started && await ipfsd.start();
    await util_1.checkIPFS(ipfsd.api);
    return ipfsd;
}
exports.startIPFS = startIPFS;
exports.default = startIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3RsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQTZDO0FBQzdDLCtDQUF5RDtBQUN6RCx3RUFBMEM7QUFDMUMsa0NBQTBDO0FBQzFDLGlDQUFtQztBQUVuQyx3Q0FBOEM7QUFFdkMsS0FBSyxVQUFVLFNBQVMsQ0FBQyxPQUFrQjtJQUVqRCxJQUFJLEtBQUssR0FBRyxNQUFNLDRCQUFnQixDQUFDLHNCQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUU1RCxJQUFJLElBQUksR0FBRywwQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsSUFBSSxJQUFJLEVBQ1I7UUFDQyxJQUFJLElBQUksQ0FBQztRQUNULElBQ0E7WUFDQyxJQUFJLEdBQUcsTUFBTSwwQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE1BQU0sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtRQUNELE9BQU8sQ0FBQyxFQUNSO1lBQ0MsSUFDQTtnQkFDQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQjtZQUNELE9BQU8sQ0FBQyxFQUNSLEdBQUU7WUFFRixNQUFNLGtCQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO2dCQUVEO1lBQ0MsSUFDQTtnQkFDQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQjtZQUNELE9BQU8sQ0FBQyxFQUNSLEdBQUU7WUFFRixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDZDtLQUNEO0lBRUQsQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxNQUFNLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUV0QyxNQUFNLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLE9BQU8sS0FBSyxDQUFBO0FBQ2IsQ0FBQztBQTNDRCw4QkEyQ0M7QUFFRCxrQkFBZSxTQUFTLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250cm9sbGVyIH0gZnJvbSAnaXBmc2QtY3RsJztcbmltcG9ydCB7IGNoZWNrRm9yUnVubmluZ0FwaSB9IGZyb20gJ2lwZnNkLWN0bC9zcmMvdXRpbHMnO1xuaW1wb3J0IElwZnNDbGllbnQgZnJvbSAnaXBmcy1odHRwLWNsaWVudCc7XG5pbXBvcnQgeyB1bmxpbmtJUEZTQXBpIH0gZnJvbSAnLi91dGlsL2ZzJztcbmltcG9ydCB7IGNoZWNrSVBGUyB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZml4SVBGU09wdGlvbnMgfSBmcm9tICcuL3V0aWwvaXBmc2QnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRJUEZTKG9wdGlvbnM/OiBJT3B0aW9ucylcbntcblx0bGV0IGlwZnNkID0gYXdhaXQgY3JlYXRlQ29udHJvbGxlcihmaXhJUEZTT3B0aW9ucyhvcHRpb25zKSk7XG5cblx0bGV0IGFkZHIgPSBjaGVja0ZvclJ1bm5pbmdBcGkoaXBmc2QucGF0aCk7XG5cdGlmIChhZGRyKVxuXHR7XG5cdFx0bGV0IGlwZnM7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0aXBmcyA9IGF3YWl0IElwZnNDbGllbnQoYWRkcik7XG5cdFx0XHRhd2FpdCBjaGVja0lQRlMoaXBmcyk7XG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRhd2FpdCBpcGZzLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e31cblxuXHRcdFx0YXdhaXQgdW5saW5rSVBGU0FwaShpcGZzZC5wYXRoKTtcblx0XHR9XG5cdFx0ZmluYWxseVxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRhd2FpdCBpcGZzLnN0b3AoKTtcblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e31cblxuXHRcdFx0aXBmcyA9IHZvaWQgMDtcblx0XHR9XG5cdH1cblxuXHQhaXBmc2QuaW5pdGlhbGl6ZWQgJiYgYXdhaXQgaXBmc2QuaW5pdCgpO1xuXHQhaXBmc2Quc3RhcnRlZCAmJiBhd2FpdCBpcGZzZC5zdGFydCgpO1xuXG5cdGF3YWl0IGNoZWNrSVBGUyhpcGZzZC5hcGkpO1xuXG5cdHJldHVybiBpcGZzZFxufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFydElQRlNcbiJdfQ==