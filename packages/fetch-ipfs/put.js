"use strict";
/**
 * Created by user on 2020/3/23.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var all_1 = require("./lib/put/all");
Object.defineProperty(exports, "publishToIPFSAll", { enumerable: true, get: function () { return all_1.publishToIPFSAll; } });
const all_2 = require("./lib/put/all");
var race_1 = require("./lib/put/race");
Object.defineProperty(exports, "publishToIPFSRace", { enumerable: true, get: function () { return race_1.publishToIPFSRace; } });
exports.default = all_2.publishToIPFSAll;
//# sourceMappingURL=put.js.map