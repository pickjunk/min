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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwidG8iLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJlcnIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBUWUsU0FBU0EsSUFBVCxPQUF1RDtBQUFBLE1BQXZDQyxFQUF1QyxRQUF2Q0EsRUFBdUM7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFFBQTZCLFFBQTdCQSxRQUE2QjtBQUFBLE1BQWhCQyxLQUFnQjs7QUFDcEUsV0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDcEMsUUFBSTtBQUNGQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSx3QkFBS04sRUFBTCxFQUFTQyxJQUFUO0FBQ0QsS0FIRCxDQUdFLE9BQU9NLEdBQVAsRUFBWTtBQUNaQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtBQUNEO0FBQ0Y7O0FBRUQsU0FDRSw2REFBT0osS0FBUDtBQUFjLElBQUEsSUFBSSxFQUFFLGtCQUFLSCxFQUFMLEVBQVNDLElBQVQsQ0FBcEI7QUFBb0MsSUFBQSxPQUFPLEVBQUVHO0FBQTdDLE1BQ0dGLFFBREgsQ0FERjtBQUtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBhcmFtcyB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB7IHB1c2gsIGxpbmsgfSBmcm9tICcuL1JvdXRlcic7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHRvOiBzdHJpbmc7XG4gIGFyZ3M/OiBQYXJhbXM7XG4gIGNoaWxkcmVuOiBSZWFjdEVsZW1lbnQgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoeyB0bywgYXJncywgY2hpbGRyZW4sIC4uLnByb3BzIH06IFByb3BzKSB7XG4gIGZ1bmN0aW9uIG9uQ2xpY2soZTogUmVhY3QuTW91c2VFdmVudCkge1xuICAgIHRyeSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBwdXNoKHRvLCBhcmdzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YSB7Li4ucHJvcHN9IGhyZWY9e2xpbmsodG8sIGFyZ3MpfSBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2E+XG4gICk7XG59XG4iXX0=