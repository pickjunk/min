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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _objectSpread({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: 'auto',
      zIndex: layer,
      background: '#f5f5f9'
    }, style)
  }, (0, _reduceRight["default"])(content.route, function (child, _ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        props = _ref2.props;
    return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
      key: path
    }), child);
  }, null));
}

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
                    var _ref6, action, location, route;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
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

                            _context.next = 4;
                            return routes.match(location);

                          case 4:
                            route = _context.sent;
                            return _context.abrupt("return", [action, route]);

                          case 6:
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
                    location$.next(['push', windowLocation()]);
                  } else {
                    var _state$current2 = state.current,
                        _stack2 = _state$current2.stack,
                        _current2 = _state$current2.current; // back

                    if (_stack2[_current2 - 1]) {
                      var _back = link(_stack2[_current2 - 1].location);

                      if (_back == windowLocation()) {
                        state.current.current--;
                        forceUpdate();
                        return;
                      }
                    } // forward


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
              var transitions = (0, _reactSpring.useTransition)(stack.slice(1, current + 1).map(function (_, i) {
                return i;
              }), function (i) {
                return i;
              }, {
                from: {
                  transform: 'translate(100vw, 0)'
                },
                enter: {
                  transform: 'translate(0vw, 0)'
                },
                leave: {
                  transform: 'translate(100vw, 0)'
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
                  style: _objectSpread({
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflowY: 'auto',
                    zIndex: layer,
                    background: '#f5f5f9'
                  }, props)
                }, (0, _reduceRight["default"])(stack[layer].route, function (child, _ref10) {
                  var path = _ref10.path,
                      component = _ref10.component,
                      props = _ref10.props;
                  return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
                    key: path
                  }), child);
                }, null));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJsYXllciIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJvdmVyZmxvd1kiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kIiwicm91dGUiLCJjaGlsZCIsInBhdGgiLCJjb21wb25lbnQiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNyZWF0ZVJvdXRlciIsInJvdXRlcyIsImluaXRpYWxSb3V0ZSIsImxpa2VBcHAiLCJSb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInN0YXRlIiwic3RhY2siLCJjdXJyZW50IiwiZm9yY2VVcGRhdGUiLCJzdGFydCIsInN1YnNjcmliZSIsImVuZCIsInBpcGUiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImNoZWNrIiwibG9nIiwiaW5mbyIsInN0YXR1cyIsIndhcm4iLCJtYXRjaCIsInNsaWNlIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwid2luZG93TG9jYXRpb24iLCJiYWNrIiwibGluayIsImZvcndhcmQiLCJ0cmFuc2l0aW9ucyIsIm1hcCIsIl8iLCJpIiwiZnJvbSIsInRyYW5zZm9ybSIsImVudGVyIiwibGVhdmUiLCJpdGVtIiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQVdB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QzBELE9BQVYsR0FBb0JDLElBQXBCO0FBQ0EsV0FBTzNELFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxuICB1c2VSZWYsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgdXNlVHJhbnNpdGlvbiwgYW5pbWF0ZWQgfSBmcm9tICdyZWFjdC1zcHJpbmcnO1xuaW1wb3J0IHVzZUZvcmNlVXBkYXRlIGZyb20gJ3VzZS1mb3JjZS11cGRhdGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIHN0cmluZ10+KCk7XG5cbmZ1bmN0aW9uIFBhZ2Uoe1xuICBjb250ZW50LFxuICBsYXllcixcbiAgc3R5bGUgPSB7fSxcbn06IHtcbiAgY29udGVudDogTG9hZGVkUm91dGU7XG4gIGxheWVyOiBudW1iZXI7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgekluZGV4OiBsYXllcixcbiAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgPlxuICAgICAge3JlZHVjZVJpZ2h0KFxuICAgICAgICBjb250ZW50LnJvdXRlLFxuICAgICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50LCBwcm9wcyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCB7IC4uLnByb3BzLCBrZXk6IHBhdGggfSwgY2hpbGQpO1xuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBpbml0aWFsUm91dGUsXG4gIGxpa2VBcHAsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBpbml0aWFsUm91dGU6IExvYWRlZFJvdXRlO1xuICBsaWtlQXBwOiBib29sZWFuO1xufSk6IFByb21pc2U8UmVhY3QuRkM8e30+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBzdGF0ZSA9IHVzZVJlZih7XG4gICAgICBzdGFjazogW2luaXRpYWxSb3V0ZV0gYXMgTG9hZGVkUm91dGVbXSxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBmb3JjZVVwZGF0ZSA9IHVzZUZvcmNlVXBkYXRlKCk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAoW2FjdGlvbiwgbG9jYXRpb25dKTogUHJvbWlzZTxcbiAgICAgICAgICAgIFtzdHJpbmcsIExvYWRlZFJvdXRlXVxuICAgICAgICAgID4ge1xuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoOiBsb2NhdGlvbiwgc3RhdHVzOiAnMjAwJyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbG9jYXRpb24sIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIFthY3Rpb24sIHJvdXRlXTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChbYWN0aW9uLCByb3V0ZV0pIHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcblxuICAgICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgICAgc3RhdGUuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgc3RhY2s6IFtyb3V0ZV0sXG4gICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0YWNrLCBjdXJyZW50IH0gPSBzdGF0ZS5jdXJyZW50O1xuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSAncHVzaCcpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICBzdGFjazogWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQgKyAxKSwgcm91dGVdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQgKyAxLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICBzdGFjazogWy4uLnN0YWNrLnNsaWNlKDAsIGN1cnJlbnQpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudCxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3JjZVVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgZW5kLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghbGlrZUFwcCkge1xuICAgICAgICAgIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIHdpbmRvd0xvY2F0aW9uKCldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IHN0YWNrLCBjdXJyZW50IH0gPSBzdGF0ZS5jdXJyZW50O1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQtLTtcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmb3J3YXJkXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgKyAxXSkge1xuICAgICAgICAgICAgY29uc3QgZm9yd2FyZCA9IGxpbmsoc3RhY2tbY3VycmVudCArIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudC5jdXJyZW50Kys7XG4gICAgICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG5cbiAgICBjb25zdCB0cmFuc2l0aW9ucyA9IHVzZVRyYW5zaXRpb24oXG4gICAgICBzdGFjay5zbGljZSgxLCBjdXJyZW50ICsgMSkubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIChpKSA9PiBpLFxuICAgICAge1xuICAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgxMDB2dywgMCknIH0sXG4gICAgICAgIGVudGVyOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwdncsIDApJyB9LFxuICAgICAgICBsZWF2ZTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMTAwdncsIDApJyB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5zdGFja1tjdXJyZW50XSxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFBhZ2UgY29udGVudD17c3RhY2tbMF19IGxheWVyPXswfSAvPlxuICAgICAgICB7dHJhbnNpdGlvbnMubWFwKCh7IGl0ZW0sIHByb3BzIH0pID0+IHtcbiAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0gKyAxO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YW5pbWF0ZWQuZGl2XG4gICAgICAgICAgICAgIGtleT17bGF5ZXJ9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHpJbmRleDogbGF5ZXIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmNWY1ZjknLFxuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cmVkdWNlUmlnaHQoXG4gICAgICAgICAgICAgICAgc3RhY2tbbGF5ZXJdLnJvdXRlLFxuICAgICAgICAgICAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQsIHByb3BzIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ucHJvcHMsIGtleTogcGF0aCB9LFxuICAgICAgICAgICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9hbmltYXRlZC5kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQoWydwdXNoJywgdGFyZ2V0XSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIHRhcmdldF0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91dGluZyhpbml0OiBSb3V0aW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5yb3V0aW5nID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19