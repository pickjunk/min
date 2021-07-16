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

var _excluded = ["name", "path", "args", "children"];

function Link(_ref) {
  var name = _ref.name,
      path = _ref.path,
      args = _ref.args,
      children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLnRzeCJdLCJuYW1lcyI6WyJMaW5rIiwibmFtZSIsInBhdGgiLCJhcmdzIiwiY2hpbGRyZW4iLCJwcm9wcyIsImxvY2F0aW9uIiwib25DbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOzs7O0FBTWUsU0FBU0EsSUFBVCxPQUErRDtBQUFBLE1BQS9DQyxJQUErQyxRQUEvQ0EsSUFBK0M7QUFBQSxNQUF6Q0MsSUFBeUMsUUFBekNBLElBQXlDO0FBQUEsTUFBbkNDLElBQW1DLFFBQW5DQSxJQUFtQztBQUFBLE1BQTdCQyxRQUE2QixRQUE3QkEsUUFBNkI7QUFBQSxNQUFoQkMsS0FBZ0I7QUFDNUUsTUFBTUMsUUFBUSxHQUFHO0FBQ2ZMLElBQUFBLElBQUksRUFBSkEsSUFEZTtBQUVmQyxJQUFBQSxJQUFJLEVBQUpBLElBRmU7QUFHZkMsSUFBQUEsSUFBSSxFQUFKQTtBQUhlLEdBQWpCO0FBTUEsc0JBQ0UsbUVBQ01FLEtBRE47QUFFRSxJQUFBLElBQUksRUFBRSxrQkFBS0MsUUFBTCxDQUZSO0FBR0UsSUFBQSxPQUFPLEVBQUUsU0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBc0M7QUFDN0NBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBLHdCQUFLSCxRQUFMO0FBQ0Q7QUFOSCxNQVFHRixRQVJILENBREY7QUFZRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCB7IHB1c2gsIGxpbmsgfSBmcm9tICcuL1JvdXRlcic7XG5cbmludGVyZmFjZSBQcm9wcyBleHRlbmRzIExvY2F0aW9uIHtcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudCB8IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGluayh7IG5hbWUsIHBhdGgsIGFyZ3MsIGNoaWxkcmVuLCAuLi5wcm9wcyB9OiBQcm9wcykge1xuICBjb25zdCBsb2NhdGlvbiA9IHtcbiAgICBuYW1lLFxuICAgIHBhdGgsXG4gICAgYXJncyxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxhXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBocmVmPXtsaW5rKGxvY2F0aW9uKX1cbiAgICAgIG9uQ2xpY2s9e2Z1bmN0aW9uIG9uQ2xpY2soZTogUmVhY3QuTW91c2VFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHB1c2gobG9jYXRpb24pO1xuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9hPlxuICApO1xufVxuIl19