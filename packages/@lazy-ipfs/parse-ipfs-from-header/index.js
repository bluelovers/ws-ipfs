"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIpfsFromHeader = void 0;
const tslib_1 = require("tslib");
const value_from_record_1 = tslib_1.__importDefault(require("value-from-record"));
function parseIpfsFromHeader(headers) {
    var _a, _b;
    let xIpfsPath = ((_a = headers.get) === null || _a === void 0 ? void 0 : _a.call(headers, 'x-ipfs-path')) || ((_b = headers.get) === null || _b === void 0 ? void 0 : _b['X-Ipfs-Path']) || (0, value_from_record_1.default)('x-ipfs-path', headers);
    return {
        xIpfsPath,
    };
}
exports.parseIpfsFromHeader = parseIpfsFromHeader;
exports.default = parseIpfsFromHeader;
//# sourceMappingURL=index.js.map