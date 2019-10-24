"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _qs = _interopRequireDefault(require("qs"));

function log(level, fields) {
  // @ts-ignore
  if (__LOG__) {
    fetch( // @ts-ignore
    __LOG_ENDPOINT__ + _qs.default.stringify((0, _objectSpread2.default)({
      level: level,
      source: 'browser'
    }, fields), {
      addQueryPrefix: true
    }));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvYnJvd3Nlci50cyJdLCJuYW1lcyI6WyJsb2ciLCJsZXZlbCIsImZpZWxkcyIsIl9fTE9HX18iLCJmZXRjaCIsIl9fTE9HX0VORFBPSU5UX18iLCJxcyIsInN0cmluZ2lmeSIsInNvdXJjZSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOztBQUVlLFNBQVNBLEdBQVQsQ0FBYUMsS0FBYixFQUE0QkMsTUFBNUIsRUFBNEM7QUFDekQ7QUFDQSxNQUFJQyxPQUFKLEVBQWE7QUFDWEMsSUFBQUEsS0FBSyxFQUNIO0FBQ0FDLElBQUFBLGdCQUFnQixHQUNkQyxZQUFHQyxTQUFIO0FBRUlOLE1BQUFBLEtBQUssRUFBTEEsS0FGSjtBQUdJTyxNQUFBQSxNQUFNLEVBQUU7QUFIWixPQUlPTixNQUpQLEdBTUU7QUFBRU8sTUFBQUEsY0FBYyxFQUFFO0FBQWxCLEtBTkYsQ0FIQyxDQUFMO0FBWUQ7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkcyB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2cobGV2ZWw6IHN0cmluZywgZmllbGRzOiBGaWVsZHMpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICBpZiAoX19MT0dfXykge1xuICAgIGZldGNoKFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgX19MT0dfRU5EUE9JTlRfXyArXG4gICAgICAgIHFzLnN0cmluZ2lmeShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICAgIHNvdXJjZTogJ2Jyb3dzZXInLFxuICAgICAgICAgICAgLi4uZmllbGRzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9LFxuICAgICAgICApLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==