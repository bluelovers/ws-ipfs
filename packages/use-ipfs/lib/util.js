"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function unlinkIPFSApi(ipfsPath) {
    let api = path_1.join(ipfsPath, 'api');
    let stat = fs_1.statSync(api);
    if (!stat.isFile()) {
        throw new Error(`target path not a file, ${api}`);
    }
    fs_1.unlinkSync(api);
}
exports.unlinkIPFSApi = unlinkIPFSApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBMEM7QUFDMUMsK0JBQTRCO0FBRTVCLFNBQWdCLGFBQWEsQ0FBQyxRQUFnQjtJQUU3QyxJQUFJLEdBQUcsR0FBRyxXQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLElBQUksSUFBSSxHQUFHLGFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUNsQjtRQUNDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDbEQ7SUFFRCxlQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQVhELHNDQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdW5saW5rU3luYywgc3RhdFN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtJUEZTQXBpKGlwZnNQYXRoOiBzdHJpbmcpXG57XG5cdGxldCBhcGkgPSBqb2luKGlwZnNQYXRoLCAnYXBpJyk7XG5cdGxldCBzdGF0ID0gc3RhdFN5bmMoYXBpKTtcblxuXHRpZiAoIXN0YXQuaXNGaWxlKCkpXG5cdHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYHRhcmdldCBwYXRoIG5vdCBhIGZpbGUsICR7YXBpfWApO1xuXHR9XG5cblx0dW5saW5rU3luYyhhcGkpO1xufVxuIl19