"use strict";
/**
 * Created by user on 2020/4/3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokeURL = exports.pokeIPLD = void 0;
const ipld_1 = require("./lib/ipld");
Object.defineProperty(exports, "pokeIPLD", { enumerable: true, get: function () { return ipld_1.pokeIPLD; } });
const pokeURL_1 = require("./lib/pokeURL");
Object.defineProperty(exports, "pokeURL", { enumerable: true, get: function () { return pokeURL_1.pokeURL; } });
exports.default = ipld_1.pokeIPLD;
//# sourceMappingURL=index.js.map