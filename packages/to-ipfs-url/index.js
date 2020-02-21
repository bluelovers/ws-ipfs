"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_ipfs_1 = __importDefault(require("is-ipfs"));
var EnumIPFSLinkType;
(function (EnumIPFSLinkType) {
    EnumIPFSLinkType["ipfs"] = "ipfs";
    EnumIPFSLinkType["ipld"] = "ipld";
    EnumIPFSLinkType["ipns"] = "ipns";
    EnumIPFSLinkType["Gateway"] = "ipfs";
    EnumIPFSLinkType["IPFS"] = "ipfs";
    EnumIPFSLinkType["IPLD"] = "ipld";
    EnumIPFSLinkType["IPNS"] = "ipns";
})(EnumIPFSLinkType = exports.EnumIPFSLinkType || (exports.EnumIPFSLinkType = {}));
function isPath(cid) {
    return is_ipfs_1.default.path(cid) || is_ipfs_1.default.ipnsPath(cid) || is_ipfs_1.default.cidPath(cid);
}
exports.isPath = isPath;
function isCidOrPath(cid) {
    return is_ipfs_1.default.cid(cid) || isPath(cid);
}
exports.isCidOrPath = isCidOrPath;
function pathToCid(cid) {
    return cid.replace(/^\/ip[nf]s\//, '');
}
exports.pathToCid = pathToCid;
function toURL(cid, options = {}) {
    if (typeof options === 'string') {
        options = {
            filename: options,
        };
    }
    if (!options.ignoreCheck && !isCidOrPath(cid)) {
        throw new TypeError(`cid '${cid}' is not valid ipfs`);
    }
    let { filename, type } = options || {};
    let prefix = `https://ipfs.io/ipfs/`;
    switch (type) {
        case EnumIPFSLinkType.IPLD:
            prefix = `https://explore.ipld.io/#/explore/`;
            break;
        case EnumIPFSLinkType.IPNS:
            //prefix = `https://gateway.ipfs.io/ipns/`;
            prefix = `https://ipfs.io/ipns/`;
            break;
    }
    if (isPath(cid)) {
        cid = pathToCid(cid);
    }
    let url = new URL(`${prefix}${cid}`);
    if (typeof filename === 'string' && filename.length > 0) {
        url.searchParams.set('filename', filename);
    }
    return url;
}
exports.toURL = toURL;
function toPath(cid, options) {
    return toURL(cid, options).pathname;
}
exports.toPath = toPath;
function toLink(cid, options) {
    return toURL(cid, options).href;
}
exports.toLink = toLink;
exports.default = toURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE2QjtBQUU3QixJQUFZLGdCQVdYO0FBWEQsV0FBWSxnQkFBZ0I7SUFFM0IsaUNBQWEsQ0FBQTtJQUNiLGlDQUFhLENBQUE7SUFDYixpQ0FBYSxDQUFBO0lBRWIsb0NBQWdCLENBQUE7SUFFaEIsaUNBQWEsQ0FBQTtJQUNiLGlDQUFhLENBQUE7SUFDYixpQ0FBYSxDQUFBO0FBQ2QsQ0FBQyxFQVhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBVzNCO0FBV0QsU0FBZ0IsTUFBTSxDQUFDLEdBQVc7SUFFakMsT0FBTyxpQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN2RSxDQUFDO0FBSEQsd0JBR0M7QUFFRCxTQUFnQixXQUFXLENBQUMsR0FBVztJQUV0QyxPQUFPLGlCQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QyxDQUFDO0FBSEQsa0NBR0M7QUFFRCxTQUFnQixTQUFTLENBQUMsR0FBVztJQUVwQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFIRCw4QkFHQztBQUVELFNBQWdCLEtBQUssQ0FBQyxHQUFXLEVBQUUsVUFBeUIsRUFBRTtJQUU3RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFDL0I7UUFDQyxPQUFPLEdBQUc7WUFDVCxRQUFRLEVBQUUsT0FBTztTQUNqQixDQUFBO0tBQ0Q7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFDN0M7UUFDQyxNQUFNLElBQUksU0FBUyxDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0tBQ3JEO0lBRUQsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ3ZDLElBQUksTUFBTSxHQUFHLHVCQUF1QixDQUFDO0lBRXJDLFFBQVEsSUFBSSxFQUNaO1FBQ0MsS0FBSyxnQkFBZ0IsQ0FBQyxJQUFJO1lBQ3pCLE1BQU0sR0FBRyxvQ0FBb0MsQ0FBQztZQUM5QyxNQUFNO1FBQ1AsS0FBSyxnQkFBZ0IsQ0FBQyxJQUFJO1lBQ3pCLDJDQUEyQztZQUMzQyxNQUFNLEdBQUcsdUJBQXVCLENBQUM7WUFDakMsTUFBTTtLQUNQO0lBRUQsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQ2Y7UUFDQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3BCO0lBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUVyQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDdkQ7UUFDQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDMUM7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUM7QUF6Q0Qsc0JBeUNDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUF1QjtJQUUxRCxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFBO0FBQ3BDLENBQUM7QUFIRCx3QkFHQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsT0FBdUI7SUFFMUQsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUNoQyxDQUFDO0FBSEQsd0JBR0M7QUFFRCxrQkFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaXNJUEZTIGZyb20gJ2lzLWlwZnMnO1xuXG5leHBvcnQgZW51bSBFbnVtSVBGU0xpbmtUeXBlXG57XG5cdGlwZnMgPSAnaXBmcycsXG5cdGlwbGQgPSAnaXBsZCcsXG5cdGlwbnMgPSAnaXBucycsXG5cblx0R2F0ZXdheSA9ICdpcGZzJyxcblxuXHRJUEZTID0gJ2lwZnMnLFxuXHRJUExEID0gJ2lwbGQnLFxuXHRJUE5TID0gJ2lwbnMnLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zXG57XG5cdHR5cGU/OiBFbnVtSVBGU0xpbmtUeXBlIHwgc3RyaW5nLFxuXHRmaWxlbmFtZT86IHN0cmluZyxcblx0aWdub3JlQ2hlY2s/OiBib29sZWFuLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0lucHV0ID0gSU9wdGlvbnMgfCBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGgoY2lkOiBzdHJpbmcpOiBib29sZWFuXG57XG5cdHJldHVybiBpc0lQRlMucGF0aChjaWQpIHx8IGlzSVBGUy5pcG5zUGF0aChjaWQpIHx8IGlzSVBGUy5jaWRQYXRoKGNpZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2lkT3JQYXRoKGNpZDogc3RyaW5nKTogYm9vbGVhblxue1xuXHRyZXR1cm4gaXNJUEZTLmNpZChjaWQpIHx8IGlzUGF0aChjaWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoVG9DaWQoY2lkOiBzdHJpbmcpOiBzdHJpbmdcbntcblx0cmV0dXJuIGNpZC5yZXBsYWNlKC9eXFwvaXBbbmZdc1xcLy8sICcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9VUkwoY2lkOiBzdHJpbmcsIG9wdGlvbnM6IElPcHRpb25zSW5wdXQgPSB7fSlcbntcblx0aWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJylcblx0e1xuXHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRmaWxlbmFtZTogb3B0aW9ucyxcblx0XHR9XG5cdH1cblxuXHRpZiAoIW9wdGlvbnMuaWdub3JlQ2hlY2sgJiYgIWlzQ2lkT3JQYXRoKGNpZCkpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBjaWQgJyR7Y2lkfScgaXMgbm90IHZhbGlkIGlwZnNgKVxuXHR9XG5cblx0bGV0IHsgZmlsZW5hbWUsIHR5cGUgfSA9IG9wdGlvbnMgfHwge307XG5cdGxldCBwcmVmaXggPSBgaHR0cHM6Ly9pcGZzLmlvL2lwZnMvYDtcblxuXHRzd2l0Y2ggKHR5cGUpXG5cdHtcblx0XHRjYXNlIEVudW1JUEZTTGlua1R5cGUuSVBMRDpcblx0XHRcdHByZWZpeCA9IGBodHRwczovL2V4cGxvcmUuaXBsZC5pby8jL2V4cGxvcmUvYDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgRW51bUlQRlNMaW5rVHlwZS5JUE5TOlxuXHRcdFx0Ly9wcmVmaXggPSBgaHR0cHM6Ly9nYXRld2F5LmlwZnMuaW8vaXBucy9gO1xuXHRcdFx0cHJlZml4ID0gYGh0dHBzOi8vaXBmcy5pby9pcG5zL2A7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdGlmIChpc1BhdGgoY2lkKSlcblx0e1xuXHRcdGNpZCA9IHBhdGhUb0NpZChjaWQpXG5cdH1cblxuXHRsZXQgdXJsID0gbmV3IFVSTChgJHtwcmVmaXh9JHtjaWR9YCk7XG5cblx0aWYgKHR5cGVvZiBmaWxlbmFtZSA9PT0gJ3N0cmluZycgJiYgZmlsZW5hbWUubGVuZ3RoID4gMClcblx0e1xuXHRcdHVybC5zZWFyY2hQYXJhbXMuc2V0KCdmaWxlbmFtZScsIGZpbGVuYW1lKVxuXHR9XG5cblx0cmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGF0aChjaWQ6IHN0cmluZywgb3B0aW9ucz86IElPcHRpb25zSW5wdXQpXG57XG5cdHJldHVybiB0b1VSTChjaWQsIG9wdGlvbnMpLnBhdGhuYW1lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0xpbmsoY2lkOiBzdHJpbmcsIG9wdGlvbnM/OiBJT3B0aW9uc0lucHV0KVxue1xuXHRyZXR1cm4gdG9VUkwoY2lkLCBvcHRpb25zKS5ocmVmXG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvVVJMXG4iXX0=