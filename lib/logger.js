"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _LOG_STUB__ = _interopRequireDefault(require("__LOG_STUB__"));

// A logger stub in node or browser will be resolved to different modules
// by webpack.resolve.alias, see bin/webpack.config.js for more details
// @ts-ignore
function fields(msg) {
  var result = {};

  if ((0, _typeof2.default)(msg) === 'object') {
    result = (0, _objectSpread2.default)({}, result, msg);
  }

  if (msg instanceof Error) {
    result.level = 'error';
    result.msg = msg.message;
  }

  if (typeof msg === 'string') {
    result.msg = msg;
  }

  return result;
}

var _default = {
  trace: function trace(msg) {
    (0, _LOG_STUB__.default)('trace', fields(msg));
  },
  debug: function debug(msg) {
    (0, _LOG_STUB__.default)('debug', fields(msg));
  },
  info: function info(msg) {
    (0, _LOG_STUB__.default)('info', fields(msg));
  },
  warn: function warn(msg) {
    (0, _LOG_STUB__.default)('warn', fields(msg));
  },
  error: function error(msg) {
    (0, _LOG_STUB__.default)('error', fields(msg));
  },
  fatal: function fatal(msg) {
    (0, _LOG_STUB__.default)('fatal', fields(msg));
  }
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOlsiZmllbGRzIiwibXNnIiwicmVzdWx0IiwiRXJyb3IiLCJsZXZlbCIsIm1lc3NhZ2UiLCJ0cmFjZSIsImRlYnVnIiwiaW5mbyIsIndhcm4iLCJlcnJvciIsImZhdGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0E7O0FBSEE7QUFDQTtBQUNBO0FBT0EsU0FBU0EsTUFBVCxDQUFnQkMsR0FBaEIsRUFBc0Q7QUFDcEQsTUFBSUMsTUFBYyxHQUFHLEVBQXJCOztBQUNBLE1BQUksc0JBQU9ELEdBQVAsTUFBZSxRQUFuQixFQUE2QjtBQUMzQkMsSUFBQUEsTUFBTSxtQ0FDREEsTUFEQyxFQUVERCxHQUZDLENBQU47QUFJRDs7QUFDRCxNQUFJQSxHQUFHLFlBQVlFLEtBQW5CLEVBQTBCO0FBQ3hCRCxJQUFBQSxNQUFNLENBQUNFLEtBQVAsR0FBZSxPQUFmO0FBQ0FGLElBQUFBLE1BQU0sQ0FBQ0QsR0FBUCxHQUFhQSxHQUFHLENBQUNJLE9BQWpCO0FBQ0Q7O0FBQ0QsTUFBSSxPQUFPSixHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0JDLElBQUFBLE1BQU0sQ0FBQ0QsR0FBUCxHQUFhQSxHQUFiO0FBQ0Q7O0FBQ0QsU0FBT0MsTUFBUDtBQUNEOztlQUVjO0FBQ2JJLEVBQUFBLEtBRGEsaUJBQ1BMLEdBRE8sRUFDdUI7QUFDbEMsNkJBQUksT0FBSixFQUFhRCxNQUFNLENBQUNDLEdBQUQsQ0FBbkI7QUFDRCxHQUhZO0FBSWJNLEVBQUFBLEtBSmEsaUJBSVBOLEdBSk8sRUFJdUI7QUFDbEMsNkJBQUksT0FBSixFQUFhRCxNQUFNLENBQUNDLEdBQUQsQ0FBbkI7QUFDRCxHQU5ZO0FBT2JPLEVBQUFBLElBUGEsZ0JBT1JQLEdBUFEsRUFPc0I7QUFDakMsNkJBQUksTUFBSixFQUFZRCxNQUFNLENBQUNDLEdBQUQsQ0FBbEI7QUFDRCxHQVRZO0FBVWJRLEVBQUFBLElBVmEsZ0JBVVJSLEdBVlEsRUFVc0I7QUFDakMsNkJBQUksTUFBSixFQUFZRCxNQUFNLENBQUNDLEdBQUQsQ0FBbEI7QUFDRCxHQVpZO0FBYWJTLEVBQUFBLEtBYmEsaUJBYVBULEdBYk8sRUFhdUI7QUFDbEMsNkJBQUksT0FBSixFQUFhRCxNQUFNLENBQUNDLEdBQUQsQ0FBbkI7QUFDRCxHQWZZO0FBZ0JiVSxFQUFBQSxLQWhCYSxpQkFnQlBWLEdBaEJPLEVBZ0J1QjtBQUNsQyw2QkFBSSxPQUFKLEVBQWFELE1BQU0sQ0FBQ0MsR0FBRCxDQUFuQjtBQUNEO0FBbEJZLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBIGxvZ2dlciBzdHViIGluIG5vZGUgb3IgYnJvd3NlciB3aWxsIGJlIHJlc29sdmVkIHRvIGRpZmZlcmVudCBtb2R1bGVzXG4vLyBieSB3ZWJwYWNrLnJlc29sdmUuYWxpYXMsIHNlZSBiaW4vd2VicGFjay5jb25maWcuanMgZm9yIG1vcmUgZGV0YWlsc1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGxvZyBmcm9tICdfX0xPR19TVFVCX18nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkcyB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZnVuY3Rpb24gZmllbGRzKG1zZzogRmllbGRzIHwgRXJyb3IgfCBzdHJpbmcpOiBGaWVsZHMge1xuICBsZXQgcmVzdWx0OiBGaWVsZHMgPSB7fTtcbiAgaWYgKHR5cGVvZiBtc2cgPT09ICdvYmplY3QnKSB7XG4gICAgcmVzdWx0ID0ge1xuICAgICAgLi4ucmVzdWx0LFxuICAgICAgLi4ubXNnLFxuICAgIH07XG4gIH1cbiAgaWYgKG1zZyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmVzdWx0LmxldmVsID0gJ2Vycm9yJztcbiAgICByZXN1bHQubXNnID0gbXNnLm1lc3NhZ2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBtc2cgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0Lm1zZyA9IG1zZztcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRyYWNlKG1zZzogRmllbGRzIHwgRXJyb3IgfCBzdHJpbmcpIHtcbiAgICBsb2coJ3RyYWNlJywgZmllbGRzKG1zZykpO1xuICB9LFxuICBkZWJ1Zyhtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCdkZWJ1ZycsIGZpZWxkcyhtc2cpKTtcbiAgfSxcbiAgaW5mbyhtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCdpbmZvJywgZmllbGRzKG1zZykpO1xuICB9LFxuICB3YXJuKG1zZzogRmllbGRzIHwgRXJyb3IgfCBzdHJpbmcpIHtcbiAgICBsb2coJ3dhcm4nLCBmaWVsZHMobXNnKSk7XG4gIH0sXG4gIGVycm9yKG1zZzogRmllbGRzIHwgRXJyb3IgfCBzdHJpbmcpIHtcbiAgICBsb2coJ2Vycm9yJywgZmllbGRzKG1zZykpO1xuICB9LFxuICBmYXRhbChtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCdmYXRhbCcsIGZpZWxkcyhtc2cpKTtcbiAgfSxcbn07XG4iXX0=