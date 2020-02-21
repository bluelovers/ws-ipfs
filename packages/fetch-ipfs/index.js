"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const to_ipfs_url_1 = require("to-ipfs-url");
const buffer_1 = require("buffer");
const abort_controller_1 = __importDefault(require("abort-controller"));
const ipfs_1 = __importDefault(require("./ipfs"));
const bluebird_1 = __importDefault(require("bluebird"));
const is_error_code_1 = __importDefault(require("is-error-code"));
async function fetchIPFS(cid, useIPFS, timeout) {
    if (useIPFS != null) {
        try {
            cid = new URL(cid).pathname;
        }
        catch (e) {
            if (!to_ipfs_url_1.isCidOrPath(cid)) {
                cid = to_ipfs_url_1.toPath(cid);
            }
        }
        return fetchIPFSCore(cid, useIPFS, timeout);
    }
    try {
        cid = new URL(cid).href;
    }
    catch (e) {
        cid = to_ipfs_url_1.toLink(cid);
    }
    return fetchIPFSCore(cid, useIPFS, timeout);
}
exports.fetchIPFS = fetchIPFS;
async function fetchIPFSCore(cid, useIPFS, timeout) {
    timeout = timeout |= 0 || 60 * 1000;
    if (useIPFS != null) {
        return ipfs_1.default(cid, useIPFS, timeout);
    }
    const controller = new abort_controller_1.default();
    const timer = setTimeout(() => controller.abort(), timeout);
    return bluebird_1.default.resolve(cross_fetch_1.default(cid, {
        redirect: 'follow',
        // @ts-ignore
        timeout,
        signal: controller.signal,
    }))
        .finally(() => clearTimeout(timer))
        .tap(v => {
        if (is_error_code_1.default(v.status)) {
            let e = new Error(v.statusText);
            // @ts-ignore
            e.res = v;
            return Promise.reject(e);
        }
    })
        .then(v => v.arrayBuffer())
        .then(buf => buffer_1.Buffer.from(buf));
}
exports.fetchIPFSCore = fetchIPFSCore;
exports.default = fetchIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFnQztBQUNoQyw2Q0FBaUU7QUFFakUsbUNBQWdDO0FBQ2hDLHdFQUErQztBQUMvQyxrREFBNkI7QUFDN0Isd0RBQWdDO0FBQ2hDLGtFQUF3QztBQUdqQyxLQUFLLFVBQVUsU0FBUyxDQUFDLEdBQVcsRUFBRSxPQUFRLEVBQUUsT0FBZ0I7SUFFdEUsSUFBSSxPQUFPLElBQUksSUFBSSxFQUNuQjtRQUNDLElBQ0E7WUFDQyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFBO1NBQzNCO1FBQ0QsT0FBTyxDQUFDLEVBQ1I7WUFDQyxJQUFJLENBQUMseUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFDckI7Z0JBQ0MsR0FBRyxHQUFHLG9CQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDakI7U0FDRDtRQUVELE9BQU8sYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDM0M7SUFFRCxJQUNBO1FBQ0MsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQTtLQUN2QjtJQUNELE9BQU8sQ0FBQyxFQUNSO1FBQ0MsR0FBRyxHQUFHLG9CQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDakI7SUFFRCxPQUFPLGFBQWEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzVDLENBQUM7QUE3QkQsOEJBNkJDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXLEVBQUUsT0FBUSxFQUFFLE9BQWdCO0lBRTFFLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUNuQjtRQUNDLE9BQU8sY0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7S0FDckM7SUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLDBCQUFlLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxVQUFVLENBQ3ZCLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFDeEIsT0FBTyxDQUNQLENBQUM7SUFFRixPQUFPLGtCQUFRLENBQUMsT0FBTyxDQUFDLHFCQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2pDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLGFBQWE7UUFDYixPQUFPO1FBQ1AsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO0tBQ3pCLENBQTZCLENBQUM7U0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDUixJQUFJLHVCQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUN6QjtZQUNDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoQyxhQUFhO1lBQ2IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDVixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDeEI7SUFDRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUM5QjtBQUNGLENBQUM7QUFsQ0Qsc0NBa0NDO0FBRUQsa0JBQWUsU0FBUyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcbmltcG9ydCB0b1VSTCwgeyB0b1BhdGgsIHRvTGluaywgaXNDaWRPclBhdGggfSBmcm9tICd0by1pcGZzLXVybCc7XG5pbXBvcnQgeyBjaWQgYXMgaXNJUEZTIH0gZnJvbSAnaXMtaXBmcyc7XG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgQWJvcnRDb250cm9sbGVyIGZyb20gJ2Fib3J0LWNvbnRyb2xsZXInO1xuaW1wb3J0IGNhdElQRlMgZnJvbSAnLi9pcGZzJztcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgaXNFcnJvckNvZGUgZnJvbSAnaXMtZXJyb3ItY29kZSc7XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSVBGUyhjaWQ6IHN0cmluZywgdXNlSVBGUz8sIHRpbWVvdXQ/OiBudW1iZXIpXG57XG5cdGlmICh1c2VJUEZTICE9IG51bGwpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHRjaWQgPSBuZXcgVVJMKGNpZCkucGF0aG5hbWVcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e1xuXHRcdFx0aWYgKCFpc0NpZE9yUGF0aChjaWQpKVxuXHRcdFx0e1xuXHRcdFx0XHRjaWQgPSB0b1BhdGgoY2lkKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmZXRjaElQRlNDb3JlKGNpZCwgdXNlSVBGUywgdGltZW91dClcblx0fVxuXG5cdHRyeVxuXHR7XG5cdFx0Y2lkID0gbmV3IFVSTChjaWQpLmhyZWZcblx0fVxuXHRjYXRjaCAoZSlcblx0e1xuXHRcdGNpZCA9IHRvTGluayhjaWQpXG5cdH1cblxuXHRyZXR1cm4gZmV0Y2hJUEZTQ29yZShjaWQsIHVzZUlQRlMsIHRpbWVvdXQpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaElQRlNDb3JlKGNpZDogc3RyaW5nLCB1c2VJUEZTPywgdGltZW91dD86IG51bWJlcilcbntcblx0dGltZW91dCA9IHRpbWVvdXQgfD0gMCB8fCA2MCAqIDEwMDA7XG5cblx0aWYgKHVzZUlQRlMgIT0gbnVsbClcblx0e1xuXHRcdHJldHVybiBjYXRJUEZTKGNpZCwgdXNlSVBGUywgdGltZW91dClcblx0fVxuXG5cdGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cdGNvbnN0IHRpbWVyID0gc2V0VGltZW91dChcblx0XHQoKSA9PiBjb250cm9sbGVyLmFib3J0KCksXG5cdFx0dGltZW91dCxcblx0KTtcblxuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZShmZXRjaChjaWQsIHtcblx0XHRcdHJlZGlyZWN0OiAnZm9sbG93Jyxcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHRpbWVvdXQsXG5cdFx0XHRzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuXHRcdH0pIGFzIFJldHVyblR5cGU8dHlwZW9mIGZldGNoPilcblx0XHQuZmluYWxseSgoKSA9PiBjbGVhclRpbWVvdXQodGltZXIpKVxuXHRcdC50YXAodiA9PiB7XG5cdFx0XHRpZiAoaXNFcnJvckNvZGUodi5zdGF0dXMpKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgZSA9IG5ldyBFcnJvcih2LnN0YXR1c1RleHQpO1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGUucmVzID0gdjtcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGUpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHQudGhlbih2ID0+IHYuYXJyYXlCdWZmZXIoKSlcblx0XHQudGhlbihidWYgPT4gQnVmZmVyLmZyb20oYnVmKSlcblx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZXRjaElQRlNcblxuIl19