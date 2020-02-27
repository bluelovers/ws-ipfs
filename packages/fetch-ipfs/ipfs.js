"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const bluebird_1 = __importDefault(require("bluebird"));
function refIPFS(cid, ipfs, timeout) {
    timeout = timeout |= 0 || 20 * 1000;
    return bluebird_1.default.resolve()
        .then(async () => {
        for await (const ref of ipfs.refs(cid, {
            timeout,
            pin: false,
        })) {
            if (ref.err) {
                return Promise.reject(ref.err);
            }
            else {
                return ref;
            }
        }
    });
}
exports.refIPFS = refIPFS;
function catIPFS(cid, ipfs, timeout) {
    timeout = timeout |= 0 || 60 * 1000;
    return refIPFS(cid, ipfs)
        .catch(Error, async (e) => {
        if (e.message && e.message.toLowerCase().includes('ipfs method not allowed')) {
            console.warn(String(e).replace(/\s+$/, ''), `\nurl: ${e.response.url}`, `\nwill ignore this error and trying fetch content`);
            return;
        }
        return Promise.reject(e);
    })
        .then(async () => {
        const chunks = [];
        for await (const chunk of ipfs.cat(cid, {
            timeout,
            pin: false,
        })) {
            chunks.push(chunk);
        }
        return buffer_1.Buffer.concat(chunks);
    });
}
exports.catIPFS = catIPFS;
exports.default = catIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlwZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsd0RBQWdDO0FBRWhDLFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE9BQWdCO0lBRTFELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsT0FBTyxrQkFBUSxDQUFDLE9BQU8sRUFBRTtTQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFFaEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsT0FBTztZQUNQLEdBQUcsRUFBRSxLQUFLO1NBQ1YsQ0FBQyxFQUNGO1lBQ0MsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUNYO2dCQUNDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDOUI7aUJBRUQ7Z0JBQ0MsT0FBTyxHQUFHLENBQUE7YUFDVjtTQUNEO0lBQ0YsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBdEJELDBCQXNCQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE9BQWdCO0lBRTFELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztTQUN2QixLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUVwQixFQUFFLEVBQUU7UUFDSixJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsRUFDNUU7WUFDQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxtREFBbUQsQ0FBQyxDQUFDO1lBQzdILE9BQU87U0FDUDtRQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6QixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDaEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ3ZDLE9BQU87WUFDUCxHQUFHLEVBQUUsS0FBSztTQUNWLENBQUMsRUFBRTtZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbEI7UUFDRCxPQUFPLGVBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0IsQ0FBQyxDQUFDLENBQ0Y7QUFDRixDQUFDO0FBM0JELDBCQTJCQztBQUVELGtCQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gXCJidWZmZXJcIjtcbmltcG9ydCBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZJUEZTKGNpZDogc3RyaW5nLCBpcGZzLCB0aW1lb3V0PzogbnVtYmVyKVxue1xuXHR0aW1lb3V0ID0gdGltZW91dCB8PSAwIHx8IDIwICogMTAwMDtcblxuXHRyZXR1cm4gQmx1ZWJpcmQucmVzb2x2ZSgpXG5cdFx0LnRoZW4oYXN5bmMgKCkgPT5cblx0XHR7XG5cdFx0XHRmb3IgYXdhaXQgKGNvbnN0IHJlZiBvZiBpcGZzLnJlZnMoY2lkLCB7XG5cdFx0XHRcdHRpbWVvdXQsXG5cdFx0XHRcdHBpbjogZmFsc2UsXG5cdFx0XHR9KSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKHJlZi5lcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QocmVmLmVycilcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gcmVmXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2F0SVBGUyhjaWQ6IHN0cmluZywgaXBmcywgdGltZW91dD86IG51bWJlcilcbntcblx0dGltZW91dCA9IHRpbWVvdXQgfD0gMCB8fCA2MCAqIDEwMDA7XG5cblx0cmV0dXJuIHJlZklQRlMoY2lkLCBpcGZzKVxuXHRcdC5jYXRjaChFcnJvciwgYXN5bmMgKGU6IEVycm9yICYge1xuXHRcdFx0cmVzcG9uc2U/OiBSZXNwb25zZVxuXHRcdH0pID0+IHtcblx0XHRcdGlmIChlLm1lc3NhZ2UgJiYgZS5tZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2lwZnMgbWV0aG9kIG5vdCBhbGxvd2VkJykpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUud2FybihTdHJpbmcoZSkucmVwbGFjZSgvXFxzKyQvLCAnJyksIGBcXG51cmw6ICR7ZS5yZXNwb25zZS51cmx9YCwgYFxcbndpbGwgaWdub3JlIHRoaXMgZXJyb3IgYW5kIHRyeWluZyBmZXRjaCBjb250ZW50YCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGUpXG5cdFx0fSlcblx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBjaHVua3MgPSBbXTtcblx0XHRcdGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXBmcy5jYXQoY2lkLCB7XG5cdFx0XHRcdHRpbWVvdXQsXG5cdFx0XHRcdHBpbjogZmFsc2UsXG5cdFx0XHR9KSkge1xuXHRcdFx0XHRjaHVua3MucHVzaChjaHVuaylcblx0XHRcdH1cblx0XHRcdHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcylcblx0XHR9KVxuXHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhdElQRlNcbiJdfQ==