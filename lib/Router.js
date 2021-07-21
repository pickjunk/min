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
  var content = _ref.content,
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
                            return _context.abrupt("return", [action, route]);

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
              return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
                value: _objectSpread(_objectSpread({}, stack[current]), {}, {
                  routes: routes,
                  loading: loading
                })
              }, /*#__PURE__*/_react["default"].createElement(Page, {
                content: stack[0]
              }), transitions(function (_ref9, item, _, i) {
                var x = _ref9.x;
                return /*#__PURE__*/_react["default"].createElement(AnimatedPage, {
                  content: item,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiUGFnZSIsImNvbnRlbnQiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0Iiwib3ZlcmZsb3dZIiwiYmFja2dyb3VuZCIsInJvdXRlIiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJBbmltYXRlZFBhZ2UiLCJjcmVhdGVSb3V0ZXIiLCJyb3V0ZXMiLCJpbml0aWFsUm91dGUiLCJsaWtlQXBwIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzdGF0ZSIsInN0YWNrIiwiY3VycmVudCIsImZvcmNlVXBkYXRlIiwic3RhcnQiLCJzdWJzY3JpYmUiLCJlbmQiLCJwaXBlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJsaW5rIiwiY2hlY2siLCJsb2ciLCJpbmZvIiwic3RhdHVzIiwid2FybiIsIm1hdGNoIiwic2xpY2UiLCJ1bnN1YnNjcmliZSIsIm9yaWdpblBvcFN0YXRlIiwid2luZG93Iiwib25wb3BzdGF0ZSIsIm5leHQiLCJ3aW5kb3dMb2NhdGlvbiIsImJhY2siLCJmb3J3YXJkIiwiYW5pbWF0ZWRQYWdlcyIsInRyYW5zaXRpb25zIiwiZnJvbSIsIngiLCJlbnRlciIsImxlYXZlIiwiaXRlbSIsIl8iLCJpIiwidHJhbnNsYXRlWCIsInRvIiwiekluZGV4IiwicHVzaCIsInJvdXRlc1JlcXVpcmVkIiwidGFyZ2V0IiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBUUE7O0FBQ0E7O0FBQ0E7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QUFDTSxTQUFTZixJQUFULENBQWNELFFBQWQsRUFBMEM7QUFDL0M4QixFQUFBQSxjQUFjO0FBRWQsU0FBT3JFLE9BQU8sQ0FBRXdDLElBQVQsQ0FBY0QsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU29DLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBVzFFLEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVNvRSxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQ3JFLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSTRFLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFTSxTQUFTdkIsY0FBVCxHQUFrQztBQUN2QyxTQUFPSCxNQUFNLENBQUNYLFFBQVAsQ0FBZ0JzQyxRQUFoQixHQUEyQjNCLE1BQU0sQ0FBQ1gsUUFBUCxDQUFnQnVDLE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsT0FBVCxDQUFpQkMsSUFBakIsRUFBZ0M7QUFDckMsU0FBTyxVQUFVL0QsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDOEQsT0FBVixHQUFvQkMsSUFBcEI7QUFDQSxXQUFPL0QsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG4gIHVzZVJlZixcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBMb2NhdGlvbiwgUm91dGluZywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyB1c2VUcmFuc2l0aW9uLCBhbmltYXRlZCB9IGZyb20gJ3JlYWN0LXNwcmluZyc7XG5pbXBvcnQgdXNlRm9yY2VVcGRhdGUgZnJvbSAndXNlLWZvcmNlLXVwZGF0ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dCB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJMb2NhdGlvbiBleHRlbmRzIExvY2F0aW9uIHtcbiAgY29udGV4dD86IENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyTG9hZGVkUm91dGUgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIGNvbnRleHQ/OiBDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBSb3V0ZXJMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWNoSGFuZGxlciB7XG4gICgpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PFsncHVzaCcgfCAncmVwbGFjZScsIFJvdXRlckxvY2F0aW9uXT4oKTtcblxuZnVuY3Rpb24gUGFnZSh7XG4gIGNvbnRlbnQsXG4gIHN0eWxlID0ge30sXG59OiB7XG4gIGNvbnRlbnQ6IExvYWRlZFJvdXRlO1xuICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG59KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIGJhY2tncm91bmQ6ICcjZjVmNWY5JyxcbiAgICAgICAgLi4uc3R5bGUsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtyZWR1Y2VSaWdodChcbiAgICAgICAgY29udGVudC5yb3V0ZSxcbiAgICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGNvbXBvbmVudCwgeyAuLi5wcm9wcywga2V5OiBwYXRoIH0sIGNoaWxkKTtcbiAgICAgICAgfSxcbiAgICAgICAgbnVsbCxcbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59XG5jb25zdCBBbmltYXRlZFBhZ2UgPSBhbmltYXRlZChQYWdlKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBpbml0aWFsUm91dGUsXG4gIGxpa2VBcHAsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBpbml0aWFsUm91dGU6IFJvdXRlckxvYWRlZFJvdXRlO1xuICBsaWtlQXBwOiBib29sZWFuO1xufSk6IFByb21pc2U8UmVhY3QuRkM8e30+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBzdGF0ZSA9IHVzZVJlZih7XG4gICAgICBzdGFjazogW2luaXRpYWxSb3V0ZV0gYXMgUm91dGVyTG9hZGVkUm91dGVbXSxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgfSk7XG5cbiAgICBjb25zdCBmb3JjZVVwZGF0ZSA9IHVzZUZvcmNlVXBkYXRlKCk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZW5kID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAoW2FjdGlvbiwgbG9jYXRpb25dKTogUHJvbWlzZTxcbiAgICAgICAgICAgIFtzdHJpbmcsIFJvdXRlckxvYWRlZFJvdXRlXVxuICAgICAgICAgID4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHJvdXRlcy5saW5rKGxvY2F0aW9uKTtcblxuICAgICAgICAgICAgaWYgKHJvdXRlcy5jaGVjayhwYXRoKSkge1xuICAgICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGgsIHN0YXR1czogJzIwMCcgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGgsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKHBhdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gW2FjdGlvbiwgcm91dGVdO1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKFthY3Rpb24sIHJvdXRlXSkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICBzdGFjazogW3JvdXRlXSxcbiAgICAgICAgICAgICAgY3VycmVudDogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoYWN0aW9uID09ICdwdXNoJykge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCArIDEpLCByb3V0ZV0sXG4gICAgICAgICAgICAgICAgY3VycmVudDogY3VycmVudCArIDEsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHN0YWNrOiBbLi4uc3RhY2suc2xpY2UoMCwgY3VycmVudCksIHJvdXRlXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydC51bnN1YnNjcmliZSgpO1xuICAgICAgICBlbmQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFsaWtlQXBwKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQoW1xuICAgICAgICAgICAgJ3B1c2gnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwYXRoOiB3aW5kb3dMb2NhdGlvbigpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IHN0YWNrLCBjdXJyZW50IH0gPSBzdGF0ZS5jdXJyZW50O1xuICAgICAgICAgIC8vIGJhY2tcbiAgICAgICAgICBpZiAoc3RhY2tbY3VycmVudCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrID0gbGluayhzdGFja1tjdXJyZW50IC0gMV0ubG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGJhY2sgPT0gd2luZG93TG9jYXRpb24oKSkge1xuICAgICAgICAgICAgICBzdGF0ZS5jdXJyZW50LmN1cnJlbnQtLTtcbiAgICAgICAgICAgICAgZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBmb3J3YXJkXG4gICAgICAgICAgaWYgKHN0YWNrW2N1cnJlbnQgKyAxXSkge1xuICAgICAgICAgICAgY29uc3QgZm9yd2FyZCA9IGxpbmsoc3RhY2tbY3VycmVudCArIDFdLmxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChmb3J3YXJkID09IHdpbmRvd0xvY2F0aW9uKCkpIHtcbiAgICAgICAgICAgICAgc3RhdGUuY3VycmVudC5jdXJyZW50Kys7XG4gICAgICAgICAgICAgIGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHsgc3RhY2ssIGN1cnJlbnQgfSA9IHN0YXRlLmN1cnJlbnQ7XG5cbiAgICBjb25zdCBhbmltYXRlZFBhZ2VzID0gc3RhY2suc2xpY2UoMSwgY3VycmVudCArIDEpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25zID0gdXNlVHJhbnNpdGlvbihhbmltYXRlZFBhZ2VzLCB7XG4gICAgICBmcm9tOiB7IHg6IDEwMCB9LFxuICAgICAgZW50ZXI6IHsgeDogMCB9LFxuICAgICAgbGVhdmU6IHsgeDogMTAwIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIC4uLnN0YWNrW2N1cnJlbnRdLFxuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UGFnZSBjb250ZW50PXtzdGFja1swXX0gLz5cbiAgICAgICAge3RyYW5zaXRpb25zKCh7IHggfSwgaXRlbSwgXywgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8QW5pbWF0ZWRQYWdlXG4gICAgICAgICAgICAgIGNvbnRlbnQ9e2l0ZW19XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogeC50bygoeCkgPT4gYCR7eH12d2ApLFxuICAgICAgICAgICAgICAgIHpJbmRleDogaSArIDEsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncHVzaCcsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogUm91dGVyTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KFsncmVwbGFjZScsIGxvY2F0aW9uXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3V0aW5nKGluaXQ6IFJvdXRpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LnJvdXRpbmcgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=