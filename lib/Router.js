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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _routes = null;
var ctx = /*#__PURE__*/(0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function Page(_ref) {
  var content = _ref.content,
      layer = _ref.layer;
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
    style: {
      height: '100vh',
      overflowY: 'auto',
      zIndex: layer
    },
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

              var _useState3 = (0, _react.useState)(0),
                  _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
                  current = _useState4[0],
                  setCurrent = _useState4[1];

              var _useState5 = (0, _react.useState)([initialRoute]),
                  _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
                  stack = _useState6[0],
                  setStack = _useState6[1];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsInJlZiIsInJlYWNoQm90dG9tIiwiY2IiLCJsb2NrIiwicGFnZSIsImN1cnJlbnQiLCJsaXN0ZW5lciIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsImNsaWVudEhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwidW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoZWlnaHQiLCJvdmVyZmxvd1kiLCJ6SW5kZXgiLCJyb3V0ZSIsImNoaWxkIiwicGF0aCIsImNvbXBvbmVudCIsInByb3BzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwiaW5pdGlhbFJvdXRlIiwibGlrZUFwcCIsIlJvdXRlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwic2V0Q3VycmVudCIsInN0YWNrIiwic2V0U3RhY2siLCJzdGFydCIsInN1YnNjcmliZSIsImVuZCIsInBpcGUiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImNoZWNrIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImZvcndhcmQiLCJ0cmFuc2l0aW9ucyIsIm1hcCIsIl8iLCJpIiwiZnJvbSIsInRyYW5zZm9ybSIsImVudGVyIiwibGVhdmUiLCJpdGVtIiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGlu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Q0FBZjs7QUFDQTRCLEVBQUFBLE9BQU8sQ0FBQ0csWUFBUixDQUFxQixJQUFyQixFQUEyQixFQUEzQixFQUErQkosTUFBL0I7QUFDQXpFLEVBQUFBLFNBQVMsQ0FBQ3lELElBQVYsQ0FBZSxDQUFDLFNBQUQsRUFBWWdCLE1BQVosQ0FBZjtBQUNEOztBQUNNLFNBQVNkLElBQVQsR0FBc0I7QUFDM0JhLEVBQUFBLGNBQWM7QUFFZEUsRUFBQUEsT0FBTyxDQUFDZixJQUFSO0FBQ0Q7O0FBQ00sU0FBU0UsT0FBVCxHQUF5QjtBQUM5QlcsRUFBQUEsY0FBYztBQUVkRSxFQUFBQSxPQUFPLENBQUNiLE9BQVI7QUFDRDs7QUFDTSxTQUFTRCxJQUFULENBQWNkLFFBQWQsRUFBMEM7QUFDL0MwQixFQUFBQSxjQUFjO0FBRWQsU0FBTzFFLE9BQU8sQ0FBRThELElBQVQsQ0FBY2QsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU2dDLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBVy9FLEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVN5RSxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQzFFLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSWlGLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFTSxTQUFTckIsY0FBVCxHQUFrQztBQUN2QyxTQUFPSCxNQUFNLENBQUNULFFBQVAsQ0FBZ0JrQyxRQUFoQixHQUEyQnpCLE1BQU0sQ0FBQ1QsUUFBUCxDQUFnQm1DLE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVekQsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDd0QsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPekQsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbiAgdXNlQ2FsbGJhY2ssXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiwgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIHN0cmluZ10+KCk7XG5cbmZ1bmN0aW9uIFBhZ2UoeyBjb250ZW50LCBsYXllciB9OiB7IGNvbnRlbnQ6IExvYWRlZFJvdXRlOyBsYXllcjogbnVtYmVyIH0pIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICBjb25zdCByZWFjaEJvdHRvbSA9IHVzZUNhbGxiYWNrKFxuICAgIGZ1bmN0aW9uIChjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcGFnZSA9IHJlZi5jdXJyZW50ITtcbiAgICAgIGFzeW5jIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWxvY2sgJiZcbiAgICAgICAgICBwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2Uuc2Nyb2xsVG9wIC0gcGFnZS5jbGllbnRIZWlnaHQgPCAzXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCBib3R0b20nKTtcblxuICAgICAgICAgIGxvY2sgPSB0cnVlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIFtyZWZdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgekluZGV4OiBsYXllcixcbiAgICAgIH19XG4gICAgICByZWY9e3JlZn1cbiAgICA+XG4gICAgICB7cmVkdWNlUmlnaHQoXG4gICAgICAgIGNvbnRlbnQucm91dGUsXG4gICAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQsIHByb3BzIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICAgIHsgLi4ucHJvcHMsIGtleTogcGF0aCwgcmVhY2hCb3R0b20gfSxcbiAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG51bGwsXG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50LCBzZXRDdXJyZW50XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gICAgY29uc3QgW3N0YWNrLCBzZXRTdGFja10gPSB1c2VTdGF0ZTxMb2FkZWRSb3V0ZVtdPihbaW5pdGlhbFJvdXRlXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAoW2FjdGlvbiwgbG9jYXRpb25dKTogUHJvbWlzZTxcbiAgICAgICAgICAgIFtzdHJpbmcsIExvYWRlZFJvdXRlXVxuICAgICAgICAgID4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoOiBsb2NhdGlvbiwgc3RhdHVzOiAnMjAwJyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbG9jYXRpb24sIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIFthY3Rpb24sIHJvdXRlXTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChbYWN0aW9uLCByb3V0ZV0pIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgICAgc2V0U3RhY2soW3JvdXRlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gJ3B1c2gnKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICBzZXRTdGFjayhbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0U3RhY2soWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQpLCByb3V0ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGVuZC51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dChbJ3B1c2gnLCB3aW5kb3dMb2NhdGlvbigpXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYmFja1xuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50IC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBsaW5rKHN0YWNrW2N1cnJlbnQgLSAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoYmFjayA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCAtIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgdHJhbnNpdGlvbnMgPSB1c2VUcmFuc2l0aW9uKFxuICAgICAgc3RhY2suc2xpY2UoMSwgY3VycmVudCArIDEpLm1hcCgoXywgaSkgPT4gaSksXG4gICAgICAoaSkgPT4gaSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgxMDB2dywwLDApJyB9LFxuICAgICAgICBlbnRlcjogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLDAsMCknIH0sXG4gICAgICAgIGxlYXZlOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1swXX0gbGF5ZXI9ezB9IC8+XG4gICAgICAgIHt0cmFuc2l0aW9ucy5tYXAoKHsgaXRlbSwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxheWVyID0gaXRlbSArIDE7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxhbmltYXRlZC5kaXYga2V5PXtsYXllcn0gc3R5bGU9e3Byb3BzfT5cbiAgICAgICAgICAgICAgPFBhZ2UgY29udGVudD17c3RhY2tbbGF5ZXJdfSBsYXllcj17bGF5ZXJ9IC8+XG4gICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3B1c2gnLCB0YXJnZXRdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydyZXBsYWNlJywgdGFyZ2V0XSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nKGluaXQ6IFJvdXRpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LnJvdXRpbmcgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=