"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleOptions = void 0;
const unsafe_https_agent_1 = require("unsafe-https-agent");
const abort_controller_timer_1 = require("abort-controller-timer");
function _handleOptions(options) {
    var _a, _b;
    options !== null && options !== void 0 ? options : (options = {});
    let fetchOptions = {
        method: 'HEAD',
        ...options.fetchOptions,
    };
    (_a = fetchOptions.agent) !== null && _a !== void 0 ? _a : (fetchOptions.agent = (0, unsafe_https_agent_1.getUnSafeAgent)());
    (_b = fetchOptions.signal) !== null && _b !== void 0 ? _b : (fetchOptions.signal = options.signal);
    let controller;
    if (!fetchOptions.signal) {
        controller = new abort_controller_timer_1.AbortControllerTimer((options === null || options === void 0 ? void 0 : options.timeout) || 10 * 1000);
        fetchOptions.signal = controller.signal;
    }
    return {
        ...options,
        fetchOptions,
        controller,
    };
}
exports._handleOptions = _handleOptions;
//# sourceMappingURL=_handleOptions.js.map