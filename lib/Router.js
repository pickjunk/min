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
exports.onChange = onChange;
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
              return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Page, {
                route: stack[0],
                loading: loading,
                active: current == 0
              }), transitions(function (_ref9, item, _, i) {
                var x = _ref9.x;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  route: item,
                  loading: loading,
                  active: current == i,
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

function onChange(listener) {
  var sub = location$.subscribe(listener);
  return sub.unsubscribe;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsInJvdXRlIiwibG9hZGluZyIsImFjdGl2ZSIsInN0eWxlIiwib25TaG93IiwiY2IiLCJwb3NpdGlvbiIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIm92ZXJmbG93WSIsImJhY2tncm91bmQiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsIkFuaW1hdGVkUGFnZSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJzZXRMb2FkaW5nIiwic3RhdGUiLCJzdGFjayIsImN1cnJlbnQiLCJmb3JjZVVwZGF0ZSIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImFjdGlvbiIsImxvY2F0aW9uIiwibGluayIsImNoZWNrIiwibG9nIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsImNvbnRleHQiLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImZvcndhcmQiLCJhbmltYXRlZFBhZ2VzIiwidHJhbnNpdGlvbnMiLCJmcm9tIiwieCIsImVudGVyIiwibGVhdmUiLCJpdGVtIiwiXyIsImkiLCJ0cmFuc2xhdGVYIiwidG8iLCJ6SW5kZXgiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsIm9uQ2hhbmdlIiwibGlzdGVuZXIiLCJzdWIiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7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UUFBUCxDQUFnQjJDLE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVbEUsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDaUUsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPbEUsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5pbXBvcnQgdXNlRm9yY2VVcGRhdGUgZnJvbSAndXNlLWZvcmNlLXVwZGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dCB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJMb2NhdGlvbiBleHRlbmRzIExvY2F0aW9uIHtcbiAgY29udGV4dD86IENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9hZGVkUm91dGUgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIGNvbnRleHQ/OiBDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBSb3V0ZXJMb2FkZWRSb3V0ZSB7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIG9uU2hvdzogKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxbJ3B1c2gnIHwgJ3JlcGxhY2UnLCBSb3V0ZXJMb2NhdGlvbl0+KCk7XG5cbmZ1bmN0aW9uIFBhZ2Uoe1xuICByb3V0ZSxcbiAgbG9hZGluZyxcbiAgYWN0aXZlLFxuICBzdHlsZSA9IHt9LFxufToge1xuICByb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufSkge1xuICBmdW5jdGlvbiBvblNob3coY2I6ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkKSB7XG4gICAgdXNlRWZmZWN0KFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYWN0aXZlID09IHRydWUpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW2FjdGl2ZV0sXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGN0eC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgLi4ucm91dGUsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIG9uU2hvdyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y1ZjVmOScsXG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgICByb3V0ZS5yb3V0ZSxcbiAgICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSxcbiAgICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvY3R4LlByb3ZpZGVyPlxuICApO1xufVxuY29uc3QgQW5pbWF0ZWRQYWdlID0gYW5pbWF0ZWQoUGFnZSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBSb3V0ZXJMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3Qgc3RhdGUgPSB1c2VSZWYoe1xuICAgICAgc3RhY2s6IFtpbml0aWFsUm91dGVdIGFzIFJvdXRlckxvYWRlZFJvdXRlW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm9yY2VVcGRhdGUgPSB1c2VGb3JjZVVwZGF0ZSgpO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBSb3V0ZXJMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSByb3V0ZXMubGluayhsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2socGF0aCkpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChwYXRoKTtcblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgICAgICAgY29udGV4dDogbG9jYXRpb24uY29udGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgIHN0YWNrOiBbcm91dGVdLFxuICAgICAgICAgICAgICBjdXJyZW50OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ3B1c2gnKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50ICsgMSksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBjdXJyZW50ICsgMSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgc3RhY2s6IFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dChbXG4gICAgICAgICAgICAncHVzaCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBhdGg6IHdpbmRvd0xvY2F0aW9uKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQuY3VycmVudC0tO1xuICAgICAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcblxuICAgIGNvbnN0IGFuaW1hdGVkUGFnZXMgPSBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB1c2VUcmFuc2l0aW9uKGFuaW1hdGVkUGFnZXMsIHtcbiAgICAgIGZyb206IHsgeDogMTAwIH0sXG4gICAgICBlbnRlcjogeyB4OiAwIH0sXG4gICAgICBsZWF2ZTogeyB4OiAxMDAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8UGFnZSByb3V0ZT17c3RhY2tbMF19IGxvYWRpbmc9e2xvYWRpbmd9IGFjdGl2ZT17Y3VycmVudCA9PSAwfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMoKHsgeCB9LCBpdGVtLCBfLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBbmltYXRlZFBhZ2VcbiAgICAgICAgICAgICAgcm91dGU9e2l0ZW19XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2xvYWRpbmd9XG4gICAgICAgICAgICAgIGFjdGl2ZT17Y3VycmVudCA9PSBpfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHgudG8oKHgpID0+IGAke3h9dndgKSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IGkgKyAxLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IFJvdXRlckxvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3B1c2gnLCBsb2NhdGlvbl0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IFJvdXRlckxvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3JlcGxhY2UnLCBsb2NhdGlvbl0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb25DaGFuZ2UobGlzdGVuZXI6ICgpID0+IGFueSkge1xuICBjb25zdCBzdWIgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgcmV0dXJuIHN1Yi51bnN1YnNjcmliZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==