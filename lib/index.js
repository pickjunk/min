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
      afterRender = _ref.afterRender,
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
      _reactDom.default.hydrate(page, document, afterRender);
    });
  } // return for ssr


  return wrapRender;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJhZnRlclJlbmRlciIsIm5vdEZvdW5kIiwid3JhcFJlbmRlciIsInBhdGgiLCJSb3V0ZXIiLCJkb2N1bWVudCIsInRoZW4iLCJwYWdlIiwiUmVhY3RET00iLCJoeWRyYXRlIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQVVBOztBQUtlLFNBQVNBLEdBQVQsT0FVWjtBQUFBLE1BVERDLE1BU0MsUUFUREEsTUFTQztBQUFBLE1BUkRDLE1BUUMsUUFSREEsTUFRQztBQUFBLE1BUERDLFdBT0MsUUFQREEsV0FPQztBQUFBLE1BTkRDLFFBTUMsUUFOREEsUUFNQzs7QUFDRDtBQURDLFdBRWNDLFVBRmQ7QUFBQTtBQUFBLElBT0Q7OztBQVBDO0FBQUE7QUFBQTtBQUFBLDhCQUVELGlCQUEwQkMsSUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFDdUIscUJBQWFMLE1BQWIsRUFBcUJLLElBQXJCLEVBQTJCRixRQUEzQixDQUR2Qjs7QUFBQTtBQUNRRyxjQUFBQSxNQURSO0FBQUEsK0NBRVNMLE1BQU0sQ0FBQ0ssTUFBRCxDQUZmOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRkM7QUFBQTtBQUFBOztBQVFELE1BQUksT0FBT0MsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQ0gsSUFBQUEsVUFBVSxHQUFHSSxJQUFiLENBQWtCLFVBQVNDLElBQVQsRUFBZTtBQUMvQjtBQUNBQyx3QkFBU0MsT0FBVCxDQUFpQkYsSUFBakIsRUFBdUJGLFFBQXZCLEVBQWlDTCxXQUFqQztBQUNELEtBSEQ7QUFJRCxHQWJBLENBZUQ7OztBQUNBLFNBQU9FLFVBQVA7QUFDRDs7QUFFRCxJQUFNUSxNQUFNLEdBQUc7QUFDYkMsRUFBQUEsT0FBTyxFQUFQQSxlQURhO0FBRWJDLEVBQUFBLElBQUksRUFBSkEsWUFGYTtBQUdiQyxFQUFBQSxFQUFFLEVBQUZBLFVBSGE7QUFJYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUphO0FBS2JDLEVBQUFBLE9BQU8sRUFBUEEsZUFMYTtBQU1iQyxFQUFBQSxJQUFJLEVBQUpBO0FBTmEsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjcmVhdGVSb3V0ZXIsIHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgZ28sXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG4gIHVzZVJvdXRlcixcbiAgaW5pdGlhbFByb3BzLFxufSBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuXG50eXBlIFJlbmRlciA9IChyb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHZvaWQ+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgcmVuZGVyLFxuICBhZnRlclJlbmRlcixcbiAgbm90Rm91bmQsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICByZW5kZXI6IFJlbmRlcjtcbiAgYWZ0ZXJSZW5kZXI/OiAoKSA9PiB2b2lkO1xuICBub3RGb3VuZDogKCkgPT4gdm9pZDtcbn0pIHtcbiAgLy8gd3JhcCByZW5kZXJcbiAgYXN5bmMgZnVuY3Rpb24gd3JhcFJlbmRlcihwYXRoPzogc3RyaW5nKSB7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHJvdXRlcywgcGF0aCwgbm90Rm91bmQpO1xuICAgIHJldHVybiByZW5kZXIoUm91dGVyKTtcbiAgfVxuXG4gIC8vIGJyb3dzZXIgYm9vdHN0YXBcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3cmFwUmVuZGVyKCkudGhlbihmdW5jdGlvbihwYWdlKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBSZWFjdERPTS5oeWRyYXRlKHBhZ2UsIGRvY3VtZW50LCBhZnRlclJlbmRlcik7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gd3JhcFJlbmRlcjtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVJvdXRlciwgcm91dGVyLCB1c2VSb3V0ZXIsIGluaXRpYWxQcm9wcywgTGluayB9O1xuIl19