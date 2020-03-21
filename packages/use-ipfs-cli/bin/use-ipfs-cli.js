#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_ipfs_1 = __importDefault(require("use-ipfs"));
exports.default = use_ipfs_1.default()
    .then(async ({ ipfs, address, }) => {
    console.log(await address());
    return ipfs;
});
//# sourceMappingURL=use-ipfs-cli.js.map