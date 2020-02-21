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
        for await (const ref of ipfs.refs(cid, { timeout })) {
            if (ref.err) {
                return bluebird_1.default.reject(ref.err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlwZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsd0RBQWdDO0FBRWhDLFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE9BQWdCO0lBRTFELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsT0FBTyxrQkFBUSxDQUFDLE9BQU8sRUFBRTtTQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFFaEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUNuRDtZQUNDLElBQUksR0FBRyxDQUFDLEdBQUcsRUFDWDtnQkFDQyxPQUFPLGtCQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMvQjtpQkFFRDtnQkFDQyxPQUFPLEdBQUcsQ0FBQTthQUNWO1NBQ0Q7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFuQkQsMEJBbUJDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBZ0I7SUFFMUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUVwQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1NBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDdkMsT0FBTztZQUNQLEdBQUcsRUFBRSxLQUFLO1NBQ1YsQ0FBQyxFQUFFO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNsQjtRQUNELE9BQU8sZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixDQUFDLENBQUMsQ0FDRjtBQUNGLENBQUM7QUFoQkQsMEJBZ0JDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZklQRlMoY2lkOiBzdHJpbmcsIGlwZnMsIHRpbWVvdXQ/OiBudW1iZXIpXG57XG5cdHRpbWVvdXQgPSB0aW1lb3V0IHw9IDAgfHwgMjAgKiAxMDAwO1xuXG5cdHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKClcblx0XHQudGhlbihhc3luYyAoKSA9PlxuXHRcdHtcblx0XHRcdGZvciBhd2FpdCAoY29uc3QgcmVmIG9mIGlwZnMucmVmcyhjaWQsIHsgdGltZW91dCB9KSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKHJlZi5lcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gQmx1ZWJpcmQucmVqZWN0KHJlZi5lcnIpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIHJlZlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhdElQRlMoY2lkOiBzdHJpbmcsIGlwZnMsIHRpbWVvdXQ/OiBudW1iZXIpXG57XG5cdHRpbWVvdXQgPSB0aW1lb3V0IHw9IDAgfHwgNjAgKiAxMDAwO1xuXG5cdHJldHVybiByZWZJUEZTKGNpZCwgaXBmcylcblx0XHQudGhlbihhc3luYyAoKSA9PiB7XG5cdFx0XHRjb25zdCBjaHVua3MgPSBbXTtcblx0XHRcdGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXBmcy5jYXQoY2lkLCB7XG5cdFx0XHRcdHRpbWVvdXQsXG5cdFx0XHRcdHBpbjogZmFsc2UsXG5cdFx0XHR9KSkge1xuXHRcdFx0XHRjaHVua3MucHVzaChjaHVuaylcblx0XHRcdH1cblx0XHRcdHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcylcblx0XHR9KVxuXHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhdElQRlNcbiJdfQ==