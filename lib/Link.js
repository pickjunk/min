"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Link;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Router = require("./Router");

function Link(_ref) {
  var to = _ref.to,
      args = _ref.args,
      children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["to", "args", "children"]);

  function onClick(e) {
    try {
      e.preventDefault();
      (0, _Router.push)(to, args);
    } catch (err) {
      console.log(err);
    }
  }

  return /*#__PURE__*/_react["default"].createElement("a", (0, _extends2["default"])({}, props, {
    href: (0, _Router.link)(to, args),
    onClick: onClick
  }), children);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwidG8iLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJlcnIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBUWUsU0FBU0EsSUFBVCxPQUF1RDtBQUFBLE1BQXZDQyxFQUF1QyxRQUF2Q0EsRUFBdUM7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFFBQTZCLFFBQTdCQSxRQUE2QjtBQUFBLE1BQWhCQyxLQUFnQjs7QUFDcEUsV0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDcEMsUUFBSTtBQUNGQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSx3QkFBS04sRUFBTCxFQUFTQyxJQUFUO0FBQ0QsS0FIRCxDQUdFLE9BQU9NLEdBQVAsRUFBWTtBQUNaQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNEO0FBQ0Y7O0FBRUQsc0JBQ0UsbUVBQU9KLEtBQVA7QUFBYyxJQUFBLElBQUksRUFBRSxrQkFBS0gsRUFBTCxFQUFTQyxJQUFULENBQXBCO0FBQW9DLElBQUEsT0FBTyxFQUFFRztBQUE3QyxNQUNHRixRQURILENBREY7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgeyBwdXNoLCBsaW5rIH0gZnJvbSAnLi9Sb3V0ZXInO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICB0bzogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50IHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHsgdG8sIGFyZ3MsIGNoaWxkcmVuLCAuLi5wcm9wcyB9OiBQcm9wcykge1xuICBmdW5jdGlvbiBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcHVzaCh0bywgYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGEgey4uLnByb3BzfSBocmVmPXtsaW5rKHRvLCBhcmdzKX0gb25DbGljaz17b25DbGlja30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9hPlxuICApO1xufVxuIl19