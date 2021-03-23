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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduceRight = _interopRequireDefault(require("lodash/reduceRight"));

var _logger = _interopRequireDefault(require("./logger"));

var _reactSpring = require("react-spring");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _routes = null;
var ctx = /*#__PURE__*/(0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function Page(_ref) {
  var content = _ref.content,
      layer = _ref.layer;
  var el = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      scrollTop = _useState2[0],
      setScrollTop = _useState2[1];

  function reachTop(cb) {
    var lock = false;
    var page = el.current;

    function listener() {
      return _listener.apply(this, arguments);
    }

    function _listener() {
      _listener = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var preScrollHeight;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!lock && page.scrollTop == 0)) {
                  _context.next = 13;
                  break;
                }

                console.log('reach top');
                lock = true;
                _context.prev = 3;
                preScrollHeight = page.scrollHeight;
                _context.next = 7;
                return cb();

              case 7:
                setScrollTop(page.scrollHeight - preScrollHeight);
                _context.next = 12;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);

              case 12:
                lock = false;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));
      return _listener.apply(this, arguments);
    }

    setScrollTop(page.scrollHeight - page.clientHeight);
    page.addEventListener('scroll', listener);
    return function unmount() {
      page.removeEventListener('scroll', listener);
    };
  }

  (0, _react.useEffect)(function () {
    if (el.current) {
      el.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  function reachBottom(cb) {
    var lock = false;
    var page = el.current;

    function listener() {
      return _listener2.apply(this, arguments);
    }

    function _listener2() {
      _listener2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!lock && page.scrollHeight - page.scrollTop - page.clientHeight < 3)) {
                  _context2.next = 11;
                  break;
                }

                console.log('reach top');
                lock = true;
                _context2.prev = 3;
                _context2.next = 6;
                return cb();

              case 6:
                _context2.next = 10;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](3);

              case 10:
                lock = false;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 8]]);
      }));
      return _listener2.apply(this, arguments);
    }

    page.addEventListener('scroll', listener);
    return function unmount() {
      page.removeEventListener('scroll', listener);
    };
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: '100vh',
      overflowY: 'auto',
      zIndex: layer
    },
    ref: el
  }, (0, _reduceRight["default"])(content.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path,
      reachTop: reachTop,
      reachBottom: reachBottom
    }), child);
  }, null));
}

function createRouter(_x) {
  return _createRouter.apply(this, arguments);
}

