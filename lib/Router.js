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

var _utils = require("./utils");

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
                if ((0, _utils.isBrowser)()) {
                  var originPopState = window.onpopstate;

                  window.onpopstate = function () {
                    location$.next(windowLocation());
                  };

                  return function () {
                    window.onpopstate = originPopState;
                  };
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJsaW5rIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJnbyIsImRlbHRhIiwiYmFjayIsImZvcndhcmQiLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsImluaXRpYWxQcm9wcyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOztBQUNBOztBQVFBOztBQUNBOzs7Ozs7QUFXQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztTQUVlQyxZOzs7OztnR0FBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0VDLFlBQUFBLE1BREYsUUFDRUEsTUFERix1QkFFRUMsUUFGRixFQUVFQSxRQUZGLDhCQUVh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LENBQVlDLEtBQVosRUFBa0M7QUFDdkNSLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDSSxFQUFSLENBQVdDLEtBQVg7QUFDRDs7QUFDTSxTQUFTQyxJQUFULEdBQXNCO0FBQzNCVCxFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ00sSUFBUjtBQUNEOztBQUNNLFNBQVNDLE9BQVQsR0FBeUI7QUFDOUJWLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTyxPQUFSO0FBQ0Q7O0FBQ00sU0FBU1IsSUFBVCxDQUFjckMsUUFBZCxFQUEwQztBQUMvQ21DLEVBQUFBLGNBQWM7QUFFZCxTQUFPekMsT0FBTyxDQUFFMkMsSUFBVCxDQUFjckMsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBUzhDLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBV25ELEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVN3QyxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQ3pDLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSVcsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVELFNBQVNKLGNBQVQsR0FBa0M7QUFDaEMsU0FBT3VCLE1BQU0sQ0FBQ3hCLFFBQVAsQ0FBZ0IrQyxRQUFoQixHQUEyQnZCLE1BQU0sQ0FBQ3hCLFFBQVAsQ0FBZ0JnRCxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTBDO0FBQy9DLFNBQU8sVUFBVXJCLFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQ29CLFlBQVYsR0FBeUJDLElBQXpCO0FBQ0EsV0FBT3JCLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHtcbiAgUm91dGVzLFxuICBMb2FkZWRSb3V0ZSxcbiAgTG9jYXRpb24sXG4gIEluaXRpYWxQcm9wcyxcbiAgQ29tcG9uZW50LFxufSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBsb2NhdGlvbiA9IHdpbmRvd0xvY2F0aW9uKCksXG4gIG5vdEZvdW5kLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIG5vdEZvdW5kPzogKCkgPT4gdm9pZDtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtYXRjaCQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxNYXRjaCB8IGZhbHNlPiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgICBpZiAobWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKHsgcGF0aDogbCwgc3RhdHVzOiAnNDA0JyB9KTtcbiAgICAgICAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgbm90Rm91bmQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsLFxuICAgICAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKCh2KSA9PiBCb29sZWFuKHYpKSk7XG5cbiAgICAgIGNvbnN0IGwgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRNYXRjaChtYXRjaCBhcyBNYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQod2luZG93TG9jYXRpb24oKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHJvdXRlRWxlbWVudCA9IHJlZHVjZVJpZ2h0KFxuICAgICAgbWF0Y2gucm91dGUsXG4gICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgIHsgLi4uY29tcG9uZW50Ll9wcm9wcywga2V5OiBwYXRoIH0sXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3JvdXRlRWxlbWVudH1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ28oZGVsdGE/OiBudW1iZXIpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmdvKGRlbHRhKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYWNrKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZvcndhcmQoKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5mb3J3YXJkKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmcge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIHJldHVybiBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbFByb3BzKGluaXQ6IEluaXRpYWxQcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQuaW5pdGlhbFByb3BzID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19