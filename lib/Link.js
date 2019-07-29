"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Link;

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

  return _react.default.createElement("a", (0, _extends2.default)({}, props, {
    href: _Router.default.link(to, args),
    onClick: onClick
  }), children);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwidG8iLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJyb3V0ZXIiLCJwdXNoIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQVFlLFNBQVNBLElBQVQsT0FBdUQ7QUFBQSxNQUF2Q0MsRUFBdUMsUUFBdkNBLEVBQXVDO0FBQUEsTUFBbkNDLElBQW1DLFFBQW5DQSxJQUFtQztBQUFBLE1BQTdCQyxRQUE2QixRQUE3QkEsUUFBNkI7QUFBQSxNQUFoQkMsS0FBZ0I7O0FBQ3BFLFdBQVNDLE9BQVQsQ0FBaUJDLENBQWpCLEVBQXNDO0FBQ3BDQSxJQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0FDLG9CQUFPQyxJQUFQLENBQVlSLEVBQVosRUFBZ0JDLElBQWhCO0FBQ0Q7O0FBRUQsU0FDRSw2REFBT0UsS0FBUDtBQUFjLElBQUEsSUFBSSxFQUFFSSxnQkFBT0UsSUFBUCxDQUFZVCxFQUFaLEVBQWdCQyxJQUFoQixDQUFwQjtBQUEyQyxJQUFBLE9BQU8sRUFBRUc7QUFBcEQsTUFDR0YsUUFESCxDQURGO0FBS0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQYXJhbXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICB0bzogc3RyaW5nO1xyXG4gIGFyZ3M/OiBQYXJhbXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudCB8IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7IHRvLCBhcmdzLCBjaGlsZHJlbiwgLi4ucHJvcHMgfTogUHJvcHMpIHtcclxuICBmdW5jdGlvbiBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJvdXRlci5wdXNoKHRvLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YSB7Li4ucHJvcHN9IGhyZWY9e3JvdXRlci5saW5rKHRvLCBhcmdzKX0gb25DbGljaz17b25DbGlja30+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvYT5cclxuICApO1xyXG59XHJcbiJdfQ==