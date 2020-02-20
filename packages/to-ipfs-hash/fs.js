"use strict";
/**
 * Created by user on 2020/2/21.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const index_1 = __importDefault(require("./index"));
function fromFile(file, options) {
    return fs_extra_1.readFile(file).then(buf => index_1.default(buf, options));
}
exports.fromFile = fromFile;
exports.default = fromFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsdUNBQW9DO0FBQ3BDLG9EQUE2QztBQUU3QyxTQUFnQixRQUFRLENBQUMsSUFBOEIsRUFBRSxPQUFrQjtJQUUxRSxPQUFPLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQzFELENBQUM7QUFIRCw0QkFHQztBQUVELGtCQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMjAvMi8yMS5cbiAqL1xuXG5pbXBvcnQgeyByZWFkRmlsZSB9IGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBpcGZzSGFzaCwgeyBJT3B0aW9ucyB9IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbUZpbGUoZmlsZTogc3RyaW5nIHwgQnVmZmVyIHwgbnVtYmVyLCBvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdHJldHVybiByZWFkRmlsZShmaWxlKS50aGVuKGJ1ZiA9PiBpcGZzSGFzaChidWYsIG9wdGlvbnMpKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmcm9tRmlsZVxuIl19