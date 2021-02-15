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

function router(_x) {
  return _router.apply(this, arguments);
}

function _router() {
  _router = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(routes) {
    var location,
        notFound,
        route,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            location = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : windowLocation();
            notFound = _args2.length > 2 ? _args2[2] : undefined;
            _routes = routes;
            _context2.next = 5;
            return routes.match(location);

          case 5:
            route = _context2.sent;

            if (!(route === false)) {
              _context2.next = 8;
              break;
            }

            throw new Error('initial location must not be not found');

          case 8:
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
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(l) {
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

                            notFound();
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
                    return _ref.apply(this, arguments);
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
                if (typeof window !== 'undefined') {
                  var originPopState = window.onpopstate;

                  window.onpopstate = function () {
                    location$.next(windowLocation());
                  };

                  return function () {
                    window.onpopstate = originPopState;
                  };
                }
              }, []);
              var routeElement = (0, _reduceRight["default"])(match.route, function (child, _ref2) {
                var path = _ref2.path,
                    component = _ref2.component;
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

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _router.apply(this, arguments);
}

var _default = router;
exports["default"] = _default;

function push(name, args) {
  routesRequired();

  var target = _routes.link(name, args);

  history.pushState(null, '', target);
  location$.next(target);
}

function replace(name, args) {
  routesRequired();

  var target = _routes.link(name, args);

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

function link(name, args) {
  routesRequired();
  return _routes.link(name, args);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsInVzZVJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiaW5pdGlhbFByb3BzIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQVdBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLGdCQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O1NBRWVDLE07Ozs7OzBGQUFmLGtCQUNFQyxNQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVFQyxZQUFBQSxRQUZGLDhEQUVxQkMsY0FB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O0FBQ0Q7O0FBQ00sU0FBU00sRUFBVCxDQUFZQyxLQUFaLEVBQWtDO0FBQ3ZDUixFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ0ksRUFBUixDQUFXQyxLQUFYO0FBQ0Q7O0FBQ00sU0FBU0MsSUFBVCxHQUFzQjtBQUMzQlQsRUFBQUEsY0FBYztBQUVkRyxFQUFBQSxPQUFPLENBQUNNLElBQVI7QUFDRDs7QUFDTSxTQUFTQyxPQUFULEdBQXlCO0FBQzlCVixFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ08sT0FBUjtBQUNEOztBQUNNLFNBQVNSLElBQVQsQ0FBY0osSUFBZCxFQUE0QkMsSUFBNUIsRUFBbUQ7QUFDeERDLEVBQUFBLGNBQWM7QUFFZCxTQUFPM0MsT0FBTyxDQUFFNkMsSUFBVCxDQUFjSixJQUFkLEVBQW9CQyxJQUFwQixDQUFQO0FBQ0Q7O0FBRU0sU0FBU1ksU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckQsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzBDLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDM0MsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJVyxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0osY0FBVCxHQUFrQztBQUNoQyxTQUFPc0IsTUFBTSxDQUFDdkIsUUFBUCxDQUFnQmlELFFBQWhCLEdBQTJCMUIsTUFBTSxDQUFDdkIsUUFBUCxDQUFnQmtELE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBMEM7QUFDL0MsU0FBTyxVQUFVdkIsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDc0IsWUFBVixHQUF5QkMsSUFBekI7QUFDQSxXQUFPdkIsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBQYXJhbXMsIEluaXRpYWxQcm9wcywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2ggZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIE1hdGNoIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5hc3luYyBmdW5jdGlvbiByb3V0ZXIoXG4gIHJvdXRlczogUm91dGVzLFxuICBsb2NhdGlvbjogc3RyaW5nID0gd2luZG93TG9jYXRpb24oKSxcbiAgbm90Rm91bmQ6ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtYXRjaCQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxNYXRjaCB8IGZhbHNlPiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgICBpZiAobWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgICAgbm90Rm91bmQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoOiBsLCBzdGF0dXM6ICcyMDAnIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogbCxcbiAgICAgICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgICApXG4gICAgICAgIC5waXBlKGZpbHRlcigodikgPT4gQm9vbGVhbih2KSkpO1xuXG4gICAgICBjb25zdCBsID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG0gPSBtYXRjaCQuc3Vic2NyaWJlKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0TWF0Y2gobWF0Y2ggYXMgTWF0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgbS51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxvY2F0aW9uJC5uZXh0KHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcbiAgICAgIG1hdGNoLnJvdXRlLFxuICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICB7IC4uLmNvbXBvbmVudC5fcHJvcHMsIGtleTogcGF0aCB9LFxuICAgICAgICAgIGNoaWxkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyb3V0ZUVsZW1lbnR9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKG5hbWUsIGFyZ3MpO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZ28oZGVsdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxQcm9wcyhpbml0OiBJbml0aWFsUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29tcG9uZW50LmluaXRpYWxQcm9wcyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==