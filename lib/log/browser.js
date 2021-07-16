"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _qs = _interopRequireDefault(require("qs"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function log(level, fields) {
  // @ts-ignore
  if (__LOG__) {
    fetch( // @ts-ignore
    __LOG_ENDPOINT__ + _qs["default"].stringify(_objectSpread({
      level: level,
      source: 'browser'
    }, fields), {
      addQueryPrefix: true
    }));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvYnJvd3Nlci50cyJdLCJuYW1lcyI6WyJsb2ciLCJsZXZlbCIsImZpZWxkcyIsIl9fTE9HX18iLCJmZXRjaCIsIl9fTE9HX0VORFBPSU5UX18iLCJxcyIsInN0cmluZ2lmeSIsInNvdXJjZSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxHQUFULENBQWFDLEtBQWIsRUFBNEJDLE1BQTVCLEVBQTRDO0FBQ3pEO0FBQ0EsTUFBSUMsT0FBSixFQUFhO0FBQ1hDLElBQUFBLEtBQUssRUFDSDtBQUNBQyxJQUFBQSxnQkFBZ0IsR0FDZEMsZUFBR0MsU0FBSDtBQUVJTixNQUFBQSxLQUFLLEVBQUxBLEtBRko7QUFHSU8sTUFBQUEsTUFBTSxFQUFFO0FBSFosT0FJT04sTUFKUCxHQU1FO0FBQUVPLE1BQUFBLGNBQWMsRUFBRTtBQUFsQixLQU5GLENBSEMsQ0FBTDtBQVlEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZHMgfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKGxldmVsOiBzdHJpbmcsIGZpZWxkczogRmllbGRzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKF9fTE9HX18pIHtcbiAgICBmZXRjaChcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIF9fTE9HX0VORFBPSU5UX18gK1xuICAgICAgICBxcy5zdHJpbmdpZnkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgICBzb3VyY2U6ICdicm93c2VyJyxcbiAgICAgICAgICAgIC4uLmZpZWxkcyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSxcbiAgICAgICAgKSxcbiAgICApO1xuICB9XG59XG4iXX0=