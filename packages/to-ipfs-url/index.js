"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_ipfs_1 = require("is-ipfs");
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
function toURL(cid, options = {}) {
    if (!is_ipfs_1.cid(cid)) {
        throw new TypeError(`cid '${cid}' is not valid ipfs`);
    }
    if (typeof options === 'string') {
        options = {
            filename: options,
        };
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
    let url = new URL(`${prefix}${cid}`);
    if (typeof filename === 'string' && filename.length > 0) {
        url.searchParams.set('filename', filename);
    }
    return url;
}
exports.toURL = toURL;
function toLink(cid, options) {
    return toURL(cid, options).href;
}
exports.toLink = toLink;
exports.default = toURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF3QztBQUV4QyxJQUFZLGdCQVdYO0FBWEQsV0FBWSxnQkFBZ0I7SUFFM0IsaUNBQWEsQ0FBQTtJQUNiLGlDQUFhLENBQUE7SUFDYixpQ0FBYSxDQUFBO0lBRWIsb0NBQWdCLENBQUE7SUFFaEIsaUNBQWEsQ0FBQTtJQUNiLGlDQUFhLENBQUE7SUFDYixpQ0FBYSxDQUFBO0FBQ2QsQ0FBQyxFQVhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBVzNCO0FBVUQsU0FBZ0IsS0FBSyxDQUFDLEdBQVcsRUFBRSxVQUF5QixFQUFFO0lBRTdELElBQUksQ0FBQyxhQUFNLENBQUMsR0FBRyxDQUFDLEVBQ2hCO1FBQ0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsQ0FBQTtLQUNyRDtJQUVELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUMvQjtRQUNDLE9BQU8sR0FBRztZQUNULFFBQVEsRUFBRSxPQUFPO1NBQ2pCLENBQUE7S0FDRDtJQUVELElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN2QyxJQUFJLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQztJQUVyQyxRQUFRLElBQUksRUFDWjtRQUNDLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtZQUN6QixNQUFNLEdBQUcsb0NBQW9DLENBQUM7WUFDOUMsTUFBTTtRQUNQLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtZQUN6QiwyQ0FBMkM7WUFDM0MsTUFBTSxHQUFHLHVCQUF1QixDQUFDO1lBQ2pDLE1BQU07S0FDUDtJQUVELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFckMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3ZEO1FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQzFDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBcENELHNCQW9DQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxHQUFXLEVBQUUsT0FBdUI7SUFFMUQsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUNoQyxDQUFDO0FBSEQsd0JBR0M7QUFFRCxrQkFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjaWQgYXMgaXNJUEZTIH0gZnJvbSAnaXMtaXBmcyc7XG5cbmV4cG9ydCBlbnVtIEVudW1JUEZTTGlua1R5cGVcbntcblx0aXBmcyA9ICdpcGZzJyxcblx0aXBsZCA9ICdpcGxkJyxcblx0aXBucyA9ICdpcG5zJyxcblxuXHRHYXRld2F5ID0gJ2lwZnMnLFxuXG5cdElQRlMgPSAnaXBmcycsXG5cdElQTEQgPSAnaXBsZCcsXG5cdElQTlMgPSAnaXBucycsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNcbntcblx0dHlwZT86IEVudW1JUEZTTGlua1R5cGUgfCBzdHJpbmcsXG5cdGZpbGVuYW1lPzogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBJT3B0aW9uc0lucHV0ID0gSU9wdGlvbnMgfCBzdHJpbmc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1VSTChjaWQ6IHN0cmluZywgb3B0aW9uczogSU9wdGlvbnNJbnB1dCA9IHt9KVxue1xuXHRpZiAoIWlzSVBGUyhjaWQpKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgY2lkICcke2NpZH0nIGlzIG5vdCB2YWxpZCBpcGZzYClcblx0fVxuXG5cdGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHRvcHRpb25zID0ge1xuXHRcdFx0ZmlsZW5hbWU6IG9wdGlvbnMsXG5cdFx0fVxuXHR9XG5cblx0bGV0IHsgZmlsZW5hbWUsIHR5cGUgfSA9IG9wdGlvbnMgfHwge307XG5cdGxldCBwcmVmaXggPSBgaHR0cHM6Ly9pcGZzLmlvL2lwZnMvYDtcblxuXHRzd2l0Y2ggKHR5cGUpXG5cdHtcblx0XHRjYXNlIEVudW1JUEZTTGlua1R5cGUuSVBMRDpcblx0XHRcdHByZWZpeCA9IGBodHRwczovL2V4cGxvcmUuaXBsZC5pby8jL2V4cGxvcmUvYDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgRW51bUlQRlNMaW5rVHlwZS5JUE5TOlxuXHRcdFx0Ly9wcmVmaXggPSBgaHR0cHM6Ly9nYXRld2F5LmlwZnMuaW8vaXBucy9gO1xuXHRcdFx0cHJlZml4ID0gYGh0dHBzOi8vaXBmcy5pby9pcG5zL2A7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdGxldCB1cmwgPSBuZXcgVVJMKGAke3ByZWZpeH0ke2NpZH1gKTtcblxuXHRpZiAodHlwZW9mIGZpbGVuYW1lID09PSAnc3RyaW5nJyAmJiBmaWxlbmFtZS5sZW5ndGggPiAwKVxuXHR7XG5cdFx0dXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2ZpbGVuYW1lJywgZmlsZW5hbWUpXG5cdH1cblxuXHRyZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9MaW5rKGNpZDogc3RyaW5nLCBvcHRpb25zPzogSU9wdGlvbnNJbnB1dClcbntcblx0cmV0dXJuIHRvVVJMKGNpZCwgb3B0aW9ucykuaHJlZlxufVxuXG5leHBvcnQgZGVmYXVsdCB0b1VSTFxuIl19