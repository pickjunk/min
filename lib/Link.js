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

var _excluded = ["name", "path", "args", "context", "children"];

function Link(_ref) {
  var name = _ref.name,
      path = _ref.path,
      args = _ref.args,
      context = _ref.context,
      children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var location = {
    name: name,
    path: path,
    args: args,
    context: context
  };
  return /*#__PURE__*/_react["default"].createElement("a", (0, _extends2["default"])({}, props, {
    href: (0, _Router.link)(location),
    onClick: function onClick(e) {
      e.preventDefault();
      (0, _Router.push)(location);
    }
  }), children);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwibmFtZSIsInBhdGgiLCJhcmdzIiwiY29udGV4dCIsImNoaWxkcmVuIiwicHJvcHMiLCJsb2NhdGlvbiIsIm9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQU1lLFNBQVNBLElBQVQsT0FPTDtBQUFBLE1BTlJDLElBTVEsUUFOUkEsSUFNUTtBQUFBLE1BTFJDLElBS1EsUUFMUkEsSUFLUTtBQUFBLE1BSlJDLElBSVEsUUFKUkEsSUFJUTtBQUFBLE1BSFJDLE9BR1EsUUFIUkEsT0FHUTtBQUFBLE1BRlJDLFFBRVEsUUFGUkEsUUFFUTtBQUFBLE1BRExDLEtBQ0s7QUFDUixNQUFNQyxRQUFRLEdBQUc7QUFDZk4sSUFBQUEsSUFBSSxFQUFKQSxJQURlO0FBRWZDLElBQUFBLElBQUksRUFBSkEsSUFGZTtBQUdmQyxJQUFBQSxJQUFJLEVBQUpBLElBSGU7QUFJZkMsSUFBQUEsT0FBTyxFQUFQQTtBQUplLEdBQWpCO0FBT0Esc0JBQ0UsbUVBQ01FLEtBRE47QUFFRSxJQUFBLElBQUksRUFBRSxrQkFBS0MsUUFBTCxDQUZSO0FBR0UsSUFBQSxPQUFPLEVBQUUsU0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDN0NBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBLHdCQUFLSCxRQUFMO0FBQ0Q7QUFOSCxNQVFHRixRQVJILENBREY7QUFZRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBwdXNoLCBsaW5rLCBSb3V0ZXJMb2NhdGlvbiB9IGZyb20gJy4vUm91dGVyJztcblxuaW50ZXJmYWNlIFByb3BzIGV4dGVuZHMgUm91dGVyTG9jYXRpb24ge1xuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50IHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaW5rKHtcbiAgbmFtZSxcbiAgcGF0aCxcbiAgYXJncyxcbiAgY29udGV4dCxcbiAgY2hpbGRyZW4sXG4gIC4uLnByb3BzXG59OiBQcm9wcykge1xuICBjb25zdCBsb2NhdGlvbiA9IHtcbiAgICBuYW1lLFxuICAgIHBhdGgsXG4gICAgYXJncyxcbiAgICBjb250ZXh0LFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGFcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIGhyZWY9e2xpbmsobG9jYXRpb24pfVxuICAgICAgb25DbGljaz17ZnVuY3Rpb24gb25DbGljayhlOiBSZWFjdC5Nb3VzZUV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcHVzaChsb2NhdGlvbik7XG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2E+XG4gICk7XG59XG4iXX0=