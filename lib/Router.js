"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouter = useRouter;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduceRight = _interopRequireDefault(require("lodash/reduceRight"));

var _routes = null;
var ctx = (0, _react.createContext)(null);
var location$ = new _rxjs.Subject();

function router(_x, _x2, _x3) {
  return _router.apply(this, arguments);
}

function _router() {
  _router = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(routes, location, notFound) {
    var route;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _routes = routes;

            if (!location) {
              location = windowLocation();
            }

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
                              _context.next = 6;
                              break;
                            }

                            notFound();
                            return _context.abrupt("return", false);

                          case 6:
                            return _context.abrupt("return", (0, _objectSpread2.default)({
                              location: l
                            }, match));

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
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

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _router.apply(this, arguments);
}

var imperactive = {
  push: function push(name, args) {
    routesRequired();

    var target = _routes.link(name, args);

    history.pushState(null, '', target);
    location$.next(target);
  },
  replace: function replace(name, args) {
    routesRequired();

    var target = _routes.link(name, args);

    history.replaceState(null, '', target);
    location$.next(target);
  },
  go: function go(delta) {
    routesRequired();
    history.go(delta);
  },
  back: function back() {
    routesRequired();
    history.back();
  },
  forward: function forward() {
    routesRequired();
    history.forward();
  },
  link: function link(name, args) {
    routesRequired();
    return _routes.link(name, args);
  }
};
var imperativeRouter = Object.assign(router, imperactive);
var _default = imperativeRouter;
exports.default = _default;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJub3RGb3VuZCIsIndpbmRvd0xvY2F0aW9uIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiX3Byb3BzIiwia2V5IiwiaW1wZXJhY3RpdmUiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsImltcGVyYXRpdmVSb3V0ZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFZQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O1NBRWVDLE07Ozs7Ozs7NEJBQWYsa0JBQ0VDLE1BREYsRUFFRUMsUUFGRixFQUdFQyxRQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtFUCxZQUFBQSxPQUFPLEdBQUdLLE1BQVY7O0FBRUEsZ0JB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O0FBQ1hULElBQUFBLGNBQWM7QUFFZEcsSUFBQUEsT0FBTyxDQUFDTSxJQUFSO0FBQ0QsR0F4QmlCO0FBeUJsQkMsRUFBQUEsT0F6QmtCLHFCQXlCRjtBQUNkVixJQUFBQSxjQUFjO0FBRWRHLElBQUFBLE9BQU8sQ0FBQ08sT0FBUjtBQUNELEdBN0JpQjtBQThCbEJSLEVBQUFBLElBOUJrQixnQkE4QmJKLElBOUJhLEVBOEJDQyxJQTlCRCxFQThCd0I7QUFDeENDLElBQUFBLGNBQWM7QUFFZCxXQUFPeEMsT0FBTyxDQUFFMEMsSUFBVCxDQUFjSixJQUFkLEVBQW9CQyxJQUFwQixDQUFQO0FBQ0Q7QUFsQ2lCLENBQXBCO0FBaURBLElBQU1ZLGdCQUFrQyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2pELE1BQWQsRUFBc0JnQyxXQUF0QixDQUEzQztlQUNlZSxnQjs7O0FBRVIsU0FBU0csU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckQsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3VDLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDeEMsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJVyxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0gsY0FBVCxHQUFrQztBQUNoQyxTQUFPZ0IsTUFBTSxDQUFDbEIsUUFBUCxDQUFnQmlELFFBQWhCLEdBQTJCL0IsTUFBTSxDQUFDbEIsUUFBUCxDQUFnQmtELE1BQWxEO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgUmVhY3RFbGVtZW50LFxuICBjcmVhdGVDb250ZXh0LFxuICB1c2VDb250ZXh0LFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xuaW1wb3J0IHsgUm91dGVzLCBMb2FkZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnLi9yb3V0ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xuICBsb2NhdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbnRleHQgZXh0ZW5kcyBNYXRjaCB7XG4gIHJvdXRlczogUm91dGVzO1xuICBsb2FkaW5nOiBib29sZWFuO1xufVxuXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XG5jb25zdCBjdHggPSBjcmVhdGVDb250ZXh0PFJvdXRlckNvbnRleHQgfCBudWxsPihudWxsKTtcbmNvbnN0IGxvY2F0aW9uJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuYXN5bmMgZnVuY3Rpb24gcm91dGVyKFxuICByb3V0ZXM6IFJvdXRlcyxcbiAgbG9jYXRpb246IHN0cmluZyxcbiAgbm90Rm91bmQ6ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlYWN0LkZDPHZvaWQ+PiB7XG4gIF9yb3V0ZXMgPSByb3V0ZXM7XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIGxvY2F0aW9uID0gd2luZG93TG9jYXRpb24oKTtcbiAgfVxuXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcbiAgaWYgKHJvdXRlID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbCBsb2NhdGlvbiBtdXN0IG5vdCBiZSBub3QgZm91bmQnKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBSb3V0ZXIoKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW21hdGNoLCBzZXRNYXRjaF0gPSB1c2VTdGF0ZTxNYXRjaD4oe1xuICAgICAgbG9jYXRpb24sXG4gICAgICAuLi5yb3V0ZSxcbiAgICB9KTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IG1hdGNoJCA9IGxvY2F0aW9uJFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24obCk6IFByb21pc2U8TWF0Y2ggfCBmYWxzZT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gYXdhaXQgcm91dGVzLm1hdGNoKGwpO1xuICAgICAgICAgICAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBub3RGb3VuZCgpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBsLFxuICAgICAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoZmlsdGVyKHYgPT4gQm9vbGVhbih2KSkpO1xuXG4gICAgICBjb25zdCBsID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldE1hdGNoKG1hdGNoIGFzIE1hdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgbS51bnN1YnNjcmliZSgpO1xuICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICB1c2VFZmZlY3QoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luUG9wU3RhdGUgPSB3aW5kb3cub25wb3BzdGF0ZTtcbiAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvcmlnaW5Qb3BTdGF0ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcbiAgICAgIG1hdGNoLnJvdXRlLFxuICAgICAgKGNoaWxkOiBSZWFjdEVsZW1lbnQgfCBudWxsLCB7IHBhdGgsIGNvbXBvbmVudCB9KSA9PiB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgIGNvbXBvbmVudCxcbiAgICAgICAgICB7IC4uLmNvbXBvbmVudC5fcHJvcHMsIGtleTogcGF0aCB9LFxuICAgICAgICAgIGNoaWxkLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8Y3R4LlByb3ZpZGVyXG4gICAgICAgIHZhbHVlPXt7XG4gICAgICAgICAgcm91dGVzLFxuICAgICAgICAgIGxvYWRpbmcsXG4gICAgICAgICAgLi4ubWF0Y2gsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtyb3V0ZUVsZW1lbnR9XG4gICAgICA8L2N0eC5Qcm92aWRlcj5cbiAgICApO1xuICB9O1xufVxuXG5jb25zdCBpbXBlcmFjdGl2ZSA9IHtcbiAgcHVzaChuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiB2b2lkIHtcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcbiAgICBsb2NhdGlvbiQubmV4dCh0YXJnZXQpO1xuICB9LFxuICByZXBsYWNlKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICAgIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKG5hbWUsIGFyZ3MpO1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICAgIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG4gIH0sXG4gIGdvKGRlbHRhPzogbnVtYmVyKTogdm9pZCB7XG4gICAgcm91dGVzUmVxdWlyZWQoKTtcblxuICAgIGhpc3RvcnkuZ28oZGVsdGEpO1xuICB9LFxuICBiYWNrKCk6IHZvaWQge1xuICAgIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgICBoaXN0b3J5LmJhY2soKTtcbiAgfSxcbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gICAgaGlzdG9yeS5mb3J3YXJkKCk7XG4gIH0sXG4gIGxpbmsobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogc3RyaW5nIHtcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gICAgcmV0dXJuIF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gIH0sXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEltcGVyYXRpdmVSb3V0ZXIge1xuICAocm91dGVzOiBSb3V0ZXMsIGxvY2F0aW9uOiBzdHJpbmcsIG5vdEZvdW5kOiAoKSA9PiB2b2lkKTogUHJvbWlzZTxcbiAgICBSZWFjdC5GQzx2b2lkPlxuICA+O1xuICBwdXNoKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQ7XG4gIHJlcGxhY2UobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZDtcbiAgZ28oZGVsdGE/OiBudW1iZXIpOiB2b2lkO1xuICBiYWNrKCk6IHZvaWQ7XG4gIGZvcndhcmQoKTogdm9pZDtcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XG59XG5cbmNvbnN0IGltcGVyYXRpdmVSb3V0ZXI6IEltcGVyYXRpdmVSb3V0ZXIgPSBPYmplY3QuYXNzaWduKHJvdXRlciwgaW1wZXJhY3RpdmUpO1xuZXhwb3J0IGRlZmF1bHQgaW1wZXJhdGl2ZVJvdXRlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoY3R4KTtcbn1cblxuZnVuY3Rpb24gcm91dGVzUmVxdWlyZWQoKSB7XG4gIGlmICghX3JvdXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSb3V0ZXIgaXMgbm90IGNyZWF0ZWQsIGAgK1xuICAgICAgICBgbWFrZSBzdXJlIHRvIHJlbmRlciA8Um91dGVyIC8+IGluIHlvdXIgYm9vdHN0cmFwYCxcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd0xvY2F0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xufVxuIl19