"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAbortController = void 0;
const abort_controller_1 = __importDefault(require("abort-controller"));
function newAbortController(timeout) {
    const controller = new abort_controller_1.default();
    const timer = setTimeout(() => controller.abort(), timeout);
    return {
        controller,
        timer,
    };
}
exports.newAbortController = newAbortController;
//# sourceMappingURL=util.js.map