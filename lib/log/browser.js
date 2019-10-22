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
      type: 'browser'
    }, fields), {
      addQueryPrefix: true
    }));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2cvYnJvd3Nlci50cyJdLCJuYW1lcyI6WyJsb2ciLCJsZXZlbCIsImZpZWxkcyIsIl9fTE9HX18iLCJmZXRjaCIsIl9fTE9HX0VORFBPSU5UX18iLCJxcyIsInN0cmluZ2lmeSIsInR5cGUiLCJhZGRRdWVyeVByZWZpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7QUFFZSxTQUFTQSxHQUFULENBQWFDLEtBQWIsRUFBNEJDLE1BQTVCLEVBQTRDO0FBQ3pEO0FBQ0EsTUFBSUMsT0FBSixFQUFhO0FBQ1hDLElBQUFBLEtBQUssRUFDSDtBQUNBQyxJQUFBQSxnQkFBZ0IsR0FDZEMsWUFBR0MsU0FBSDtBQUVJTixNQUFBQSxLQUFLLEVBQUxBLEtBRko7QUFHSU8sTUFBQUEsSUFBSSxFQUFFO0FBSFYsT0FJT04sTUFKUCxHQU1FO0FBQUVPLE1BQUFBLGNBQWMsRUFBRTtBQUFsQixLQU5GLENBSEMsQ0FBTDtBQVlEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZHMgfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKGxldmVsOiBzdHJpbmcsIGZpZWxkczogRmllbGRzKSB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKF9fTE9HX18pIHtcbiAgICBmZXRjaChcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIF9fTE9HX0VORFBPSU5UX18gK1xuICAgICAgICBxcy5zdHJpbmdpZnkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgICB0eXBlOiAnYnJvd3NlcicsXG4gICAgICAgICAgICAuLi5maWVsZHMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IGFkZFF1ZXJ5UHJlZml4OiB0cnVlIH0sXG4gICAgICAgICksXG4gICAgKTtcbiAgfVxufVxuIl19