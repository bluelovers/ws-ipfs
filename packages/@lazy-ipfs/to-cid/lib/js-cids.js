"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJsCID = void 0;
const tslib_1 = require("tslib");
const cids_1 = tslib_1.__importDefault(require("cids"));
const multiformats_1 = tslib_1.__importDefault(require("./multiformats"));
const _handleLibCID_1 = require("./_handleLibCID");
function toJsCID(cidInput, libCID) {
    var _a, _b;
    libCID = (0, _handleLibCID_1._handleLibCID)(libCID, cids_1.default);
    return new libCID((_b = ((_a = (0, multiformats_1.default)(cidInput)) === null || _a === void 0 ? void 0 : _a.toString())) !== null && _b !== void 0 ? _b : cidInput);
}
exports.toJsCID = toJsCID;
//# sourceMappingURL=js-cids.js.map