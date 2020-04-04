"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDefaultEXPERIMENTAL = exports.mergeDefaultOptions = exports.mergeDefaultConfig = void 0;
/**
 * Created by user on 2020/4/4.
 */
const config_1 = __importDefault(require("./config"));
exports.mergeDefaultConfig = config_1.default;
const options_1 = __importDefault(require("./options"));
exports.mergeDefaultOptions = options_1.default;
const EXPERIMENTAL_1 = __importDefault(require("./EXPERIMENTAL"));
exports.mergeDefaultEXPERIMENTAL = EXPERIMENTAL_1.default;
exports.default = config_1.default;
//# sourceMappingURL=index.js.map