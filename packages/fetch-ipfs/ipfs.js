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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlwZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBZ0M7QUFDaEMsd0RBQWdDO0FBRWhDLFNBQWdCLE9BQU8sQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE9BQWdCO0lBRTFELE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFcEMsT0FBTyxrQkFBUSxDQUFDLE9BQU8sRUFBRTtTQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFFaEIsSUFBSSxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsT0FBTztZQUNQLEdBQUcsRUFBRSxLQUFLO1NBQ1YsQ0FBQyxFQUNGO1lBQ0MsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUNYO2dCQUNDLE9BQU8sa0JBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQy9CO2lCQUVEO2dCQUNDLE9BQU8sR0FBRyxDQUFBO2FBQ1Y7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQXRCRCwwQkFzQkM7QUFFRCxTQUFnQixPQUFPLENBQUMsR0FBVyxFQUFFLElBQUksRUFBRSxPQUFnQjtJQUUxRCxPQUFPLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRXBDLE9BQU8sT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7U0FDdkIsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN2QyxPQUFPO1lBQ1AsR0FBRyxFQUFFLEtBQUs7U0FDVixDQUFDLEVBQUU7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xCO1FBQ0QsT0FBTyxlQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdCLENBQUMsQ0FBQyxDQUNGO0FBQ0YsQ0FBQztBQWhCRCwwQkFnQkM7QUFFRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgQmx1ZWJpcmQgZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVmSVBGUyhjaWQ6IHN0cmluZywgaXBmcywgdGltZW91dD86IG51bWJlcilcbntcblx0dGltZW91dCA9IHRpbWVvdXQgfD0gMCB8fCAyMCAqIDEwMDA7XG5cblx0cmV0dXJuIEJsdWViaXJkLnJlc29sdmUoKVxuXHRcdC50aGVuKGFzeW5jICgpID0+XG5cdFx0e1xuXHRcdFx0Zm9yIGF3YWl0IChjb25zdCByZWYgb2YgaXBmcy5yZWZzKGNpZCwge1xuXHRcdFx0XHR0aW1lb3V0LFxuXHRcdFx0XHRwaW46IGZhbHNlLFxuXHRcdFx0fSkpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChyZWYuZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIEJsdWViaXJkLnJlamVjdChyZWYuZXJyKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiByZWZcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXRJUEZTKGNpZDogc3RyaW5nLCBpcGZzLCB0aW1lb3V0PzogbnVtYmVyKVxue1xuXHR0aW1lb3V0ID0gdGltZW91dCB8PSAwIHx8IDYwICogMTAwMDtcblxuXHRyZXR1cm4gcmVmSVBGUyhjaWQsIGlwZnMpXG5cdFx0LnRoZW4oYXN5bmMgKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2h1bmtzID0gW107XG5cdFx0XHRmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIGlwZnMuY2F0KGNpZCwge1xuXHRcdFx0XHR0aW1lb3V0LFxuXHRcdFx0XHRwaW46IGZhbHNlLFxuXHRcdFx0fSkpIHtcblx0XHRcdFx0Y2h1bmtzLnB1c2goY2h1bmspXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gQnVmZmVyLmNvbmNhdChjaHVua3MpXG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXRJUEZTXG4iXX0=