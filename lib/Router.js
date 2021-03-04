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
exports.routing = routing;
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
                    var _match;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return routes.match(l);

                          case 3:
                            _match = _context.sent;

                            if (!(_match === false)) {
                              _context.next = 8;
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

                          case 8:
                            _logger["default"].info({
                              path: l,
                              status: '200'
                            });

                            return _context.abrupt("return", _objectSpread({
                              location: l
                            }, _match));

                          case 12:
                            _context.prev = 12;
                            _context.t0 = _context["catch"](0);
                            console.error(_context.t0);
                            return _context.abrupt("return", false);

                          case 16:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 12]]);
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

function routing(init) {
  return function (component) {
    component.routing = init;
    return component;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwiY29uc29sZSIsImVycm9yIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJsaW5rIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJnbyIsImRlbHRhIiwiYmFjayIsImZvcndhcmQiLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsInJvdXRpbmciLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBV0EsSUFBSUEsT0FBc0IsR0FBRyxJQUE3QjtBQUNBLElBQU1DLEdBQUcsZ0JBQUcsMEJBQW9DLElBQXBDLENBQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsYUFBSixFQUFsQjs7U0FFZUMsWTs7Ozs7Z0dBQWY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQyxZQUFBQSxNQURGLFFBQ0VBLE1BREYsdUJBRUVDLFFBRkYsRUFFRUEsUUFG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QSxTQUFTLENBQUNnQyxJQUFWLENBQWVVLE1BQWY7QUFDRDs7QUFDTSxTQUFTTSxFQUFULENBQVlDLEtBQVosRUFBa0M7QUFDdkNSLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDSSxFQUFSLENBQVdDLEtBQVg7QUFDRDs7QUFDTSxTQUFTQyxJQUFULEdBQXNCO0FBQzNCVCxFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ00sSUFBUjtBQUNEOztBQUNNLFNBQVNDLE9BQVQsR0FBeUI7QUFDOUJWLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTyxPQUFSO0FBQ0Q7O0FBQ00sU0FBU1IsSUFBVCxDQUFjdkMsUUFBZCxFQUEwQztBQUMvQ3FDLEVBQUFBLGNBQWM7QUFFZCxTQUFPM0MsT0FBTyxDQUFFNkMsSUFBVCxDQUFjdkMsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBU2dELFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBV3JELEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVMwQyxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQzNDLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSVcsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVELFNBQVNKLGNBQVQsR0FBa0M7QUFDaEMsU0FBT3lCLE1BQU0sQ0FBQzFCLFFBQVAsQ0FBZ0JpRCxRQUFoQixHQUEyQnZCLE1BQU0sQ0FBQzFCLFFBQVAsQ0FBZ0JrRCxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLE9BQVQsQ0FBaUJDLElBQWpCLEVBQWdDO0FBQ3JDLFNBQU8sVUFBVXJCLFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQ29CLE9BQVYsR0FBb0JDLElBQXBCO0FBQ0EsV0FBT3JCLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgTG9jYXRpb24sIFJvdXRpbmcsIENvbXBvbmVudCB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVzLFxuICBsb2NhdGlvbiA9IHdpbmRvd0xvY2F0aW9uKCksXG4gIG5vdEZvdW5kLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9jYXRpb24/OiBzdHJpbmc7XG4gIG5vdEZvdW5kPzogKCkgPT4gdm9pZDtcbn0pOiBQcm9taXNlPFJlYWN0LkZDPHt9Pj4ge1xuICBfcm91dGVzID0gcm91dGVzO1xuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBtYXRjaCQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uIChsKTogUHJvbWlzZTxNYXRjaCB8IGZhbHNlPiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICBub3RGb3VuZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbG9nLmluZm8oeyBwYXRoOiBsLCBzdGF0dXM6ICcyMDAnIH0pO1xuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGwsXG4gICAgICAgICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIoKHYpID0+IEJvb2xlYW4odikpKTtcblxuICAgICAgY29uc3QgbCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gkLnN1YnNjcmliZShmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldE1hdGNoKG1hdGNoIGFzIE1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIG0udW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG9yaWdpblBvcFN0YXRlID0gd2luZG93Lm9ucG9wc3RhdGU7XG4gICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYXRpb24kLm5leHQod2luZG93TG9jYXRpb24oKSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcbiAgICAgIG1hdGNoLnJvdXRlLFxuICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICB7IC4uLmNvbXBvbmVudC5fcHJvcHMsIGtleTogcGF0aCB9LFxuICAgICAgICAgIGNoaWxkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyb3V0ZUVsZW1lbnR9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb246IExvY2F0aW9uKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdvKGRlbHRhPzogbnVtYmVyKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5nbyhkZWx0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhsb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRpbmcoaW5pdDogUm91dGluZykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQucm91dGluZyA9IGluaXQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==