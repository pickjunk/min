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

var _utils = require("./utils");

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

  if ((0, _utils.isBrowser)()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJub3RGb3VuZCIsIndyYXBSZW5kZXIiLCJwYXRoIiwiUm91dGVyIiwidGhlbiIsImpzeCIsImFmdGVySHlkcmF0ZSIsIlJlYWN0RE9NIiwiaHlkcmF0ZSIsImRvY3VtZW50Iiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNBOztBQVVBOztBQUNBOztBQUNBOztBQUNBOztBQVVlLFNBQVNBLEdBQVQsT0FRWjtBQUFBLE1BUERDLE1BT0MsUUFQREEsTUFPQztBQUFBLE1BTkRDLE1BTUMsUUFOREEsTUFNQztBQUFBLE1BTERDLFFBS0MsUUFMREEsUUFLQzs7QUFDRDtBQURDLFdBRWNDLFVBRmQ7QUFBQTtBQUFBLElBT0Q7OztBQVBDO0FBQUEsZ0dBRUQsaUJBQTBCQyxJQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUN1Qix3QkFBYUosTUFBYixFQUFxQkksSUFBckIsRUFBMkJGLFFBQTNCLENBRHZCOztBQUFBO0FBQ1FHLGNBQUFBLE1BRFI7QUFBQSwrQ0FFU0osTUFBTSxDQUFDSSxNQUFELENBRmY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGQztBQUFBO0FBQUE7O0FBUUQsTUFBSSx1QkFBSixFQUFpQjtBQUNmRixJQUFBQSxVQUFVLEdBQUdHLElBQWIsQ0FBa0IsaUJBQWlDO0FBQUEsVUFBckJDLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLFVBQWhCQyxZQUFnQixTQUFoQkEsWUFBZ0I7O0FBQ2pEO0FBQ0FDLDJCQUFTQyxPQUFULENBQWlCSCxHQUFqQixFQUFzQkksUUFBdEIsRUFBZ0NILFlBQWhDO0FBQ0QsS0FIRDtBQUlELEdBYkEsQ0FlRDs7O0FBQ0EsU0FBT0wsVUFBUDtBQUNEOztBQUVELElBQU1TLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgdXNlUm91dGVyLFxuICBpbml0aWFsUHJvcHMsXG59IGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluayc7XG5pbXBvcnQgeyBSb3V0ZXMsIGNyZWF0ZVJvdXRlcyBhcyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuXG50eXBlIFJlbmRlciA9IChcbiAgcm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4sXG4pID0+IHtcbiAganN4OiBSZWFjdEVsZW1lbnQ7XG4gIGFmdGVyU1NSPzogKGh0bWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICBhZnRlckh5ZHJhdGU/OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKHtcbiAgcm91dGVzLFxuICByZW5kZXIsXG4gIG5vdEZvdW5kLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgcmVuZGVyOiBSZW5kZXI7XG4gIG5vdEZvdW5kOiAoKSA9PiB2b2lkO1xufSkge1xuICAvLyB3cmFwIHJlbmRlclxuICBhc3luYyBmdW5jdGlvbiB3cmFwUmVuZGVyKHBhdGg/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBSb3V0ZXIgPSBhd2FpdCBjcmVhdGVSb3V0ZXIocm91dGVzLCBwYXRoLCBub3RGb3VuZCk7XG4gICAgcmV0dXJuIHJlbmRlcihSb3V0ZXIpO1xuICB9XG5cbiAgLy8gYnJvd3NlciBib290c3RhcFxuICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICB3cmFwUmVuZGVyKCkudGhlbihmdW5jdGlvbiAoeyBqc3gsIGFmdGVySHlkcmF0ZSB9KSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBSZWFjdERPTS5oeWRyYXRlKGpzeCwgZG9jdW1lbnQsIGFmdGVySHlkcmF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gd3JhcFJlbmRlcjtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVJvdXRlciwgcm91dGVyLCB1c2VSb3V0ZXIsIHJvdXRlcywgaW5pdGlhbFByb3BzLCBMaW5rLCBsb2cgfTtcbiJdfQ==