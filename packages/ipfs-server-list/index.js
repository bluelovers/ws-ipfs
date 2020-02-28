"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getIpfsServerList() {
    let data = {
        /**
         * http://blog.hubwiz.com/2019/09/11/infura-dev-manual/
         * http://cw.hubwiz.com/card/c/infura-api/1/4/3/
         * https://github.com/Pedro-vk/ipfs-website-deployer/blob/master/src/ipfs-website-deployer-cli.ts
         */
        'infura.io': {
            API: {
                port: 5001,
                host: 'ipfs.infura.io',
                protocol: 'https',
            },
            Gateway: 'https://ipfs.infura.io/ipfs/',
            limit: {
                ref: false,
                id: false,
                config: false,
                ls: false,
            },
        },
    };
    data;
    return data;
}
exports.getIpfsServerList = getIpfsServerList;
exports.ipfsServerList = getIpfsServerList();
exports.default = exports.ipfsServerList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLFNBQWdCLGlCQUFpQjtJQUVoQyxJQUFJLElBQUksR0FBRztRQUNWOzs7O1dBSUc7UUFDSCxXQUFXLEVBQUU7WUFDWixHQUFHLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsUUFBUSxFQUFFLE9BQU87YUFDakI7WUFDRCxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLEtBQUssRUFBRTtnQkFDTixHQUFHLEVBQUUsS0FBSztnQkFDVixFQUFFLEVBQUUsS0FBSztnQkFDVCxNQUFNLEVBQUUsS0FBSztnQkFDYixFQUFFLEVBQUUsS0FBSzthQUNUO1NBQ0Q7S0FDUSxDQUFDO0lBRTBCLElBQUssQ0FBQztJQUUzQyxPQUFPLElBQTBGLENBQUE7QUFDbEcsQ0FBQztBQTNCRCw4Q0EyQkM7QUFFWSxRQUFBLGNBQWMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBRWxELGtCQUFlLHNCQUFjLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVFNSZXF1aXJlQXRMZWFzdE9uZSwgSVRTUGFydGlhbFJlY29yZCB9IGZyb20gJ3RzLXR5cGUnXG5pbXBvcnQgeyBJSVBGU0NsaWVudEFkZHJlc3NlcyB9IGZyb20gJ0BibHVlbG92ZXJzL2lwZnMtaHR0cC1jbGllbnQnO1xuXG5leHBvcnQgdHlwZSBJTGltaXQgPSBJVFNQYXJ0aWFsUmVjb3JkPCdyZWYnIHwgJ2lkJyB8ICdjb25maWcnLCBib29sZWFuPjtcblxuZXhwb3J0IHR5cGUgSUlQRlNBZGRyZXNzZXNMaWtlID0gSVRTUmVxdWlyZUF0TGVhc3RPbmU8e1xuXHRcIkFQSVwiOiBJSVBGU0NsaWVudEFkZHJlc3Nlcyxcblx0XCJHYXRld2F5XCI6IHN0cmluZyxcblx0bGltaXQ/OiBJVFNSZXF1aXJlQXRMZWFzdE9uZTxJTGltaXQ+LFxufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJcGZzU2VydmVyTGlzdCgpXG57XG5cdGxldCBkYXRhID0ge1xuXHRcdC8qKlxuXHRcdCAqIGh0dHA6Ly9ibG9nLmh1Yndpei5jb20vMjAxOS8wOS8xMS9pbmZ1cmEtZGV2LW1hbnVhbC9cblx0XHQgKiBodHRwOi8vY3cuaHVid2l6LmNvbS9jYXJkL2MvaW5mdXJhLWFwaS8xLzQvMy9cblx0XHQgKiBodHRwczovL2dpdGh1Yi5jb20vUGVkcm8tdmsvaXBmcy13ZWJzaXRlLWRlcGxveWVyL2Jsb2IvbWFzdGVyL3NyYy9pcGZzLXdlYnNpdGUtZGVwbG95ZXItY2xpLnRzXG5cdFx0ICovXG5cdFx0J2luZnVyYS5pbyc6IHtcblx0XHRcdEFQSToge1xuXHRcdFx0XHRwb3J0OiA1MDAxLFxuXHRcdFx0XHRob3N0OiAnaXBmcy5pbmZ1cmEuaW8nLFxuXHRcdFx0XHRwcm90b2NvbDogJ2h0dHBzJyxcblx0XHRcdH0sXG5cdFx0XHRHYXRld2F5OiAnaHR0cHM6Ly9pcGZzLmluZnVyYS5pby9pcGZzLycsXG5cdFx0XHRsaW1pdDoge1xuXHRcdFx0XHRyZWY6IGZhbHNlLFxuXHRcdFx0XHRpZDogZmFsc2UsXG5cdFx0XHRcdGNvbmZpZzogZmFsc2UsXG5cdFx0XHRcdGxzOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSBhcyBjb25zdDtcblxuXHQoPFJlY29yZDxzdHJpbmcsIElJUEZTQWRkcmVzc2VzTGlrZT4+ZGF0YSk7XG5cblx0cmV0dXJuIGRhdGEgYXMgUmVjb3JkPGtleW9mIHR5cGVvZiBkYXRhLCBJSVBGU0FkZHJlc3Nlc0xpa2U+ICYgUmVjb3JkPHN0cmluZywgSUlQRlNBZGRyZXNzZXNMaWtlPlxufVxuXG5leHBvcnQgY29uc3QgaXBmc1NlcnZlckxpc3QgPSBnZXRJcGZzU2VydmVyTGlzdCgpO1xuXG5leHBvcnQgZGVmYXVsdCBpcGZzU2VydmVyTGlzdFxuIl19