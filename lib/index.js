"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = app;
Object.defineProperty(exports, "createRouter", {
  enumerable: true,
  get: function get() {
    return _Router.default;
  }
});
Object.defineProperty(exports, "useRouter", {
  enumerable: true,
  get: function get() {
    return _Router.useRouter;
  }
});
Object.defineProperty(exports, "initialProps", {
  enumerable: true,
  get: function get() {
    return _Router.initialProps;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _Link.default;
  }
});
exports.router = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Router = _interopRequireWildcard(require("./Router"));

var _Link = _interopRequireDefault(require("./Link"));

function app(_ref) {
  var routes = _ref.routes,
      render = _ref.render,
      afterSSR = _ref.afterSSR,
      afterHydrate = _ref.afterHydrate,
      notFound = _ref.notFound;

  // wrap render
  function wrapRender(_x) {
    return _wrapRender.apply(this, arguments);
  } // browser bootstap


  function _wrapRender() {
    _wrapRender = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(path) {
      var Router;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _Router.default)(routes, path, notFound);

            case 2:
              Router = _context.sent;
              return _context.abrupt("return", render(Router));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _wrapRender.apply(this, arguments);
  }

  if (typeof document !== 'undefined') {
    wrapRender().then(function (page) {
      // @ts-ignore
      _reactDom.default.hydrate(page, document, afterHydrate);
    });
  } // return for ssr


  return [wrapRender, afterSSR];
}

var router = {
  replace: _Router.replace,
  push: _Router.push,
  go: _Router.go,
  back: _Router.back,
  forward: _Router.forward,
  link: _Router.link
};
exports.router = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJhZnRlclNTUiIsImFmdGVySHlkcmF0ZSIsIm5vdEZvdW5kIiwid3JhcFJlbmRlciIsInBhdGgiLCJSb3V0ZXIiLCJkb2N1bWVudCIsInRoZW4iLCJwYWdlIiwiUmVhY3RET00iLCJoeWRyYXRlIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQVVBOztBQUtlLFNBQVNBLEdBQVQsT0FZWjtBQUFBLE1BWERDLE1BV0MsUUFYREEsTUFXQztBQUFBLE1BVkRDLE1BVUMsUUFWREEsTUFVQztBQUFBLE1BVERDLFFBU0MsUUFUREEsUUFTQztBQUFBLE1BUkRDLFlBUUMsUUFSREEsWUFRQztBQUFBLE1BUERDLFFBT0MsUUFQREEsUUFPQzs7QUFDRDtBQURDLFdBRWNDLFVBRmQ7QUFBQTtBQUFBLElBT0Q7OztBQVBDO0FBQUE7QUFBQTtBQUFBLDhCQUVELGlCQUEwQkMsSUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDdUIscUJBQWFOLE1BQWIsRUFBcUJNLElBQXJCLEVBQTJCRixRQUEzQixDQUR2Qjs7QUFBQTtBQUNRRyxjQUFBQSxNQURSO0FBQUEsK0NBRVNOLE1BQU0sQ0FBQ00sTUFBRCxDQUZmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRkM7QUFBQTtBQUFBOztBQVFELE1BQUksT0FBT0MsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQ0gsSUFBQUEsVUFBVSxHQUFHSSxJQUFiLENBQWtCLFVBQVNDLElBQVQsRUFBZTtBQUMvQjtBQUNBQyx3QkFBU0MsT0FBVCxDQUFpQkYsSUFBakIsRUFBdUJGLFFBQXZCLEVBQWlDTCxZQUFqQztBQUNELEtBSEQ7QUFJRCxHQWJBLENBZUQ7OztBQUNBLFNBQU8sQ0FBQ0UsVUFBRCxFQUFhSCxRQUFiLENBQVA7QUFDRDs7QUFFRCxJQUFNVyxNQUFNLEdBQUc7QUFDYkMsRUFBQUEsT0FBTyxFQUFQQSxlQURhO0FBRWJDLEVBQUFBLElBQUksRUFBSkEsWUFGYTtBQUdiQyxFQUFBQSxFQUFFLEVBQUZBLFVBSGE7QUFJYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUphO0FBS2JDLEVBQUFBLE9BQU8sRUFBUEEsZUFMYTtBQU1iQyxFQUFBQSxJQUFJLEVBQUpBO0FBTmEsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjcmVhdGVSb3V0ZXIsIHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgZ28sXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG4gIHVzZVJvdXRlcixcbiAgaW5pdGlhbFByb3BzLFxufSBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuXG50eXBlIFJlbmRlciA9IChyb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHZvaWQ+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgcmVuZGVyLFxuICBhZnRlclNTUixcbiAgYWZ0ZXJIeWRyYXRlLFxuICBub3RGb3VuZCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIHJlbmRlcjogUmVuZGVyO1xuICBhZnRlclNTUj86IChodG1sOiBzdHJpbmcpID0+IHN0cmluZztcbiAgYWZ0ZXJIeWRyYXRlPzogKCkgPT4gdm9pZDtcbiAgbm90Rm91bmQ6ICgpID0+IHZvaWQ7XG59KSB7XG4gIC8vIHdyYXAgcmVuZGVyXG4gIGFzeW5jIGZ1bmN0aW9uIHdyYXBSZW5kZXIocGF0aD86IHN0cmluZykge1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcihyb3V0ZXMsIHBhdGgsIG5vdEZvdW5kKTtcbiAgICByZXR1cm4gcmVuZGVyKFJvdXRlcik7XG4gIH1cblxuICAvLyBicm93c2VyIGJvb3RzdGFwXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd3JhcFJlbmRlcigpLnRoZW4oZnVuY3Rpb24ocGFnZSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgUmVhY3RET00uaHlkcmF0ZShwYWdlLCBkb2N1bWVudCwgYWZ0ZXJIeWRyYXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJldHVybiBmb3Igc3NyXG4gIHJldHVybiBbd3JhcFJlbmRlciwgYWZ0ZXJTU1JdO1xufVxuXG5jb25zdCByb3V0ZXIgPSB7XG4gIHJlcGxhY2UsXG4gIHB1c2gsXG4gIGdvLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxufTtcblxuZXhwb3J0IHsgY3JlYXRlUm91dGVyLCByb3V0ZXIsIHVzZVJvdXRlciwgaW5pdGlhbFByb3BzLCBMaW5rIH07XG4iXX0=