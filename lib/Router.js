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
                }())).subscribe(function () {
                  setLoading(false);
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
              }), transitions.map(function (_ref7) {
                var item = _ref7.item,
                    props = _ref7.props;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsImVsIiwic2Nyb2xsVG9wIiwic2V0U2Nyb2xsVG9wIiwicmVhY2hUb3AiLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsInByZVNjcm9sbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlYWNoQm90dG9tIiwiaGVpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4Iiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInNldEN1cnJlbnQiLCJzdGFjayIsInNldFN0YWNrIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJjaGVjayIsImluZm8iLCJzdGF0dXMiLCJ3YXJuIiwibWF0Y2giLCJzbGljZSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwiYmFjayIsImxpbmsiLCJmb3J3YXJkIiwidHJhbnNpdGlvbnMiLCJtYXAiLCJfIiwiaSIsImZyb20iLCJ0cmFuc2Zvcm0iLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsInB1c2giLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJyZXBsYWNlIiwicmVwbGFjZVN0YXRlIiwidXNl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IFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIExvY2F0aW9uLCBSb3V0aW5nLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHVzZVRyYW5zaXRpb24sIGFuaW1hdGVkIH0gZnJvbSAncmVhY3Qtc3ByaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWFjaEhhbmRsZXIge1xuICAoKTogUHJvbWlzZTx2b2lkPjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxbJ3B1c2gnIHwgJ3JlcGxhY2UnLCBzdHJpbmddPigpO1xuXG5mdW5jdGlvbiBQYWdlKHsgY29udGVudCwgbGF5ZXIgfTogeyBjb250ZW50OiBMb2FkZWRSb3V0ZTsgbGF5ZXI6IG51bWJlciB9KSB7XG4gIGNvbnN0IGVsID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW3Njcm9sbFRvcCwgc2V0U2Nyb2xsVG9wXSA9IHVzZVN0YXRlKDApO1xuXG4gIGZ1bmN0aW9uIHJlYWNoVG9wKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgIGNvbnN0IHBhZ2UgPSBlbC5jdXJyZW50ITtcbiAgICBhc3luYyBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICghbG9jayAmJiBwYWdlLnNjcm9sbFRvcCA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCB0b3AnKTtcblxuICAgICAgICBsb2NrID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBwcmVTY3JvbGxIZWlnaHQgPSBwYWdlLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICAgIHNldFNjcm9sbFRvcChwYWdlLnNjcm9sbEhlaWdodCAtIHByZVNjcm9sbEhlaWdodCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIGxvY2sgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTY3JvbGxUb3AocGFnZS5zY3JvbGxIZWlnaHQgLSBwYWdlLmNsaWVudEhlaWdodCk7XG5cbiAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICB1c2VFZmZlY3QoXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGVsLmN1cnJlbnQpIHtcbiAgICAgICAgZWwuY3VycmVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2Nyb2xsVG9wXSxcbiAgKTtcblxuICBmdW5jdGlvbiByZWFjaEJvdHRvbShjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgIGxldCBsb2NrID0gZmFsc2U7XG5cbiAgICBjb25zdCBwYWdlID0gZWwuY3VycmVudCE7XG4gICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWxvY2sgJiYgcGFnZS5zY3JvbGxIZWlnaHQgLSBwYWdlLnNjcm9sbFRvcCAtIHBhZ2UuY2xpZW50SGVpZ2h0IDwgMykge1xuICAgICAgICBjb25zb2xlLmxvZygncmVhY2ggdG9wJyk7XG5cbiAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY2IoKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgekluZGV4OiBsYXllcixcbiAgICAgIH19XG4gICAgICByZWY9e2VsfVxuICAgID5cbiAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgY29udGVudC5yb3V0ZSxcbiAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgeyAuLi5wcm9wcywga2V5OiBwYXRoLCByZWFjaFRvcCwgcmVhY2hCb3R0b20gfSxcbiAgICAgICAgICAgIGNoaWxkLFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIG51bGwsXG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIoe1xuICByb3V0ZXMsXG4gIGluaXRpYWxSb3V0ZSxcbiAgbGlrZUFwcCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGluaXRpYWxSb3V0ZTogTG9hZGVkUm91dGU7XG4gIGxpa2VBcHA6IGJvb2xlYW47XG59KTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtjdXJyZW50LCBzZXRDdXJyZW50XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gICAgY29uc3QgW3N0YWNrLCBzZXRTdGFja10gPSB1c2VTdGF0ZTxMb2FkZWRSb3V0ZVtdPihbaW5pdGlhbFJvdXRlXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAoW2FjdGlvbiwgbG9jYXRpb25dKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICcyMDAnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsb2NhdGlvbiwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICAgIHNldFN0YWNrKFtyb3V0ZV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAncHVzaCcpIHtcbiAgICAgICAgICAgICAgICBzZXRDdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgICBzZXRTdGFjayhbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFN0YWNrKFsuLi5zdGFjay5zbGljZSgwLCBjdXJyZW50KSwgcm91dGVdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgZW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIHdpbmRvd0xvY2F0aW9uKCldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBiYWNrXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGxpbmsoc3RhY2tbY3VycmVudCAtIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChiYWNrID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc2V0Q3VycmVudChjdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZm9yd2FyZFxuICAgICAgICAgIGlmIChzdGFja1tjdXJyZW50ICsgMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcndhcmQgPSBsaW5rKHN0YWNrW2N1cnJlbnQgKyAxXS5sb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAoZm9yd2FyZCA9PSB3aW5kb3dMb2NhdGlvbigpKSB7XG4gICAgICAgICAgICAgIHNldEN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSkubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIChpKSA9PiBpLFxuICAgICAge1xuICAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICAgIGVudGVyOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsMCwwKScgfSxcbiAgICAgICAgbGVhdmU6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwdncsMCwwKScgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4uc3RhY2tbY3VycmVudF0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxQYWdlIGNvbnRlbnQ9e3N0YWNrWzBdfSBsYXllcj17MH0gLz5cbiAgICAgICAge3RyYW5zaXRpb25zLm1hcCgoeyBpdGVtLCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgbGF5ZXIgPSBpdGVtICsgMTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFuaW1hdGVkLmRpdiBrZXk9e2xheWVyfSBzdHlsZT17cHJvcHN9PlxuICAgICAgICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1tsYXllcl19IGxheWVyPXtsYXllcn0gLz5cbiAgICAgICAgICAgIDwvYW5pbWF0ZWQuZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3JlcGxhY2UnLCB0YXJnZXRdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==