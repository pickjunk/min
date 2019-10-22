"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _pino = _interopRequireDefault(require("pino"));

var isProd = process.env.NODE_ENV === 'production'; // @ts-ignore

var pretty = !isProd && !__LOG_FILE__;
var logger = (0, _pino.default)({
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
    logger[level]((0, _objectSpread2.default)({
      type: 'server'
    }, fields));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvc2VydmVyLnRzIl0sIm5hbWVzIjpbImlzUHJvZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByZXR0eSIsIl9fTE9HX0ZJTEVfXyIsImxvZ2dlciIsImJhc2UiLCJwcmV0dHlQcmludCIsInRyYW5zbGF0ZVRpbWUiLCJsZXZlbCIsImxvZyIsImZpZWxkcyIsIl9fTE9HX18iLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUdBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBeEMsQyxDQUNBOztBQUNBLElBQU1DLE1BQU0sR0FBRyxDQUFDSixNQUFELElBQVcsQ0FBQ0ssWUFBM0I7QUFDQSxJQUFNQyxNQUFNLEdBQUcsbUJBQ2I7QUFDRUMsRUFBQUEsSUFBSSxFQUFFLElBRFI7QUFFRUMsRUFBQUEsV0FBVyxFQUFFSixNQUFNLEdBQ2Y7QUFDRUssSUFBQUEsYUFBYSxFQUFFO0FBRGpCLEdBRGUsR0FJZixLQU5OO0FBT0VDLEVBQUFBLEtBQUssRUFBRVYsTUFBTSxHQUFHLE1BQUgsR0FBWTtBQVAzQixDQURhLEVBVWI7QUFDQUssWUFYYSxDQUFmOztBQWNlLFNBQVNNLEdBQVQsQ0FBYUQsS0FBYixFQUE0QkUsTUFBNUIsRUFBNEM7QUFDekQ7QUFDQSxNQUFJQyxPQUFKLEVBQWE7QUFDWFAsSUFBQUEsTUFBTSxDQUFDSSxLQUFELENBQU47QUFDRUksTUFBQUEsSUFBSSxFQUFFO0FBRFIsT0FFS0YsTUFGTDtBQUlEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGlubyBmcm9tICdwaW5vJztcbmltcG9ydCB7IEZpZWxkcyB9IGZyb20gJy4uL2xvZ2dlcic7XG5cbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG4vLyBAdHMtaWdub3JlXG5jb25zdCBwcmV0dHkgPSAhaXNQcm9kICYmICFfX0xPR19GSUxFX187XG5jb25zdCBsb2dnZXIgPSBwaW5vKFxuICB7XG4gICAgYmFzZTogbnVsbCxcbiAgICBwcmV0dHlQcmludDogcHJldHR5XG4gICAgICA/IHtcbiAgICAgICAgICB0cmFuc2xhdGVUaW1lOiAneXl5eS1tbS1kZCBISDpNTTpzcycsXG4gICAgICAgIH1cbiAgICAgIDogZmFsc2UsXG4gICAgbGV2ZWw6IGlzUHJvZCA/ICdpbmZvJyA6ICdkZWJ1ZycsXG4gIH0sXG4gIC8vIEB0cy1pZ25vcmVcbiAgX19MT0dfRklMRV9fLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKGxldmVsOiBzdHJpbmcsIGZpZWxkczogRmllbGRzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKF9fTE9HX18pIHtcbiAgICBsb2dnZXJbbGV2ZWxdKHtcbiAgICAgIHR5cGU6ICdzZXJ2ZXInLFxuICAgICAgLi4uZmllbGRzLFxuICAgIH0pO1xuICB9XG59XG4iXX0=