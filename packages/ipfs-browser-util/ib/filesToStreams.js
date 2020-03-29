"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesToStreams = void 0;
const pull_file_reader2_1 = __importDefault(require("pull-file-reader2"));
async function filesToStreams(files) {
    const streams = [];
    for (const file of files) {
        const stream = pull_file_reader2_1.default(file);
        streams.push({
            // @ts-ignore
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