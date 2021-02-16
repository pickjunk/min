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
  _createRouter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(routes) {
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
  return _createRouter.apply(this, arguments);
}

var _default = createRouter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsInVzZVJvdXRlciIsInBhdGhuYW1lIiwic2VhcmNoIiwiaW5pdGlhbFByb3BzIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBT0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7OztBQVdBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLGdCQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O1NBRWVDLFk7Ozs7O2dHQUFmLGtCQUNFQyxNQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVFQyxZQUFBQSxRQUZGLDhEQUVxQkMsY0FBYyxFQUZuQztBQUdFQyxZQUFBQSxRQUhGO0FBS0VSLFlBQUFBLE9BQU8sR0FBR0ssTUFBVjtBQUxGO0FBQUEsbUJBT3NCQSxNQUFNLENBQUNJLEtBQVAsQ0FBYUgsUUFBYixDQVB0Qjs7QUFBQTtBQU9RSSxZQUFBQSxLQVBSOztBQUFBLGtCQVFNQSxLQUFLLEtBQUssS0FSaEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBU1UsSUFBSUMsS0FBSixDQUFVLHdDQUFWLENBVFY7O0FBQUE7QUFBQSw4Q0FZUyxTQUFTQyxNQUFULEdBQWdDO0FBQUEsOEJBQ1AscUJBQWtCLEtBQWxCLENBRE87QUFBQTtBQUFBLGtCQUM5QkMsT0FEOEI7QUFBQSxrQkFDckJDLFVBRHFCOztBQUFBLCtCQUVYO0FBQ3hCUixnQkFBQUEsUUFBUSxFQUFSQTtBQUR3QixpQkFFckJJLEtBRnFCLEVBRlc7QUFBQTtBQUFBLGtCQUU5QkQsS0FGOEI7QUFBQSxrQkFFdkJNLFFBRnVCOztBQU9yQyxvQ0FBVSxZQUFZO0FBQ3BCLG9CQUFNQyxNQUFNLEdBQUdkLFNBQVMsQ0FDckJlLElBRFksQ0FFWDtBQUFBLDJHQUFVLGlCQUFnQkMsQ0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FDVWIsTUFBTSxDQUFDSSxLQUFQLENBQWFTLENBQWIsQ0FEVjs7QUFBQTtBQUNKVCw0QkFBQUEsS0FESTs7QUFBQSxrQ0FFSkEsS0FBSyxLQUFLLEtBRk47QUFBQTtBQUFBO0FBQUE7O0FBR05VLCtDQUFJQyxJQUFKLENBQVM7QUFBRUMsOEJBQUFBLElBQUksRUFBRUgsQ0FBUjtBQUFXSSw4QkFBQUEsTUFBTSxFQUFFO0FBQW5CLDZCQUFUOztBQUNBZCw0QkFBQUEsUUFBUTtBQUpGLDZEQUtDLEtBTEQ7O0FBQUE7QUFPUlcsK0NBQUlJLElBQUosQ0FBUztBQUFFRiw4QkFBQUEsSUFBSSxFQUFFSCxDQUFSO0FBQVdJLDhCQUFBQSxNQUFNLEVBQUU7QUFBbkIsNkJBQVQ7O0FBUFE7QUFVTmhCLDhCQUFBQSxRQUFRLEVBQUVZO0FBVkosK0JBV0hULEtBWEc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQVY7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBRlcsRUFpQlpRLElBakJZLENBaUJQLHVCQUFPLFVBQUNPLENBQUQ7QUFBQSx5QkFBT0MsT0FBTyxDQUFDRCxDQUFELENBQWQ7QUFBQSxpQkFBUCxDQWpCTyxDQUFmO0FBbUJBLG9CQUFNTixDQUFDLEdBQUdoQixTQUFTLENBQUN3QixTQUFWLENBQW9CLFlBQVk7QUFDeENaLGtCQUFBQSxVQUFVLENBQUMsSUFBRCxDQUFWO0FBQ0QsaUJBRlMsQ0FBVjtBQUdBLG9CQUFNYSxDQUFDLEdBQUdYLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQixVQUFVakIsS0FBVixFQUFpQjtBQUMxQ0ssa0JBQUFBLFVBQVUsQ0FBQyxLQUFELENBQVY7QUFDQUMsa0JBQUFBLFFBQVEsQ0FBQ04sS0FBRCxDQUFSO0FBQ0QsaUJBSFMsQ0FBVjtBQUtBLHVCQUFPLFlBQVk7QUFDakJTLGtCQUFBQSxDQUFDLENBQUNVLFdBQUY7QUFDQUQsa0JBQUFBLENBQUMsQ0FBQ0MsV0FBRjtBQUNELGlCQUhEO0FBSUQsZUFoQ0QsRUFnQ0csRUFoQ0g7QUFrQ0Esb0NBQVUsWUFBWTtBQUNwQixvQkFBSSx1QkFBSixFQUFpQjtBQUNmLHNCQUFNQyxjQUFjLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBOUI7O0FBQ0FELGtCQUFBQSxNQUFNLENBQUNDLFVBQVAsR0FBb0IsWUFBWTtBQUM5QjdCLG9CQUFBQSxTQUFTLENBQUM4QixJQUFWLENBQWV6QixjQUFjLEVBQTdCO0FBQ0QsbUJBRkQ7O0FBSUEseUJBQU8sWUFBWTtBQUNqQnVCLG9CQUFBQSxNQUFNLENBQUNDLFVBQVAsR0FBb0JGLGNBQXBCO0FBQ0QsbUJBRkQ7QUFHRDtBQUNGLGVBWEQsRUFXRyxFQVhIO0FBYUEsa0JBQU1JLFlBQVksR0FBRyw2QkFDbkJ4QixLQUFLLENBQUNDLEtBRGEsRUFFbkIsVUFBQ3dCLEtBQUQsU0FBcUQ7QUFBQSxvQkFBdEJiLElBQXNCLFNBQXRCQSxJQUFzQjtBQUFBLG9CQUFoQmMsU0FBZ0IsU0FBaEJBLFNBQWdCO0FBQ25ELG9DQUFPQyxrQkFBTUMsYUFBTixDQUNMRixTQURLLGtDQUVBQSxTQUFTLENBQUNHLE1BRlY7QUFFa0JDLGtCQUFBQSxHQUFHLEVBQUVsQjtBQUZ2QixvQkFHTGEsS0FISyxDQUFQO0FBS0QsZUFSa0IsRUFTbkIsSUFUbUIsQ0FBckI7QUFZQSxrQ0FDRSxnQ0FBQyxHQUFELENBQUssUUFBTDtBQUNFLGdCQUFBLEtBQUs7QUFDSDdCLGtCQUFBQSxNQUFNLEVBQU5BLE1BREc7QUFFSFEsa0JBQUFBLE9BQU8sRUFBUEE7QUFGRyxtQkFHQUosS0FIQTtBQURQLGlCQU9Hd0IsWUFQSCxDQURGO0FBV0QsYUF6Rkg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQTRGZTdCLFk7OztBQUVSLFNBQVNvQyxJQUFULENBQWNDLElBQWQsRUFBNEJDLElBQTVCLEVBQWlEO0FBQ3REQyxFQUFBQSxjQUFjOztBQUVkLE1BQU1DLE1BQU0sR0FBRzVDLE9BQU8sQ0FBRTZDLElBQVQsQ0FBY0osSUFBZCxFQUFvQkMsSUFBcEIsQ0FBZjs7QUFDQUksRUFBQUEsT0FBTyxDQUFDQyxTQUFSLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCSCxNQUE1QjtBQUNBMUMsRUFBQUEsU0FBUyxDQUFDOEIsSUFBVixDQUFlWSxNQUFmO0FBQ0Q7O0FBRU0sU0FBU0ksT0FBVCxDQUFpQlAsSUFBakIsRUFBK0JDLElBQS9CLEVBQW9EO0FBQ3pEQyxFQUFBQSxjQUFjOztBQUVkLE1BQU1DLE1BQU0sR0FBRzVDLE9BQU8sQ0FBRTZDLElBQVQsQ0FBY0osSUFBZCxFQUFvQkMsSUFBcEIsQ0FBZjs7QUFDQUksRUFBQUEsT0FBTyxDQUFDRyxZQUFSLENBQXFCLElBQXJCLEVBQTJCLEVBQTNCLEVBQStCTCxNQUEvQjtBQUNBMUMsRUFBQUEsU0FBUyxDQUFDOEIsSUFBVixDQUFlWSxNQUFmO0FBQ0Q7O0FBQ00sU0FBU00sRUFBVCxDQUFZQyxLQUFaLEVBQWtDO0FBQ3ZDUixFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ0ksRUFBUixDQUFXQyxLQUFYO0FBQ0Q7O0FBQ00sU0FBU0MsSUFBVCxHQUFzQjtBQUMzQlQsRUFBQUEsY0FBYztBQUVkRyxFQUFBQSxPQUFPLENBQUNNLElBQVI7QUFDRDs7QUFDTSxTQUFTQyxPQUFULEdBQXlCO0FBQzlCVixFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ08sT0FBUjtBQUNEOztBQUNNLFNBQVNSLElBQVQsQ0FBY0osSUFBZCxFQUE0QkMsSUFBNUIsRUFBbUQ7QUFDeERDLEVBQUFBLGNBQWM7QUFFZCxTQUFPM0MsT0FBTyxDQUFFNkMsSUFBVCxDQUFjSixJQUFkLEVBQW9CQyxJQUFwQixDQUFQO0FBQ0Q7O0FBRU0sU0FBU1ksU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckQsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzBDLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDM0MsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJVyxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0osY0FBVCxHQUFrQztBQUNoQyxTQUFPdUIsTUFBTSxDQUFDeEIsUUFBUCxDQUFnQmlELFFBQWhCLEdBQTJCekIsTUFBTSxDQUFDeEIsUUFBUCxDQUFnQmtELE1BQWxEO0FBQ0Q7O0FBRU0sU0FBU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBMEM7QUFDL0MsU0FBTyxVQUFVdkIsU0FBVixFQUFxQztBQUMxQ0EsSUFBQUEsU0FBUyxDQUFDc0IsWUFBVixHQUF5QkMsSUFBekI7QUFDQSxXQUFPdkIsU0FBUDtBQUNELEdBSEQ7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICBSZWFjdEVsZW1lbnQsXG4gIGNyZWF0ZUNvbnRleHQsXG4gIHVzZUNvbnRleHQsXG59IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHJlZHVjZVJpZ2h0IGZyb20gJ2xvZGFzaC9yZWR1Y2VSaWdodCc7XG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBQYXJhbXMsIEluaXRpYWxQcm9wcywgQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaCBleHRlbmRzIExvYWRlZFJvdXRlIHtcbiAgbG9jYXRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb250ZXh0IGV4dGVuZHMgTWF0Y2gge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgbG9hZGluZzogYm9vbGVhbjtcbn1cblxubGV0IF9yb3V0ZXM6IFJvdXRlcyB8IG51bGwgPSBudWxsO1xuY29uc3QgY3R4ID0gY3JlYXRlQ29udGV4dDxSb3V0ZXJDb250ZXh0IHwgbnVsbD4obnVsbCk7XG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihcbiAgcm91dGVzOiBSb3V0ZXMsXG4gIGxvY2F0aW9uOiBzdHJpbmcgPSB3aW5kb3dMb2NhdGlvbigpLFxuICBub3RGb3VuZDogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVhY3QuRkM8e30+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuICBpZiAocm91dGUgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0aWFsIGxvY2F0aW9uIG11c3Qgbm90IGJlIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbbWF0Y2gsIHNldE1hdGNoXSA9IHVzZVN0YXRlPE1hdGNoPih7XG4gICAgICBsb2NhdGlvbixcbiAgICAgIC4uLnJvdXRlLFxuICAgIH0pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IG1hdGNoJCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24gKGwpOiBQcm9taXNlPE1hdGNoIHwgZmFsc2U+IHtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGF3YWl0IHJvdXRlcy5tYXRjaChsKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oeyBwYXRoOiBsLCBzdGF0dXM6ICc0MDQnIH0pO1xuICAgICAgICAgICAgICBub3RGb3VuZCgpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2cuaW5mbyh7IHBhdGg6IGwsIHN0YXR1czogJzIwMCcgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsLFxuICAgICAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKCh2KSA9PiBCb29sZWFuKHYpKSk7XG5cbiAgICAgIGNvbnN0IGwgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRNYXRjaChtYXRjaCBhcyBNYXRjaCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbG9jYXRpb24kLm5leHQod2luZG93TG9jYXRpb24oKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHJvdXRlRWxlbWVudCA9IHJlZHVjZVJpZ2h0KFxuICAgICAgbWF0Y2gucm91dGUsXG4gICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgIHsgLi4uY29tcG9uZW50Ll9wcm9wcywga2V5OiBwYXRoIH0sXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3JvdXRlRWxlbWVudH1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2gobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdvKGRlbHRhPzogbnVtYmVyKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5nbyhkZWx0YSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYmFjaygpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkKCk6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZm9yd2FyZCgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxpbmsobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogc3RyaW5nIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICByZXR1cm4gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbFByb3BzKGluaXQ6IEluaXRpYWxQcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudDogQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb21wb25lbnQuaW5pdGlhbFByb3BzID0gaW5pdDtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9O1xufVxuIl19