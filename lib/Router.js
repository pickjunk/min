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

  var _useState = (0, _react.useState)(function () {}),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      nextTick = _useState2[0],
      setNextTick = _useState2[1];

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
                setNextTick(function () {
                  page.scrollTop = page.scrollHeight - preScrollHeight;
                });
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

    setNextTick(function () {
      page.scrollTop = page.scrollHeight - page.clientHeight;
    });
    page.addEventListener('scroll', listener);
    return function unmount() {
      page.removeEventListener('scroll', listener);
    };
  }

  (0, _react.useEffect)(function () {
    nextTick();
  }, [nextTick]);

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
                var _page$location = page.location,
                    path = _page$location.path,
                    name = _page$location.name;
                return /*#__PURE__*/_react["default"].createElement(_reactSpring.animated.div, {
                  key: index,
                  style: props
                }, /*#__PURE__*/_react["default"].createElement(Page, {
                  key: "".concat(path || name, "-").concat(index),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwibmV4dFRpY2siLCJzZXROZXh0VGljayIsInJlYWN0VG9wIiwiY2IiLCJsb2NrIiwicGFnZSIsImN1cnJlbnQiLCJsaXN0ZW5lciIsInNjcm9sbFRvcCIsImNvbnNvbGUiLCJsb2ciLCJwcmVTY3JvbGxIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwidW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWFjdEJvdHRvbSIsImhlaWdodCIsIm92ZXJmbG93WSIsInpJbmRleCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRDdXJyZW50Iiwic3RhY2siLCJzZXRTdGFjayIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImwiLCJjaGVjayIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImxpbmsiLCJsb2NhdGlvbiIsImZvcndhcmQiLCJwYWdlcyIsInRyYW5zaXRpb25zIiwibWFwIiwiXyIsImkiLCJmcm9tIiwidHJhbnNmb3JtIiwiZW50ZXIiLCJsZWF2ZSIsIml0ZW0iLCJpbmRleCIsIm5hbWUiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsInVzZVJvdXRlciIsIkVycm9yIiwicGF0aG5hbWUiLCJzZWFyY2giLCJyb3V0aW5nIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFRQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBV0EsSUFBSUEsT0FBc0IsR0FBRyxJQUE3QjtBQUNBLElBQU1DLEdBQUcsZ0JBQUcsMEJBQW9DLElBQXBDLENBQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsYUFBSixFQUFsQjs7QUFFQSxTQUFTQyxJQUFULE9BQTJFO0FBQUEsTUFBM0RDLE9BQTJELFFBQTNEQSxPQUEyRDtBQUFBLE1BQWxEQyxLQUFrRCxRQUFsREEsS0FBa0Q7QUFDekUsTUFBTUMsRUFBRSxHQUFHLG1CQUF1QixJQUF2QixDQUFYOztBQUR5RSxrQkFFekMscUJBQXFCLFlBQU0sQ0FBRSxDQUE3QixDQUZ5QztBQUFBO0FBQUEsTUFFbEVDLFFBRmtFO0FBQUEsTUFFeERDLFdBRndEOztBQUl6RSxXQUFTQyxRQUFULENBQWtCQyxFQUFsQixFQUEyQztBQUN6QyxRQUFJQyxJQUFJLEdBQUcsS0FBWDtBQUVBLFFBQU1DLElBQUksR0FBR04sRUFBRSxDQUFDTyxPQUFoQjs7QUFIeUMsYUFJMUJDLFFBSjBCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGdHQUl6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFDTSxDQUFDSCxJQUFELElBQVNDLElBQUksQ0FBQ0csU0FBTCxJQUFrQixDQURqQztBQUFBO0FBQUE7QUFBQTs7QUFFSUMsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVo7QUFFQU4sZ0JBQUFBLElBQUksR0FBRyxJQUFQO0FBSko7QUFNWU8sZ0JBQUFBLGVBTlosR0FNOEJOLElBQUksQ0FBQ08sWUFObkM7QUFBQTtBQUFBLHVCQU9ZVCxFQUFFLEVBUGQ7O0FBQUE7QUFRTUYsZ0JBQUFBLFdBQVcsQ0FBQyxZQUFN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QUNHLFlBQVIsQ0FBcUIsSUFBckIsRUFBMkIsRUFBM0IsRUFBK0JKLE1BQS9CO0FBQ0FoRixFQUFBQSxTQUFTLENBQUM0RCxJQUFWLENBQWVvQixNQUFmO0FBQ0Q7O0FBQ00sU0FBU2xCLElBQVQsR0FBc0I7QUFDM0JpQixFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ25CLElBQVI7QUFDRDs7QUFDTSxTQUFTRyxPQUFULEdBQXlCO0FBQzlCYyxFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ2hCLE9BQVI7QUFDRDs7QUFDTSxTQUFTRixJQUFULENBQWNDLFFBQWQsRUFBMEM7QUFDL0NlLEVBQUFBLGNBQWM7QUFFZCxTQUFPakYsT0FBTyxDQUFFaUUsSUFBVCxDQUFjQyxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTcUIsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXdEYsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU2dGLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDakYsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJd0YsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVN6QixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ00sUUFBUCxDQUFnQnVCLFFBQWhCLEdBQTJCN0IsTUFBTSxDQUFDTSxRQUFQLENBQWdCd0IsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVU1RCxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUMyRCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU81RCxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbmZ1bmN0aW9uIFBhZ2UoeyBjb250ZW50LCBsYXllciB9OiB7IGNvbnRlbnQ6IExvYWRlZFJvdXRlOyBsYXllcjogbnVtYmVyIH0pIHtcbiAgY29uc3QgZWwgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbbmV4dFRpY2ssIHNldE5leHRUaWNrXSA9IHVzZVN0YXRlPCgpID0+IHZvaWQ+KCgpID0+IHt9KTtcblxuICBmdW5jdGlvbiByZWFjdFRvcChjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGxldCBsb2NrID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYWdlID0gZWwuY3VycmVudCE7XG4gICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWxvY2sgJiYgcGFnZS5zY3JvbGxUb3AgPT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVhY2ggdG9wJyk7XG5cbiAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcHJlU2Nyb2xsSGVpZ2h0ID0gcGFnZS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgYXdhaXQgY2IoKTtcbiAgICAgICAgICBzZXROZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICBwYWdlLnNjcm9sbFRvcCA9IHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcHJlU2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmV4dFRpY2soKCkgPT4ge1xuICAgICAgcGFnZS5zY3JvbGxUb3AgPSBwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2UuY2xpZW50SGVpZ2h0O1xuICAgIH0pO1xuXG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgdXNlRWZmZWN0KFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIG5leHRUaWNrKCk7XG4gICAgfSxcbiAgICBbbmV4dFRpY2tdLFxuICApO1xuXG4gIGZ1bmN0aW9uIHJlYWN0Qm90dG9tKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBhZ2UgPSBlbC5jdXJyZW50ITtcbiAgICBhc3luYyBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICghbG9jayAmJiBwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2Uuc2Nyb2xsVG9wIC0gcGFnZS5jbGllbnRIZWlnaHQgPCAzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCB0b3AnKTtcblxuICAgICAgICBsb2NrID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17eyBoZWlnaHQ6ICcxMDB2aCcsIG92ZXJmbG93WTogJ3Njcm9sbCcsIHpJbmRleDogbGF5ZXIgfX1cbiAgICAgIHJlZj17ZWx9XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGgsIHJlYWN0VG9wLCByZWFjdEJvdHRvbSB9LFxuICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnQsIHNldEN1cnJlbnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgICBjb25zdCBbc3RhY2ssIHNldFN0YWNrXSA9IHVzZVN0YXRlPExvYWRlZFJvdXRlW10+KFtpbml0aWFsUm91dGVdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxMb2FkZWRSb3V0ZT4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhsKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgICAgc2V0U3RhY2soW3JvdXRlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgc2V0U3RhY2soWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQpLCByb3V0ZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBiYWNrXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGxpbmsoc3RhY2tbY3VycmVudCAtIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChiYWNrID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudChjdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZm9yd2FyZFxuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50ICsgMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcndhcmQgPSBsaW5rKHN0YWNrW2N1cnJlbnQgKyAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoZm9yd2FyZCA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBwYWdlcyA9IHN0YWNrLnNsaWNlKDAsIGN1cnJlbnQgKyAxKTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHBhZ2VzLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICAoaSkgPT4gaSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgICBlbnRlcjogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknIH0sXG4gICAgICAgIGxlYXZlOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW07XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHBhZ2VzW2luZGV4XTtcbiAgICAgICAgICBjb25zdCB7IHBhdGgsIG5hbWUgfSA9IHBhZ2UubG9jYXRpb247XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFuaW1hdGVkLmRpdiBrZXk9e2luZGV4fSBzdHlsZT17cHJvcHN9PlxuICAgICAgICAgICAgICA8UGFnZVxuICAgICAgICAgICAgICAgIGtleT17YCR7cGF0aCB8fCBuYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY29udGVudD17cGFnZX1cbiAgICAgICAgICAgICAgICBsYXllcj17aW5kZXh9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19