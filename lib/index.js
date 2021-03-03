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
Object.defineProperty(exports, "routing", {
  enumerable: true,
  get: function get() {
    return _Router.routing;
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
Object.defineProperty(exports, "RouteLocation", {
  enumerable: true,
  get: function get() {
    return _routes.Location;
  }
});
Object.defineProperty(exports, "RouteParams", {
  enumerable: true,
  get: function get() {
    return _routes.Params;
  }
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function get() {
    return _logger["default"];
  }
});
Object.defineProperty(exports, "NoSSR", {
  enumerable: true,
  get: function get() {
    return _NoSSR["default"];
  }
});
exports.stop = exports.router = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _promise = _interopRequireDefault(require("./promise"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Router = _interopRequireWildcard(require("./Router"));

var _Link = _interopRequireDefault(require("./Link"));

var _routes = require("./routes");

var _logger = _interopRequireDefault(require("./logger"));

var _utils = require("./utils");

var _NoSSR = _interopRequireDefault(require("./NoSSR"));

function app(_ref) {
  var routes = _ref.routes,
      ssr = _ref.ssr,
      hydrate = _ref.hydrate,
      notFound = _ref.notFound;

  // hydrate for browser
  if ((0, _utils.isBrowser)()) {
    (0, _Router["default"])({
      routes: routes,
      notFound: notFound
    }).then(function (Router) {
      return hydrate(Router);
    }).then(function (_ref2) {
      var jsx = _ref2.jsx,
          id = _ref2.id,
          callback = _ref2.callback;

      _reactDom["default"].hydrate(jsx, document.getElementById(id), callback);
    });
  } // return for ssr


  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(location) {
      var Router;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _Router["default"])({
                routes: routes,
                location: location
              });

            case 2:
              Router = _context.sent;
              return _context.abrupt("return", ssr(Router));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }();
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

var stop = _promise["default"].stop();

exports.stop = stop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibm90Rm91bmQiLCJ0aGVuIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayIsInN0b3AiLCJwcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBRWUsU0FBU0EsR0FBVCxPQXFCWjtBQUFBLE1BcEJEQyxNQW9CQyxRQXBCREEsTUFvQkM7QUFBQSxNQW5CREMsR0FtQkMsUUFuQkRBLEdBbUJDO0FBQUEsTUFsQkRDLE9Ba0JDLFFBbEJEQSxPQWtCQztBQUFBLE1BakJEQyxRQWlCQyxRQWpCREEsUUFpQkM7O0FBQ0Q7QUFDQSxNQUFJLHVCQUFKLEVBQWlCO0FBQ2YsNEJBQWE7QUFBRUgsTUFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVHLE1BQUFBLFFBQVEsRUFBUkE7QUFBVixLQUFiLEVBQ0dDLElBREgsQ0FDUSxVQUFVQyxNQUFWLEVBQWtCO0FBQ3RCLGFBQU9ILE9BQU8sQ0FBQ0csTUFBRCxDQUFkO0FBQ0QsS0FISCxFQUlHRCxJQUpILENBSVEsaUJBQWlDO0FBQUEsVUFBckJFLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLFVBQWhCQyxFQUFnQixTQUFoQkEsRUFBZ0I7QUFBQSxVQUFaQyxRQUFZLFNBQVpBLFFBQVk7O0FBQ3JDQywyQkFBU1AsT0FBVCxDQUFpQkksR0FBakIsRUFBc0JJLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkosRUFBeEIsQ0FBdEIsRUFBbURDLFFBQW5EO0FBQ0QsS0FOSDtBQU9ELEdBVkEsQ0FZRDs7O0FBQ0E7QUFBQSw4RkFBTyxpQkFBZ0JJLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2dCLHdCQUFhO0FBQUVaLGdCQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVVksZ0JBQUFBLFFBQVEsRUFBUkE7QUFBVixlQUFiLENBRGhCOztBQUFBO0FBQ0NQLGNBQUFBLE1BREQ7QUFBQSwrQ0FFRUosR0FBRyxDQUFDSSxNQUFELENBRkw7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlEOztBQUVELElBQU1RLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmOzs7QUFTQSxJQUFNQyxJQUFJLEdBQUdDLG9CQUFRRCxJQUFSLEVBQWIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvbWlzZSBmcm9tICcuL3Byb21pc2UnO1xuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgdXNlUm91dGVyLFxuICByb3V0aW5nLFxufSBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnO1xuaW1wb3J0IHtcbiAgUm91dGVzLFxuICBjcmVhdGVSb3V0ZXMgYXMgcm91dGVzLFxuICBMb2NhdGlvbiBhcyBSb3V0ZUxvY2F0aW9uLFxuICBQYXJhbXMgYXMgUm91dGVQYXJhbXMsXG59IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTm9TU1IgZnJvbSAnLi9Ob1NTUic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgc3NyLFxuICBoeWRyYXRlLFxuICBub3RGb3VuZCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIHNzcjogKFxuICAgIHJvdXRlcjogRnVuY3Rpb25Db21wb25lbnQ8e30+LFxuICApID0+IHtcbiAgICBqc3g6IFJlYWN0RWxlbWVudDtcbiAgICBjYWxsYmFjaz86IChodG1sOiBzdHJpbmcpID0+IHN0cmluZztcbiAgfTtcbiAgaHlkcmF0ZTogKFxuICAgIHJvdXRlcjogRnVuY3Rpb25Db21wb25lbnQ8e30+LFxuICApID0+IHtcbiAgICBqc3g6IFJlYWN0RWxlbWVudDtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhbGxiYWNrPzogKCkgPT4gdm9pZDtcbiAgfTtcbiAgbm90Rm91bmQ6ICgpID0+IHZvaWQ7XG59KSB7XG4gIC8vIGh5ZHJhdGUgZm9yIGJyb3dzZXJcbiAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgY3JlYXRlUm91dGVyKHsgcm91dGVzLCBub3RGb3VuZCB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKFJvdXRlcikge1xuICAgICAgICByZXR1cm4gaHlkcmF0ZShSb3V0ZXIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh7IGpzeCwgaWQsIGNhbGxiYWNrIH0pIHtcbiAgICAgICAgUmVhY3RET00uaHlkcmF0ZShqc3gsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uOiBzdHJpbmcpIHtcbiAgICBjb25zdCBSb3V0ZXIgPSBhd2FpdCBjcmVhdGVSb3V0ZXIoeyByb3V0ZXMsIGxvY2F0aW9uIH0pO1xuICAgIHJldHVybiBzc3IoUm91dGVyKTtcbiAgfTtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmNvbnN0IHN0b3AgPSBwcm9taXNlLnN0b3AoKTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlUm91dGVyLFxuICByb3V0ZXIsXG4gIHVzZVJvdXRlcixcbiAgcm91dGVzLFxuICByb3V0aW5nLFxuICBMaW5rLFxuICBOb1NTUixcbiAgbG9nLFxuICBSb3V0ZUxvY2F0aW9uLFxuICBSb3V0ZVBhcmFtcyxcbiAgc3RvcCxcbn07XG4iXX0=