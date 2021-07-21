"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;
exports.replace = replace;
exports.back = back;
exports.forward = forward;
exports.link = link;
exports.useRouter = useRouter;
exports.windowLocation = windowLocation;
exports.routing = routing;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduceRight = _interopRequireDefault(require("lodash/reduceRight"));

var _logger = _interopRequireDefault(require("./logger"));

var _reactSpring = require("react-spring");

var _useForceUpdate = _interopRequireDefault(require("use-force-update"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _routes = null;
var ctx = /*#__PURE__*/(0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function Page(_ref) {
  var content = _ref.content,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: 'auto',
      background: '#f5f5f9'
    }, style)
  }, (0, _reduceRight["default"])(content.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path
    }), child);
  }, null));
}

var AnimatedPage = (0, _reactSpring.animated)(Page);

function createRouter(_x) {
  return _createRouter.apply(this, arguments);
}

function _createRouter() {
  _createRouter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var routes, initialRoute, likeApp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = _ref3.routes, initialRoute = _ref3.initialRoute, likeApp = _ref3.likeApp;
            _routes = routes;
            return _context2.abrupt("return", function Router() {
              var _useState = (0, _react.useState)(false),
                  _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
                  loading = _useState2[0],
                  setLoading = _useState2[1];

              var state = (0, _react.useRef)({
                stack: [initialRoute],
                current: 0
              });
              var forceUpdate = (0, _useForceUpdate["default"])();
              (0, _react.useEffect)(function () {
                var start = location$.subscribe(function () {
                  setLoading(true);
                });
                var end = location$.pipe((0, _operators.switchMap)( /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref4) {
                    var _ref6, action, location, path, route;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _ref6 = (0, _slicedToArray2["default"])(_ref4, 2), action = _ref6[0], location = _ref6[1];
                            path = routes.link(location);

                            if (routes.check(path)) {
                              _logger["default"].info({
                                path: path,
                                status: '200'
                              });
                            } else {
                              _logger["default"].warn({
                                path: path,
                                status: '404'
                              });
                            }

                            _context.next = 5;
                            return routes.match(path);

                          case 5:
                            route = _context.sent;
                            return _context.abrupt("return", [action, _objectSpread(_objectSpread({}, route), {}, {
                              context: location.context
                            })]);

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }())).subscribe(function (_ref7) {
                  var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                      action = _ref8[0],
                      route = _ref8[1];

                  setLoading(false);

                  if (!likeApp) {
                    state.current = {
                      stack: [route],
                      current: 0
                    };
                  } else {
                    var _state$current = state.current,
                        _stack = _state$current.stack,
                        _current = _state$current.current;

                    if (action == 'push') {
                      state.current = {
                        stack: [].concat((0, _toConsumableArray2["default"])(_stack.slice(0, _current + 1)), [route]),
                        current: _current + 1
                      };
                    } else {
                      state.current = {
                        stack: [].concat((0, _toConsumableArray2["default"])(_stack.slice(0, _current)), [route]),
                        current: _current
                      };
                    }
                  }

                  forceUpdate();
                });
                return function () {
                  start.unsubscribe();
                  end.unsubscribe();
                };
              }, []);
              (0, _react.useEffect)(function () {
                var originPopState = window.onpopstate;

                window.onpopstate = function () {
                  if (!likeApp) {
                    location$.next(['push', {
                      path: windowLocation()
                    }]);
                  } else {
                    var _state$current2 = state.current,
                        _stack2 = _state$current2.stack,
                        _current2 = _state$current2.current; // back

                    // back
                    if (_stack2[_current2 - 1]) {
                      var _back = link(_stack2[_current2 - 1].location);

                      if (_back == windowLocation()) {
                        state.current.current--;
                        forceUpdate();
                        return;
                      }
                    } // forward


                    // forward
                    if (_stack2[_current2 + 1]) {
                      var _forward = link(_stack2[_current2 + 1].location);

                      if (_forward == windowLocation()) {
                        state.current.current++;
                        forceUpdate();
                        return;
                      }
                    }
                  }
                };

                return function () {
                  window.onpopstate = originPopState;
                };
              }, []);
              var _state$current3 = state.current,
                  stack = _state$current3.stack,
                  current = _state$current3.current;
              var animatedPages = stack.slice(1, current + 1);
              var transitions = (0, _reactSpring.useTransition)(animatedPages, {
                from: {
                  x: 100
                },
                enter: {
                  x: 0
                },
                leave: {
                  x: 100
                }
              });
              return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
                value: _objectSpread(_objectSpread({}, stack[current]), {}, {
                  routes: routes,
                  loading: loading
                })
              }, /*#__PURE__*/_react["default"].createElement(Page, {
                content: stack[0]
              }), transitions(function (_ref9, item, _, i) {
                var x = _ref9.x;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  content: item,
                  style: {
                    translateX: x.to(function (x) {
                      return "".concat(x, "vw");
                    }),
                    zIndex: i + 1
                  }
                });
              }));
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createRouter.apply(this, arguments);
}

var _default = createRouter;
exports["default"] = _default;

function push(location) {
  routesRequired();

  var target = _routes.link(location);

  history.pushState(null, '', target);
  location$.next(['push', location]);
}

function replace(location) {
  routesRequired();

  var target = _routes.link(location);

  history.replaceState(null, '', target);
  location$.next(['replace', location]);
}

function back() {
  routesRequired();
  history.back();
}

function forward() {
  routesRequired();
  history.forward();
}

function link(location) {
  routesRequired();
  return _routes.link(location);
}

