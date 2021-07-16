"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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
                    var _ref6, action, location, route;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _ref6 = (0, _slicedToArray2["default"])(_ref4, 2), action = _ref6[0], location = _ref6[1];

                            if (routes.check(location)) {
                              _logger["default"].info({
                                path: location,
                                status: '200'
                              });
                            } else {
                              _logger["default"].warn({
                                path: location,
                                status: '404'
                              });
                            }

                            _context.next = 4;
                            return routes.match(location);

                          case 4:
                            route = _context.sent;
                            return _context.abrupt("return", [action, route]);

                          case 6:
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
                    location$.next(['push', windowLocation()]);
                  } else {
                    var _state$current2 = state.current,
                        _stack2 = _state$current2.stack,
                        _current2 = _state$current2.current; // back

                    if (_stack2[_current2 - 1]) {
                      var _back = link(_stack2[_current2 - 1].location);

                      if (_back == windowLocation()) {
                        state.current.current--;
                        forceUpdate();
                        return;
                      }
                    } // forward


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
                value: _objectSpread({
                  routes: routes,
                  loading: loading
                }, stack[current])
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
  location$.next(['push', target]);
}

function replace(location) {
  routesRequired();

  var target = _routes.link(location);

  history.replaceState(null, '', target);
  location$.next(['replace', target]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwib3ZlcmZsb3dZIiwiYmFja2dyb3VuZCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJBbmltYXRlZFBhZ2UiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzdGF0ZSIsInN0YWNrIiwiY3VycmVudCIsImZvcmNlVXBkYXRlIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJjaGVjayIsImxvZyIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImxpbmsiLCJmb3J3YXJkIiwiYW5pbWF0ZWRQYWdlcyIsInRyYW5zaXRpb25zIiwiZnJvbSIsIngiLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsIl8iLCJpIiwidHJhbnNsYXRlWCIsInRvIiwiekluZGV4IiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBQ0E7O0FBQ0E7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QUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTb0MsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXMUUsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU29FLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDckUsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJNEUsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVN4QixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ1YsUUFBUCxDQUFnQnNDLFFBQWhCLEdBQTJCNUIsTUFBTSxDQUFDVixRQUFQLENBQWdCdUMsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVUvRCxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUM4RCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU8vRCxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcbmltcG9ydCB1c2VGb3JjZVVwZGF0ZSBmcm9tICd1c2UtZm9yY2UtdXBkYXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxbJ3B1c2gnIHwgJ3JlcGxhY2UnLCBzdHJpbmddPigpO1xuXG5mdW5jdGlvbiBQYWdlKHtcbiAgY29udGVudCxcbiAgc3R5bGUgPSB7fSxcbn06IHtcbiAgY29udGVudDogTG9hZGVkUm91dGU7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSwgY2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbmNvbnN0IEFuaW1hdGVkUGFnZSA9IGFuaW1hdGVkKFBhZ2UpO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlUmVmKHtcbiAgICAgIHN0YWNrOiBbaW5pdGlhbFJvdXRlXSBhcyBMb2FkZWRSb3V0ZVtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gdXNlRm9yY2VVcGRhdGUoKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChbYWN0aW9uLCBsb2NhdGlvbl0pOiBQcm9taXNlPFxuICAgICAgICAgICAgW3N0cmluZywgTG9hZGVkUm91dGVdXG4gICAgICAgICAgPiB7XG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsb2NhdGlvbiwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gW2FjdGlvbiwgcm91dGVdO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKFthY3Rpb24sIHJvdXRlXSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICBzdGFjazogW3JvdXRlXSxcbiAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgd2luZG93TG9jYXRpb24oKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQuY3VycmVudC0tO1xuICAgICAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcblxuICAgIGNvbnN0IGFuaW1hdGVkUGFnZXMgPSBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSk7XG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB1c2VUcmFuc2l0aW9uKGFuaW1hdGVkUGFnZXMsIHtcbiAgICAgIGZyb206IHsgeDogMTAwIH0sXG4gICAgICBlbnRlcjogeyB4OiAwIH0sXG4gICAgICBsZWF2ZTogeyB4OiAxMDAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4uc3RhY2tbY3VycmVudF0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxQYWdlIGNvbnRlbnQ9e3N0YWNrWzBdfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMoKHsgeCB9LCBpdGVtLCBfLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBbmltYXRlZFBhZ2VcbiAgICAgICAgICAgICAgY29udGVudD17aXRlbX1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiB4LnRvKCh4KSA9PiBgJHt4fXZ3YCksXG4gICAgICAgICAgICAgICAgekluZGV4OiBpICsgMSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgdGFyZ2V0XSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19