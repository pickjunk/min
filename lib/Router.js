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

  function reactTop(cb) {
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

  function reactBottom(cb) {
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
      overflowY: 'scroll',
      zIndex: layer
    },
    ref: el
  }, (0, _reduceRight["default"])(content.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path,
      reactTop: reactTop,
      reactBottom: reactBottom
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
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(l) {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (routes.check(l)) {
                              _logger["default"].info({
                                path: l,
                                status: '200'
                              });
                            } else {
                              _logger["default"].warn({
                                path: l,
                                status: '404'
                              });
                            }

                            return _context3.abrupt("return", routes.match(l));

                          case 2:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }())).subscribe(function (route) {
                  setLoading(false);

                  if (!likeApp) {
                    setStack([route]);
                  } else {
                    setCurrent(current + 1);
                    setStack([].concat((0, _toConsumableArray2["default"])(stack.slice(0, current)), [route]));
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
                    location$.next(windowLocation());
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
              var pages = stack.slice(0, current + 1);
              var transitions = (0, _reactSpring.useTransition)(pages.map(function (_, i) {
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
              }, transitions.map(function (_ref5) {
                var item = _ref5.item,
                    props = _ref5.props;
                var index = item;
                var page = pages[index];
                return /*#__PURE__*/_react["default"].createElement(_reactSpring.animated.div, {
                  key: index,
                  style: props
                }, /*#__PURE__*/_react["default"].createElement(Page, {
                  content: page,
                  layer: index
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
  location$.next(target);
}

function replace(location) {
  routesRequired();

  var target = _routes.link(location);

  history.replaceState(null, '', target);
  location$.next(target);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsVG9wIiwicmVhY3RUb3AiLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInByZVNjcm9sbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWN0Qm90dG9tIiwiaGVpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4Iiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNldEN1cnJlbnQiLCJzdGFjayIsInNldFN0YWNrIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwibCIsImNoZWNrIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImxvY2F0aW9uIiwiZm9yd2FyZCIsInBhZ2VzIiwidHJhbnNpdGlvbnMiLCJtYXAiLCJfIiwiaSIsImZyb20iLCJ0cmFuc2Zvcm0iLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsImluZGV4IiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQVdBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLGdCQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O0FBRUEsU0FBU0MsSUFBVCxPQUEyRTtBQUFBLE1BQTNEQyxPQUEyRCxRQUEzREEsT0FBMkQ7QUFBQSxNQUFsREMsS0FBa0QsUUFBbERBLEtBQWtEO0FBQ3pFLE1BQU1DLEVBQUUsR0FBRyxtQkFBdUIsSUFBdkIsQ0FBWDs7QUFEeUUsa0JBRXZDLHFCQUFTLENBQVQsQ0FGdUM7QUFBQTtBQUFBLE1BRWxFQyxTQUZrRTtBQUFBLE1BRXZEQyxZQUZ1RDs7QUFJekUsV0FBU0MsUUFBVCxDQUFrQkMsRUFBbEIsRUFBMkM7QUFDekMsUUFBSUMsSUFBSSxHQUFHLEtBQVg7QUFFQSxRQUFNQyxJQUFJLEdBQUdOLEVBQUUsQ0FBQ08sT0FBaEI7O0FBSHlDLGFBSTFCQyxRQUowQjtBQUFBO0FBQUE7O0FBQUE7QUFBQSxnR0FJekM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQ00sQ0FBQ0gsSUFBRCxJQUFTQyxJQUFJLENBQUNMLFNBQUwsSUFBa0IsQ0FEakM7QUFBQTtBQUFBO0FBQUE7O0FBRUlRLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBRUFMLGdCQUFBQSxJQUFJLEdBQUcsSUFBUDtBQUpKO0FBTVlNLGdCQUFBQSxlQU5aLEdBTThCTCxJQUFJLENBQUNNLFlBTm5DO0FBQUE7QUFBQSx1QkFPWVIsRUFBRSxFQVBkOztBQUFBO0FBUU1GLGdCQUFBQSxZQUFZLENBQUNJLElBQUksQ0FBQ00sWUFBTCxHQUFvQkQsZUFBckIsQ0FB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RUFBQUEsT0FBTyxDQUFDZixPQUFSO0FBQ0Q7O0FBQ00sU0FBU0YsSUFBVCxDQUFjQyxRQUFkLEVBQTBDO0FBQy9DYyxFQUFBQSxjQUFjO0FBRWQsU0FBTy9FLE9BQU8sQ0FBRWdFLElBQVQsQ0FBY0MsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU29CLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBV3BGLEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVM4RSxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQy9FLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSXNGLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFTSxTQUFTeEIsY0FBVCxHQUFrQztBQUN2QyxTQUFPSCxNQUFNLENBQUNNLFFBQVAsQ0FBZ0JzQixRQUFoQixHQUEyQjVCLE1BQU0sQ0FBQ00sUUFBUCxDQUFnQnVCLE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVM0QsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDMEQsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPM0QsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY2hIYW5kbGVyIHtcbiAgKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5mdW5jdGlvbiBQYWdlKHsgY29udGVudCwgbGF5ZXIgfTogeyBjb250ZW50OiBMb2FkZWRSb3V0ZTsgbGF5ZXI6IG51bWJlciB9KSB7XG4gIGNvbnN0IGVsID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW3Njcm9sbFRvcCwgc2V0U2Nyb2xsVG9wXSA9IHVzZVN0YXRlKDApO1xuXG4gIGZ1bmN0aW9uIHJlYWN0VG9wKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBhZ2UgPSBlbC5jdXJyZW50ITtcbiAgICBhc3luYyBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICghbG9jayAmJiBwYWdlLnNjcm9sbFRvcCA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCB0b3AnKTtcblxuICAgICAgICBsb2NrID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwcmVTY3JvbGxIZWlnaHQgPSBwYWdlLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICAgIHNldFNjcm9sbFRvcChwYWdlLnNjcm9sbEhlaWdodCAtIHByZVNjcm9sbEhlaWdodCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIGxvY2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTY3JvbGxUb3AocGFnZS5zY3JvbGxIZWlnaHQgLSBwYWdlLmNsaWVudEhlaWdodCk7XG5cbiAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICB1c2VFZmZlY3QoXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGVsLmN1cnJlbnQpIHtcbiAgICAgICAgZWwuY3VycmVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2Nyb2xsVG9wXSxcbiAgKTtcblxuICBmdW5jdGlvbiByZWFjdEJvdHRvbShjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGxldCBsb2NrID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYWdlID0gZWwuY3VycmVudCE7XG4gICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWxvY2sgJiYgcGFnZS5zY3JvbGxIZWlnaHQgLSBwYWdlLnNjcm9sbFRvcCAtIHBhZ2UuY2xpZW50SGVpZ2h0IDwgMykge1xuICAgICAgICBjb25zb2xlLmxvZygncmVhY2ggdG9wJyk7XG5cbiAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY2IoKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvd1k6ICdzY3JvbGwnLFxuICAgICAgICB6SW5kZXg6IGxheWVyLFxuICAgICAgfX1cbiAgICAgIHJlZj17ZWx9XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGgsIHJlYWN0VG9wLCByZWFjdEJvdHRvbSB9LFxuICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnQsIHNldEN1cnJlbnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgICBjb25zdCBbc3RhY2ssIHNldFN0YWNrXSA9IHVzZVN0YXRlPExvYWRlZFJvdXRlW10+KFtpbml0aWFsUm91dGVdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxMb2FkZWRSb3V0ZT4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhsKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgICAgc2V0U3RhY2soW3JvdXRlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgc2V0U3RhY2soWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQpLCByb3V0ZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBiYWNrXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGxpbmsoc3RhY2tbY3VycmVudCAtIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChiYWNrID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudChjdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZm9yd2FyZFxuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50ICsgMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcndhcmQgPSBsaW5rKHN0YWNrW2N1cnJlbnQgKyAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoZm9yd2FyZCA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBwYWdlcyA9IHN0YWNrLnNsaWNlKDAsIGN1cnJlbnQgKyAxKTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHBhZ2VzLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICAoaSkgPT4gaSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgICBlbnRlcjogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknIH0sXG4gICAgICAgIGxlYXZlOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW07XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHBhZ2VzW2luZGV4XTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YW5pbWF0ZWQuZGl2IGtleT17aW5kZXh9IHN0eWxlPXtwcm9wc30+XG4gICAgICAgICAgICAgIDxQYWdlIGNvbnRlbnQ9e3BhZ2V9IGxheWVyPXtpbmRleH0gLz5cbiAgICAgICAgICAgIDwvYW5pbWF0ZWQuZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nKGluaXQ6IFJvdXRpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LnJvdXRpbmcgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=