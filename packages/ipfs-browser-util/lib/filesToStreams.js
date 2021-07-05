"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesToStreams = void 0;
const tslib_1 = require("tslib");
const pull_file_reader2_1 = (0, tslib_1.__importDefault)(require("pull-file-reader2"));
/**
 * https://github.com/ipfs-shipyard/ipfs-webui/blob/master/src/lib/files.js
 */
async function filesToStreams(files) {
    const streams = [];
    for (const file of files) {
        const stream = (0, pull_file_reader2_1.default)(file);
        streams.push({
            path: file.filepath || file.webkitRelativePath || file.name,
            content: stream,
            size: file.size,
        });
    }
    return streams;
}
exports.filesToStreams = filesToStreams;
exports.default = filesToStreams;
//# sourceMappingURL=filesToStreams.js.map