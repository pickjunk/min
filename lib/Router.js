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
      zIndex: layer
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
                  left: '100vw'
                },
                enter: {
                  left: '0'
                },
                leave: {
                  left: '100vw'
                }
              });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsInN0eWxlIiwicmVmIiwicmVhY2hCb3R0b20iLCJjYiIsImxvY2siLCJwYWdlIiwiY3VycmVudCIsImxpc3RlbmVyIiwic2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsVG9wIiwiY2xpZW50SGVpZ2h0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInBvc2l0aW9uIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwib3ZlcmZsb3dZIiwiekluZGV4Iiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInN0YWNrIiwic2V0U3RhdGUiLCJzdGFydCIsInN1YnNjcmliZSIsImVuZCIsInBpcGUiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImNoZWNrIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImZvcndhcmQiLCJ0cmFuc2l0aW9ucyIsIm1hcCIsIl8iLCJpIiwiZnJvbSIsImVudGVyIiwibGVhdmUiLCJBbmltYXRlZFBhZ2UiLCJpdGVtIiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJv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cUI7QUFDMUIsU0FBTyx1QkFBV25GLEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVM2RSxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQzlFLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSXFGLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFTSxTQUFTckIsY0FBVCxHQUFrQztBQUN2QyxTQUFPSCxNQUFNLENBQUNULFFBQVAsQ0FBZ0JrQyxRQUFoQixHQUEyQnpCLE1BQU0sQ0FBQ1QsUUFBUCxDQUFnQm1DLE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVeEQsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDdUQsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPeEQsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbiAgdXNlQ2FsbGJhY2ssXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiwgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIHN0cmluZ10+KCk7XG5cbmZ1bmN0aW9uIFBhZ2Uoe1xuICBjb250ZW50LFxuICBsYXllcixcbiAgc3R5bGUgPSB7fSxcbn06IHtcbiAgY29udGVudDogTG9hZGVkUm91dGU7XG4gIGxheWVyOiBudW1iZXI7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICBjb25zdCByZWFjaEJvdHRvbSA9IHVzZUNhbGxiYWNrKFxuICAgIGZ1bmN0aW9uIChjYjogKCkgPT4gUHJvbWlzZTx2b2lkPikge1xuICAgICAgbGV0IGxvY2sgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcGFnZSA9IHJlZi5jdXJyZW50ITtcbiAgICAgIGFzeW5jIGZ1bmN0aW9uIGxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWxvY2sgJiZcbiAgICAgICAgICBwYWdlLnNjcm9sbEhlaWdodCAtIHBhZ2Uuc2Nyb2xsVG9wIC0gcGFnZS5jbGllbnRIZWlnaHQgPCAzXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaCBib3R0b20nKTtcblxuICAgICAgICAgIGxvY2sgPSB0cnVlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjYigpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgICAgbG9jayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbGlzdGVuZXIpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIFtyZWZdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIHpJbmRleDogbGF5ZXIsXG4gICAgICAgIC4uLnN0eWxlLFxuICAgICAgfX1cbiAgICAgIHJlZj17cmVmfVxuICAgID5cbiAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgY29udGVudC5yb3V0ZSxcbiAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgICAgeyAuLi5wcm9wcywga2V5OiBwYXRoLCByZWFjaEJvdHRvbSB9LFxuICAgICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcih7XG4gIHJvdXRlcyxcbiAgaW5pdGlhbFJvdXRlLFxuICBsaWtlQXBwLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgaW5pdGlhbFJvdXRlOiBMb2FkZWRSb3V0ZTtcbiAgbGlrZUFwcDogYm9vbGVhbjtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW3sgc3RhY2ssIGN1cnJlbnQgfSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoe1xuICAgICAgc3RhY2s6IFtpbml0aWFsUm91dGVdIGFzIExvYWRlZFJvdXRlW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgIH0pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKFthY3Rpb24sIGxvY2F0aW9uXSk6IFByb21pc2U8XG4gICAgICAgICAgICBbc3RyaW5nLCBMb2FkZWRSb3V0ZV1cbiAgICAgICAgICA+IHtcbiAgICAgICAgICAgIGlmIChyb3V0ZXMuY2hlY2sobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbG9jYXRpb24sIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGxvY2F0aW9uLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBbYWN0aW9uLCByb3V0ZV07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoW2FjdGlvbiwgcm91dGVdKSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgICAgICBpZiAoIWxpa2VBcHApIHtcbiAgICAgICAgICAgIHNldFN0YXRlKHtcbiAgICAgICAgICAgICAgc3RhY2s6IFtyb3V0ZV0sXG4gICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAncHVzaCcpIHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgd2luZG93TG9jYXRpb24oKV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhY2ssXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCAtIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGZvcndhcmRcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCArIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBmb3J3YXJkID0gbGluayhzdGFja1tjdXJyZW50ICsgMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGZvcndhcmQgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhY2ssXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSkubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIChpKSA9PiBpLFxuICAgICAge1xuICAgICAgICBmcm9tOiB7IGxlZnQ6ICcxMDB2dycgfSxcbiAgICAgICAgZW50ZXI6IHsgbGVmdDogJzAnIH0sXG4gICAgICAgIGxlYXZlOiB7IGxlZnQ6ICcxMDB2dycgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IEFuaW1hdGVkUGFnZSA9IGFuaW1hdGVkKFBhZ2UpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5zdGFja1tjdXJyZW50XSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFBhZ2UgY29udGVudD17c3RhY2tbMF19IGxheWVyPXswfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0gKyAxO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QW5pbWF0ZWRQYWdlXG4gICAgICAgICAgICAgIGtleT17bGF5ZXJ9XG4gICAgICAgICAgICAgIGNvbnRlbnQ9e3N0YWNrW2xheWVyXX1cbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBzdHlsZT17cHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dChbJ3JlcGxhY2UnLCB0YXJnZXRdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==