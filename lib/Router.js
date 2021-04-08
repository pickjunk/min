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

              var _useState3 = (0, _react.useState)({
                stack: [initialRoute],
                current: 0
              }),
                  _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
                  _useState4$ = _useState4[0],
                  stack = _useState4$.stack,
                  current = _useState4$.current,
                  setState = _useState4[1];

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
                    setState({
                      stack: [route],
                      current: 0
                    });
                  } else {
                    if (action == 'push') {
                      setState({
                        stack: [].concat((0, _toConsumableArray2["default"])(stack.slice(0, current + 1)), [route]),
                        current: current + 1
                      });
                    } else {
                      setState({
                        stack: [].concat((0, _toConsumableArray2["default"])(stack.slice(0, current)), [route]),
                        current: current
                      });
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
                        setState({
                          stack: stack,
                          current: current - 1
                        });
                        return;
                      }
                    } // forward


                    if (stack[current + 1]) {
                      var _forward = link(stack[current + 1].location);

                      if (_forward == windowLocation()) {
                        setState({
                          stack: stack,
                          current: current + 1
                        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsInJlZiIsInJlYWNoQm90dG9tIiwiY2IiLCJsb2NrIiwicGFnZSIsImN1cnJlbnQiLCJsaXN0ZW5lciIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsImNsaWVudEhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwidW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoZWlnaHQiLCJvdmVyZmxvd1kiLCJ6SW5kZXgiLCJyb3V0ZSIsImNoaWxkIiwicGF0aCIsImNvbXBvbmVudCIsInByb3BzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwiaW5pdGlhbFJvdXRlIiwibGlrZUFwcCIsIlJvdXRlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwic3RhY2siLCJzZXRTdGF0ZSIsInN0YXJ0Iiwic3Vic2NyaWJlIiwiZW5kIiwicGlwZSIsImFjdGlvbiIsImxvY2F0aW9uIiwiY2hlY2siLCJpbmZvIiwic3RhdHVzIiwid2FybiIsIm1hdGNoIiwic2xpY2UiLCJ1bnN1YnNjcmliZSIsIm9yaWdpblBvcFN0YXRlIiwid2luZG93Iiwib25wb3BzdGF0ZSIsIm5leHQiLCJ3aW5kb3dMb2NhdGlvbiIsImJhY2siLCJsaW5rIiwiZm9yd2FyZCIsInRyYW5zaXRpb25zIiwibWFwIiwiXyIsImkiLCJmcm9tIiwidHJhbnNmb3JtIiwiZW50ZXIiLCJsZWF2ZSIsIml0ZW0iLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsInVzZVJvdXRlciIsIkVycm9yIiwicGF0aG5hbWUiLCJzZWFyY2giLCJyb3V0aW5nIiwiaW5pdCJdLCJt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QTJCekIsTUFBTSxDQUFDVCxRQUFQLENBQWdCbUMsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxPQUFULENBQWlCQyxJQUFqQixFQUFnQztBQUNyQyxTQUFPLFVBQVV4RCxTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUN1RCxPQUFWLEdBQW9CQyxJQUFwQjtBQUNBLFdBQU94RCxTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbiAgdXNlUmVmLFxuICB1c2VDYWxsYmFjayxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVhY2hIYW5kbGVyIHtcbiAgKCk6IFByb21pc2U8dm9pZD47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8WydwdXNoJyB8ICdyZXBsYWNlJywgc3RyaW5nXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7IGNvbnRlbnQsIGxheWVyIH06IHsgY29udGVudDogTG9hZGVkUm91dGU7IGxheWVyOiBudW1iZXIgfSkge1xuICBjb25zdCByZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHJlYWNoQm90dG9tID0gdXNlQ2FsbGJhY2soXG4gICAgZnVuY3Rpb24gKGNiOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XG4gICAgICBsZXQgbG9jayA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBwYWdlID0gcmVmLmN1cnJlbnQhO1xuICAgICAgYXN5bmMgZnVuY3Rpb24gbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhbG9jayAmJlxuICAgICAgICAgIHBhZ2Uuc2Nyb2xsSGVpZ2h0IC0gcGFnZS5zY3JvbGxUb3AgLSBwYWdlLmNsaWVudEhlaWdodCA8IDNcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlYWNoIGJvdHRvbScpO1xuXG4gICAgICAgICAgbG9jayA9IHRydWU7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNiKCk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgICBsb2NrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICAgICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBsaXN0ZW5lcik7XG4gICAgICB9O1xuICAgIH0sXG4gICAgW3JlZl0sXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICB6SW5kZXg6IGxheWVyLFxuICAgICAgfX1cbiAgICAgIHJlZj17cmVmfVxuICAgID5cbiAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgY29udGVudC5yb3V0ZSxcbiAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgeyAuLi5wcm9wcywga2V5OiBwYXRoLCByZWFjaEJvdHRvbSB9LFxuICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW3sgc3RhY2ssIGN1cnJlbnQgfSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoe1xuICAgICAgc3RhY2s6IFtpbml0aWFsUm91dGVdIGFzIExvYWRlZFJvdXRlW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgIH0pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2sobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbG9jYXRpb24sIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBbYWN0aW9uLCByb3V0ZV07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc3RhY2s6IFtyb3V0ZV0sXG4gICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAncHVzaCcpIHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgd2luZG93TG9jYXRpb24oKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhY2ssXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCAtIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhY2ssXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSkubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIChpKSA9PiBpLFxuICAgICAge1xuICAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDEwMHZ3LDAsMCknIH0sXG4gICAgICAgIGVudGVyOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsMCwwKScgfSxcbiAgICAgICAgbGVhdmU6IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMTAwdncsMCwwKScgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4uc3RhY2tbY3VycmVudF0sXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxQYWdlIGNvbnRlbnQ9e3N0YWNrWzBdfSBsYXllcj17MH0gLz5cbiAgICAgICAge3RyYW5zaXRpb25zLm1hcCgoeyBpdGVtLCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgbGF5ZXIgPSBpdGVtICsgMTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGFuaW1hdGVkLmRpdiBrZXk9e2xheWVyfSBzdHlsZT17cHJvcHN9PlxuICAgICAgICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1tsYXllcl19IGxheWVyPXtsYXllcn0gLz5cbiAgICAgICAgICAgIDwvYW5pbWF0ZWQuZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3JlcGxhY2UnLCB0YXJnZXRdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==