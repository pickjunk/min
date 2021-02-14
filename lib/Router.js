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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsInVzZVJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiaW5pdGlhbFByb3BzIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7OztBQVdBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLGdCQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O1NBRWVDLE07Ozs7OzBGQUFmLGtCQUNFQyxNQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVFQyxZQUFBQSxRQUZGLDhEQUVxQkMsY0FB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QUNEOztBQUNNLFNBQVNNLEVBQVQsQ0FBWUMsS0FBWixFQUFrQztBQUN2Q1IsRUFBQUEsY0FBYztBQUVkRyxFQUFBQSxPQUFPLENBQUNJLEVBQVIsQ0FBV0MsS0FBWDtBQUNEOztBQUNNLFNBQVNDLElBQVQsR0FBc0I7QUFDM0JULEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTSxJQUFSO0FBQ0Q7O0FBQ00sU0FBU0MsT0FBVCxHQUF5QjtBQUM5QlYsRUFBQUEsY0FBYztBQUVkRyxFQUFBQSxPQUFPLENBQUNPLE9BQVI7QUFDRDs7QUFDTSxTQUFTUixJQUFULENBQWNKLElBQWQsRUFBNEJDLElBQTVCLEVBQW1EO0FBQ3hEQyxFQUFBQSxjQUFjO0FBRWQsU0FBTzNDLE9BQU8sQ0FBRTZDLElBQVQsQ0FBY0osSUFBZCxFQUFvQkMsSUFBcEIsQ0FBUDtBQUNEOztBQUVNLFNBQVNZLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBV3JELEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVMwQyxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQzNDLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSVcsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVELFNBQVNKLGNBQVQsR0FBa0M7QUFDaEMsU0FBT3NCLE1BQU0sQ0FBQ3ZCLFFBQVAsQ0FBZ0JpRCxRQUFoQixHQUEyQjFCLE1BQU0sQ0FBQ3ZCLFFBQVAsQ0FBZ0JrRCxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTBDO0FBQy9DLFNBQU8sVUFBU3ZCLFNBQVQsRUFBb0M7QUFDekNBLElBQUFBLFNBQVMsQ0FBQ3NCLFlBQVYsR0FBeUJDLElBQXpCO0FBQ0EsV0FBT3ZCLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgUGFyYW1zLCBJbml0aWFsUHJvcHMsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gcm91dGVyKFxuICByb3V0ZXM6IFJvdXRlcyxcbiAgbG9jYXRpb246IHN0cmluZyA9IHdpbmRvd0xvY2F0aW9uKCksXG4gIG5vdEZvdW5kOiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZWFjdC5GQzx2b2lkPj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IG1hdGNoJCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24obCk6IFByb21pc2U8TWF0Y2ggfCBmYWxzZT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gYXdhaXQgcm91dGVzLm1hdGNoKGwpO1xuICAgICAgICAgICAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICAgIG5vdEZvdW5kKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbCwgc3RhdHVzOiAnMjAwJyB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGwsXG4gICAgICAgICAgICAgIC4uLm1hdGNoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIodiA9PiBCb29sZWFuKHYpKSk7XG5cbiAgICAgIGNvbnN0IGwgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gkLnN1YnNjcmliZShmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0TWF0Y2gobWF0Y2ggYXMgTWF0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvY2F0aW9uJC5uZXh0KHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHJvdXRlRWxlbWVudCA9IHJlZHVjZVJpZ2h0KFxuICAgICAgbWF0Y2gucm91dGUsXG4gICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgIHsgLi4uY29tcG9uZW50Ll9wcm9wcywga2V5OiBwYXRoIH0sXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3JvdXRlRWxlbWVudH1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdvKGRlbHRhPzogbnVtYmVyKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5nbyhkZWx0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbFByb3BzKGluaXQ6IEluaXRpYWxQcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24oY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5pbml0aWFsUHJvcHMgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=