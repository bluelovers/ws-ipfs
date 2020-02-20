"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_source_1 = __importDefault(require("ipfs-utils/src/files/url-source"));
const index_1 = __importDefault(require("./index"));
const BufferList_1 = __importDefault(require("bl/BufferList"));
async function fromUrl(url, options) {
    const buf = new BufferList_1.default();
    for await (const file of url_source_1.default(url)) {
        for await (const chunk of file.content) {
            buf.append(chunk);
        }
    }
    return index_1.default(buf, options);
}
exports.fromUrl = fromUrl;
exports.default = fromUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUZBQXdEO0FBQ3hELG9EQUE2QztBQUM3QywrREFBdUM7QUFFaEMsS0FBSyxVQUFVLE9BQU8sQ0FBQyxHQUFXLEVBQUUsT0FBa0I7SUFFNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUM7SUFDN0IsSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksb0JBQVMsQ0FBQyxHQUFHLENBQUMsRUFDdkM7UUFDQyxJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUN0QztZQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakI7S0FDRDtJQUVELE9BQU8sZUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUM5QixDQUFDO0FBWkQsMEJBWUM7QUFFRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXJsU291cmNlIGZyb20gJ2lwZnMtdXRpbHMvc3JjL2ZpbGVzL3VybC1zb3VyY2UnO1xuaW1wb3J0IGlwZnNIYXNoLCB7IElPcHRpb25zIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgQnVmZmVyTGlzdCBmcm9tICdibC9CdWZmZXJMaXN0JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZyb21VcmwodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9ucylcbntcblx0Y29uc3QgYnVmID0gbmV3IEJ1ZmZlckxpc3QoKTtcblx0Zm9yIGF3YWl0IChjb25zdCBmaWxlIG9mIHVybFNvdXJjZSh1cmwpKVxuXHR7XG5cdFx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBmaWxlLmNvbnRlbnQpXG5cdFx0e1xuXHRcdFx0YnVmLmFwcGVuZChjaHVuaylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaXBmc0hhc2goYnVmLCBvcHRpb25zKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmcm9tVXJsXG4iXX0=