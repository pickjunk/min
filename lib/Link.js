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
  var name = _ref.name,
      path = _ref.path,
      args = _ref.args,
      children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["name", "path", "args", "children"]);
  var location = {
    name: name,
    path: path,
    args: args
  };
  return /*#__PURE__*/_react["default"].createElement("a", (0, _extends2["default"])({}, props, {
    href: (0, _Router.link)(location),
    onClick: function onClick(e) {
      e.preventDefault();
      (0, _Router.push)(location);
    }
  }), children);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwibmFtZSIsInBhdGgiLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsImxvY2F0aW9uIiwib25DbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQU1lLFNBQVNBLElBQVQsT0FBK0Q7QUFBQSxNQUEvQ0MsSUFBK0MsUUFBL0NBLElBQStDO0FBQUEsTUFBekNDLElBQXlDLFFBQXpDQSxJQUF5QztBQUFBLE1BQW5DQyxJQUFtQyxRQUFuQ0EsSUFBbUM7QUFBQSxNQUE3QkMsUUFBNkIsUUFBN0JBLFFBQTZCO0FBQUEsTUFBaEJDLEtBQWdCO0FBQzVFLE1BQU1DLFFBQVEsR0FBRztBQUNmTCxJQUFBQSxJQUFJLEVBQUpBLElBRGU7QUFFZkMsSUFBQUEsSUFBSSxFQUFKQSxJQUZlO0FBR2ZDLElBQUFBLElBQUksRUFBSkE7QUFIZSxHQUFqQjtBQU1BLHNCQUNFLG1FQUNNRSxLQUROO0FBRUUsSUFBQSxJQUFJLEVBQUUsa0JBQUtDLFFBQUwsQ0FGUjtBQUdFLElBQUEsT0FBTyxFQUFFLFNBQVNDLE9BQVQsQ0FBaUJDLENBQWpCLEVBQXNDO0FBQzdDQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSx3QkFBS0gsUUFBTDtBQUNEO0FBTkgsTUFRR0YsUUFSSCxDQURGO0FBWUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgeyBwdXNoLCBsaW5rIH0gZnJvbSAnLi9Sb3V0ZXInO1xuXG5pbnRlcmZhY2UgUHJvcHMgZXh0ZW5kcyBMb2NhdGlvbiB7XG4gIGNoaWxkcmVuOiBSZWFjdEVsZW1lbnQgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpbmsoeyBuYW1lLCBwYXRoLCBhcmdzLCBjaGlsZHJlbiwgLi4ucHJvcHMgfTogUHJvcHMpIHtcbiAgY29uc3QgbG9jYXRpb24gPSB7XG4gICAgbmFtZSxcbiAgICBwYXRoLFxuICAgIGFyZ3MsXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YVxuICAgICAgey4uLnByb3BzfVxuICAgICAgaHJlZj17bGluayhsb2NhdGlvbil9XG4gICAgICBvbkNsaWNrPXtmdW5jdGlvbiBvbkNsaWNrKGU6IFJlYWN0Lk1vdXNlRXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwdXNoKGxvY2F0aW9uKTtcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvYT5cbiAgKTtcbn1cbiJdfQ==