function _createRouter() {
  _createRouter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref3) {
    var routes, initialRoute, likeApp;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            routes = _ref3.routes, initialRoute = _ref3.initialRoute, likeApp = _ref3.likeApp;
            _routes = routes;
            return _context4.abrupt("return", function Router() {
              var _useState3 = (0, _react.useState)(false),
                  _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
                  loading = _useState4[0],
                  setLoading = _useState4[1];

              var _useState5 = (0, _react.useState)(0),
                  _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
                  current = _useState6[0],
                  setCurrent = _useState6[1];

              var _useState7 = (0, _react.useState)([initialRoute]),
                  _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
                  stack = _useState8[0],
                  setStack = _useState8[1];

              (0, _react.useEffect)(function () {
                var start = location$.subscribe(function () {
                  setLoading(true);
                });
                var end = location$.pipe((0, _operators.switchMap)( /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref4) {
                    var _ref6, action, location, route;

                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
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

                            _context3.next = 4;
                            return routes.match(location);

                          case 4:
                            route = _context3.sent;
                            return _context3.abrupt("return", [action, route]);

                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
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
                    setStack([route]);
                  } else {
                    if (action == 'push') {
                      setCurrent(current + 1);
                      setStack([].concat((0, _toConsumableArray2["default"])(stack.slice(0, current + 1)), [route]));
                    } else {
                      setStack([].concat((0, _toConsumableArray2["default"])(stack.slice(0, current)), [route]));
                    }
                  }
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
                    // back
                    if (stack[current - 1]) {
                      var _back = link(stack[current - 1].location);

                      if (_back == windowLocation()) {
                        setCurrent(current - 1);
                        return;
                      }
                    } // forward


                    if (stack[current + 1]) {
                      var _forward = link(stack[current + 1].location);

                      if (_forward == windowLocation()) {
                        setCurrent(current + 1);
                        return;
                      }
                    }
                  }
                };

                return function () {
                  window.onpopstate = originPopState;
                };
              }, []);
              var transitions = (0, _reactSpring.useTransition)(stack.slice(1, current + 1).map(function (_, i) {
                return i;
              }), function (i) {
                return i;
              }, {
                from: {
                  transform: 'translate3d(100vw,0,0)'
                },
                enter: {
                  transform: 'translate3d(0,0,0)'
                },
                leave: {
                  transform: 'translate3d(100vw,0,0)'
                }
              });
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
                return /*#__PURE__*/_react["default"].createElement(_reactSpring.animated.div, {
                  key: layer,
                  style: props
                }, /*#__PURE__*/_react["default"].createElement(Page, {
                  content: stack[layer],
                  layer: layer
                }));
              }));
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsVG9wIiwicmVhY2hUb3AiLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInByZVNjcm9sbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWNoQm90dG9tIiwiaGVpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4Iiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNldEN1cnJlbnQiLCJzdGFjayIsInNldFN0YWNrIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJjaGVjayIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImxpbmsiLCJmb3J3YXJkIiwidHJhbnNpdGlvbnMiLCJtYXAiLCJfIiwiaSIsImZyb20iLCJ0cmFuc2Zvcm0iLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsInB1c2giLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwidXNl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U0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY2hIYW5kbGVyIHtcbiAgKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8WydwdXNoJyB8ICdyZXBsYWNlJywgc3RyaW5nXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7IGNvbnRlbnQsIGxheWVyIH06IHsgY29udGVudDogTG9hZGVkUm91dGU7IGxheWVyOiBudW1iZXIgfSkge1xuICBjb25zdCBlbCA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IFtzY3JvbGxUb3AsIHNldFNjcm9sbFRvcF0gPSB1c2VTdGF0ZSgwKTtcblxuICBmdW5jdGlvbiByZWFjaFRvcChjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGxldCBsb2NrID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYWdlID0gZWwuY3VycmVudCE7XG4gICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWxvY2sgJiYgcGFnZS5zY3JvbGxUb3AgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVhY2ggdG9wJyk7XG5cbiAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcHJlU2Nyb2xsSGVpZ2h0ID0gcGFnZS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgYXdhaXQgY2IoKTtcbiAgICAgICAgICBzZXRTY3JvbGxUb3AocGFnZS5zY3JvbGxIZWlnaHQgLSBwcmVTY3JvbGxIZWlnaHQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2Nyb2xsVG9wKHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5jbGllbnRIZWlnaHQpO1xuXG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgdXNlRWZmZWN0KFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChlbC5jdXJyZW50KSB7XG4gICAgICAgIGVsLmN1cnJlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Njcm9sbFRvcF0sXG4gICk7XG5cbiAgZnVuY3Rpb24gcmVhY2hCb3R0b20oY2I6ICgpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICBsZXQgbG9jayA9IGZhbHNlO1xuXG4gICAgY29uc3QgcGFnZSA9IGVsLmN1cnJlbnQhO1xuICAgIGFzeW5jIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKCFsb2NrICYmIHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5zY3JvbGxUb3AgLSBwYWdlLmNsaWVudEhlaWdodCA8IDMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoIHRvcCcpO1xuXG4gICAgICAgIGxvY2sgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNiKCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIGxvY2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGhlaWdodDogJzEwMHZoJyxcbiAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIHpJbmRleDogbGF5ZXIsXG4gICAgICB9fVxuICAgICAgcmVmPXtlbH1cbiAgICA+XG4gICAgICB7cmVkdWNlUmlnaHQoXG4gICAgICAgIGNvbnRlbnQucm91dGUsXG4gICAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQsIHByb3BzIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICAgIHsgLi4ucHJvcHMsIGtleTogcGF0aCwgcmVhY2hUb3AsIHJlYWNoQm90dG9tIH0sXG4gICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBpbml0aWFsUm91dGUsXG4gIGxpa2VBcHAsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBpbml0aWFsUm91dGU6IExvYWRlZFJvdXRlO1xuICBsaWtlQXBwOiBib29sZWFuO1xufSk6IFByb21pc2U8UmVhY3QuRkM8e30+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudCwgc2V0Q3VycmVudF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICAgIGNvbnN0IFtzdGFjaywgc2V0U3RhY2tdID0gdXNlU3RhdGU8TG9hZGVkUm91dGVbXT4oW2luaXRpYWxSb3V0ZV0pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2sobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbG9jYXRpb24sIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBbYWN0aW9uLCByb3V0ZV07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHNldFN0YWNrKFtyb3V0ZV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgc2V0U3RhY2soWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQgKyAxKSwgcm91dGVdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldFN0YWNrKFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgd2luZG93TG9jYXRpb24oKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgLSAxKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmb3J3YXJkXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgKyAxXSkge1xuICAgICAgICAgICAgY29uc3QgZm9yd2FyZCA9IGxpbmsoc3RhY2tbY3VycmVudCArIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudChjdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHN0YWNrLnNsaWNlKDEsIGN1cnJlbnQgKyAxKS5tYXAoKF8sIGkpID0+IGkpLFxuICAgICAgKGkpID0+IGksXG4gICAgICB7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwdncsMCwwKScgfSxcbiAgICAgICAgZW50ZXI6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwwLDApJyB9LFxuICAgICAgICBsZWF2ZTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5zdGFja1tjdXJyZW50XSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFBhZ2UgY29udGVudD17c3RhY2tbMF19IGxheWVyPXswfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0gKyAxO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YW5pbWF0ZWQuZGl2IGtleT17bGF5ZXJ9IHN0eWxlPXtwcm9wc30+XG4gICAgICAgICAgICAgIDxQYWdlIGNvbnRlbnQ9e3N0YWNrW2xheWVyXX0gbGF5ZXI9e2xheWVyfSAvPlxuICAgICAgICAgICAgPC9hbmltYXRlZC5kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgdGFyZ2V0XSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19