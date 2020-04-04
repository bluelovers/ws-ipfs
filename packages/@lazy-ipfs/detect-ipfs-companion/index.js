"use strict";
/**
 * Created by user on 2020/4/5.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectIpfsWindowSync = exports.detectIpfsWindow = exports.detectIpfsCompanionSync = exports.detectIpfsCompanion = void 0;
const chrome_1 = require("./chrome");
Object.defineProperty(exports, "detectIpfsCompanion", { enumerable: true, get: function () { return chrome_1.detectIpfsCompanion; } });
Object.defineProperty(exports, "detectIpfsCompanionSync", { enumerable: true, get: function () { return chrome_1.detectIpfsCompanionSync; } });
const window_1 = require("./window");
Object.defineProperty(exports, "detectIpfsWindow", { enumerable: true, get: function () { return window_1.detectIpfsWindow; } });
Object.defineProperty(exports, "detectIpfsWindowSync", { enumerable: true, get: function () { return window_1.detectIpfsWindowSync; } });
exports.default = chrome_1.detectIpfsCompanion;
//# sourceMappingURL=index.js.map