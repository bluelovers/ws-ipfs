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
        for await (const chunk of ipfs.cat(cid, { timeout })) {
            chunks.push(chunk);
        }
        return buffer_1.Buffer.concat(chunks);
    });
}
exports.catIPFS = catIPFS;
exports.default = catIPFS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlwZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsd0RBQWdDO0FBRWhDLFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE9BQWdCO0lBRTFELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsT0FBTyxrQkFBUSxDQUFDLE9BQU8sRUFBRTtTQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFFaEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUNuRDtZQUNDLElBQUksR0FBRyxDQUFDLEdBQUcsRUFDWDtnQkFDQyxPQUFPLGtCQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUMvQjtpQkFFRDtnQkFDQyxPQUFPLEdBQUcsQ0FBQTthQUNWO1NBQ0Q7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFuQkQsMEJBbUJDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFJLEVBQUUsT0FBZ0I7SUFFMUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUVwQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1NBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbEI7UUFDRCxPQUFPLGVBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDN0IsQ0FBQyxDQUFDLENBQ0Y7QUFDRixDQUFDO0FBYkQsMEJBYUM7QUFFRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVmSVBGUyhjaWQ6IHN0cmluZywgaXBmcywgdGltZW91dD86IG51bWJlcilcbntcblx0dGltZW91dCA9IHRpbWVvdXQgfD0gMCB8fCAyMCAqIDEwMDA7XG5cblx0cmV0dXJuIEJsdWViaXJkLnJlc29sdmUoKVxuXHRcdC50aGVuKGFzeW5jICgpID0+XG5cdFx0e1xuXHRcdFx0Zm9yIGF3YWl0IChjb25zdCByZWYgb2YgaXBmcy5yZWZzKGNpZCwgeyB0aW1lb3V0IH0pKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAocmVmLmVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBCbHVlYmlyZC5yZWplY3QocmVmLmVycilcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gcmVmXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2F0SVBGUyhjaWQ6IHN0cmluZywgaXBmcywgdGltZW91dD86IG51bWJlcilcbntcblx0dGltZW91dCA9IHRpbWVvdXQgfD0gMCB8fCA2MCAqIDEwMDA7XG5cblx0cmV0dXJuIHJlZklQRlMoY2lkLCBpcGZzKVxuXHRcdC50aGVuKGFzeW5jICgpID0+IHtcblx0XHRcdGNvbnN0IGNodW5rcyA9IFtdO1xuXHRcdFx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBpcGZzLmNhdChjaWQsIHsgdGltZW91dCB9KSkge1xuXHRcdFx0XHRjaHVua3MucHVzaChjaHVuaylcblx0XHRcdH1cblx0XHRcdHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcylcblx0XHR9KVxuXHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhdElQRlNcbiJdfQ==