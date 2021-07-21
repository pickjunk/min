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
  var route = _ref.route,
      loading = _ref.loading,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
    value: _objectSpread(_objectSpread({}, route), {}, {
      loading: loading
    })
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: 'auto',
      background: '#f5f5f9'
    }, style)
  }, (0, _reduceRight["default"])(route.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path
    }), child);
  }, null)));
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

              function isLoading(i) {
                return stack.length - 1 == i && loading;
              }

              return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Page, {
                route: stack[0],
                loading: isLoading(0)
              }), transitions(function (_ref9, item, _, i) {
                var x = _ref9.x;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  route: item,
                  loading: isLoading(i),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsInJvdXRlIiwibG9hZGluZyIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJvdmVyZmxvd1kiLCJiYWNrZ3JvdW5kIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJBbmltYXRlZFBhZ2UiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwic2V0TG9hZGluZyIsInN0YXRlIiwic3RhY2siLCJjdXJyZW50IiwiZm9yY2VVcGRhdGUiLCJzdGFydCIsInN1YnNjcmliZSIsImVuZCIsInBpcGUiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImxpbmsiLCJjaGVjayIsImxvZyIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJjb250ZXh0Iiwic2xpY2UiLCJ1bnN1YnNjcmliZSIsIm9yaWdpblBvcFN0YXRlIiwid2luZG93Iiwib25wb3BzdGF0ZSIsIm5leHQiLCJ3aW5kb3dMb2NhdGlvbiIsImJhY2siLCJmb3J3YXJkIiwiYW5pbWF0ZWRQYWdlcyIsInRyYW5zaXRpb25zIiwiZnJvbSIsIngiLCJlbnRlciIsImxlYXZlIiwiaXNMb2FkaW5nIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJfIiwidHJhbnNsYXRlWCIsInRvIiwiekluZGV4IiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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QXFCLElBQXJCLEVBQTJCLEVBQTNCLEVBQStCSixNQUEvQjtBQUNBdEUsRUFBQUEsU0FBUyxDQUFDa0QsSUFBVixDQUFlLENBQUMsU0FBRCxFQUFZZCxRQUFaLENBQWY7QUFDRDs7QUFDTSxTQUFTZ0IsSUFBVCxHQUFzQjtBQUMzQmlCLEVBQUFBLGNBQWM7QUFFZEUsRUFBQUEsT0FBTyxDQUFDbkIsSUFBUjtBQUNEOztBQUNNLFNBQVNDLE9BQVQsR0FBeUI7QUFDOUJnQixFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ2xCLE9BQVI7QUFDRDs7QUFDTSxTQUFTaEIsSUFBVCxDQUFjRCxRQUFkLEVBQTBDO0FBQy9DaUMsRUFBQUEsY0FBYztBQUVkLFNBQU92RSxPQUFPLENBQUV1QyxJQUFULENBQWNELFFBQWQsQ0FBUDtBQUNEOztBQUVNLFNBQVN1QyxTQUFULEdBQXFCO0FBQzFCLFNBQU8sdUJBQVc1RSxHQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFTc0UsY0FBVCxHQUEwQjtBQUN4QixNQUFJLENBQUN2RSxPQUFMLEVBQWM7QUFDWixVQUFNLElBQUk4RSxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRU0sU0FBU3pCLGNBQVQsR0FBa0M7QUFDdkMsU0FBT0gsTUFBTSxDQUFDWixRQUFQLENBQWdCeUMsUUFBaEIsR0FBMkI3QixNQUFNLENBQUNaLFFBQVAsQ0FBZ0IwQyxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQWdDO0FBQ3JDLFNBQU8sVUFBVWpFLFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQ2dFLE9BQVYsR0FBb0JDLElBQXBCO0FBQ0EsV0FBT2pFLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxuICB1c2VSZWYsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiwgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuaW1wb3J0IHVzZUZvcmNlVXBkYXRlIGZyb20gJ3VzZS1mb3JjZS11cGRhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRleHQge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9jYXRpb24gZXh0ZW5kcyBMb2NhdGlvbiB7XG4gIGNvbnRleHQ/OiBDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckxvYWRlZFJvdXRlIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBjb250ZXh0PzogQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgUm91dGVyTG9hZGVkUm91dGUge1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIFJvdXRlckxvY2F0aW9uXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7XG4gIHJvdXRlLFxuICBsb2FkaW5nLFxuICBzdHlsZSA9IHt9LFxufToge1xuICByb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICB2YWx1ZT17e1xuICAgICAgICAuLi5yb3V0ZSxcbiAgICAgICAgbG9hZGluZyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y1ZjVmOScsXG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgICByb3V0ZS5yb3V0ZSxcbiAgICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSxcbiAgICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvY3R4LlByb3ZpZGVyPlxuICApO1xufVxuY29uc3QgQW5pbWF0ZWRQYWdlID0gYW5pbWF0ZWQoUGFnZSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBSb3V0ZXJMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3Qgc3RhdGUgPSB1c2VSZWYoe1xuICAgICAgc3RhY2s6IFtpbml0aWFsUm91dGVdIGFzIFJvdXRlckxvYWRlZFJvdXRlW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VGb3JjZVVwZGF0ZSgpO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBSb3V0ZXJMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSByb3V0ZXMubGluayhsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2socGF0aCkpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChwYXRoKTtcblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogbG9jYXRpb24uY29udGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgIHN0YWNrOiBbcm91dGVdLFxuICAgICAgICAgICAgICBjdXJyZW50OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ3B1c2gnKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50ICsgMSksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50ICsgMSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dChbXG4gICAgICAgICAgICAncHVzaCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6IHdpbmRvd0xvY2F0aW9uKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQuY3VycmVudC0tO1xuICAgICAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcblxuICAgIGNvbnN0IGFuaW1hdGVkUGFnZXMgPSBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB1c2VUcmFuc2l0aW9uKGFuaW1hdGVkUGFnZXMsIHtcbiAgICAgIGZyb206IHsgeDogMTAwIH0sXG4gICAgICBlbnRlcjogeyB4OiAwIH0sXG4gICAgICBsZWF2ZTogeyB4OiAxMDAgfSxcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGlzTG9hZGluZyhpOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBzdGFjay5sZW5ndGggLSAxID09IGkgJiYgbG9hZGluZztcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPFBhZ2Ugcm91dGU9e3N0YWNrWzBdfSBsb2FkaW5nPXtpc0xvYWRpbmcoMCl9IC8+XG4gICAgICAgIHt0cmFuc2l0aW9ucygoeyB4IH0sIGl0ZW0sIF8sIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFuaW1hdGVkUGFnZVxuICAgICAgICAgICAgICByb3V0ZT17aXRlbX1cbiAgICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nKGkpfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHgudG8oKHgpID0+IGAke3h9dndgKSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IGkgKyAxLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IFJvdXRlckxvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3B1c2gnLCBsb2NhdGlvbl0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IFJvdXRlckxvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3JlcGxhY2UnLCBsb2NhdGlvbl0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19