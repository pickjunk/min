"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pino = _interopRequireDefault(require("pino"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var isProd = process.env.NODE_ENV === 'production'; // @ts-ignore

var pretty = !isProd && !__LOG_FILE__;
var logger = (0, _pino["default"])({
  base: null,
  prettyPrint: pretty ? {
    translateTime: 'yyyy-mm-dd HH:MM:ss'
  } : false,
  level: isProd ? 'info' : 'debug'
}, // @ts-ignore
__LOG_FILE__);

function log(level, fields) {
  // @ts-ignore
  if (__LOG__) {
    logger[level](_objectSpread({
      source: 'server'
    }, fields));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvc2VydmVyLnRzIl0sIm5hbWVzIjpbImlzUHJvZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByZXR0eSIsIl9fTE9HX0ZJTEVfXyIsImxvZ2dlciIsImJhc2UiLCJwcmV0dHlQcmludCIsInRyYW5zbGF0ZVRpbWUiLCJsZXZlbCIsImxvZyIsImZpZWxkcyIsIl9fTE9HX18iLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUdBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBeEMsQyxDQUNBOztBQUNBLElBQU1DLE1BQU0sR0FBRyxDQUFDSixNQUFELElBQVcsQ0FBQ0ssWUFBM0I7QUFDQSxJQUFNQyxNQUFNLEdBQUcsc0JBQ2I7QUFDRUMsRUFBQUEsSUFBSSxFQUFFLElBRFI7QUFFRUMsRUFBQUEsV0FBVyxFQUFFSixNQUFNLEdBQ2Y7QUFDRUssSUFBQUEsYUFBYSxFQUFFO0FBRGpCLEdBRGUsR0FJZixLQU5OO0FBT0VDLEVBQUFBLEtBQUssRUFBRVYsTUFBTSxHQUFHLE1BQUgsR0FBWTtBQVAzQixDQURhLEVBVWI7QUFDQUssWUFYYSxDQUFmOztBQWNlLFNBQVNNLEdBQVQsQ0FBYUQsS0FBYixFQUE0QkUsTUFBNUIsRUFBNEM7QUFDekQ7QUFDQSxNQUFJQyxPQUFKLEVBQWE7QUFDWFAsSUFBQUEsTUFBTSxDQUFDSSxLQUFELENBQU47QUFDRUksTUFBQUEsTUFBTSxFQUFFO0FBRFYsT0FFS0YsTUFGTDtBQUlEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGlubyBmcm9tICdwaW5vJztcbmltcG9ydCB7IEZpZWxkcyB9IGZyb20gJy4uL2xvZ2dlcic7XG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG4vLyBAdHMtaWdub3JlXG5jb25zdCBwcmV0dHkgPSAhaXNQcm9kICYmICFfX0xPR19GSUxFX187XG5jb25zdCBsb2dnZXIgPSBwaW5vKFxuICB7XG4gICAgYmFzZTogbnVsbCxcbiAgICBwcmV0dHlQcmludDogcHJldHR5XG4gICAgICA/IHtcbiAgICAgICAgICB0cmFuc2xhdGVUaW1lOiAneXl5eS1tbS1kZCBISDpNTTpzcycsXG4gICAgICAgIH1cbiAgICAgIDogZmFsc2UsXG4gICAgbGV2ZWw6IGlzUHJvZCA/ICdpbmZvJyA6ICdkZWJ1ZycsXG4gIH0sXG4gIC8vIEB0cy1pZ25vcmVcbiAgX19MT0dfRklMRV9fLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKGxldmVsOiBzdHJpbmcsIGZpZWxkczogRmllbGRzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKF9fTE9HX18pIHtcbiAgICBsb2dnZXJbbGV2ZWxdKHtcbiAgICAgIHNvdXJjZTogJ3NlcnZlcicsXG4gICAgICAuLi5maWVsZHMsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==