function useRouter() {
  return (0, _react.useContext)(ctx);
}

function routesRequired() {
  if (!_routes) {
    throw new Error("Router is not created, " + "make sure to render <Router /> in your bootstrap");
  }
}

function windowLocation() {
  return window.location.pathname + window.location.search;
}

function routing(init) {
  return function (component) {
    component.routing = init;
    return component;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwib3ZlcmZsb3dZIiwiYmFja2dyb3VuZCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJBbmltYXRlZFBhZ2UiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzdGF0ZSIsInN0YWNrIiwiY3VycmVudCIsImZvcmNlVXBkYXRlIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJsaW5rIiwiY2hlY2siLCJsb2ciLCJpbmZvIiwic3RhdHVzIiwid2FybiIsIm1hdGNoIiwiY29udGV4dCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwiZm9yd2FyZCIsImFuaW1hdGVkUGFnZXMiLCJ0cmFuc2l0aW9ucyIsImZyb20iLCJ4IiwiZW50ZXIiLCJsZWF2ZSIsIml0ZW0iLCJfIiwiaSIsInRyYW5zbGF0ZVgiLCJ0byIsInpJbmRleCIsInB1c2giLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwidXNlUm91dGVyIiwiRXJyb3IiLCJwYXRobmFtZSIsInNlYXJjaCIsInJvdXRpbmciLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQVFBOztB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QUF5QjtBQUM5QmMsRUFBQUEsY0FBYztBQUVkRSxFQUFBQSxPQUFPLENBQUNoQixPQUFSO0FBQ0Q7O0FBQ00sU0FBU2hCLElBQVQsQ0FBY0QsUUFBZCxFQUEwQztBQUMvQytCLEVBQUFBLGNBQWM7QUFFZCxTQUFPdEUsT0FBTyxDQUFFd0MsSUFBVCxDQUFjRCxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTcUMsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXM0UsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3FFLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDdEUsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJNkUsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVN2QixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ1osUUFBUCxDQUFnQnVDLFFBQWhCLEdBQTJCM0IsTUFBTSxDQUFDWixRQUFQLENBQWdCd0MsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVVoRSxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUMrRCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU9oRSxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcbmltcG9ydCB1c2VGb3JjZVVwZGF0ZSBmcm9tICd1c2UtZm9yY2UtdXBkYXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0IHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckxvY2F0aW9uIGV4dGVuZHMgTG9jYXRpb24ge1xuICBjb250ZXh0PzogQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJMb2FkZWRSb3V0ZSBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgY29udGV4dD86IENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIFJvdXRlckxvYWRlZFJvdXRlIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY2hIYW5kbGVyIHtcbiAgKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8WydwdXNoJyB8ICdyZXBsYWNlJywgUm91dGVyTG9jYXRpb25dPigpO1xuXG5mdW5jdGlvbiBQYWdlKHtcbiAgY29udGVudCxcbiAgc3R5bGUgPSB7fSxcbn06IHtcbiAgY29udGVudDogTG9hZGVkUm91dGU7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSwgY2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbmNvbnN0IEFuaW1hdGVkUGFnZSA9IGFuaW1hdGVkKFBhZ2UpO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogUm91dGVyTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlUmVmKHtcbiAgICAgIHN0YWNrOiBbaW5pdGlhbFJvdXRlXSBhcyBSb3V0ZXJMb2FkZWRSb3V0ZVtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gdXNlRm9yY2VVcGRhdGUoKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChbYWN0aW9uLCBsb2NhdGlvbl0pOiBQcm9taXNlPFxuICAgICAgICAgICAgW3N0cmluZywgUm91dGVyTG9hZGVkUm91dGVdXG4gICAgICAgICAgPiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gcm91dGVzLmxpbmsobG9jYXRpb24pO1xuXG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKHBhdGgpKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aCwgc3RhdHVzOiAnMjAwJyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gocGF0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLnJvdXRlLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGxvY2F0aW9uLmNvbnRleHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKFthY3Rpb24sIHJvdXRlXSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICBzdGFjazogW3JvdXRlXSxcbiAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoW1xuICAgICAgICAgICAgJ3B1c2gnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiB3aW5kb3dMb2NhdGlvbigpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IHN0YWNrLCBjdXJyZW50IH0gPSBzdGF0ZS5jdXJyZW50O1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQtLTtcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmb3J3YXJkXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgKyAxXSkge1xuICAgICAgICAgICAgY29uc3QgZm9yd2FyZCA9IGxpbmsoc3RhY2tbY3VycmVudCArIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudC5jdXJyZW50Kys7XG4gICAgICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG5cbiAgICBjb25zdCBhbmltYXRlZFBhZ2VzID0gc3RhY2suc2xpY2UoMSwgY3VycmVudCArIDEpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihhbmltYXRlZFBhZ2VzLCB7XG4gICAgICBmcm9tOiB7IHg6IDEwMCB9LFxuICAgICAgZW50ZXI6IHsgeDogMCB9LFxuICAgICAgbGVhdmU6IHsgeDogMTAwIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1swXX0gLz5cbiAgICAgICAge3RyYW5zaXRpb25zKCh7IHggfSwgaXRlbSwgXywgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QW5pbWF0ZWRQYWdlXG4gICAgICAgICAgICAgIGNvbnRlbnQ9e2l0ZW19XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogeC50bygoeCkgPT4gYCR7eH12d2ApLFxuICAgICAgICAgICAgICAgIHpJbmRleDogaSArIDEsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nKGluaXQ6IFJvdXRpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LnJvdXRpbmcgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=