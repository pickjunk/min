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
      width: '100vw',
      height: '100vh',
      overflow: 'scroll',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsVG9wIiwicmVhY3RUb3AiLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInByZVNjcm9sbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWN0Qm90dG9tIiwid2lkdGgiLCJoZWlnaHQiLCJvdmVyZmxvdyIsInpJbmRleCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRDdXJyZW50Iiwic3RhY2siLCJzZXRTdGFjayIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImwiLCJjaGVjayIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImxpbmsiLCJsb2NhdGlvbiIsImZvcndhcmQiLCJwYWdlcyIsInRyYW5zaXRpb25zIiwibWFwIiwiXyIsImkiLCJmcm9tIiwidHJhbnNmb3JtIiwiZW50ZXIiLCJsZWF2ZSIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwidXNlUm91dGVyIiwiRXJyb3IiLCJwYXRobmFtZSIsInNlYXJjaCIsInJvdXRpbmciLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQVFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUFXQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztBQUVBLFNBQVNDLElBQVQsT0FBMkU7QUFBQSxNQUEzREMsT0FBMkQsUUFBM0RBLE9BQTJEO0FBQUEsTUFBbERDLEtBQWtELFFBQWxEQSxLQUFrRDtBQUN6RSxNQUFNQyxFQUFFLEdBQUcsbUJBQXVCLElBQXZCLENBQVg7O0FBRHlFLGtCQUV2QyxxQkFBUyxDQUFULENBRnVDO0FBQUE7QUFBQSxNQUVsRUMsU0FGa0U7QUFBQSxNQUV2REMsWUFGdUQ7O0FBSXpFLFdBQVNDLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQTJDO0FBQ3pDLFFBQUlDLElBQUksR0FBRyxLQUFYO0FBRUEsUUFBTUMsSUFBSSxHQUFHTixFQUFFLENBQUNPLE9BQWhCOztBQUh5QyxhQUkxQkMsUUFKMEI7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0dBSXpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUNNLENBQUNILElBQUQsSUFBU0MsSUFBSSxDQUFDTCxTQUFMLElBQWtCLENBRGpDO0FBQUE7QUFBQTtBQUFBOztBQUVJUSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUVBTCxnQkFBQUEsSUFBSSxHQUFHLElBQVA7QUFKSjtBQU1ZTSxnQkFBQUEsZUFOWixHQU04QkwsSUFBSSxDQUFDTSxZQU5uQztBQUFBO0FBQUEsdUJBT1lSLEVBQUUsRUFQZDs7QUFBQTtBQVFNRixnQkFBQUEsWUFBWSxDQUFDSSxJQUFJLENBQUNNLFlBQUwsR0FBb0JELGVB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QUFULEdBQXlCO0FBQzlCYSxFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ2YsT0FBUjtBQUNEOztBQUNNLFNBQVNGLElBQVQsQ0FBY0MsUUFBZCxFQUEwQztBQUMvQ2MsRUFBQUEsY0FBYztBQUVkLFNBQU9oRixPQUFPLENBQUVpRSxJQUFULENBQWNDLFFBQWQsQ0FBUDtBQUNEOztBQUVNLFNBQVNvQixTQUFULEdBQXFCO0FBQzFCLFNBQU8sdUJBQVdyRixHQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFTK0UsY0FBVCxHQUEwQjtBQUN4QixNQUFJLENBQUNoRixPQUFMLEVBQWM7QUFDWixVQUFNLElBQUl1RixLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRU0sU0FBU3hCLGNBQVQsR0FBa0M7QUFDdkMsU0FBT0gsTUFBTSxDQUFDTSxRQUFQLENBQWdCc0IsUUFBaEIsR0FBMkI1QixNQUFNLENBQUNNLFFBQVAsQ0FBZ0J1QixNQUFsRDtBQUNEOztBQUVNLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQWdDO0FBQ3JDLFNBQU8sVUFBVTNELFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQzBELE9BQVYsR0FBb0JDLElBQXBCO0FBQ0EsV0FBTzNELFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxuICB1c2VSZWYsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiwgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuZnVuY3Rpb24gUGFnZSh7IGNvbnRlbnQsIGxheWVyIH06IHsgY29udGVudDogTG9hZGVkUm91dGU7IGxheWVyOiBudW1iZXIgfSkge1xuICBjb25zdCBlbCA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IFtzY3JvbGxUb3AsIHNldFNjcm9sbFRvcF0gPSB1c2VTdGF0ZSgwKTtcblxuICBmdW5jdGlvbiByZWFjdFRvcChjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGxldCBsb2NrID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYWdlID0gZWwuY3VycmVudCE7XG4gICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWxvY2sgJiYgcGFnZS5zY3JvbGxUb3AgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVhY2ggdG9wJyk7XG5cbiAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcHJlU2Nyb2xsSGVpZ2h0ID0gcGFnZS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgYXdhaXQgY2IoKTtcbiAgICAgICAgICBzZXRTY3JvbGxUb3AocGFnZS5zY3JvbGxIZWlnaHQgLSBwcmVTY3JvbGxIZWlnaHQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0U2Nyb2xsVG9wKHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5jbGllbnRIZWlnaHQpO1xuXG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgdXNlRWZmZWN0KFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChlbC5jdXJyZW50KSB7XG4gICAgICAgIGVsLmN1cnJlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Njcm9sbFRvcF0sXG4gICk7XG5cbiAgZnVuY3Rpb24gcmVhY3RCb3R0b20oY2I6ICgpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICBsZXQgbG9jayA9IGZhbHNlO1xuXG4gICAgY29uc3QgcGFnZSA9IGVsLmN1cnJlbnQhO1xuICAgIGFzeW5jIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKCFsb2NrICYmIHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5zY3JvbGxUb3AgLSBwYWdlLmNsaWVudEhlaWdodCA8IDMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoIHRvcCcpO1xuXG4gICAgICAgIGxvY2sgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNiKCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIGxvY2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIG92ZXJmbG93OiAnc2Nyb2xsJyxcbiAgICAgICAgekluZGV4OiBsYXllcixcbiAgICAgIH19XG4gICAgICByZWY9e2VsfVxuICAgID5cbiAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgY29udGVudC5yb3V0ZSxcbiAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgeyAuLi5wcm9wcywga2V5OiBwYXRoLCByZWFjdFRvcCwgcmVhY3RCb3R0b20gfSxcbiAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG51bGwsXG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50LCBzZXRDdXJyZW50XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gICAgY29uc3QgW3N0YWNrLCBzZXRTdGFja10gPSB1c2VTdGF0ZTxMb2FkZWRSb3V0ZVtdPihbaW5pdGlhbFJvdXRlXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAobCk6IFByb21pc2U8TG9hZGVkUm91dGU+IHtcbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2sobCkpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoOiBsLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcm91dGVzLm1hdGNoKGwpO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHNldFN0YWNrKFtyb3V0ZV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgIHNldFN0YWNrKFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQod2luZG93TG9jYXRpb24oKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCAtIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgcGFnZXMgPSBzdGFjay5zbGljZSgwLCBjdXJyZW50ICsgMSk7XG5cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBwYWdlcy5tYXAoKF8sIGkpID0+IGkpLFxuICAgICAgKGkpID0+IGksXG4gICAgICB7XG4gICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwdncsMCwwKScgfSxcbiAgICAgICAgZW50ZXI6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwwLDApJyB9LFxuICAgICAgICBsZWF2ZTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5zdGFja1tjdXJyZW50XSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3RyYW5zaXRpb25zLm1hcCgoeyBpdGVtLCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBpdGVtO1xuICAgICAgICAgIGNvbnN0IHBhZ2UgPSBwYWdlc1tpbmRleF07XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFuaW1hdGVkLmRpdiBrZXk9e2luZGV4fSBzdHlsZT17cHJvcHN9PlxuICAgICAgICAgICAgICA8UGFnZSBjb250ZW50PXtwYWdlfSBsYXllcj17aW5kZXh9IC8+XG4gICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19