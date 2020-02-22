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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWlwZnMtY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlLWlwZnMtY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLHdEQUErQjtBQUUvQixrQkFBZSxrQkFBTyxFQUFFO0tBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFDWixJQUFJLEVBQ0osT0FBTyxHQUNQLEVBQUUsRUFBRTtJQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRTdCLE9BQU8sSUFBSSxDQUFBO0FBQ1osQ0FBQyxDQUFDLENBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB1c2VJUEZTIGZyb20gJ3VzZS1pcGZzJztcblxuZXhwb3J0IGRlZmF1bHQgdXNlSVBGUygpXG5cdC50aGVuKGFzeW5jICh7XG5cdFx0aXBmcyxcblx0XHRhZGRyZXNzLFxuXHR9KSA9PiB7XG5cblx0XHRjb25zb2xlLmxvZyhhd2FpdCBhZGRyZXNzKCkpO1xuXG5cdFx0cmV0dXJuIGlwZnNcblx0fSlcbjtcbiJdfQ==