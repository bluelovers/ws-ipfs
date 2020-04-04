"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAddresses = exports.mergeDefaultEXPERIMENTAL = exports.mergeDefaultOptions = exports.mergeDefaultConfig = void 0;
/**
 * Created by user on 2020/4/4.
 */
const config_1 = require("./config");
Object.defineProperty(exports, "mergeDefaultConfig", { enumerable: true, get: function () { return config_1.mergeDefaultConfig; } });
const options_1 = require("./options");
Object.defineProperty(exports, "mergeDefaultOptions", { enumerable: true, get: function () { return options_1.mergeDefaultOptions; } });
const EXPERIMENTAL_1 = require("./EXPERIMENTAL");
Object.defineProperty(exports, "mergeDefaultEXPERIMENTAL", { enumerable: true, get: function () { return EXPERIMENTAL_1.mergeDefaultEXPERIMENTAL; } });
const addresses_1 = require("./addresses");
Object.defineProperty(exports, "createDefaultAddresses", { enumerable: true, get: function () { return addresses_1.createDefaultAddresses; } });
exports.default = config_1.mergeDefaultConfig;
//# sourceMappingURL=index.js.map