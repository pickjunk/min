"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = app;
Object.defineProperty(exports, "createRouter", {
  enumerable: true,
  get: function get() {
    return _Router["default"];
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
    return _Link["default"];
  }
});
Object.defineProperty(exports, "routes", {
  enumerable: true,
  get: function get() {
    return _routes.createRoutes;
  }
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function get() {
    return _logger["default"];
  }
});
exports.router = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Router = _interopRequireWildcard(require("./Router"));

var _Link = _interopRequireDefault(require("./Link"));

var _routes = require("./routes");

var _logger = _interopRequireDefault(require("./logger"));

function app(_ref) {
  var routes = _ref.routes,
      render = _ref.render,
      notFound = _ref.notFound;

  // wrap render
  function wrapRender(_x) {
    return _wrapRender.apply(this, arguments);
  } // browser bootstap


  function _wrapRender() {
    _wrapRender = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
      var Router;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _Router["default"])(routes, path, notFound);

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
    wrapRender().then(function (_ref2) {
      var jsx = _ref2.jsx,
          afterHydrate = _ref2.afterHydrate;

      // @ts-ignore
      _reactDom["default"].hydrate(jsx, document, afterHydrate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJub3RGb3VuZCIsIndyYXBSZW5kZXIiLCJwYXRoIiwiUm91dGVyIiwiZG9jdW1lbnQiLCJ0aGVuIiwianN4IiwiYWZ0ZXJIeWRyYXRlIiwiUmVhY3RET00iLCJoeWRyYXRlIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQVVBOztBQUNBOztBQUNBOztBQVVlLFNBQVNBLEdBQVQsT0FRWjtBQUFBLE1BUERDLE1BT0MsUUFQREEsTUFPQztBQUFBLE1BTkRDLE1BTUMsUUFOREEsTUFNQztBQUFBLE1BTERDLFFBS0MsUUFMREEsUUFLQzs7QUFDRDtBQURDLFdBRWNDLFVBRmQ7QUFBQTtBQUFBLElBT0Q7OztBQVBDO0FBQUEsZ0dBRUQsaUJBQTBCQyxJQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUN1Qix3QkFBYUosTUFBYixFQUFxQkksSUFBckIsRUFBMkJGLFFBQTNCLENBRHZCOztBQUFBO0FBQ1FHLGNBQUFBLE1BRFI7QUFBQSwrQ0FFU0osTUFBTSxDQUFDSSxNQUFELENBRmY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQztBQUFBO0FBQUE7O0FBUUQsTUFBSSxPQUFPQyxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ25DSCxJQUFBQSxVQUFVLEdBQUdJLElBQWIsQ0FBa0IsaUJBQWlDO0FBQUEsVUFBckJDLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLFVBQWhCQyxZQUFnQixTQUFoQkEsWUFBZ0I7O0FBQ2pEO0FBQ0FDLDJCQUFTQyxPQUFULENBQWlCSCxHQUFqQixFQUFzQkYsUUFBdEIsRUFBZ0NHLFlBQWhDO0FBQ0QsS0FIRDtBQUlELEdBYkEsQ0FlRDs7O0FBQ0EsU0FBT04sVUFBUDtBQUNEOztBQUVELElBQU1TLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgdXNlUm91dGVyLFxuICBpbml0aWFsUHJvcHMsXG59IGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluayc7XG5pbXBvcnQgeyBSb3V0ZXMsIGNyZWF0ZVJvdXRlcyBhcyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcblxudHlwZSBSZW5kZXIgPSAoXG4gIHJvdXRlcjogRnVuY3Rpb25Db21wb25lbnQ8e30+LFxuKSA9PiB7XG4gIGpzeDogUmVhY3RFbGVtZW50O1xuICBhZnRlclNTUj86IChodG1sOiBzdHJpbmcpID0+IHN0cmluZztcbiAgYWZ0ZXJIeWRyYXRlPzogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgcmVuZGVyLFxuICBub3RGb3VuZCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIHJlbmRlcjogUmVuZGVyO1xuICBub3RGb3VuZDogKCkgPT4gdm9pZDtcbn0pIHtcbiAgLy8gd3JhcCByZW5kZXJcbiAgYXN5bmMgZnVuY3Rpb24gd3JhcFJlbmRlcihwYXRoPzogc3RyaW5nKSB7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHJvdXRlcywgcGF0aCwgbm90Rm91bmQpO1xuICAgIHJldHVybiByZW5kZXIoUm91dGVyKTtcbiAgfVxuXG4gIC8vIGJyb3dzZXIgYm9vdHN0YXBcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3cmFwUmVuZGVyKCkudGhlbihmdW5jdGlvbiAoeyBqc3gsIGFmdGVySHlkcmF0ZSB9KSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBSZWFjdERPTS5oeWRyYXRlKGpzeCwgZG9jdW1lbnQsIGFmdGVySHlkcmF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gd3JhcFJlbmRlcjtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVJvdXRlciwgcm91dGVyLCB1c2VSb3V0ZXIsIHJvdXRlcywgaW5pdGlhbFByb3BzLCBMaW5rLCBsb2cgfTtcbiJdfQ==