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

var pretty = !isProd;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvc2VydmVyLnRzIl0sIm5hbWVzIjpbImlzUHJvZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByZXR0eSIsImxvZ2dlciIsImJhc2UiLCJwcmV0dHlQcmludCIsInRyYW5zbGF0ZVRpbWUiLCJsZXZlbCIsIl9fTE9HX0ZJTEVfXyIsImxvZyIsImZpZWxkcyIsIl9fTE9HX18iLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUdBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBeEMsQyxDQUNBOztBQUNBLElBQU1DLE1BQU0sR0FBRyxDQUFDSixNQUFoQjtBQUNBLElBQU1LLE1BQU0sR0FBRyxzQkFDYjtBQUNFQyxFQUFBQSxJQUFJLEVBQUUsSUFEUjtBQUVFQyxFQUFBQSxXQUFXLEVBQUVILE1BQU0sR0FDZjtBQUNFSSxJQUFBQSxhQUFhLEVBQUU7QUFEakIsR0FEZSxHQUlmLEtBTk47QUFPRUMsRUFBQUEsS0FBSyxFQUFFVCxNQUFNLEdBQUcsTUFBSCxHQUFZO0FBUDNCLENBRGEsRUFVYjtBQUNBVSxZQVhhLENBQWY7O0FBY2UsU0FBU0MsR0FBVCxDQUFhRixLQUFiLEVBQTRCRyxNQUE1QixFQUE0QztBQUN6RDtBQUNBLE1BQUlDLE9BQUosRUFBYTtBQUNYUixJQUFBQSxNQUFNLENBQUNJLEtBQUQsQ0FBTjtBQUNFSyxNQUFBQSxNQUFNLEVBQUU7QUFEVixPQUVLRixNQUZMO0FBSUQ7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nO1xuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHByZXR0eSA9ICFpc1Byb2Q7XG5jb25zdCBsb2dnZXIgPSBwaW5vKFxuICB7XG4gICAgYmFzZTogbnVsbCxcbiAgICBwcmV0dHlQcmludDogcHJldHR5XG4gICAgICA/IHtcbiAgICAgICAgICB0cmFuc2xhdGVUaW1lOiAneXl5eS1tbS1kZCBISDpNTTpzcycsXG4gICAgICAgIH1cbiAgICAgIDogZmFsc2UsXG4gICAgbGV2ZWw6IGlzUHJvZCA/ICdpbmZvJyA6ICdkZWJ1ZycsXG4gIH0sXG4gIC8vIEB0cy1pZ25vcmVcbiAgX19MT0dfRklMRV9fLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKGxldmVsOiBzdHJpbmcsIGZpZWxkczogRmllbGRzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKF9fTE9HX18pIHtcbiAgICBsb2dnZXJbbGV2ZWxdKHtcbiAgICAgIHNvdXJjZTogJ3NlcnZlcicsXG4gICAgICAuLi5maWVsZHMsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==