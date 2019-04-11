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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJub3RGb3VuZCIsIndpbmRvd0xvY2F0aW9uIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiX3Byb3BzIiwia2V5IiwiaW1wZXJhY3RpdmUiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsImltcGVyYXRpdmVSb3V0ZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFPQTs7QUFDQTs7QUFDQTs7QUFZQSxJQUFJQSxPQUFzQixHQUFHLElBQTdCO0FBQ0EsSUFBTUMsR0FBRyxHQUFHLDBCQUFvQyxJQUFwQyxDQUFaO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlDLGFBQUosRUFBbEI7O1NBRWVDLE07Ozs7Ozs7NEJBQWYsa0JBQ0VDLE1BREYsRUFFRUMsUUFGRixFQUdFQyxRQUhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtFUCxZQUFBQSxPQUFPLEdBQUdLLE1BQVY7O0FBRUEsZ0JB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O0FBQ1hULElBQUFBLGNBQWM7QUFFZEcsSUFBQUEsT0FBTyxDQUFDTSxJQUFSO0FBQ0QsR0F4QmlCO0FBeUJsQkMsRUFBQUEsT0F6QmtCLHFCQXlCRjtBQUNkVixJQUFBQSxjQUFjO0FBRWRHLElBQUFBLE9BQU8sQ0FBQ08sT0FBUjtBQUNELEdBN0JpQjtBQThCbEJSLEVBQUFBLElBOUJrQixnQkE4QmJKLElBOUJhLEVBOEJDQyxJQTlCRCxFQThCd0I7QUFDeENDLElBQUFBLGNBQWM7QUFFZCxXQUFPeEMsT0FBTyxDQUFFMEMsSUFBVCxDQUFjSixJQUFkLEVBQW9CQyxJQUFwQixDQUFQO0FBQ0Q7QUFsQ2lCLENBQXBCO0FBaURBLElBQU1ZLGdCQUFrQyxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY2pELE1BQWQsRUFBc0JnQyxXQUF0QixDQUEzQztlQUNlZSxnQjs7O0FBRVIsU0FBU0csU0FBVCxHQUFxQjtBQUMxQixTQUFPLHVCQUFXckQsR0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU3VDLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxDQUFDeEMsT0FBTCxFQUFjO0FBQ1osVUFBTSxJQUFJVyxLQUFKLENBQ0osOEVBREksQ0FBTjtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0gsY0FBVCxHQUFrQztBQUNoQyxTQUFPZ0IsTUFBTSxDQUFDbEIsUUFBUCxDQUFnQmlELFFBQWhCLEdBQTJCL0IsTUFBTSxDQUFDbEIsUUFBUCxDQUFnQmtELE1BQWxEO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtcclxuICB1c2VTdGF0ZSxcclxuICB1c2VFZmZlY3QsXHJcbiAgUmVhY3RFbGVtZW50LFxyXG4gIGNyZWF0ZUNvbnRleHQsXHJcbiAgdXNlQ29udGV4dCxcclxufSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCByZWR1Y2VSaWdodCBmcm9tICdsb2Rhc2gvcmVkdWNlUmlnaHQnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIExvYWRlZFJvdXRlLCBQYXJhbXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoIGV4dGVuZHMgTG9hZGVkUm91dGUge1xyXG4gIGxvY2F0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIE1hdGNoIHtcclxuICByb3V0ZXM6IFJvdXRlcztcclxuICBsb2FkaW5nOiBib29sZWFuO1xyXG59XHJcblxyXG5sZXQgX3JvdXRlczogUm91dGVzIHwgbnVsbCA9IG51bGw7XHJcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xyXG5jb25zdCBsb2NhdGlvbiQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG5hc3luYyBmdW5jdGlvbiByb3V0ZXIoXHJcbiAgcm91dGVzOiBSb3V0ZXMsXHJcbiAgbG9jYXRpb246IHN0cmluZyxcclxuICBub3RGb3VuZDogKCkgPT4gdm9pZCxcclxuKTogUHJvbWlzZTxSZWFjdC5GQzx2b2lkPj4ge1xyXG4gIF9yb3V0ZXMgPSByb3V0ZXM7XHJcblxyXG4gIGlmICghbG9jYXRpb24pIHtcclxuICAgIGxvY2F0aW9uID0gd2luZG93TG9jYXRpb24oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKGxvY2F0aW9uKTtcclxuICBpZiAocm91dGUgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXRpYWwgbG9jYXRpb24gbXVzdCBub3QgYmUgbm90IGZvdW5kJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24gUm91dGVyKCk6IFJlYWN0RWxlbWVudCB7XHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBjb25zdCBbbWF0Y2gsIHNldE1hdGNoXSA9IHVzZVN0YXRlPE1hdGNoPih7XHJcbiAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAuLi5yb3V0ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgbWF0Y2gkID0gbG9jYXRpb24kXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBzd2l0Y2hNYXAoYXN5bmMgZnVuY3Rpb24obCk6IFByb21pc2U8TWF0Y2ggfCBmYWxzZT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICBub3RGb3VuZCgpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBsb2NhdGlvbjogbCxcclxuICAgICAgICAgICAgICAuLi5tYXRjaCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIClcclxuICAgICAgICAucGlwZShmaWx0ZXIodiA9PiBCb29sZWFuKHYpKSk7XHJcblxyXG4gICAgICBjb25zdCBsID0gbG9jYXRpb24kLnN1YnNjcmliZShmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgbSA9IG1hdGNoJC5zdWJzY3JpYmUoZnVuY3Rpb24obWF0Y2gpIHtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRNYXRjaChtYXRjaCBhcyBNYXRjaCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGwudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH07XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xyXG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBsb2NhdGlvbiQubmV4dCh3aW5kb3dMb2NhdGlvbigpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBjb25zdCByb3V0ZUVsZW1lbnQgPSByZWR1Y2VSaWdodChcclxuICAgICAgbWF0Y2gucm91dGUsXHJcbiAgICAgIChjaGlsZDogUmVhY3RFbGVtZW50IHwgbnVsbCwgeyBwYXRoLCBjb21wb25lbnQgfSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICAgICAgY29tcG9uZW50LFxyXG4gICAgICAgICAgeyAuLi5jb21wb25lbnQuX3Byb3BzLCBrZXk6IHBhdGggfSxcclxuICAgICAgICAgIGNoaWxkLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG51bGwsXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxjdHguUHJvdmlkZXJcclxuICAgICAgICB2YWx1ZT17e1xyXG4gICAgICAgICAgcm91dGVzLFxyXG4gICAgICAgICAgbG9hZGluZyxcclxuICAgICAgICAgIC4uLm1hdGNoLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICB7cm91dGVFbGVtZW50fVxyXG4gICAgICA8L2N0eC5Qcm92aWRlcj5cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuY29uc3QgaW1wZXJhY3RpdmUgPSB7XHJcbiAgcHVzaChuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiB2b2lkIHtcclxuICAgIHJvdXRlc1JlcXVpcmVkKCk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcclxuICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xyXG4gICAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcclxuICB9LFxyXG4gIHJlcGxhY2UobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZCB7XHJcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XHJcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgdGFyZ2V0KTtcclxuICAgIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XHJcbiAgfSxcclxuICBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQge1xyXG4gICAgcm91dGVzUmVxdWlyZWQoKTtcclxuXHJcbiAgICBoaXN0b3J5LmdvKGRlbHRhKTtcclxuICB9LFxyXG4gIGJhY2soKTogdm9pZCB7XHJcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xyXG5cclxuICAgIGhpc3RvcnkuYmFjaygpO1xyXG4gIH0sXHJcbiAgZm9yd2FyZCgpOiB2b2lkIHtcclxuICAgIHJvdXRlc1JlcXVpcmVkKCk7XHJcblxyXG4gICAgaGlzdG9yeS5mb3J3YXJkKCk7XHJcbiAgfSxcclxuICBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZyB7XHJcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xyXG5cclxuICAgIHJldHVybiBfcm91dGVzIS5saW5rKG5hbWUsIGFyZ3MpO1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEltcGVyYXRpdmVSb3V0ZXIge1xyXG4gIChyb3V0ZXM6IFJvdXRlcywgbG9jYXRpb246IHN0cmluZywgbm90Rm91bmQ6ICgpID0+IHZvaWQpOiBQcm9taXNlPFxyXG4gICAgUmVhY3QuRkM8dm9pZD5cclxuICA+O1xyXG4gIHB1c2gobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZDtcclxuICByZXBsYWNlKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQ7XHJcbiAgZ28oZGVsdGE/OiBudW1iZXIpOiB2b2lkO1xyXG4gIGJhY2soKTogdm9pZDtcclxuICBmb3J3YXJkKCk6IHZvaWQ7XHJcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IGltcGVyYXRpdmVSb3V0ZXI6IEltcGVyYXRpdmVSb3V0ZXIgPSBPYmplY3QuYXNzaWduKHJvdXRlciwgaW1wZXJhY3RpdmUpO1xyXG5leHBvcnQgZGVmYXVsdCBpbXBlcmF0aXZlUm91dGVyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcclxuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcclxuICBpZiAoIV9yb3V0ZXMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXHJcbiAgICAgICAgYG1ha2Ugc3VyZSB0byByZW5kZXIgPFJvdXRlciAvPiBpbiB5b3VyIGJvb3RzdHJhcGAsXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcclxuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcclxufVxyXG4iXX0=