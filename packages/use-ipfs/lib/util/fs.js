"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
function unlinkIPFSApi(ipfsPath) {
    let api = path_1.join(ipfsPath, 'api');
    let stat = fs_1.statSync(api);
    if (!stat.isFile()) {
        throw new Error(`target path not a file, ${api}`);
    }
    fs_1.unlinkSync(api);
}
exports.unlinkIPFSApi = unlinkIPFSApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwyQkFBMEM7QUFFMUMsU0FBZ0IsYUFBYSxDQUFDLFFBQWdCO0lBRTdDLElBQUksR0FBRyxHQUFHLFdBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsSUFBSSxJQUFJLEdBQUcsYUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQ2xCO1FBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUNsRDtJQUVELGVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBWEQsc0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IHN0YXRTeW5jLCB1bmxpbmtTeW5jIH0gZnJvbSBcImZzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtJUEZTQXBpKGlwZnNQYXRoOiBzdHJpbmcpXG57XG5cdGxldCBhcGkgPSBqb2luKGlwZnNQYXRoLCAnYXBpJyk7XG5cdGxldCBzdGF0ID0gc3RhdFN5bmMoYXBpKTtcblxuXHRpZiAoIXN0YXQuaXNGaWxlKCkpXG5cdHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYHRhcmdldCBwYXRoIG5vdCBhIGZpbGUsICR7YXBpfWApO1xuXHR9XG5cblx0dW5saW5rU3luYyhhcGkpO1xufVxuIl19