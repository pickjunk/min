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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0IiwiY3JlYXRlUm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJ3aW5kb3dMb2NhdGlvbiIsIm5vdEZvdW5kIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwibG9nIiwid2FybiIsInBhdGgiLCJzdGF0dXMiLCJpbmZvIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJvcmlnaW5Qb3BTdGF0ZSIsIndpbmRvdyIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJjb21wb25lbnQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJfcHJvcHMiLCJrZXkiLCJwdXNoIiwicm91dGVzUmVxdWlyZWQiLCJ0YXJnZXQiLCJsaW5rIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJyZXBsYWNlU3RhdGUiLCJnbyIsImRlbHRhIiwiYmFjayIsImZvcndhcmQiLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsImluaXRpYWxQcm9wcyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOztBQUNBOztBQVFBOztBQUNBOzs7Ozs7QUFXQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxnQkFBRywwQkFBb0MsSUFBcEMsQ0FBWjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJQyxhQUFKLEVBQWxCOztTQUVlQyxZOzs7OztnR0FBZixrQkFDRUMsTUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFRUMsWUFBQUEsUUFGRiw4REFFcUJDLGNBQWMs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RUFBQUEsT0FBTyxDQUFDSSxFQUFSLENBQVdDLEtBQVg7QUFDRDs7QUFDTSxTQUFTQyxJQUFULEdBQXNCO0FBQzNCVCxFQUFBQSxjQUFjO0FBRWRHLEVBQUFBLE9BQU8sQ0FBQ00sSUFBUjtBQUNEOztBQUNNLFNBQVNDLE9BQVQsR0FBeUI7QUFDOUJWLEVBQUFBLGNBQWM7QUFFZEcsRUFBQUEsT0FBTyxDQUFDTyxPQUFSO0FBQ0Q7O0FBQ00sU0FBU1IsSUFBVCxDQUFjckMsUUFBZCxFQUEwQztBQUMvQ21DLEVBQUFBLGNBQWM7QUFFZCxTQUFPekMsT0FBTyxDQUFFMkMsSUFBVCxDQUFjckMsUUFBZCxDQUFQO0FBQ0Q7O0FBRU0sU0FBUzhDLFNBQVQsR0FBcUI7QUFDMUIsU0FBTyx1QkFBV25ELEdBQVgsQ0FBUDtBQUNEOztBQUVELFNBQVN3QyxjQUFULEdBQTBCO0FBQ3hCLE1BQUksQ0FBQ3pDLE9BQUwsRUFBYztBQUNaLFVBQU0sSUFBSVcsS0FBSixDQUNKLDhFQURJLENBQU47QUFJRDtBQUNGOztBQUVELFNBQVNKLGNBQVQsR0FBa0M7QUFDaEMsU0FBT3VCLE1BQU0sQ0FBQ3hCLFFBQVAsQ0FBZ0IrQyxRQUFoQixHQUEyQnZCLE1BQU0sQ0FBQ3hCLFFBQVAsQ0FBZ0JnRCxNQUFsRDtBQUNEOztBQUVNLFNBQVNDLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTBDO0FBQy9DLFNBQU8sVUFBVXJCLFNBQVYsRUFBcUM7QUFDMUNBLElBQUFBLFNBQVMsQ0FBQ29CLFlBQVYsR0FBeUJDLElBQXpCO0FBQ0EsV0FBT3JCLFNBQVA7QUFDRCxHQUhEO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHtcbiAgUm91dGVzLFxuICBMb2FkZWRSb3V0ZSxcbiAgTG9jYXRpb24sXG4gIEluaXRpYWxQcm9wcyxcbiAgQ29tcG9uZW50LFxufSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlUm91dGVyKFxuICByb3V0ZXM6IFJvdXRlcyxcbiAgbG9jYXRpb246IHN0cmluZyA9IHdpbmRvd0xvY2F0aW9uKCksXG4gIG5vdEZvdW5kOiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZWFjdC5GQzx7fT4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICBjb25zdCByb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG4gIGlmIChyb3V0ZSA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXRpYWwgbG9jYXRpb24gbXVzdCBub3QgYmUgbm90IGZvdW5kJyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFttYXRjaCwgc2V0TWF0Y2hdID0gdXNlU3RhdGU8TWF0Y2g+KHtcbiAgICAgIGxvY2F0aW9uLFxuICAgICAgLi4ucm91dGUsXG4gICAgfSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbWF0Y2gkID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbiAobCk6IFByb21pc2U8TWF0Y2ggfCBmYWxzZT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gYXdhaXQgcm91dGVzLm1hdGNoKGwpO1xuICAgICAgICAgICAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBsb2cud2Fybih7IHBhdGg6IGwsIHN0YXR1czogJzQwNCcgfSk7XG4gICAgICAgICAgICAgIG5vdEZvdW5kKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvZy5pbmZvKHsgcGF0aDogbCwgc3RhdHVzOiAnMjAwJyB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGwsXG4gICAgICAgICAgICAgIC4uLm1hdGNoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIoKHYpID0+IEJvb2xlYW4odikpKTtcblxuICAgICAgY29uc3QgbCA9IGxvY2F0aW9uJC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gkLnN1YnNjcmliZShmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldE1hdGNoKG1hdGNoIGFzIE1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIG0udW5zdWJzY3JpYmUoKTtcbiAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gb3JpZ2luUG9wU3RhdGU7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3Qgcm91dGVFbGVtZW50ID0gcmVkdWNlUmlnaHQoXG4gICAgICBtYXRjaC5yb3V0ZSxcbiAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQgfSkgPT4ge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgeyAuLi5jb21wb25lbnQuX3Byb3BzLCBrZXk6IHBhdGggfSxcbiAgICAgICAgICBjaGlsZCxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGN0eC5Qcm92aWRlclxuICAgICAgICB2YWx1ZT17e1xuICAgICAgICAgIHJvdXRlcyxcbiAgICAgICAgICBsb2FkaW5nLFxuICAgICAgICAgIC4uLm1hdGNoLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7cm91dGVFbGVtZW50fVxuICAgICAgPC9jdHguUHJvdmlkZXI+XG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsb2NhdGlvbjogTG9jYXRpb24pOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKGxvY2F0aW9uKTtcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uOiBMb2NhdGlvbik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xuICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQge1xuICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gIGhpc3RvcnkuZ28oZGVsdGEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgaGlzdG9yeS5iYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZCgpOiB2b2lkIHtcbiAgcm91dGVzUmVxdWlyZWQoKTtcblxuICBoaXN0b3J5LmZvcndhcmQoKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZyB7XG4gIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobG9jYXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsUHJvcHMoaW5pdDogSW5pdGlhbFByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5pbml0aWFsUHJvcHMgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH07XG59XG4iXX0=