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
      source: 'server'
    }, fields));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvc2VydmVyLnRzIl0sIm5hbWVzIjpbImlzUHJvZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByZXR0eSIsIl9fTE9HX0ZJTEVfXyIsImxvZ2dlciIsImJhc2UiLCJwcmV0dHlQcmludCIsInRyYW5zbGF0ZVRpbWUiLCJsZXZlbCIsImxvZyIsImZpZWxkcyIsIl9fTE9HX18iLCJzb3VyY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0EsSUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF4QyxDLENBQ0E7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHLENBQUNKLE1BQUQsSUFBVyxDQUFDSyxZQUEzQjtBQUNBLElBQU1DLE1BQU0sR0FBRyxtQkFDYjtBQUNFQyxFQUFBQSxJQUFJLEVBQUUsSUFEUjtBQUVFQyxFQUFBQSxXQUFXLEVBQUVKLE1BQU0sR0FDZjtBQUNFSyxJQUFBQSxhQUFhLEVBQUU7QUFEakIsR0FEZSxHQUlmLEtBTk47QUFPRUMsRUFBQUEsS0FBSyxFQUFFVixNQUFNLEdBQUcsTUFBSCxHQUFZO0FBUDNCLENBRGEsRUFVYjtBQUNBSyxZQVhhLENBQWY7O0FBY2UsU0FBU00sR0FBVCxDQUFhRCxLQUFiLEVBQTRCRSxNQUE1QixFQUE0QztBQUN6RDtBQUNBLE1BQUlDLE9BQUosRUFBYTtBQUNYUCxJQUFBQSxNQUFNLENBQUNJLEtBQUQsQ0FBTjtBQUNFSSxNQUFBQSxNQUFNLEVBQUU7QUFEVixPQUVLRixNQUZMO0FBSUQ7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nO1xuaW1wb3J0IHsgRmllbGRzIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHByZXR0eSA9ICFpc1Byb2QgJiYgIV9fTE9HX0ZJTEVfXztcbmNvbnN0IGxvZ2dlciA9IHBpbm8oXG4gIHtcbiAgICBiYXNlOiBudWxsLFxuICAgIHByZXR0eVByaW50OiBwcmV0dHlcbiAgICAgID8ge1xuICAgICAgICAgIHRyYW5zbGF0ZVRpbWU6ICd5eXl5LW1tLWRkIEhIOk1NOnNzJyxcbiAgICAgICAgfVxuICAgICAgOiBmYWxzZSxcbiAgICBsZXZlbDogaXNQcm9kID8gJ2luZm8nIDogJ2RlYnVnJyxcbiAgfSxcbiAgLy8gQHRzLWlnbm9yZVxuICBfX0xPR19GSUxFX18sXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2cobGV2ZWw6IHN0cmluZywgZmllbGRzOiBGaWVsZHMpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAoX19MT0dfXykge1xuICAgIGxvZ2dlcltsZXZlbF0oe1xuICAgICAgc291cmNlOiAnc2VydmVyJyxcbiAgICAgIC4uLmZpZWxkcyxcbiAgICB9KTtcbiAgfVxufVxuIl19