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
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduceRight = _interopRequireDefault(require("lodash/reduceRight"));

var _logger = _interopRequireDefault(require("./logger"));

var _routes = null;
var ctx = (0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function router(_x) {
  return _router.apply(this, arguments);
}

function _router() {
  _router = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(routes) {
    var location,
        notFound,
        route,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
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
                  _useState2 = (0, _slicedToArray2.default)(_useState, 2),
                  loading = _useState2[0],
                  setLoading = _useState2[1];

              var _useState3 = (0, _react.useState)((0, _objectSpread2.default)({
                location: location
              }, route)),
                  _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
                  match = _useState4[0],
                  setMatch = _useState4[1];

              (0, _react.useEffect)(function () {
                var match$ = location$.pipe((0, _operators.switchMap)(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee(l) {
                    var match;
                    return _regenerator.default.wrap(function _callee$(_context) {
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

                            _logger.default.warn({
                              path: l,
                              status: '404'
                            });

                            notFound();
                            return _context.abrupt("return", false);

                          case 7:
                            _logger.default.info({
                              path: l,
                              status: '200'
                            });

                            return _context.abrupt("return", (0, _objectSpread2.default)({
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
              var routeElement = (0, _reduceRight.default)(match.route, function (child, _ref2) {
                var path = _ref2.path,
                    component = _ref2.component;
                return _react.default.createElement(component, (0, _objectSpread2.default)({}, component._props, {
                  key: path
                }), child);
              }, null);
              return _react.default.createElement(ctx.Provider, {
                value: (0, _objectSpread2.default)({
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
exports.default = _default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsInVzZVJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiaW5pdGlhbFByb3BzIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBV0EsSUFBSUEsT0FBc0IsR0FBRyxJQUE3QjtBQUNBLElBQU1DLEdBQUcsR0FBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztTQUVlQyxNOzs7Ozs7OzRCQUFmLGtCQUNFQyxNQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVFQyxZQUFBQSxRQUZGLDhEQUVxQkMsY0FBYyxF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QUFWLENBQWVZLE1BQWY7QUFDRDs7QUFDTSxTQUFTTSxFQUFULENBQVlDLEtBQVosRUFBa0M7QUFDdkNSLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDSSxFQUFSLENBQVdDLEtBQVg7QUFDRDs7QUFDTSxTQUFTQyxJQUFULEdBQXNCO0FBQzNCVCxFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ00sSUFBUjtBQUNEOztBQUNNLFNBQVNDLE9BQVQsR0FBeUI7QUFDOUJWLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTyxPQUFSO0FBQ0Q7O0FBQ00sU0FBU1IsSUFBVCxDQUFjSixJQUFkLEVBQTRCQyxJQUE1QixFQUFtRDtBQUN4REMsRUFBQUEsY0FBYztBQUVkLFNBQU8zQyxPQUFPLENBQUU2QyxJQUFULENBQWNKLElBQWQsRUFBb0JDLElBQXBCLENBQVA7QUFDRDs7QUFFTSxTQUFTWSxTQUFULEdBQXFCO0FBQzFCLFNBQU8sdUJBQVdyRCxHQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFTMEMsY0FBVCxHQUEwQjtBQUN4QixNQUFJLENBQUMzQyxPQUFMLEVBQWM7QUFDWixVQUFNLElBQUlXLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFRCxTQUFTSixjQUFULEdBQWtDO0FBQ2hDLFNBQU9zQixNQUFNLENBQUN2QixRQUFQLENBQWdCaUQsUUFBaEIsR0FBMkIxQixNQUFNLENBQUN2QixRQUFQLENBQWdCa0QsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUEwQztBQUMvQyxTQUFPLFVBQVN2QixTQUFULEVBQW9DO0FBQ3pDQSxJQUFBQSxTQUFTLENBQUNzQixZQUFWLEdBQXlCQyxJQUF6QjtBQUNBLFdBQU92QixTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIFBhcmFtcywgSW5pdGlhbFByb3BzLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgbG9jYXRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTWF0Y2gge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJvdXRlcihcbiAgcm91dGVzOiBSb3V0ZXMsXG4gIGxvY2F0aW9uOiBzdHJpbmcgPSB3aW5kb3dMb2NhdGlvbigpLFxuICBub3RGb3VuZDogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVhY3QuRkM8dm9pZD4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG4gIGlmIChyb3V0ZSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXRpYWwgbG9jYXRpb24gbXVzdCBub3QgYmUgbm90IGZvdW5kJyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFttYXRjaCwgc2V0TWF0Y2hdID0gdXNlU3RhdGU8TWF0Y2g+KHtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgLi4ucm91dGUsXG4gICAgfSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBtYXRjaCQgPSBsb2NhdGlvbiRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGFzeW5jIGZ1bmN0aW9uKGwpOiBQcm9taXNlPE1hdGNoIHwgZmFsc2U+IHtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGF3YWl0IHJvdXRlcy5tYXRjaChsKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgICBub3RGb3VuZCgpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsLFxuICAgICAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKHYgPT4gQm9vbGVhbih2KSkpO1xuXG4gICAgICBjb25zdCBsID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldE1hdGNoKG1hdGNoIGFzIE1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgbS51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcbiAgICAgIG1hdGNoLnJvdXRlLFxuICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICB7IC4uLmNvbXBvbmVudC5fcHJvcHMsIGtleTogcGF0aCB9LFxuICAgICAgICAgIGNoaWxkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyb3V0ZUVsZW1lbnR9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXNoKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKG5hbWUsIGFyZ3MpO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZ28oZGVsdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gIHJldHVybiB1c2VDb250ZXh0KGN0eCk7XG59XG5cbmZ1bmN0aW9uIHJvdXRlc1JlcXVpcmVkKCkge1xuICBpZiAoIV9yb3V0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUm91dGVyIGlzIG5vdCBjcmVhdGVkLCBgICtcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3aW5kb3dMb2NhdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxQcm9wcyhpbml0OiBJbml0aWFsUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQuaW5pdGlhbFByb3BzID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19