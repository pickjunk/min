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

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
      layer = _ref.layer,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  var ref = (0, _react.useRef)(null);
  var reachBottom = (0, _react.useCallback)(function (cb) {
    var lock = false;
    var page = ref.current;

    function listener() {
      return _listener.apply(this, arguments);
    }

    function _listener() {
      _listener = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!lock && page.scrollHeight - page.scrollTop - page.clientHeight < 3)) {
                  _context.next = 11;
                  break;
                }

                console.log('reach bottom');
                lock = true;
                _context.prev = 3;
                _context.next = 6;
                return cb();

              case 6:
                _context.next = 10;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);

              case 10:
                lock = false;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 8]]);
      }));
      return _listener.apply(this, arguments);
    }

    page.addEventListener('scroll', listener);
    return function unmount() {
      page.removeEventListener('scroll', listener);
    };
  }, [ref]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: 'auto',
      zIndex: layer,
      background: '#f5f5f9'
    }, style),
    ref: ref
  }, (0, _reduceRight["default"])(content.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path,
      reachBottom: reachBottom
    }), child);
  }, null));
}

function createRouter(_x) {
  return _createRouter.apply(this, arguments);
}

function _createRouter() {
  _createRouter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var routes, initialRoute, likeApp;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            routes = _ref3.routes, initialRoute = _ref3.initialRoute, likeApp = _ref3.likeApp;
            _routes = routes;
            return _context3.abrupt("return", function Router() {
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
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref4) {
                    var _ref6, action, location, route;

                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
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

                            _context2.next = 4;
                            return routes.match(location);

                          case 4:
                            route = _context2.sent;
                            return _context2.abrupt("return", [action, route]);

                          case 6:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
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
              var transitions = (0, _reactSpring.useTransition)(stack.slice(1, current + 1).map(function (_, i) {
                return i;
              }), function (i) {
                return i;
              }, {
                from: {
                  left: '100vw'
                },
                enter: {
                  left: '0vw'
                },
                leave: {
                  left: '100vw'
                }
              });
              console.log(stack, current);
              var AnimatedPage = (0, _reactSpring.animated)(Page);
              return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
                value: _objectSpread({
                  routes: routes,
                  loading: loading
                }, stack[current])
              }, /*#__PURE__*/_react["default"].createElement(Page, {
                content: stack[0],
                layer: 0
              }), transitions.map(function (_ref9) {
                var item = _ref9.item,
                    props = _ref9.props;
                var layer = item + 1;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  key: layer,
                  content: stack[layer],
                  layer: layer,
                  style: props
                });
              }));
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsInN0eWxlIiwicmVmIiwicmVhY2hCb3R0b20iLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwic2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsVG9wIiwiY2xpZW50SGVpZ2h0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBvc2l0aW9uIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4IiwiYmFja2dyb3VuZCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzdGF0ZSIsInN0YWNrIiwiZm9yY2VVcGRhdGUiLCJzdGFydCIsInN1YnNjcmliZSIsImVuZCIsInBpcGUiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImNoZWNrIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImZvcndhcmQiLCJ0cmFuc2l0aW9ucyIsIm1hcCIsIl8iLCJpIiwiZnJvbSIsImVudGVyIiwibGVhdmUiLCJBbmltYXRlZFBhZ2UiLCJpdGVtIiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBU0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQVdBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLGdCQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O0FBRUEsU0FBU0MsSUFBVCxPQVFHO0FBQUEsTUFQREMsT0FPQyxRQVBEQSxPQU9DO0FBQUEsTUFOREMsS0FNQyxRQU5EQSxLQU1DO0FBQUEsd0JBTERDLEtBS0M7QUFBQSxNQUxEQSxLQUtDLDJCQUxPLEVBS1A7QUFDRCxNQUFNQyxHQUFHLEdBQUcsbUJBQXVCLElBQXZCLENBQVo7QUFFQSxNQUFNQyxXQUFXLEdBQUcsd0JBQ2xCLFVBQVVDLEVBQVYsRUFBbUM7QUFDakMsUUFBSUMsSUFBSSxHQUFHLEtBQVg7QUFFQSxRQUFNQyxJQUFJLEdBQUdKLEdBQUcsQ0FBQ0ssT0FBakI7O0FBSGlDLGFBSWxCQyxRQUprQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSxnR0FJakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUVJLENBQUNILElBQUQsSUFDQUMsSUFBSSxDQUFDRyxZQUFMLEdBQW9CSCxJQUFJLENBQUNJLFNBQXpCLEdBQXFDSixJQUFJLENBQUNLLFlBQTFDLEdBQXlELENBSDdEO0FBQUE7QUFBQTtBQUFBOztBQUtJQyxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUVBUixnQkFBQUEsSUFBSSxHQUFHLElBQVA7QUFQSjtBQUFBO0FBQUEsdUJBU1lELEVBQUUsRUFUZDs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBV0lDLGdCQUFBQSxJQUFJLEdBQUcsS0FBUDs7QUFYSjtBQUFBO0FBQUE7QUFB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K0QsSUFBVixDQUFlLENBQUMsU0FBRCxFQUFZZ0IsTUFBWixDQUFmO0FBQ0Q7O0FBQ00sU0FBU2QsSUFBVCxHQUFzQjtBQUMzQmEsRUFBQUEsY0FBYztBQUVkRSxFQUFBQSxPQUFPLENBQUNmLElBQVI7QUFDRDs7QUFDTSxTQUFTRSxPQUFULEdBQXlCO0FBQzlCVyxFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ2IsT0FBUjtBQUNEOztBQUNNLFNBQVNELElBQVQsQ0FBY2QsUUFBZCxFQUEwQztBQUMvQzBCLEVBQUFBLGNBQWM7QUFFZCxTQUFPaEYsT0FBTyxDQUFFb0UsSUFBVCxDQUFjZCxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTZ0MsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckYsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUytFLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDaEYsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJdUYsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVNyQixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ1QsUUFBUCxDQUFnQmtDLFFBQWhCLEdBQTJCekIsTUFBTSxDQUFDVCxRQUFQLENBQWdCbUMsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVV6RCxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUN3RCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU96RCxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxuICB1c2VDYWxsYmFjayxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5pbXBvcnQgdXNlRm9yY2VVcGRhdGUgZnJvbSAndXNlLWZvcmNlLXVwZGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY2hIYW5kbGVyIHtcbiAgKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8WydwdXNoJyB8ICdyZXBsYWNlJywgc3RyaW5nXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7XG4gIGNvbnRlbnQsXG4gIGxheWVyLFxuICBzdHlsZSA9IHt9LFxufToge1xuICBjb250ZW50OiBMb2FkZWRSb3V0ZTtcbiAgbGF5ZXI6IG51bWJlcjtcbiAgc3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufSkge1xuICBjb25zdCByZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHJlYWNoQm90dG9tID0gdXNlQ2FsbGJhY2soXG4gICAgZnVuY3Rpb24gKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgICBsZXQgbG9jayA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBwYWdlID0gcmVmLmN1cnJlbnQhO1xuICAgICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhbG9jayAmJlxuICAgICAgICAgIHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5zY3JvbGxUb3AgLSBwYWdlLmNsaWVudEhlaWdodCA8IDNcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoIGJvdHRvbScpO1xuXG4gICAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNiKCk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgICB9O1xuICAgIH0sXG4gICAgW3JlZl0sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgekluZGV4OiBsYXllcixcbiAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgICByZWY9e3JlZn1cbiAgICA+XG4gICAgICB7cmVkdWNlUmlnaHQoXG4gICAgICAgIGNvbnRlbnQucm91dGUsXG4gICAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQsIHByb3BzIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICAgIHsgLi4ucHJvcHMsIGtleTogcGF0aCwgcmVhY2hCb3R0b20gfSxcbiAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG51bGwsXG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlUmVmKHtcbiAgICAgIHN0YWNrOiBbaW5pdGlhbFJvdXRlXSBhcyBMb2FkZWRSb3V0ZVtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gdXNlRm9yY2VVcGRhdGUoKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChbYWN0aW9uLCBsb2NhdGlvbl0pOiBQcm9taXNlPFxuICAgICAgICAgICAgW3N0cmluZywgTG9hZGVkUm91dGVdXG4gICAgICAgICAgPiB7XG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsb2NhdGlvbiwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gW2FjdGlvbiwgcm91dGVdO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKFthY3Rpb24sIHJvdXRlXSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICBzdGFjazogW3JvdXRlXSxcbiAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgd2luZG93TG9jYXRpb24oKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHN0YXRlLmN1cnJlbnQuY3VycmVudC0tO1xuICAgICAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQrKztcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgeyBzdGFjaywgY3VycmVudCB9ID0gc3RhdGUuY3VycmVudDtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHN0YWNrLnNsaWNlKDEsIGN1cnJlbnQgKyAxKS5tYXAoKF8sIGkpID0+IGkpLFxuICAgICAgKGkpID0+IGksXG4gICAgICB7XG4gICAgICAgIGZyb206IHsgbGVmdDogJzEwMHZ3JyB9LFxuICAgICAgICBlbnRlcjogeyBsZWZ0OiAnMHZ3JyB9LFxuICAgICAgICBsZWF2ZTogeyBsZWZ0OiAnMTAwdncnIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgY29uc29sZS5sb2coc3RhY2ssIGN1cnJlbnQpO1xuXG4gICAgY29uc3QgQW5pbWF0ZWRQYWdlID0gYW5pbWF0ZWQoUGFnZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1swXX0gbGF5ZXI9ezB9IC8+XG4gICAgICAgIHt0cmFuc2l0aW9ucy5tYXAoKHsgaXRlbSwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxheWVyID0gaXRlbSArIDE7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBbmltYXRlZFBhZ2VcbiAgICAgICAgICAgICAga2V5PXtsYXllcn1cbiAgICAgICAgICAgICAgY29udGVudD17c3RhY2tbbGF5ZXJdfVxuICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICAgIHN0eWxlPXtwcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgdGFyZ2V0XSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19