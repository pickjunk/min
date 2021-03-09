"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;
exports.replace = replace;
exports.go = go;
exports.back = back;
exports.forward = forward;
exports.link = link;
exports.useRouter = useRouter;
exports.windowLocation = windowLocation;
exports.routing = routing;
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduceRight = _interopRequireDefault(require("lodash/reduceRight"));

var _logger = _interopRequireDefault(require("./logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _routes = null;
var ctx = /*#__PURE__*/(0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function createRouter(_x) {
  return _createRouter.apply(this, arguments);
}

function _createRouter() {
  _createRouter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var routes, initialRoute;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = _ref.routes, initialRoute = _ref.initialRoute;
            _routes = routes;
            return _context2.abrupt("return", function Router() {
              var _useState = (0, _react.useState)(false),
                  _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
                  loading = _useState2[0],
                  setLoading = _useState2[1];

              var _useState3 = (0, _react.useState)(initialRoute),
                  _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
                  match = _useState4[0],
                  setMatch = _useState4[1];

              (0, _react.useEffect)(function () {
                var match$ = location$.pipe((0, _operators.switchMap)( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(l) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
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

                            return _context.abrupt("return", routes.match(l));

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }())).pipe((0, _operators.filter)(function (v) {
                  return Boolean(v);
                }));
                var l = location$.subscribe(function () {
                  setLoading(true);
                });
                var m = match$.subscribe(function (match) {
                  setLoading(false);
                  setMatch(match);
                });
                return function () {
                  l.unsubscribe();
                  m.unsubscribe();
                };
              }, []);
              (0, _react.useEffect)(function () {
                var originPopState = window.onpopstate;

                window.onpopstate = function () {
                  location$.next(windowLocation());
                };

                return function () {
                  window.onpopstate = originPopState;
                };
              }, []);
              var routeElement = (0, _reduceRight["default"])(match.route, function (child, _ref3) {
                var path = _ref3.path,
                    component = _ref3.component,
                    props = _ref3.props;
                return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, props), {}, {
                  key: path
                }), child);
              }, null);
              return /*#__PURE__*/_react["default"].createElement(ctx.Provider, {
                value: _objectSpread({
                  routes: routes,
                  loading: loading
                }, match)
              }, routeElement);
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
  location$.next(target);
}

function replace(location) {
  routesRequired();

  var target = _routes.link(location);

  history.replaceState(null, '', target);
  location$.next(target);
}

function go(delta) {
  routesRequired();
  history.go(delta);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwiaW5pdGlhbFJvdXRlIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJtYXRjaCIsInNldE1hdGNoIiwibWF0Y2gkIiwicGlwZSIsImwiLCJjaGVjayIsImxvZyIsImluZm8iLCJwYXRoIiwic3RhdHVzIiwid2FybiIsInYiLCJCb29sZWFuIiwic3Vic2NyaWJlIiwibSIsInVuc3Vic2NyaWJlIiwib3JpZ2luUG9wU3RhdGUiLCJ3aW5kb3ciLCJvbnBvcHN0YXRlIiwibmV4dCIsIndpbmRvd0xvY2F0aW9uIiwicm91dGVFbGVtZW50Iiwicm91dGUiLCJjaGlsZCIsImNvbXBvbmVudCIsInByb3BzIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwicHVzaCIsImxvY2F0aW9uIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJsaW5rIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJnbyIsImRlbHRhIiwiYmFjayIsImZvcndhcmQiLCJ1c2VSb3V0ZXIiLCJFcnJvciIsInBhdGhuYW1lIiwic2VhcmNoIiwicm91dGluZyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBT0EsSUFBSUEsT0FBc0IsR0FBRyxJQUE3QjtBQUNBLElBQU1DLEdBQUcsZ0JBQUcsMEJBQW9DLElBQXBDLENBQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsYUFBSixFQUFsQjs7U0FFZUMsWTs7Ozs7Z0dBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VDLFlBQUFBLE1BREYsUUFDRUEsTUFERixFQUVFQyxZQUZGLFFBRUVBLFlBRkY7QUFPRU4s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UDtBQUNEOztBQUVELFNBQVN3QyxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQ3pDLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSXFELEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFTSxTQUFTdkIsY0FBVCxHQUFrQztBQUN2QyxTQUFPSCxNQUFNLENBQUNhLFFBQVAsQ0FBZ0JjLFFBQWhCLEdBQTJCM0IsTUFBTSxDQUFDYSxRQUFQLENBQWdCZSxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQWdDO0FBQ3JDLFNBQU8sVUFBVXZCLFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQ3NCLE9BQVYsR0FBb0JDLElBQXBCO0FBQ0EsV0FBT3ZCLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBpbml0aWFsUm91dGUsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBpbml0aWFsUm91dGU6IExvYWRlZFJvdXRlO1xufSk6IFByb21pc2U8UmVhY3QuRkM8e30+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbbWF0Y2gsIHNldE1hdGNoXSA9IHVzZVN0YXRlPExvYWRlZFJvdXRlPihpbml0aWFsUm91dGUpO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1hdGNoJCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKGwpOiBQcm9taXNlPExvYWRlZFJvdXRlPiB7XG4gICAgICAgICAgICBpZiAocm91dGVzLmNoZWNrKGwpKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbCwgc3RhdHVzOiAnMjAwJyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlcy5tYXRjaChsKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIoKHYpID0+IEJvb2xlYW4odikpKTtcblxuICAgICAgY29uc3QgbCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gkLnN1YnNjcmliZShmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldE1hdGNoKG1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIG0udW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYXRpb24kLm5leHQod2luZG93TG9jYXRpb24oKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcbiAgICAgIG1hdGNoLnJvdXRlLFxuICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCwgcHJvcHMgfSkgPT4ge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHsgLi4ucHJvcHMsIGtleTogcGF0aCB9LCBjaGlsZCk7XG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3JvdXRlRWxlbWVudH1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ28oZGVsdGE/OiBudW1iZXIpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmdvKGRlbHRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==