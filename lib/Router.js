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
      active = _ref.active,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;

  function onShow(cb) {
    (0, _react.useEffect)(function () {
      if (active == true) {
        cb();
      }
    }, [active]);
  }

  return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
    value: _objectSpread(_objectSpread({}, route), {}, {
      loading: loading,
      onShow: onShow
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

              function active(i) {
                return stack.length - 1 == i;
              }

              return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Page, {
                route: stack[0],
                loading: loading,
                active: active(0)
              }), transitions(function (_ref9, item, _, i) {
                var x = _ref9.x;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  route: item,
                  loading: loading,
                  active: active(i),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsInJvdXRlIiwibG9hZGluZyIsImFjdGl2ZSIsInN0eWxlIiwib25TaG93IiwiY2IiLCJwb3NpdGlvbiIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIm92ZXJmbG93WSIsImJhY2tncm91bmQiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsIkFuaW1hdGVkUGFnZSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJzZXRMb2FkaW5nIiwic3RhdGUiLCJzdGFjayIsImN1cnJlbnQiLCJmb3JjZVVwZGF0ZSIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImFjdGlvbiIsImxvY2F0aW9uIiwibGluayIsImNoZWNrIiwibG9nIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsImNvbnRleHQiLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImZvcndhcmQiLCJhbmltYXRlZFBhZ2VzIiwidHJhbnNpdGlvbnMiLCJmcm9tIiwieCIsImVudGVyIiwibGVhdmUiLCJpIiwibGVuZ3RoIiwiaXRlbSIsIl8iLCJ0cmFuc2xhdGVYIiwidG8iLCJ6SW5kZXgiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsInVzZVJvdXRlciIsIkVycm9yIiwicGF0aG5hbWUiLCJzZWFyY2giLCJyb3V0aW5nIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVaEUsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDK0QsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPaEUsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5pbXBvcnQgdXNlRm9yY2VVcGRhdGUgZnJvbSAndXNlLWZvcmNlLXVwZGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dCB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJMb2NhdGlvbiBleHRlbmRzIExvY2F0aW9uIHtcbiAgY29udGV4dD86IENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9hZGVkUm91dGUgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIGNvbnRleHQ/OiBDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBSb3V0ZXJMb2FkZWRSb3V0ZSB7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIG9uU2hvdzogKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxbJ3B1c2gnIHwgJ3JlcGxhY2UnLCBSb3V0ZXJMb2NhdGlvbl0+KCk7XG5cbmZ1bmN0aW9uIFBhZ2Uoe1xuICByb3V0ZSxcbiAgbG9hZGluZyxcbiAgYWN0aXZlLFxuICBzdHlsZSA9IHt9LFxufToge1xuICByb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufSkge1xuICBmdW5jdGlvbiBvblNob3coY2I6ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkKSB7XG4gICAgdXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYWN0aXZlID09IHRydWUpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW2FjdGl2ZV0sXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGN0eC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgLi4ucm91dGUsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIG9uU2hvdyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y1ZjVmOScsXG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgICByb3V0ZS5yb3V0ZSxcbiAgICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSxcbiAgICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvY3R4LlByb3ZpZGVyPlxuICApO1xufVxuY29uc3QgQW5pbWF0ZWRQYWdlID0gYW5pbWF0ZWQoUGFnZSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBSb3V0ZXJMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3Qgc3RhdGUgPSB1c2VSZWYoe1xuICAgICAgc3RhY2s6IFtpbml0aWFsUm91dGVdIGFzIFJvdXRlckxvYWRlZFJvdXRlW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VGb3JjZVVwZGF0ZSgpO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBSb3V0ZXJMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSByb3V0ZXMubGluayhsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2socGF0aCkpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChwYXRoKTtcblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogbG9jYXRpb24uY29udGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgIHN0YWNrOiBbcm91dGVdLFxuICAgICAgICAgICAgICBjdXJyZW50OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ3B1c2gnKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50ICsgMSksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50ICsgMSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dChbXG4gICAgICAgICAgICAncHVzaCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6IHdpbmRvd0xvY2F0aW9uKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQuY3VycmVudC0tO1xuICAgICAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcblxuICAgIGNvbnN0IGFuaW1hdGVkUGFnZXMgPSBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB1c2VUcmFuc2l0aW9uKGFuaW1hdGVkUGFnZXMsIHtcbiAgICAgIGZyb206IHsgeDogMTAwIH0sXG4gICAgICBlbnRlcjogeyB4OiAwIH0sXG4gICAgICBsZWF2ZTogeyB4OiAxMDAgfSxcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGFjdGl2ZShpOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBzdGFjay5sZW5ndGggLSAxID09IGk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxQYWdlIHJvdXRlPXtzdGFja1swXX0gbG9hZGluZz17bG9hZGluZ30gYWN0aXZlPXthY3RpdmUoMCl9IC8+XG4gICAgICAgIHt0cmFuc2l0aW9ucygoeyB4IH0sIGl0ZW0sIF8sIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFuaW1hdGVkUGFnZVxuICAgICAgICAgICAgICByb3V0ZT17aXRlbX1cbiAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgYWN0aXZlPXthY3RpdmUoaSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogeC50bygoeCkgPT4gYCR7eH12d2ApLFxuICAgICAgICAgICAgICAgIHpJbmRleDogaSArIDEsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC8+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nKGluaXQ6IFJvdXRpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LnJvdXRpbmcgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=