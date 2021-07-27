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

  function onShow(cb) {
    (0, _react.useEffect)(function () {
      if (loading == false) {
        cb();
      }
    }, [loading]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsInJvdXRlIiwibG9hZGluZyIsInN0eWxlIiwib25TaG93IiwiY2IiLCJwb3NpdGlvbiIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIm92ZXJmbG93WSIsImJhY2tncm91bmQiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsIkFuaW1hdGVkUGFnZSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJzZXRMb2FkaW5nIiwic3RhdGUiLCJzdGFjayIsImN1cnJlbnQiLCJmb3JjZVVwZGF0ZSIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImFjdGlvbiIsImxvY2F0aW9uIiwibGluayIsImNoZWNrIiwibG9nIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsImNvbnRleHQiLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImZvcndhcmQiLCJhbmltYXRlZFBhZ2VzIiwidHJhbnNpdGlvbnMiLCJmcm9tIiwieCIsImVudGVyIiwibGVhdmUiLCJpc0xvYWRpbmciLCJpIiwibGVuZ3RoIiwiaXRlbSIsIl8iLCJ0cmFuc2xhdGVYIiwidG8iLCJ6SW5kZXgiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsInVzZVJvdXRlciIsIkVycm9yIiwicGF0aG5hbWUiLCJzZWFyY2giLCJyb3V0aW5nIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFRQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQXVCQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztBQUVBLFNBQVNDLElBQVQsT0FRRztBQUFBLE1BUERDLEtBT0MsUUFQREEsS0FPQztBQUFBLE1BTkRDLE9BTUMsUUFOREEsT0FNQztBQUFBLHdCQUxEQyxLQUtDO0FBQUEsTUFMREEsS0FLQywyQkFMTyxFQUtQOztBQUNELFdBQVNDLE1BQVQsQ0FBZ0JDLEVBQWhCLEVBQWdEO0FBQzlDLDBCQUNFLFlBQVk7QUFDVixVQUFJSCxPQUFPLElBQUksS0FBZixFQUFzQjtBQUNwQkcsUUFBQUEsRUFBRTtBQUNIO0FBQ0YsS0FMSCxFQU1FLENBQUNILE9BQUQsQ0FORjtBQVFEOztBQUVELHNCQUNFLGdDQUFDLEdBQUQsQ0FBSyxRQUFMO0FBQ0UsSUFBQSxLQUFLLGtDQUNBRCxLQURBO0FBRUhDLE1BQUFBLE9BQU8sRUFBUEEsT0FGRztBQUdIRSxNQUFBQSxNQUFNLEVBQU5BO0FBSEc7QUFEUCxrQkFPRTtBQUNFLElBQUEsS0FBSztBQUNIRSxNQUFBQSxRQUFRLEVBQUUsT0FEUDtBQUVIQyxNQUFBQSxHQUFHLEVBQUUsQ0FGRjtBQUdIQyxNQUFBQSxNQUFNLEVBQUUsQ0FITDtBQUlIQyxNQUFBQSxJQUFJLEVBQUUsQ0FKSDtBQUtIQyxNQUFBQSxLQUFLLEVBQUUsQ0FMSjtBQU1IQyxNQUFBQSxTQUFTLEVBQUUsTUFOUjtBQU9IQyxNQUFBQSxVQUFVLEVBQUU7QUFQVCxPQVFBVCxLQVJBO0FBRFAsS0FZRyw2QkFDQ0YsS0FBSyxDQUFDQSxLQURQLEVBRUMsVUFBQ1ksS0FBRCxTQUE0RDtBQUFBLFFBQTdCQyxJQUE2QixTQUE3QkEsSUFBNkI7QUFBQSxRQUF2QkMsU0FBdUIsU0FBdkJBLFNBQXVCO0FBQUEsUUFBWkMsS0FBWSxTQUFaQSxLQUFZO0FBQzFELHdCQUFPQyxrQkFBTUMsYUFBTixDQUNMSCxTQURLLGtDQUVBQyxLQUZBO0FBRU9HLE1BQUFBLEdBQUcsRUFBRUw7QUFGWixRQUdMRCxLQUhLLENBQVA7QUFLRCxHQVJGLEVBU0MsSUFURCxDQVpILENBUEYsQ0FERjtBQWtDRDs7QUFDRCxJQUFNTyxZQUFZLEdBQUcsMkJBQVNwQixJQUFULENBQXJCOztTQUVlcUIsWTs7Ozs7Z0dBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VDLFlBQUFBLE1BREYsU0FDRUEsTUFERixFQUVFQyxZQUZGLFNBRUVBLFlBRkYsRUFHRUMsT0FIRixTQUdFQSxPQUhGO0FBU0U1QixZQUFBQSxPQUFPLEdBQUcwQixNQUFWO0FBVEYsOENBV1MsU0FBU0csTUFBVCxHQUFnQztBQUNyQyw4QkFBOEIscUJBQWtCLEtBQWxCLENBQTlCO0FBQUE7QUFBQSxrQkFBT3ZCLE9BQVA7QUFBQSxrQkFBZ0J3QixVQUFoQjs7QUFDQSxrQkFBTUMsS0FBSyxHQUFHLG1CQUFPO0FBQ25CQyxnQkFBQUEsS0FBSyxFQUFFLENBQUNMLFlBQUQsQ0FEWTtBQUVuQk0sZ0JBQUFBLE9BQU8sRUFBRTtBQUZVLGVBQVAsQ0FBZDtBQUtBLGtCQUFNQyxXQUFXLEdBQUcsaUNBQXBCO0FBRUEsb0NBQVUsWUFBWTtBQUNwQixvQkFBTUMsS0FBSyxHQUFHakMsU0FBUyxDQUFDa0MsU0FBVixDQUFvQixZQUFZO0FBQzVDTixrQkFBQUEsVUFBVSxDQUFDLElBQUQsQ0FBVjtBQUNELGlCQUZhLENBQWQ7QUFHQSxvQkFBTU8sR0FBRyxHQUFHbkMsU0FBUyxDQUNsQm9DLElBRFMsQ0FFUjtBQUFBLDRHQUFVO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrRUFBaUJDLE1BQWpCLGFBQXlCQyxRQUF6QjtBQUdGdEIsNEJBQUFBLElBSEUsR0FHS1EsTUFBTSxDQUFDZSxJQUFQLENBQVlELFFBQVosQ0FITDs7QUFLUixnQ0FBSWQsTUFBTSxDQUFDZ0IsS0FBUCxDQUFheEIsSUFBYixDQUFKLEVBQXdCO0FBQ3RCeUIsaURBQUlDLElBQUosQ0FBUztBQUFFMUIsZ0NBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRMkIsZ0NBQUFBLE1BQU0sRUFBRTtBQUFoQiwrQkFBVDtBQUNELDZCQUZELE1BRU87QUFDTEYsaURBQUlHLElBQUosQ0FBUztBQUFFNUIsZ0NBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRMkIsZ0NBQUFBLE1BQU0sRUFBRTtBQUFoQiwrQkFBVDtBQUNEOztBQVRPO0FBQUEsbUNBV1luQixNQUFNLENBQUNxQixLQUFQLENBQWE3QixJQUFiLENBWFo7O0FBQUE7QUFXRmIsNEJBQUFBLEtBWEU7QUFBQSw2REFhRCxDQUNMa0MsTUFESyxrQ0FHQWxDLEtBSEE7QUFJSDJDLDhCQUFBQSxPQUFPLEVBQUVSLFFBQVEsQ0FBQ1E7QUFKZiwrQkFiQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBVjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFGUSxFQXdCVFosU0F4QlMsQ0F3QkMsaUJBQTJCO0FBQUE7QUFBQSxzQkFBaEJHLE1BQWdCO0FBQUEsc0JBQVJsQyxLQUFROztBQUNwQ3lCLGtCQUFBQSxVQUFVLENBQUMsS0FBRCxDQUFWOztBQUVBLHNCQUFJLENBQUNGLE9BQUwsRUFBYztBQUNaRyxvQkFBQUEsS0FBSyxDQUFDRSxPQUFOLEdBQWdCO0FBQ2RELHNCQUFBQSxLQUFLLEVBQUUsQ0FBQzNCLEtBQUQsQ0FETztBQUVkNEIsc0JBQUFBLE9BQU8sRUFBRTtBQUZLLHFCQUFoQjtBQUlELG1CQUxELE1BS087QUFDTCx5Q0FBMkJGLEtBQUssQ0FBQ0UsT0FBakM7QUFBQSx3QkFBUUQsTUFBUixrQkFBUUEsS0FBUjtBQUFBLHdCQUFlQyxRQUFmLGtCQUFlQSxPQUFmOztBQUNBLHdCQUFJTSxNQUFNLElBQUksTUFBZCxFQUFzQjtBQUNwQlIsc0JBQUFBLEtBQUssQ0FBQ0UsT0FBTixHQUFnQjtBQUNkRCx3QkFBQUEsS0FBSyxnREFBTUEsTUFBSyxDQUFDaUIsS0FBTixDQUFZLENBQVosRUFBZWhCLFFBQU8sR0FBRyxDQUF6QixDQUFOLElBQW1DNUIsS0FBbkMsRUFEUztBQUVkNEIsd0JBQUFBLE9BQU8sRUFBRUEsUUFBTyxHQUFHO0FBRkwsdUJBQWhCO0FBSUQscUJBTEQsTUFLTztBQUNMRixzQkFBQUEsS0FBSyxDQUFDRSxPQUFOLEdBQWdCO0FBQ2RELHdCQUFBQSxLQUFLLGdEQUFNQSxNQUFLLENBQUNpQixLQUFOLENBQVksQ0FBWixFQUFlaEIsUUFBZixDQUFOLElBQStCNUIsS0FBL0IsRUFEUztBQUVkNEIsd0JBQUFBLE9BQU8sRUFBUEE7QUFGYyx1QkFBaEI7QUFJRDtBQUNGOztBQUVEQyxrQkFBQUEsV0FBVztBQUNaLGlCQWhEUyxDQUFaO0FBa0RBLHVCQUFPLFlBQVk7QUFDakJDLGtCQUFBQSxLQUFLLENBQUNlLFdBQU47QUFDQWIsa0JBQUFBLEdBQUcsQ0FBQ2EsV0FBSjtBQUNELGlCQUhEO0FBSUQsZUExREQsRUEwREcsRUExREg7QUE0REEsb0NBQVUsWUFBWTtBQUNwQixvQkFBTUMsY0FBYyxHQUFHQyxNQUFNLENBQUNDLFVBQTlCOztBQUNBRCxnQkFBQUEsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLFlBQVk7QUFDOUIsc0JBQUksQ0FBQ3pCLE9BQUwsRUFBYztBQUNaMUIsb0JBQUFBLFNBQVMsQ0FBQ29ELElBQVYsQ0FBZSxDQUNiLE1BRGEsRUFFYjtBQUNFcEMsc0JBQUFBLElBQUksRUFBRXFDLGNBQWM7QUFEdEIscUJBRmEsQ0FBZjtBQU1ELG1CQVBELE1BT087QUFDTCwwQ0FBMkJ4QixLQUFLLENBQUNFLE9BQWpDO0FBQUEsd0JBQVFELE9BQVIsbUJBQVFBLEtBQVI7QUFBQSx3QkFBZUMsU0FBZixtQkFBZUEsT0FBZixDQURLLENBRUw7O0FBQUE7QUFDQSx3QkFBSUQsT0FBSyxDQUFDQyxTQUFPLEdBQUcsQ0FBWCxDQUFULEVBQXdCO0FBQ3RCLDBCQUFNdUIsS0FBSSxHQUFHZixJQUFJLENBQUNULE9BQUssQ0FBQ0MsU0FBTyxHQUFHLENBQVgsQ0FBTCxDQUFtQk8sUUFBcEIsQ0FBakI7O0FBQ0EsMEJBQUlnQixLQUFJLElBQUlELGNBQWMsRUFBMUIsRUFBOEI7QUFDNUJ4Qix3QkFBQUEsS0FBSyxDQUFDRSxPQUFOLENBQWNBLE9BQWQ7QUFDQUMsd0JBQUFBLFdBQVc7QUFDWDtBQUNEO0FBQ0YscUJBVkksQ0FXTDs7O0FBQUE7QUFDQSx3QkFBSUYsT0FBSyxDQUFDQyxTQUFPLEdBQUcsQ0FBWCxDQUFULEVBQXdCO0FBQ3RCLDBCQUFNd0IsUUFBTyxHQUFHaEIsSUFBSSxDQUFDVCxPQUFLLENBQUNDLFNBQU8sR0FBRyxDQUFYLENBQUwsQ0FBbUJPLFFBQXBCLENBQXBCOztBQUNBLDBCQUFJaUIsUUFBTyxJQUFJRixjQUFjLEVBQTdCLEVBQWlDO0FBQy9CeEIsd0JBQUFBLEtBQUssQ0FBQ0UsT0FBTixDQUFjQSxPQUFkO0FBQ0FDLHdCQUFBQSxXQUFXO0FBQ1g7QUFDRDtBQUNGO0FBQ0Y7QUFDRixpQkE3QkQ7O0FBK0JBLHVCQUFPLFlBQVk7QUFDakJrQixrQkFBQUEsTUFBTSxDQUFDQyxVQUFQLEdBQW9CRixjQUFwQjtBQUNELGlCQUZEO0FBR0QsZUFwQ0QsRUFvQ0csRUFwQ0g7QUFzQ0Esb0NBQTJCcEIsS0FBSyxDQUFDRSxPQUFqQztBQUFBLGtCQUFRRCxLQUFSLG1CQUFRQSxLQUFSO0FBQUEsa0JBQWVDLE9BQWYsbUJBQWVBLE9BQWY7QUFFQSxrQkFBTXlCLGFBQWEsR0FBRzFCLEtBQUssQ0FBQ2lCLEtBQU4sQ0FBWSxDQUFaLEVBQWVoQixPQUFPLEdBQUcsQ0FBekIsQ0FBdEI7QUFDQSxrQkFBTTBCLFdBQVcsR0FBRyxnQ0FBY0QsYUFBZCxFQUE2QjtBQUMvQ0UsZ0JBQUFBLElBQUksRUFBRTtBQUFFQyxrQkFBQUEsQ0FBQyxFQUFFO0FBQUwsaUJBRHlDO0FBRS9DQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVELGtCQUFBQSxDQUFDLEVBQUU7QUFBTCxpQkFGd0M7QUFHL0NFLGdCQUFBQSxLQUFLLEVBQUU7QUFBRUYsa0JBQUFBLENBQUMsRUFBRTtBQUFMO0FBSHdDLGVBQTdCLENBQXBCOztBQU1BLHVCQUFTRyxTQUFULENBQW1CQyxDQUFuQixFQUE4QjtBQUM1Qix1QkFBT2pDLEtBQUssQ0FBQ2tDLE1BQU4sR0FBZSxDQUFmLElBQW9CRCxDQUFwQixJQUF5QjNELE9BQWhDO0FBQ0Q7O0FBRUQsa0NBQ0UsK0VBQ0UsZ0NBQUMsSUFBRDtBQUFNLGdCQUFBLEtBQUssRUFBRTBCLEtBQUssQ0FBQyxDQUFELENBQWxCO0FBQXVCLGdCQUFBLE9BQU8sRUFBRWdDLFNBQVMsQ0FBQyxDQUFEO0FBQXpDLGdCQURGLEVBRUdMLFdBQVcsQ0FBQyxpQkFBUVEsSUFBUixFQUFjQyxDQUFkLEVBQWlCSCxDQUFqQixFQUF1QjtBQUFBLG9CQUFwQkosQ0FBb0IsU0FBcEJBLENBQW9CO0FBQ2xDLG9DQUNFLGdDQUFDLFlBQUQ7QUFDRSxrQkFBQSxLQUFLLEVBQUVNLElBRFQ7QUFFRSxrQkFBQSxPQUFPLEVBQUVILFNBQVMsQ0FBQ0MsQ0FBRCxDQUZwQjtBQUdFLGtCQUFBLEtBQUssRUFBRTtBQUNMSSxvQkFBQUEsVUFBVSxFQUFFUixDQUFDLENBQUNTLEVBQUYsQ0FBSyxVQUFDVCxDQUFEO0FBQUEsdUNBQVVBLENBQVY7QUFBQSxxQkFBTCxDQURQO0FBRUxVLG9CQUFBQSxNQUFNLEVBQUVOLENBQUMsR0FBRztBQUZQO0FBSFQsa0JBREY7QUFVRCxlQVhXLENBRmQsQ0FERjtBQWlCRCxhQXBKSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O2VBdUpleEMsWTs7O0FBRVIsU0FBUytDLElBQVQsQ0FBY2hDLFFBQWQsRUFBOEM7QUFDbkRpQyxFQUFBQSxjQUFjOztBQUVkLE1BQU1DLE1BQU0sR0FBRzFFLE9BQU8sQ0FBRXlDLElBQVQsQ0FBY0QsUUFBZCxDQUFmOztBQUNBbUMsRUFBQUEsT0FBTyxDQUFDQyxTQUFSLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCRixNQUE1QjtBQUNBeEUsRUFBQUEsU0FBUyxDQUFDb0QsSUFBVixDQUFlLENBQUMsTUFBRCxFQUFTZCxRQUFULENBQWY7QUFDRDs7QUFDTSxTQUFTcUMsT0FBVCxDQUFpQnJDLFFBQWpCLEVBQWlEO0FBQ3REaUMsRUFBQUEsY0FBYzs7QUFFZCxNQUFNQyxNQUFNLEdBQUcxRSxPQUFPLENBQUV5QyxJQUFULENBQWNELFFBQWQsQ0FBZjs7QUFDQW1DLEVBQUFBLE9BQU8sQ0FBQ0csWUFBUixDQUFxQixJQUFyQixFQUEyQixFQUEzQixFQUErQkosTUFBL0I7QUFDQXhFLEVBQUFBLFNBQVMsQ0FBQ29ELElBQVYsQ0FBZSxDQUFDLFNBQUQsRUFBWWQsUUFBWixDQUFmO0FBQ0Q7O0FBQ00sU0FBU2dCLElBQVQsR0FBc0I7QUFDM0JpQixFQUFBQSxjQUFjO0FBRWRFLEVBQUFBLE9BQU8sQ0FBQ25CLElBQVI7QUFDRDs7QUFDTSxTQUFTQyxPQUFULEdBQXlCO0FBQzlCZ0IsRUFBQUEsY0FBYztBQUVkRSxFQUFBQSxPQUFPLENBQUNsQixPQUFSO0FBQ0Q7O0FBQ00sU0FBU2hCLElBQVQsQ0FBY0QsUUFBZCxFQUEwQztBQUMvQ2lDLEVBQUFBLGNBQWM7QUFFZCxTQUFPekUsT0FBTyxDQUFFeUMsSUFBVCxDQUFjRCxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTdUMsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXOUUsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3dFLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDekUsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJZ0YsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVNLFNBQVN6QixjQUFULEdBQWtDO0FBQ3ZDLFNBQU9ILE1BQU0sQ0FBQ1osUUFBUCxDQUFnQnlDLFFBQWhCLEdBQTJCN0IsTUFBTSxDQUFDWixRQUFQLENBQWdCMEMsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVVqRSxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUNnRSxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU9qRSxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcbmltcG9ydCB1c2VGb3JjZVVwZGF0ZSBmcm9tICd1c2UtZm9yY2UtdXBkYXRlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0IHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckxvY2F0aW9uIGV4dGVuZHMgTG9jYXRpb24ge1xuICBjb250ZXh0PzogQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJMb2FkZWRSb3V0ZSBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgY29udGV4dD86IENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIFJvdXRlckxvYWRlZFJvdXRlIHtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgb25TaG93OiAoY2I6ICgpID0+IFByb21pc2U8dm9pZD4gfCB2b2lkKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIFJvdXRlckxvY2F0aW9uXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7XG4gIHJvdXRlLFxuICBsb2FkaW5nLFxuICBzdHlsZSA9IHt9LFxufToge1xuICByb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgZnVuY3Rpb24gb25TaG93KGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZCkge1xuICAgIHVzZUVmZmVjdChcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGxvYWRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW2xvYWRpbmddLFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxjdHguUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIC4uLnJvdXRlLFxuICAgICAgICBsb2FkaW5nLFxuICAgICAgICBvblNob3csXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAgIC4uLnN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7cmVkdWNlUmlnaHQoXG4gICAgICAgICAgcm91dGUucm91dGUsXG4gICAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICAgICAgeyAuLi5wcm9wcywga2V5OiBwYXRoIH0sXG4gICAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2N0eC5Qcm92aWRlcj5cbiAgKTtcbn1cbmNvbnN0IEFuaW1hdGVkUGFnZSA9IGFuaW1hdGVkKFBhZ2UpO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogUm91dGVyTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IHN0YXRlID0gdXNlUmVmKHtcbiAgICAgIHN0YWNrOiBbaW5pdGlhbFJvdXRlXSBhcyBSb3V0ZXJMb2FkZWRSb3V0ZVtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcmNlVXBkYXRlID0gdXNlRm9yY2VVcGRhdGUoKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChbYWN0aW9uLCBsb2NhdGlvbl0pOiBQcm9taXNlPFxuICAgICAgICAgICAgW3N0cmluZywgUm91dGVyTG9hZGVkUm91dGVdXG4gICAgICAgICAgPiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gcm91dGVzLmxpbmsobG9jYXRpb24pO1xuXG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKHBhdGgpKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aCwgc3RhdHVzOiAnMjAwJyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gocGF0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLnJvdXRlLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGxvY2F0aW9uLmNvbnRleHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKFthY3Rpb24sIHJvdXRlXSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICBzdGFjazogW3JvdXRlXSxcbiAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoW1xuICAgICAgICAgICAgJ3B1c2gnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiB3aW5kb3dMb2NhdGlvbigpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IHN0YWNrLCBjdXJyZW50IH0gPSBzdGF0ZS5jdXJyZW50O1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQtLTtcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmb3J3YXJkXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgKyAxXSkge1xuICAgICAgICAgICAgY29uc3QgZm9yd2FyZCA9IGxpbmsoc3RhY2tbY3VycmVudCArIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudC5jdXJyZW50Kys7XG4gICAgICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG5cbiAgICBjb25zdCBhbmltYXRlZFBhZ2VzID0gc3RhY2suc2xpY2UoMSwgY3VycmVudCArIDEpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihhbmltYXRlZFBhZ2VzLCB7XG4gICAgICBmcm9tOiB7IHg6IDEwMCB9LFxuICAgICAgZW50ZXI6IHsgeDogMCB9LFxuICAgICAgbGVhdmU6IHsgeDogMTAwIH0sXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBpc0xvYWRpbmcoaTogbnVtYmVyKSB7XG4gICAgICByZXR1cm4gc3RhY2subGVuZ3RoIC0gMSA9PSBpICYmIGxvYWRpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxQYWdlIHJvdXRlPXtzdGFja1swXX0gbG9hZGluZz17aXNMb2FkaW5nKDApfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMoKHsgeCB9LCBpdGVtLCBfLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBbmltYXRlZFBhZ2VcbiAgICAgICAgICAgICAgcm91dGU9e2l0ZW19XG4gICAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZyhpKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiB4LnRvKCh4KSA9PiBgJHt4fXZ3YCksXG4gICAgICAgICAgICAgICAgekluZGV4OiBpICsgMSxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8Lz5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBSb3V0ZXJMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgbG9jYXRpb25dKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uOiBSb3V0ZXJMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydyZXBsYWNlJywgbG9jYXRpb25dKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==