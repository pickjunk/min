"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Link;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Router = _interopRequireDefault(require("./Router"));

function Link(_ref) {
  var to = _ref.to,
      args = _ref.args,
      children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["to", "args", "children"]);

  function onClick(e) {
    e.preventDefault();

    _Router.default.push(to, args);
  }

  if (typeof children === 'string') {
    return _react.default.createElement("a", (0, _extends2.default)({}, props, {
      href: _Router.default.link(to, args),
      onClick: onClick
    }), children);
  }

  children.props = (0, _objectSpread2.default)({}, props, children.props, {
    onClick: onClick
  });
  return children;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwidG8iLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJyb3V0ZXIiLCJwdXNoIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBUWUsU0FBU0EsSUFBVCxPQUF1RDtBQUFBLE1BQXZDQyxFQUF1QyxRQUF2Q0EsRUFBdUM7QUFBQSxNQUFuQ0MsSUFBbUMsUUFBbkNBLElBQW1DO0FBQUEsTUFBN0JDLFFBQTZCLFFBQTdCQSxRQUE2QjtBQUFBLE1BQWhCQyxLQUFnQjs7QUFDcEUsV0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDcENBLElBQUFBLENBQUMsQ0FBQ0MsY0FBRjs7QUFDQUMsb0JBQU9DLElBQVAsQ0FBWVIsRUFBWixFQUFnQkMsSUFBaEI7QUFDRDs7QUFFRCxNQUFJLE9BQU9DLFFBQVAsS0FBb0IsUUFBeEIsRUFBa0M7QUFDaEMsV0FBTyw2REFBT0MsS0FBUDtBQUFjLE1BQUEsSUFBSSxFQUFFSSxnQkFBT0UsSUFBUCxDQUFZVCxFQUFaLEVBQWdCQyxJQUFoQixDQUFwQjtBQUEyQyxNQUFBLE9BQU8sRUFBRUc7QUFBcEQsUUFBOERGLFFBQTlELENBQVA7QUFDRDs7QUFFREEsRUFBQUEsUUFBUSxDQUFDQyxLQUFULG1DQUNLQSxLQURMLEVBRUtELFFBQVEsQ0FBQ0MsS0FGZDtBQUdFQyxJQUFBQSxPQUFPLEVBQVBBO0FBSEY7QUFNQSxTQUFPRixRQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICB0bzogc3RyaW5nO1xyXG4gIGFyZ3M/OiBQYXJhbXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7IHRvLCBhcmdzLCBjaGlsZHJlbiwgLi4ucHJvcHMgfTogUHJvcHMpIHtcclxuICBmdW5jdGlvbiBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJvdXRlci5wdXNoKHRvLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gPGEgey4uLnByb3BzfSBocmVmPXtyb3V0ZXIubGluayh0bywgYXJncyl9IG9uQ2xpY2s9e29uQ2xpY2t9PntjaGlsZHJlbn08L2E+O1xyXG4gIH1cclxuXHJcbiAgY2hpbGRyZW4ucHJvcHMgPSB7XHJcbiAgICAuLi5wcm9wcyxcclxuICAgIC4uLmNoaWxkcmVuLnByb3BzLFxyXG4gICAgb25DbGljayxcclxuICB9O1xyXG5cclxuICByZXR1cm4gY2hpbGRyZW47XHJcbn1cclxuIl19