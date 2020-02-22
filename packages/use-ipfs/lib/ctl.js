"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfsd_ctl_1 = require("ipfsd-ctl");
const index_1 = require("../index");
const utils_1 = require("ipfsd-ctl/src/utils");
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const util_1 = require("./util");
async function startIPFS(options) {
    let ipfsd = await ipfsd_ctl_1.createController(index_1.fixIPFSOptions(options));
    let addr = utils_1.checkForRunningApi(ipfsd.path);
    if (addr) {
        let ipfs;
        try {
            ipfs = await ipfs_http_client_1.default(addr);
            await index_1.checkIPFS(ipfs);
        }
        catch (e) {
            try {
                await ipfs.stop();
            }
            catch (e) { }
            await util_1.unlinkIPFSApi(ipfsd.path);
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
    await index_1.checkIPFS(ipfsd.api);
    return ipfsd;
}
exports.startIPFS = startIPFS;
exports.default = startIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3RsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUNBQTZDO0FBQzdDLG9DQUErRDtBQUMvRCwrQ0FBeUQ7QUFDekQsd0VBQTBDO0FBQzFDLGlDQUF1QztBQUVoQyxLQUFLLFVBQVUsU0FBUyxDQUFDLE9BQWtCO0lBRWpELElBQUksS0FBSyxHQUFHLE1BQU0sNEJBQWdCLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTVELElBQUksSUFBSSxHQUFHLDBCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxJQUFJLElBQUksRUFDUjtRQUNDLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFDQTtZQUNDLElBQUksR0FBRyxNQUFNLDBCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTSxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxDQUFDLEVBQ1I7WUFDQyxJQUNBO2dCQUNDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxDQUFDLEVBQ1IsR0FBRTtZQUVGLE1BQU0sb0JBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7Z0JBRUQ7WUFDQyxJQUNBO2dCQUNDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxDQUFDLEVBQ1IsR0FBRTtZQUVGLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNkO0tBQ0Q7SUFFRCxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXRDLE1BQU0saUJBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFM0IsT0FBTyxLQUFLLENBQUE7QUFDYixDQUFDO0FBM0NELDhCQTJDQztBQUVELGtCQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRyb2xsZXIgfSBmcm9tICdpcGZzZC1jdGwnO1xuaW1wb3J0IHsgSU9wdGlvbnMsIGZpeElQRlNPcHRpb25zLCBjaGVja0lQRlMgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBjaGVja0ZvclJ1bm5pbmdBcGkgfSBmcm9tICdpcGZzZC1jdGwvc3JjL3V0aWxzJztcbmltcG9ydCBJcGZzQ2xpZW50IGZyb20gJ2lwZnMtaHR0cC1jbGllbnQnO1xuaW1wb3J0IHsgdW5saW5rSVBGU0FwaSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydElQRlMob3B0aW9ucz86IElPcHRpb25zKVxue1xuXHRsZXQgaXBmc2QgPSBhd2FpdCBjcmVhdGVDb250cm9sbGVyKGZpeElQRlNPcHRpb25zKG9wdGlvbnMpKTtcblxuXHRsZXQgYWRkciA9IGNoZWNrRm9yUnVubmluZ0FwaShpcGZzZC5wYXRoKTtcblx0aWYgKGFkZHIpXG5cdHtcblx0XHRsZXQgaXBmcztcblx0XHR0cnlcblx0XHR7XG5cdFx0XHRpcGZzID0gYXdhaXQgSXBmc0NsaWVudChhZGRyKTtcblx0XHRcdGF3YWl0IGNoZWNrSVBGUyhpcGZzKTtcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e1xuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdGF3YWl0IGlwZnMuc3RvcCgpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7fVxuXG5cdFx0XHRhd2FpdCB1bmxpbmtJUEZTQXBpKGlwZnNkLnBhdGgpO1xuXHRcdH1cblx0XHRmaW5hbGx5XG5cdFx0e1xuXHRcdFx0dHJ5XG5cdFx0XHR7XG5cdFx0XHRcdGF3YWl0IGlwZnMuc3RvcCgpO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7fVxuXG5cdFx0XHRpcGZzID0gdm9pZCAwO1xuXHRcdH1cblx0fVxuXG5cdCFpcGZzZC5pbml0aWFsaXplZCAmJiBhd2FpdCBpcGZzZC5pbml0KCk7XG5cdCFpcGZzZC5zdGFydGVkICYmIGF3YWl0IGlwZnNkLnN0YXJ0KCk7XG5cblx0YXdhaXQgY2hlY2tJUEZTKGlwZnNkLmFwaSk7XG5cblx0cmV0dXJuIGlwZnNkXG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0SVBGU1xuIl19