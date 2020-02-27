"use strict";
/**
 * Created by user on 2020/2/27.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
function fixIPFSOptions(options) {
    options = defaultsDeep_1.default({}, options, {
        type: 'js',
        //ipfsModule: require('ipfs'),
        //ipfsHttpModule: require('ipfs-http-client'),
        //ipfsBin: require.resolve('ipfs/src/cli/bin.js'),
        ipfsOptions: {
            EXPERIMENTAL: {
                pubsub: true,
                ipnsPubsub: true,
                sharding: true,
                dht: true,
            },
            relay: {
                enabled: true,
                hop: {
                    enabled: true,
                },
            },
        },
        disposable: false,
    });
    if (options.type === 'js' || options.type === 'proc') {
        if (typeof options.ipfsModule === 'undefined') {
            options.ipfsModule = require('ipfs');
        }
        if (typeof options.ipfsHttpModule === 'undefined') {
            options.ipfsHttpModule = require('ipfs-http-client');
        }
        if (typeof options.ipfsBin === 'undefined') {
            options.ipfsBin = require.resolve('ipfs/src/cli/bin.js');
        }
    }
    return options;
}
exports.fixIPFSOptions = fixIPFSOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBmc2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpcGZzZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBR0gsdUVBQStDO0FBRS9DLFNBQWdCLGNBQWMsQ0FBQyxPQUFrQjtJQUVoRCxPQUFPLEdBQUcsc0JBQVksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO1FBQ25DLElBQUksRUFBRSxJQUFJO1FBQ1YsOEJBQThCO1FBQzlCLDhDQUE4QztRQUM5QyxrREFBa0Q7UUFDbEQsV0FBVyxFQUFFO1lBQ1osWUFBWSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxHQUFHLEVBQUUsSUFBSTthQUNUO1lBQ0QsS0FBSyxFQUFFO2dCQUNOLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEdBQUcsRUFBRTtvQkFDSixPQUFPLEVBQUUsSUFBSTtpQkFDYjthQUNEO1NBQ0Q7UUFDRCxVQUFVLEVBQUUsS0FBSztLQUNqQixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUNwRDtRQUNDLElBQUksT0FBTyxPQUFPLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFDN0M7WUFDQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNwQztRQUNELElBQUksT0FBTyxPQUFPLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFDakQ7WUFDQyxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1NBQ3BEO1FBQ0QsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssV0FBVyxFQUMxQztZQUNDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1NBQ3hEO0tBQ0Q7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNoQixDQUFDO0FBekNELHdDQXlDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMjAvMi8yNy5cbiAqL1xuXG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBkZWZhdWx0c0RlZXAgZnJvbSAnbG9kYXNoL2RlZmF1bHRzRGVlcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXhJUEZTT3B0aW9ucyhvcHRpb25zPzogSU9wdGlvbnMpXG57XG5cdG9wdGlvbnMgPSBkZWZhdWx0c0RlZXAoe30sIG9wdGlvbnMsIHtcblx0XHR0eXBlOiAnanMnLFxuXHRcdC8vaXBmc01vZHVsZTogcmVxdWlyZSgnaXBmcycpLFxuXHRcdC8vaXBmc0h0dHBNb2R1bGU6IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKSxcblx0XHQvL2lwZnNCaW46IHJlcXVpcmUucmVzb2x2ZSgnaXBmcy9zcmMvY2xpL2Jpbi5qcycpLFxuXHRcdGlwZnNPcHRpb25zOiB7XG5cdFx0XHRFWFBFUklNRU5UQUw6IHtcblx0XHRcdFx0cHVic3ViOiB0cnVlLFxuXHRcdFx0XHRpcG5zUHVic3ViOiB0cnVlLFxuXHRcdFx0XHRzaGFyZGluZzogdHJ1ZSxcblx0XHRcdFx0ZGh0OiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdHJlbGF5OiB7XG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdGhvcDoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0ZGlzcG9zYWJsZTogZmFsc2UsXG5cdH0pO1xuXG5cdGlmIChvcHRpb25zLnR5cGUgPT09ICdqcycgfHwgb3B0aW9ucy50eXBlID09PSAncHJvYycpXG5cdHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc01vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzTW9kdWxlID0gcmVxdWlyZSgnaXBmcycpXG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzSHR0cE1vZHVsZSA9IHJlcXVpcmUoJ2lwZnMtaHR0cC1jbGllbnQnKVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuaXBmc0JpbiA9PT0gJ3VuZGVmaW5lZCcpXG5cdFx0e1xuXHRcdFx0b3B0aW9ucy5pcGZzQmluID0gcmVxdWlyZS5yZXNvbHZlKCdpcGZzL3NyYy9jbGkvYmluLmpzJylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9ucztcbn1cbiJdfQ==