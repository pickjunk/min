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
exports.initialProps = initialProps;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
    var routes, _ref$location, location, notFound, route;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = _ref.routes, _ref$location = _ref.location, location = _ref$location === void 0 ? windowLocation() : _ref$location, notFound = _ref.notFound;
            _routes = routes;
            _context2.next = 4;
            return routes.match(location);

          case 4:
            route = _context2.sent;

            if (!(route === false)) {
              _context2.next = 7;
              break;
            }

            throw new Error('initial location must not be not found');

          case 7:
            return _context2.abrupt("return", function Router() {
              var _useState = (0, _react.useState)(false),
                  _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
                  loading = _useState2[0],
                  setLoading = _useState2[1];

              var _useState3 = (0, _react.useState)(_objectSpread({
                location: location
              }, route)),
                  _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
                  match = _useState4[0],
                  setMatch = _useState4[1];

              (0, _react.useEffect)(function () {
                var match$ = location$.pipe((0, _operators.switchMap)( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(l) {
                    var match;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return routes.match(l);

                          case 2:
                            match = _context.sent;

                            if (!(match === false)) {
                              _context.next = 7;
                              break;
                            }

                            _logger["default"].warn({
                              path: l,
                              status: '404'
                            });

                            if (notFound) {
                              notFound();
                            }

                            return _context.abrupt("return", false);

                          case 7:
                            _logger["default"].info({
                              path: l,
                              status: '200'
                            });

                            return _context.abrupt("return", _objectSpread({
                              location: l
                            }, match));

                          case 9:
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
                    component = _ref3.component;
                return /*#__PURE__*/_react["default"].createElement(component, _objectSpread(_objectSpread({}, component._props), {}, {
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

          case 8:
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

function initialProps(init) {
  return function (component) {
    component.initialProps = init;
    return component;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJsaW5rIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJnbyIsImRlbHRhIiwiYmFjayIsImZvcndhcmQiLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsImluaXRpYWxQcm9wcyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOztBQUNBOztBQVFBOzs7Ozs7QUFXQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztTQUVlQyxZOzs7OztnR0FBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VDLFlBQUFBLE1BREYsUUFDRUEsTUFERix1QkFFRUMsUUFGRixFQUVFQSxRQUZGLDhCQUVhQyxjQUFj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YztBQUVkRyxFQUFBQSxPQUFPLENBQUNJLEVBQVIsQ0FBV0MsS0FBWDtBQUNEOztBQUNNLFNBQVNDLElBQVQsR0FBc0I7QUFDM0JULEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTSxJQUFSO0FBQ0Q7O0FBQ00sU0FBU0MsT0FBVCxHQUF5QjtBQUM5QlYsRUFBQUEsY0FBYztBQUVkRyxFQUFBQSxPQUFPLENBQUNPLE9BQVI7QUFDRDs7QUFDTSxTQUFTUixJQUFULENBQWNyQyxRQUFkLEVBQTBDO0FBQy9DbUMsRUFBQUEsY0FBYztBQUVkLFNBQU96QyxPQUFPLENBQUUyQyxJQUFULENBQWNyQyxRQUFkLENBQVA7QUFDRDs7QUFFTSxTQUFTOEMsU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXbkQsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3dDLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDekMsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJVyxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0osY0FBVCxHQUFrQztBQUNoQyxTQUFPdUIsTUFBTSxDQUFDeEIsUUFBUCxDQUFnQitDLFFBQWhCLEdBQTJCdkIsTUFBTSxDQUFDeEIsUUFBUCxDQUFnQmdELE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBMEM7QUFDL0MsU0FBTyxVQUFVckIsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDb0IsWUFBVixHQUF5QkMsSUFBekI7QUFDQSxXQUFPckIsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQge1xuICBSb3V0ZXMsXG4gIExvYWRlZFJvdXRlLFxuICBMb2NhdGlvbixcbiAgSW5pdGlhbFByb3BzLFxuICBDb21wb25lbnQsXG59IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBsb2NhdGlvbiA9IHdpbmRvd0xvY2F0aW9uKCksXG4gIG5vdEZvdW5kLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIG5vdEZvdW5kPzogKCkgPT4gdm9pZDtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtYXRjaCQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxNYXRjaCB8IGZhbHNlPiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgICBpZiAobWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgbm90Rm91bmQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsLFxuICAgICAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKCh2KSA9PiBCb29sZWFuKHYpKSk7XG5cbiAgICAgIGNvbnN0IGwgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRNYXRjaChtYXRjaCBhcyBNYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2F0aW9uJC5uZXh0KHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgcm91dGVFbGVtZW50ID0gcmVkdWNlUmlnaHQoXG4gICAgICBtYXRjaC5yb3V0ZSxcbiAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgeyAuLi5jb21wb25lbnQuX3Byb3BzLCBrZXk6IHBhdGggfSxcbiAgICAgICAgICBjaGlsZCxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLm1hdGNoLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7cm91dGVFbGVtZW50fVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZ28oZGVsdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsUHJvcHMoaW5pdDogSW5pdGlhbFByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5pbml0aWFsUHJvcHMgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=