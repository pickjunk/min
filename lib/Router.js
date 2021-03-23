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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsVG9wIiwicmVhY3RUb3AiLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInByZVNjcm9sbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWN0Qm90dG9tIiwiaGVpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4Iiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNldEN1cnJlbnQiLCJzdGFjayIsInNldFN0YWNrIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwibCIsImNoZWNrIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImxvY2F0aW9uIiwiZm9yd2FyZCIsInBhZ2VzIiwidHJhbnNpdGlvbnMiLCJtYXAiLCJfIiwiaSIsImZyb20iLCJ0cmFuc2Zvcm0iLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsImluZGV4IiwibmFtZSIsInB1c2giLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwidXNlUm91dGVyIiwiRXJyb3IiLCJwYXRobmFtZSIsInNlYXJjaCIsInJvdXRpbmciLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQVFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7QUFXQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztBQUVBLFNBQVNDLElBQVQsT0FBMkU7QUFBQSxNQUEzREMsT0FBMkQsUUFBM0RBLE9BQTJEO0FBQUEsTUFBbERDLEtBQWtELFFBQWxEQSxLQUFrRDtBQUN6RSxNQUFNQyxFQUFFLEdBQUcsbUJBQXVCLElBQXZCLENBQVg7O0FBRHlFLGtCQUV2QyxxQkFBUyxDQUFULENBRnVDO0FBQUE7QUFBQSxNQUVsRUMsU0FGa0U7QUFBQSxNQUV2REMsWUFGdUQ7O0FBSXpFLFdBQVNDLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQTJDO0FBQ3pDLFFBQUlDLElBQUksR0FBRyxLQUFYO0FBRUEsUUFBTUMsSUFBSSxHQUFHTixFQUFFLENBQUNPLE9BQWhCOztBQUh5QyxhQUkxQkMsUUFKMEI7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0dBSXpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUNNLENBQUNILElBQUQsSUFBU0MsSUFBSSxDQUFDTCxTQUFMLElBQWtCLENBRGpDO0FBQUE7QUFBQTtBQUFBOztBQUVJUSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUVBTCxnQkFBQUEsSUFBSSxHQUFHLElBQVA7QUFKSjtBQU1ZTSxnQkFBQUEsZUFOWixHQU04QkwsSUFBSSxDQUFDTSxZQU5uQztBQUFBO0FBQUEsdUJBT1lSLEVBQUUsRUFQZDs7QUFBQTtBQVFNRixnQkFBQUEsWUFBWSxDQUFDSSxJQUFJLENBQUNNLFlBQUwsR0FBb0JELGVBQXJCLENBQVo7QUFSTjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQVVJTixnQkFBQUEsSUFBSSxHQUFHLEtBQVA7O0FBVko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FKeUM7QUFBQTtBQUFBOztBQWtCekNILElBQUFBLFlBQVksQ0FBQ0ksSUFBSSxDQUFDTSxZQUFMLEdBQW9CTixJQUFJLENBQUNPLFlBQTFCLENBQVo7QUFFQVAsSUFBQUEsSUFBSSxDQUFDUSxnQkFBTCxDQUFzQixRQUF0QixFQUFnQ04sUUFBaEM7QUFDQSxXQUFPLFNBQVNPLE9BQVQsR0FBbUI7QUFDeEJULE1BQUFBLElBQUksQ0FBQ1UsbUJBQUwsQ0FBeUIsUUFBekIsRUFBbUNSLFFBQW5DO0FBQ0QsS0FGRDtBQUdEOztBQUVELHdCQUNFLFlBQVk7QUFDVixRQUFJUixFQUFFLENBQUNPLE9BQVAsRUFBZ0I7QUFDZFAsTUFBQUEsRUFBRSxDQUFDTyxPQUFILENBQVdOLFNBQVgsR0FBdUJBLFNBQXZCO0FBQ0Q7QUFDRixHQUxILEVBTUUsQ0FBQ0EsU0FBRCxDQU5GOztBQVNBLFdBQVNnQixXQUFULENBQXFCYixFQUFyQixFQUE4QztBQUM1QyxRQUFJQyxJQUFJLEdBQUcsS0FBWDtBQUVBLFFBQU1DLElBQUksR0FBR04sRUFBRSxDQUFDTyxPQUFoQjs7QUFINEMsYUFJN0JDLFFBSjZCO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGlHQUk1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQ00sQ0FBQ0gsSUFBRCxJQUFTQyxJQUFJLENBQUNNLFlBQUwsR0FBb0JOLElBQUksQ0FBQ0wsU0FBekIsR0FBcUNLLElBQUksQ0FBQ08sWUFBMUMsR0FBeUQsQ0FEeEU7QUFBQTtBQUFBO0FBQUE7O0FBRUlKLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBRUFMLGdCQUFBQSxJQUFJLEdBQUcsSUFBUDtBQUpKO0FBQUE7QUFBQSx1QkFNWUQsRUFBRSxFQU5kOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFRSUMsZ0JBQUFBLElBQUksR0FBRyxLQUFQOztBQVJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSjRDO0FBQUE7QUFBQTs7QUFnQjVDQyxJQUFBQSxJQUFJLENBQUNRLGdCQUFMLENBQXNCLFFBQXRCLEVBQWdDTixRQUFoQztBQUNBLFdBQU8sU0FBU08sT0FBVCxHQUFtQjtBQUN4QlQsTUFBQUEsSUFBSSxDQUFDVSxtQkFBTCxDQUF5QixRQUF6QixFQUFtQ1IsUUFBbkM7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsc0JBQ0U7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUFFVSxNQUFBQSxNQUFNLEVBQUUsT0FBVjtBQUFtQkMsTUFBQUEsU0FBUyxFQUFFLFFBQTlCO0FBQXdDQyxNQUFBQSxNQUFNLEVBQUVyQjtBQUFoRCxLQURUO0FBRUUsSUFBQSxHQUFHLEVBQUVDO0FBRlAsS0FJRyw2QkFDQ0YsT0FBTyxDQUFDdUIsS0FEVCxFQUVDLFVBQUNDLEtBQUQsU0FBNEQ7QUFBQSxRQUE3QkMsSUFBNkIsU0FBN0JBLElBQTZCO0FBQUEsUUFBdkJDLFNBQXVCLFNBQXZCQSxTQUF1QjtBQUFBLFFBQVpDLEtBQVksU0FBWkEsS0FBWTtBQUMxRCx3QkFBT0Msa0JBQU1DLGFBQU4sQ0FDTEgsU0FESyxrQ0FFQUMsS0FGQTtBQUVPRyxNQUFBQSxHQUFHLEVBQUVMLElBRlo7QUFFa0JwQixNQUFBQSxRQUFRLEVBQVJBLFFBRmxCO0FBRTRCYyxNQUFBQSxXQUFXLEVBQVhBO0FBRjVCLFFBR0xLLEtBSEssQ0FBUDtBQUtELEdBUkYsRUFTQyxJQVRELENBSkgsQ0FERjtBQWtCRDs7U0FFY08sWTs7Ozs7Z0dBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VDLFlBQUFBLE1BREYsU0FDRUEsTUFERixFQUVFQyxZQUZGLFNBRUVBLFlBRkYsRUFHRUMsT0FIRixTQUdFQSxPQUhGO0FBU0V2QyxZQUFBQSxPQUFPLEdBQUdxQyxNQUFWO0FBVEYsOENBV1MsU0FBU0csTUFBVCxHQUFnQztBQUFBLCtCQUNQLHFCQUFrQixLQUFsQixDQURPO0FBQUE7QUFBQSxrQkFDOUJDLE9BRDhCO0FBQUEsa0JBQ3JCQyxVQURxQjs7QUFBQSwrQkFFUCxxQkFBaUIsQ0FBakIsQ0FGTztBQUFBO0FBQUEsa0JBRTlCNUIsT0FGOEI7QUFBQSxrQkFFckI2QixVQUZxQjs7QUFBQSwrQkFHWCxxQkFBd0IsQ0FBQ0wsWUFBRCxDQUF4QixDQUhXO0FBQUE7QUFBQSxrQkFHOUJNLEtBSDhCO0FBQUEsa0JBR3ZCQyxRQUh1Qjs7QUFLckMsb0NBQVUsWUFBWTtBQUNwQixvQkFBTUMsS0FBSyxHQUFHNUMsU0FBUyxDQUFDNkMsU0FBVixDQUFvQixZQUFZO0FBQzVDTCxrQkFBQUEsVUFBVSxDQUFDLElBQUQsQ0FBVjtBQUNELGlCQUZhLENBQWQ7QUFHQSxvQkFBTU0sR0FBRyxHQUFHOUMsU0FBUyxDQUNsQitDLElBRFMsQ0FFUjtBQUFBLDRHQUFVLGtCQUFnQkMsQ0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNSLGdDQUFJYixNQUFNLENBQUNjLEtBQVAsQ0FBYUQsQ0FBYixDQUFKLEVBQXFCO0FBQ25CakMsaURBQUltQyxJQUFKLENBQVM7QUFBRXRCLGdDQUFBQSxJQUFJLEVBQUVvQixDQUFSO0FBQVdHLGdDQUFBQSxNQUFNLEVBQUU7QUFBbkIsK0JBQVQ7QUFDRCw2QkFGRCxNQUVPO0FBQ0xwQyxpREFBSXFDLElBQUosQ0FBUztBQUFFeEIsZ0NBQUFBLElBQUksRUFBRW9CLENBQVI7QUFBV0csZ0NBQUFBLE1BQU0sRUFBRTtBQUFuQiwrQkFBVDtBQUNEOztBQUxPLDhEQU9EaEIsTUFBTSxDQUFDa0IsS0FBUCxDQUFhTCxDQUFiLENBUEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBRlEsRUFZVEgsU0FaUyxDQVlDLFVBQVVuQixLQUFWLEVBQWlCO0FBQzFCYyxrQkFBQUEsVUFBVSxDQUFDLEtBQUQsQ0FBVjs7QUFFQSxzQkFBSSxDQUFDSCxPQUFMLEVBQWM7QUFDWk0sb0JBQUFBLFFBQVEsQ0FBQyxDQUFDakIsS0FBRCxDQUFELENBQVI7QUFDRCxtQkFGRCxNQUVPO0FBQ0xlLG9CQUFBQSxVQUFVLENBQUM3QixPQUFPLEdBQUcsQ0FBWCxDQUFWO0FBQ0ErQixvQkFBQUEsUUFBUSwrQ0FBS0QsS0FBSyxDQUFDWSxLQUFOLENBQVksQ0FBWixFQUFlMUMsT0FBZixDQUFMLElBQThCYyxLQUE5QixHQUFSO0FBQ0Q7QUFDRixpQkFyQlMsQ0FBWjtBQXVCQSx1QkFBTyxZQUFZO0FBQ2pCa0Isa0JBQUFBLEtBQUssQ0FBQ1csV0FBTjtBQUNBVCxrQkFBQUEsR0FBRyxDQUFDUyxXQUFKO0FBQ0QsaUJBSEQ7QUFJRCxlQS9CRCxFQStCRyxFQS9CSDtBQWlDQSxvQ0FBVSxZQUFZO0FBQ3BCLG9CQUFNQyxjQUFjLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBOUI7O0FBQ0FELGdCQUFBQSxNQUFNLENBQUNDLFVBQVAsR0FBb0IsWUFBWTtBQUM5QixzQkFBSSxDQUFDckIsT0FBTCxFQUFjO0FBQ1pyQyxvQkFBQUEsU0FBUyxDQUFDMkQsSUFBVixDQUFlQyxjQUFjLEVBQTdCO0FBQ0QsbUJBRkQsTUFFTztBQUNMO0FBQ0Esd0JBQUlsQixLQUFLLENBQUM5QixPQUFPLEdBQUcsQ0FBWCxDQUFULEVBQXdCO0FBQ3RCLDBCQUFNaUQsS0FBSSxHQUFHQyxJQUFJLENBQUNwQixLQUFLLENBQUM5QixPQUFPLEdBQUcsQ0FBWCxDQUFMLENBQW1CbUQsUUFBcEIsQ0FBakI7O0FBQ0EsMEJBQUlGLEtBQUksSUFBSUQsY0FBYyxFQUExQixFQUE4QjtBQUM1Qm5CLHdCQUFBQSxVQUFVLENBQUM3QixPQUFPLEdBQUcsQ0FBWCxDQUFWO0FBQ0E7QUFDRDtBQUNGLHFCQVJJLENBU0w7OztBQUNBLHdCQUFJOEIsS0FBSyxDQUFDOUIsT0FBTyxHQUFHLENBQVgsQ0FBVCxFQUF3QjtBQUN0QiwwQkFBTW9ELFFBQU8sR0FBR0YsSUFBSSxDQUFDcEIsS0FBSyxDQUFDOUIsT0FBTyxHQUFHLENBQVgsQ0FBTCxDQUFtQm1ELFFBQXBCLENBQXBCOztBQUNBLDBCQUFJQyxRQUFPLElBQUlKLGNBQWMsRUFBN0IsRUFBaUM7QUFDL0JuQix3QkFBQUEsVUFBVSxDQUFDN0IsT0FBTyxHQUFHLENBQVgsQ0FBVjtBQUNBO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsaUJBckJEOztBQXVCQSx1QkFBTyxZQUFZO0FBQ2pCNkMsa0JBQUFBLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQkYsY0FBcEI7QUFDRCxpQkFGRDtBQUdELGVBNUJELEVBNEJHLEVBNUJIO0FBOEJBLGtCQUFNUyxLQUFLLEdBQUd2QixLQUFLLENBQUNZLEtBQU4sQ0FBWSxDQUFaLEVBQWUxQyxPQUFPLEdBQUcsQ0FBekIsQ0FBZDtBQUVBLGtCQUFNc0QsV0FBVyxHQUFHLGdDQUNsQkQsS0FBSyxDQUFDRSxHQUFOLENBQVUsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsdUJBQVVBLENBQVY7QUFBQSxlQUFWLENBRGtCLEVBRWxCLFVBQUNBLENBQUQ7QUFBQSx1QkFBT0EsQ0FBUDtBQUFBLGVBRmtCLEVBR2xCO0FBQ0VDLGdCQUFBQSxJQUFJLEVBQUU7QUFBRUMsa0JBQUFBLFNBQVMsRUFBRTtBQUFiLGlCQURSO0FBRUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRUQsa0JBQUFBLFNBQVMsRUFBRTtBQUFiLGlCQUZUO0FBR0VFLGdCQUFBQSxLQUFLLEVBQUU7QUFBRUYsa0JBQUFBLFNBQVMsRUFBRTtBQUFiO0FBSFQsZUFIa0IsQ0FBcEI7QUFVQSxrQ0FDRSxnQ0FBQyxHQUFELENBQUssUUFBTDtBQUNFLGdCQUFBLEtBQUs7QUFDSHBDLGtCQUFBQSxNQUFNLEVBQU5BLE1BREc7QUFFSEksa0JBQUFBLE9BQU8sRUFBUEE7QUFGRyxtQkFHQUcsS0FBSyxDQUFDOUIsT0FBRCxDQUhMO0FBRFAsaUJBT0dzRCxXQUFXLENBQUNDLEdBQVosQ0FBZ0IsaUJBQXFCO0FBQUEsb0JBQWxCTyxJQUFrQixTQUFsQkEsSUFBa0I7QUFBQSxvQkFBWjVDLEtBQVksU0FBWkEsS0FBWTtBQUNwQyxvQkFBTTZDLEtBQUssR0FBR0QsSUFBZDtBQUNBLG9CQUFNL0QsSUFBSSxHQUFHc0QsS0FBSyxDQUFDVSxLQUFELENBQWxCO0FBRm9DLHFDQUdiaEUsSUFBSSxDQUFDb0QsUUFIUTtBQUFBLG9CQUc1Qm5DLElBSDRCLGtCQUc1QkEsSUFINEI7QUFBQSxvQkFHdEJnRCxJQUhzQixrQkFHdEJBLElBSHNCO0FBS3BDLG9DQUNFLGdDQUFDLHFCQUFELENBQVUsR0FBVjtBQUFjLGtCQUFBLEdBQUcsRUFBRUQsS0FBbkI7QUFBMEIsa0JBQUEsS0FBSyxFQUFFN0M7QUFBakMsZ0NBQ0UsZ0NBQUMsSUFBRDtBQUNFLGtCQUFBLEdBQUcsWUFBS0YsSUFBSSxJQUFJZ0QsSUFBYixjQUFxQkQsS0FBckIsQ0FETDtBQUVFLGtCQUFBLE9BQU8sRUFBRWhFLElBRlg7QUFHRSxrQkFBQSxLQUFLLEVBQUVnRTtBQUhULGtCQURGLENBREY7QUFTRCxlQWRBLENBUEgsQ0FERjtBQXlCRCxhQXBISDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O2VBdUhlekMsWTs7O0FBRVIsU0FBUzJDLElBQVQsQ0FBY2QsUUFBZCxFQUF3QztBQUM3Q2UsRUFBQUEsY0FBYzs7QUFFZCxNQUFNQyxNQUFNLEdBQUdqRixPQUFPLENBQUVnRSxJQUFULENBQWNDLFFBQWQsQ0FBZjs7QUFDQWlCLEVBQUFBLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQixJQUFsQixFQUF3QixFQUF4QixFQUE0QkYsTUFBNUI7QUFDQS9FLEVBQUFBLFNBQVMsQ0FBQzJELElBQVYsQ0FBZW9CLE1BQWY7QUFDRDs7QUFDTSxTQUFTRyxPQUFULENBQWlCbkIsUUFBakIsRUFBMkM7QUFDaERlLEVBQUFBLGNBQWM7O0FBRWQsTUFBTUMsTUFBTSxHQUFHakYsT0FBTyxDQUFFZ0UsSUFBVCxDQUFjQyxRQUFkLENBQWY7O0FBQ0FpQixFQUFBQSxPQUFPLENBQUNHLFlBQVIsQ0FBcUIsSUFBckIsRUFBMkIsRUFBM0IsRUFBK0JKLE1BQS9CO0FBQ0EvRSxFQUFBQSxTQUFTLENBQUMyRCxJQUFWLENBQWVvQixNQUFmO0FBQ0Q7O0FBQ00sU0FBU2xCLElBQVQsR0FBc0I7QUFDM0JpQixFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ25CLElBQVI7QUFDRDs7QUFDTSxTQUFTRyxPQUFULEdBQXlCO0FBQzlCYyxFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ2hCLE9BQVI7QUFDRDs7QUFDTSxTQUFTRixJQUFULENBQWNDLFFBQWQsRUFBMEM7QUFDL0NlLEVBQUFBLGNBQWM7QUFFZCxTQUFPaEYsT0FBTyxDQUFFZ0UsSUFBVCxDQUFjQyxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTcUIsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckYsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUytFLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDaEYsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJdUYsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVN6QixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ00sUUFBUCxDQUFnQnVCLFFBQWhCLEdBQTJCN0IsTUFBTSxDQUFDTSxRQUFQLENBQWdCd0IsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVU1RCxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUMyRCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU81RCxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbmZ1bmN0aW9uIFBhZ2UoeyBjb250ZW50LCBsYXllciB9OiB7IGNvbnRlbnQ6IExvYWRlZFJvdXRlOyBsYXllcjogbnVtYmVyIH0pIHtcbiAgY29uc3QgZWwgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbc2Nyb2xsVG9wLCBzZXRTY3JvbGxUb3BdID0gdXNlU3RhdGUoMCk7XG5cbiAgZnVuY3Rpb24gcmVhY3RUb3AoY2I6ICgpID0+IFByb21pc2U8dm9pZD4pIHtcbiAgICBsZXQgbG9jayA9IGZhbHNlO1xuXG4gICAgY29uc3QgcGFnZSA9IGVsLmN1cnJlbnQhO1xuICAgIGFzeW5jIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgaWYgKCFsb2NrICYmIHBhZ2Uuc2Nyb2xsVG9wID09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoIHRvcCcpO1xuXG4gICAgICAgIGxvY2sgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHByZVNjcm9sbEhlaWdodCA9IHBhZ2Uuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIGF3YWl0IGNiKCk7XG4gICAgICAgICAgc2V0U2Nyb2xsVG9wKHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcHJlU2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldFNjcm9sbFRvcChwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2UuY2xpZW50SGVpZ2h0KTtcblxuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIHVzZUVmZmVjdChcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZWwuY3VycmVudCkge1xuICAgICAgICBlbC5jdXJyZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzY3JvbGxUb3BdLFxuICApO1xuXG4gIGZ1bmN0aW9uIHJlYWN0Qm90dG9tKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBhZ2UgPSBlbC5jdXJyZW50ITtcbiAgICBhc3luYyBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICghbG9jayAmJiBwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2Uuc2Nyb2xsVG9wIC0gcGFnZS5jbGllbnRIZWlnaHQgPCAzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCB0b3AnKTtcblxuICAgICAgICBsb2NrID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17eyBoZWlnaHQ6ICcxMDB2aCcsIG92ZXJmbG93WTogJ3Njcm9sbCcsIHpJbmRleDogbGF5ZXIgfX1cbiAgICAgIHJlZj17ZWx9XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgICB7IC4uLnByb3BzLCBrZXk6IHBhdGgsIHJlYWN0VG9wLCByZWFjdEJvdHRvbSB9LFxuICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnQsIHNldEN1cnJlbnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgICBjb25zdCBbc3RhY2ssIHNldFN0YWNrXSA9IHVzZVN0YXRlPExvYWRlZFJvdXRlW10+KFtpbml0aWFsUm91dGVdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxMb2FkZWRSb3V0ZT4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhsKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgICAgc2V0U3RhY2soW3JvdXRlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgc2V0U3RhY2soWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQpLCByb3V0ZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBiYWNrXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGxpbmsoc3RhY2tbY3VycmVudCAtIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChiYWNrID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudChjdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZm9yd2FyZFxuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50ICsgMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcndhcmQgPSBsaW5rKHN0YWNrW2N1cnJlbnQgKyAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoZm9yd2FyZCA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBwYWdlcyA9IHN0YWNrLnNsaWNlKDAsIGN1cnJlbnQgKyAxKTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihcbiAgICAgIHBhZ2VzLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICAoaSkgPT4gaSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgICBlbnRlcjogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknIH0sXG4gICAgICAgIGxlYXZlOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW07XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHBhZ2VzW2luZGV4XTtcbiAgICAgICAgICBjb25zdCB7IHBhdGgsIG5hbWUgfSA9IHBhZ2UubG9jYXRpb247XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFuaW1hdGVkLmRpdiBrZXk9e2luZGV4fSBzdHlsZT17cHJvcHN9PlxuICAgICAgICAgICAgICA8UGFnZVxuICAgICAgICAgICAgICAgIGtleT17YCR7cGF0aCB8fCBuYW1lfS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgY29udGVudD17cGFnZX1cbiAgICAgICAgICAgICAgICBsYXllcj17aW5kZXh9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19