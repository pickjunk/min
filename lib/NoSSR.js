"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NoSSR;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Ob1NTUi50c3giXSwibmFtZXMiOlsiRGVmYXVsdE9uU1NSIiwiTm9TU1IiLCJvblNTUiIsImNoaWxkcmVuIiwiY2FuUmVuZGVyIiwic2V0Q2FuUmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVksR0FBRyxTQUFmQSxZQUFlO0FBQUEsc0JBQU0sNkNBQU47QUFBQSxDQUFyQjs7QUFFZSxTQUFTQyxLQUFULE9BTVo7QUFBQSx3QkFMREMsS0FLQztBQUFBLE1BTERBLEtBS0MsMkJBTE9GLFlBS1A7QUFBQSxNQUpERyxRQUlDLFFBSkRBLFFBSUM7O0FBQ0Qsa0JBQWtDLHFCQUFTLEtBQVQsQ0FBbEM7QUFBQTtBQUFBLE1BQU9DLFNBQVA7QUFBQSxNQUFrQkMsWUFBbEI7O0FBRUEsd0JBQVUsWUFBWTtBQUNwQkEsSUFBQUEsWUFBWSxDQUFDLElBQUQsQ0FBWjtBQUNELEdBRkQsRUFFRyxFQUZIOztBQUlBLE1BQUlELFNBQUosRUFBZTtBQUNiLFdBQU9ELFFBQVA7QUFDRDs7QUFFRCxTQUFPRCxLQUFLLEVBQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBEZWZhdWx0T25TU1IgPSAoKSA9PiA8c3Bhbj48L3NwYW4+O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOb1NTUih7XG4gIG9uU1NSID0gRGVmYXVsdE9uU1NSLFxuICBjaGlsZHJlbixcbn06IHtcbiAgb25TU1I6ICgpID0+IFJlYWN0LlJlYWN0Tm9kZTtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn0pIHtcbiAgY29uc3QgW2NhblJlbmRlciwgc2V0Q2FuUmVuZGVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHNldENhblJlbmRlcih0cnVlKTtcbiAgfSwgW10pO1xuXG4gIGlmIChjYW5SZW5kZXIpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICByZXR1cm4gb25TU1IoKTtcbn1cbiJdfQ==