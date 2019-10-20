"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function initialProps(init) {
  return function (component) {
    component.initialProps = init;
    return component;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb3V0ZXIudHN4Il0sIm5hbWVzIjpbIl9yb3V0ZXMiLCJjdHgiLCJsb2NhdGlvbiQiLCJTdWJqZWN0Iiwicm91dGVyIiwicm91dGVzIiwibG9jYXRpb24iLCJub3RGb3VuZCIsIndpbmRvd0xvY2F0aW9uIiwibWF0Y2giLCJyb3V0ZSIsIkVycm9yIiwiUm91dGVyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJzZXRNYXRjaCIsIm1hdGNoJCIsInBpcGUiLCJsIiwidiIsIkJvb2xlYW4iLCJzdWJzY3JpYmUiLCJtIiwidW5zdWJzY3JpYmUiLCJ3aW5kb3ciLCJvcmlnaW5Qb3BTdGF0ZSIsIm9ucG9wc3RhdGUiLCJuZXh0Iiwicm91dGVFbGVtZW50IiwiY2hpbGQiLCJwYXRoIiwiY29tcG9uZW50IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiX3Byb3BzIiwia2V5IiwiaW1wZXJhY3RpdmUiLCJwdXNoIiwibmFtZSIsImFyZ3MiLCJyb3V0ZXNSZXF1aXJlZCIsInRhcmdldCIsImxpbmsiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicmVwbGFjZSIsInJlcGxhY2VTdGF0ZSIsImdvIiwiZGVsdGEiLCJiYWNrIiwiZm9yd2FyZCIsImltcGVyYXRpdmVSb3V0ZXIiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VSb3V0ZXIiLCJwYXRobmFtZSIsInNlYXJjaCIsImluaXRpYWxQcm9wcyIsImluaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BOztBQUNBOztBQUNBOztBQVlBLElBQUlBLE9BQXNCLEdBQUcsSUFBN0I7QUFDQSxJQUFNQyxHQUFHLEdBQUcsMEJBQW9DLElBQXBDLENBQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsSUFBSUMsYUFBSixFQUFsQjs7U0FFZUMsTTs7Ozs7Ozs0QkFBZixrQkFDRUMsTUFERixFQUVFQyxRQUZGLEVBR0VDLFFBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0VQLFlBQUFBLE9B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bEJDLEVBQUFBLElBcEJrQixrQkFvQkw7QUFDWFQsSUFBQUEsY0FBYztBQUVkRyxJQUFBQSxPQUFPLENBQUNNLElBQVI7QUFDRCxHQXhCaUI7QUF5QmxCQyxFQUFBQSxPQXpCa0IscUJBeUJGO0FBQ2RWLElBQUFBLGNBQWM7QUFFZEcsSUFBQUEsT0FBTyxDQUFDTyxPQUFSO0FBQ0QsR0E3QmlCO0FBOEJsQlIsRUFBQUEsSUE5QmtCLGdCQThCYkosSUE5QmEsRUE4QkNDLElBOUJELEVBOEJ3QjtBQUN4Q0MsSUFBQUEsY0FBYztBQUVkLFdBQU94QyxPQUFPLENBQUUwQyxJQUFULENBQWNKLElBQWQsRUFBb0JDLElBQXBCLENBQVA7QUFDRDtBQWxDaUIsQ0FBcEI7QUFpREEsSUFBTVksZ0JBQWtDLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjakQsTUFBZCxFQUFzQmdDLFdBQXRCLENBQTNDO2VBQ2VlLGdCOzs7QUFFUixTQUFTRyxTQUFULEdBQXFCO0FBQzFCLFNBQU8sdUJBQVdyRCxHQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFTdUMsY0FBVCxHQUEwQjtBQUN4QixNQUFJLENBQUN4QyxPQUFMLEVBQWM7QUFDWixVQUFNLElBQUlXLEtBQUosQ0FDSiw4RUFESSxDQUFOO0FBSUQ7QUFDRjs7QUFFRCxTQUFTSCxjQUFULEdBQWtDO0FBQ2hDLFNBQU9nQixNQUFNLENBQUNsQixRQUFQLENBQWdCaUQsUUFBaEIsR0FBMkIvQixNQUFNLENBQUNsQixRQUFQLENBQWdCa0QsTUFBbEQ7QUFDRDs7QUFFTSxTQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUEwQztBQUMvQyxTQUFPLFVBQVUzQixTQUFWLEVBQXFDO0FBQzFDQSxJQUFBQSxTQUFTLENBQUMwQixZQUFWLEdBQXlCQyxJQUF6QjtBQUNBLFdBQU8zQixTQUFQO0FBQ0QsR0FIRDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XG4gIHVzZVN0YXRlLFxuICB1c2VFZmZlY3QsXG4gIFJlYWN0RWxlbWVudCxcbiAgY3JlYXRlQ29udGV4dCxcbiAgdXNlQ29udGV4dCxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgcmVkdWNlUmlnaHQgZnJvbSAnbG9kYXNoL3JlZHVjZVJpZ2h0JztcbmltcG9ydCB7IFJvdXRlcywgTG9hZGVkUm91dGUsIFBhcmFtcywgSW5pdGlhbFByb3BzLCBDb21wb25lbnQgfSBmcm9tICcuL3JvdXRlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2ggZXh0ZW5kcyBMb2FkZWRSb3V0ZSB7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29udGV4dCBleHRlbmRzIE1hdGNoIHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmxldCBfcm91dGVzOiBSb3V0ZXMgfCBudWxsID0gbnVsbDtcbmNvbnN0IGN0eCA9IGNyZWF0ZUNvbnRleHQ8Um91dGVyQ29udGV4dCB8IG51bGw+KG51bGwpO1xuY29uc3QgbG9jYXRpb24kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5hc3luYyBmdW5jdGlvbiByb3V0ZXIoXG4gIHJvdXRlczogUm91dGVzLFxuICBsb2NhdGlvbjogc3RyaW5nLFxuICBub3RGb3VuZDogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVhY3QuRkM8dm9pZD4+IHtcbiAgX3JvdXRlcyA9IHJvdXRlcztcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgbG9jYXRpb24gPSB3aW5kb3dMb2NhdGlvbigpO1xuICB9XG5cbiAgY29uc3Qgcm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuICBpZiAocm91dGUgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0aWFsIGxvY2F0aW9uIG11c3Qgbm90IGJlIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIFJvdXRlcigpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbbWF0Y2gsIHNldE1hdGNoXSA9IHVzZVN0YXRlPE1hdGNoPih7XG4gICAgICBsb2NhdGlvbixcbiAgICAgIC4uLnJvdXRlLFxuICAgIH0pO1xuXG4gICAgdXNlRWZmZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbWF0Y2gkID0gbG9jYXRpb24kXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChhc3luYyBmdW5jdGlvbihsKTogUHJvbWlzZTxNYXRjaCB8IGZhbHNlPiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBhd2FpdCByb3V0ZXMubWF0Y2gobCk7XG4gICAgICAgICAgICBpZiAobWF0Y2ggPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIG5vdEZvdW5kKCk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGwsXG4gICAgICAgICAgICAgIC4uLm1hdGNoLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgICAucGlwZShmaWx0ZXIodiA9PiBCb29sZWFuKHYpKSk7XG5cbiAgICAgIGNvbnN0IGwgPSBsb2NhdGlvbiQuc3Vic2NyaWJlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBtID0gbWF0Y2gkLnN1YnNjcmliZShmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0TWF0Y2gobWF0Y2ggYXMgTWF0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBtLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHVzZUVmZmVjdChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBvcmlnaW5Qb3BTdGF0ZSA9IHdpbmRvdy5vbnBvcHN0YXRlO1xuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvY2F0aW9uJC5uZXh0KHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IG9yaWdpblBvcFN0YXRlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHJvdXRlRWxlbWVudCA9IHJlZHVjZVJpZ2h0KFxuICAgICAgbWF0Y2gucm91dGUsXG4gICAgICAoY2hpbGQ6IFJlYWN0RWxlbWVudCB8IG51bGwsIHsgcGF0aCwgY29tcG9uZW50IH0pID0+IHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgIHsgLi4uY29tcG9uZW50Ll9wcm9wcywga2V5OiBwYXRoIH0sXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgbnVsbCxcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxjdHguUHJvdmlkZXJcbiAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICByb3V0ZXMsXG4gICAgICAgICAgbG9hZGluZyxcbiAgICAgICAgICAuLi5tYXRjaCxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3JvdXRlRWxlbWVudH1cbiAgICAgIDwvY3R4LlByb3ZpZGVyPlxuICAgICk7XG4gIH07XG59XG5cbmNvbnN0IGltcGVyYWN0aXZlID0ge1xuICBwdXNoKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHZvaWQge1xuICAgIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgICBjb25zdCB0YXJnZXQgPSBfcm91dGVzIS5saW5rKG5hbWUsIGFyZ3MpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCB0YXJnZXQpO1xuICAgIGxvY2F0aW9uJC5uZXh0KHRhcmdldCk7XG4gIH0sXG4gIHJlcGxhY2UobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZCB7XG4gICAgcm91dGVzUmVxdWlyZWQoKTtcblxuICAgIGNvbnN0IHRhcmdldCA9IF9yb3V0ZXMhLmxpbmsobmFtZSwgYXJncyk7XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHRhcmdldCk7XG4gICAgbG9jYXRpb24kLm5leHQodGFyZ2V0KTtcbiAgfSxcbiAgZ28oZGVsdGE/OiBudW1iZXIpOiB2b2lkIHtcbiAgICByb3V0ZXNSZXF1aXJlZCgpO1xuXG4gICAgaGlzdG9yeS5nbyhkZWx0YSk7XG4gIH0sXG4gIGJhY2soKTogdm9pZCB7XG4gICAgcm91dGVzUmVxdWlyZWQoKTtcblxuICAgIGhpc3RvcnkuYmFjaygpO1xuICB9LFxuICBmb3J3YXJkKCk6IHZvaWQge1xuICAgIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgICBoaXN0b3J5LmZvcndhcmQoKTtcbiAgfSxcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmcge1xuICAgIHJvdXRlc1JlcXVpcmVkKCk7XG5cbiAgICByZXR1cm4gX3JvdXRlcyEubGluayhuYW1lLCBhcmdzKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1wZXJhdGl2ZVJvdXRlciB7XG4gIChyb3V0ZXM6IFJvdXRlcywgbG9jYXRpb246IHN0cmluZywgbm90Rm91bmQ6ICgpID0+IHZvaWQpOiBQcm9taXNlPFxuICAgIFJlYWN0LkZDPHZvaWQ+XG4gID47XG4gIHB1c2gobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogdm9pZDtcbiAgcmVwbGFjZShuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiB2b2lkO1xuICBnbyhkZWx0YT86IG51bWJlcik6IHZvaWQ7XG4gIGJhY2soKTogdm9pZDtcbiAgZm9yd2FyZCgpOiB2b2lkO1xuICBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZztcbn1cblxuY29uc3QgaW1wZXJhdGl2ZVJvdXRlcjogSW1wZXJhdGl2ZVJvdXRlciA9IE9iamVjdC5hc3NpZ24ocm91dGVyLCBpbXBlcmFjdGl2ZSk7XG5leHBvcnQgZGVmYXVsdCBpbXBlcmF0aXZlUm91dGVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICByZXR1cm4gdXNlQ29udGV4dChjdHgpO1xufVxuXG5mdW5jdGlvbiByb3V0ZXNSZXF1aXJlZCgpIHtcbiAgaWYgKCFfcm91dGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFJvdXRlciBpcyBub3QgY3JlYXRlZCwgYCArXG4gICAgICAgIGBtYWtlIHN1cmUgdG8gcmVuZGVyIDxSb3V0ZXIgLz4gaW4geW91ciBib290c3RyYXBgLFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2luZG93TG9jYXRpb24oKTogc3RyaW5nIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsUHJvcHMoaW5pdDogSW5pdGlhbFByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50OiBDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbXBvbmVudC5pbml0aWFsUHJvcHMgPSBpbml0O1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cbn0iXX0=