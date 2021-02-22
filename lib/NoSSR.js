"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NoSSR;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var DefaultOnSSR = function DefaultOnSSR() {
  return /*#__PURE__*/_react["default"].createElement("span", null);
};

function NoSSR(_ref) {
  var _ref$onSSR = _ref.onSSR,
      onSSR = _ref$onSSR === void 0 ? DefaultOnSSR : _ref$onSSR,
      children = _ref.children;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      canRender = _useState2[0],
      setCanRender = _useState2[1];

  (0, _react.useEffect)(function () {
    setCanRender(true);
  }, []);

  if (canRender) {
    return children;
  }

  return onSSR();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob1NTUi50c3giXSwibmFtZXMiOlsiRGVmYXVsdE9uU1NSIiwiTm9TU1IiLCJvblNTUiIsImNoaWxkcmVuIiwiY2FuUmVuZGVyIiwic2V0Q2FuUmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxzQkFBTSw2Q0FBTjtBQUFBLENBQXJCOztBQUVlLFNBQVNDLEtBQVQsT0FNWjtBQUFBLHdCQUxEQyxLQUtDO0FBQUEsTUFMREEsS0FLQywyQkFMT0YsWUFLUDtBQUFBLE1BSkRHLFFBSUMsUUFKREEsUUFJQzs7QUFBQSxrQkFDaUMscUJBQVMsS0FBVCxDQURqQztBQUFBO0FBQUEsTUFDTUMsU0FETjtBQUFBLE1BQ2lCQyxZQURqQjs7QUFHRCx3QkFBVSxZQUFZO0FBQ3BCQSxJQUFBQSxZQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0QsR0FGRCxFQUVHLEVBRkg7O0FBSUEsTUFBSUQsU0FBSixFQUFlO0FBQ2IsV0FBT0QsUUFBUDtBQUNEOztBQUVELFNBQU9ELEtBQUssRUFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IERlZmF1bHRPblNTUiA9ICgpID0+IDxzcGFuPjwvc3Bhbj47XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5vU1NSKHtcbiAgb25TU1IgPSBEZWZhdWx0T25TU1IsXG4gIGNoaWxkcmVuLFxufToge1xuICBvblNTUjogKCkgPT4gUmVhY3QuUmVhY3ROb2RlO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufSkge1xuICBjb25zdCBbY2FuUmVuZGVyLCBzZXRDYW5SZW5kZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgc2V0Q2FuUmVuZGVyKHRydWUpO1xuICB9LCBbXSk7XG5cbiAgaWYgKGNhblJlbmRlcikge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHJldHVybiBvblNTUigpO1xufVxuIl19