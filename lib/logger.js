"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _LOG_STUB__ = _interopRequireDefault(require("__LOG_STUB__"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function fields(msg) {
  var result = {};

  if ((0, _typeof2["default"])(msg) === 'object') {
    result = _objectSpread(_objectSpread({}, result), msg);
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
    (0, _LOG_STUB__["default"])('trace', fields(msg));
  },
  debug: function debug(msg) {
    (0, _LOG_STUB__["default"])('debug', fields(msg));
  },
  info: function info(msg) {
    (0, _LOG_STUB__["default"])('info', fields(msg));
  },
  warn: function warn(msg) {
    (0, _LOG_STUB__["default"])('warn', fields(msg));
  },
  error: function error(msg) {
    (0, _LOG_STUB__["default"])('error', fields(msg));
  },
  fatal: function fatal(msg) {
    (0, _LOG_STUB__["default"])('fatal', fields(msg));
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOlsiZmllbGRzIiwibXNnIiwicmVzdWx0IiwiRXJyb3IiLCJsZXZlbCIsIm1lc3NhZ2UiLCJ0cmFjZSIsImRlYnVnIiwiaW5mbyIsIndhcm4iLCJlcnJvciIsImZhdGFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7OztBQU1BLFNBQVNBLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXNEO0FBQ3BELE1BQUlDLE1BQWMsR0FBRyxFQUFyQjs7QUFDQSxNQUFJLHlCQUFPRCxHQUFQLE1BQWUsUUFBbkIsRUFBNkI7QUFDM0JDLElBQUFBLE1BQU0sbUNBQ0RBLE1BREMsR0FFREQsR0FGQyxDQUFOO0FBSUQ7O0FBQ0QsTUFBSUEsR0FBRyxZQUFZRSxLQUFuQixFQUEwQjtBQUN4QkQsSUFBQUEsTUFBTSxDQUFDRSxLQUFQLEdBQWUsT0FBZjtBQUNBRixJQUFBQSxNQUFNLENBQUNELEdBQVAsR0FBYUEsR0FBRyxDQUFDSSxPQUFqQjtBQUNEOztBQUNELE1BQUksT0FBT0osR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQzNCQyxJQUFBQSxNQUFNLENBQUNELEdBQVAsR0FBYUEsR0FBYjtBQUNEOztBQUNELFNBQU9DLE1BQVA7QUFDRDs7ZUFFYztBQUNiSSxFQUFBQSxLQURhLGlCQUNQTCxHQURPLEVBQ3VCO0FBQ2xDLGdDQUFJLE9BQUosRUFBYUQsTUFBTSxDQUFDQyxHQUFELENBQW5CO0FBQ0QsR0FIWTtBQUliTSxFQUFBQSxLQUphLGlCQUlQTixHQUpPLEVBSXVCO0FBQ2xDLGdDQUFJLE9BQUosRUFBYUQsTUFBTSxDQUFDQyxHQUFELENBQW5CO0FBQ0QsR0FOWTtBQU9iTyxFQUFBQSxJQVBhLGdCQU9SUCxHQVBRLEVBT3NCO0FBQ2pDLGdDQUFJLE1BQUosRUFBWUQsTUFBTSxDQUFDQyxHQUFELENBQWxCO0FBQ0QsR0FUWTtBQVViUSxFQUFBQSxJQVZhLGdCQVVSUixHQVZRLEVBVXNCO0FBQ2pDLGdDQUFJLE1BQUosRUFBWUQsTUFBTSxDQUFDQyxHQUFELENBQWxCO0FBQ0QsR0FaWTtBQWFiUyxFQUFBQSxLQWJhLGlCQWFQVCxHQWJPLEVBYXVCO0FBQ2xDLGdDQUFJLE9BQUosRUFBYUQsTUFBTSxDQUFDQyxHQUFELENBQW5CO0FBQ0QsR0FmWTtBQWdCYlUsRUFBQUEsS0FoQmEsaUJBZ0JQVixHQWhCTyxFQWdCdUI7QUFDbEMsZ0NBQUksT0FBSixFQUFhRCxNQUFNLENBQUNDLEdBQUQsQ0FBbkI7QUFDRDtBQWxCWSxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQSBsb2dnZXIgc3R1YiBpbiBub2RlIG9yIGJyb3dzZXIgd2lsbCBiZSByZXNvbHZlZCB0byBkaWZmZXJlbnQgbW9kdWxlc1xuLy8gYnkgd2VicGFjay5yZXNvbHZlLmFsaWFzLCBzZWUgYmluL3dlYnBhY2suY29uZmlnLmpzIGZvciBtb3JlIGRldGFpbHNcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBsb2cgZnJvbSAnX19MT0dfU1RVQl9fJztcblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZHMge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmZ1bmN0aW9uIGZpZWxkcyhtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKTogRmllbGRzIHtcbiAgbGV0IHJlc3VsdDogRmllbGRzID0ge307XG4gIGlmICh0eXBlb2YgbXNnID09PSAnb2JqZWN0Jykge1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIC4uLm1zZyxcbiAgICB9O1xuICB9XG4gIGlmIChtc2cgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIHJlc3VsdC5sZXZlbCA9ICdlcnJvcic7XG4gICAgcmVzdWx0Lm1zZyA9IG1zZy5tZXNzYWdlO1xuICB9XG4gIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdC5tc2cgPSBtc2c7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0cmFjZShtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCd0cmFjZScsIGZpZWxkcyhtc2cpKTtcbiAgfSxcbiAgZGVidWcobXNnOiBGaWVsZHMgfCBFcnJvciB8IHN0cmluZykge1xuICAgIGxvZygnZGVidWcnLCBmaWVsZHMobXNnKSk7XG4gIH0sXG4gIGluZm8obXNnOiBGaWVsZHMgfCBFcnJvciB8IHN0cmluZykge1xuICAgIGxvZygnaW5mbycsIGZpZWxkcyhtc2cpKTtcbiAgfSxcbiAgd2Fybihtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCd3YXJuJywgZmllbGRzKG1zZykpO1xuICB9LFxuICBlcnJvcihtc2c6IEZpZWxkcyB8IEVycm9yIHwgc3RyaW5nKSB7XG4gICAgbG9nKCdlcnJvcicsIGZpZWxkcyhtc2cpKTtcbiAgfSxcbiAgZmF0YWwobXNnOiBGaWVsZHMgfCBFcnJvciB8IHN0cmluZykge1xuICAgIGxvZygnZmF0YWwnLCBmaWVsZHMobXNnKSk7XG4gIH0sXG59O1xuIl19