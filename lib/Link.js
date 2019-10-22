"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Link;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Router = require("./Router");

function Link(_ref) {
  var to = _ref.to,
      args = _ref.args,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["to", "args", "children"]);

  function onClick(e) {
    try {
      e.preventDefault();
      (0, _Router.push)(to, args);
    } catch (err) {
      console.log(err);
    }
  }

  return _react.default.createElement("a", (0, _extends2.default)({}, props, {
    href: (0, _Router.link)(to, args),
    onClick: onClick
  }), children);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwidG8iLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJlcnIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBUWUsU0FBU0EsSUFBVCxPQUF1RDtBQUFBLE1BQXZDQyxFQUF1QyxRQUF2Q0EsRUFBdUM7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFFBQTZCLFFBQTdCQSxRQUE2QjtBQUFBLE1BQWhCQyxLQUFnQjs7QUFDcEUsV0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDcEMsUUFBSTtBQUNGQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSx3QkFBS04sRUFBTCxFQUFTQyxJQUFUO0FBQ0QsS0FIRCxDQUdFLE9BQU9NLEdBQVAsRUFBWTtBQUNaQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNEO0FBQ0Y7O0FBRUQsU0FDRSw2REFBT0osS0FBUDtBQUFjLElBQUEsSUFBSSxFQUFFLGtCQUFLSCxFQUFMLEVBQVNDLElBQVQsQ0FBcEI7QUFBb0MsSUFBQSxPQUFPLEVBQUVHO0FBQTdDLE1BQ0dGLFFBREgsQ0FERjtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUGFyYW1zIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgeyBwdXNoLCBsaW5rIH0gZnJvbSAnLi9Sb3V0ZXInO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICB0bzogc3RyaW5nO1xyXG4gIGFyZ3M/OiBQYXJhbXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudCB8IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7IHRvLCBhcmdzLCBjaGlsZHJlbiwgLi4ucHJvcHMgfTogUHJvcHMpIHtcclxuICBmdW5jdGlvbiBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcHVzaCh0bywgYXJncyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YSB7Li4ucHJvcHN9IGhyZWY9e2xpbmsodG8sIGFyZ3MpfSBvbkNsaWNrPXtvbkNsaWNrfT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9hPlxyXG4gICk7XHJcbn1cclxuIl19