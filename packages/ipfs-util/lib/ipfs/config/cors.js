"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configApiCors = void 0;
const setConfigIfNotExists_1 = require("../../util/setConfigIfNotExists");
async function configApiCors(ipfs) {
    let ls = [];
    let bool;
    bool = await (0, setConfigIfNotExists_1.setConfigIfNotExists)(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Origin', [
        '*',
        "http://webui.ipfs.io.ipns.localhost:8080",
        "http://webui.ipfs.io.ipns.localhost:9090",
        "http://localhost:3000",
        "http://127.0.0.1:5001",
        "http://127.0.0.1:5002",
        'https://webui.ipfs.io',
        'https://dev.webui.ipfs.io',
    ]);
    ls.push(bool);
    bool = await (0, setConfigIfNotExists_1.setConfigIfNotExists)(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Methods', (0, setConfigIfNotExists_1.fillEntryIfNotExists)([
        'HEAD',
        'PUT',
        'GET',
        'POST',
        'OPTIONS',
    ]));
    ls.push(bool);
    bool = await (0, setConfigIfNotExists_1.setConfigIfNotExists)(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Headers', ['Authorization']);
    ls.push(bool);
    bool = await (0, setConfigIfNotExists_1.setConfigIfNotExists)(ipfs, 'API.HTTPHeaders.Access-Control-Expose-Headers', ['Location']);
    ls.push(bool);
    bool = await (0, setConfigIfNotExists_1.setConfigIfNotExists)(ipfs, 'API.HTTPHeaders.Access-Control-Allow-Credentials', ['true']);
    ls.push(bool);
    return ls;
}
exports.configApiCors = configApiCors;
exports.default = configApiCors;
//# sourceMappingURL=cors.js.map