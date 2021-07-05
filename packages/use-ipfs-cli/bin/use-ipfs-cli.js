#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const use_ipfs_1 = (0, tslib_1.__importDefault)(require("use-ipfs"));
exports.default = (0, use_ipfs_1.default)()
    .then(async ({ ipfs, address, }) => {
    console.log(await address());
    return ipfs;
});
//# sourceMappingURL=use-ipfs-cli.js.map