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
var stop = _promise["default"].stop;
exports.stop = stop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibm90Rm91bmQiLCJ0aGVuIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayIsInN0b3AiLCJwcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBRWUsU0FBU0EsR0FBVCxPQXFCWjtBQUFBLE1BcEJEQyxNQW9CQyxRQXBCREEsTUFvQkM7QUFBQSxNQW5CREMsR0FtQkMsUUFuQkRBLEdBbUJDO0FBQUEsTUFsQkRDLE9Ba0JDLFFBbEJEQSxPQWtCQztBQUFBLE1BakJEQyxRQWlCQyxRQWpCREEsUUFpQkM7O0FBQ0Q7QUFDQSxNQUFJLHVCQUFKLEVBQWlCO0FBQ2YsNEJBQWE7QUFBRUgsTUFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVHLE1BQUFBLFFBQVEsRUFBUkE7QUFBVixLQUFiLEVBQ0dDLElBREgsQ0FDUSxVQUFVQyxNQUFWLEVBQWtCO0FBQ3RCLGFBQU9ILE9BQU8sQ0FBQ0csTUFBRCxDQUFkO0FBQ0QsS0FISCxFQUlHRCxJQUpILENBSVEsaUJBQWlDO0FBQUEsVUFBckJFLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLFVBQWhCQyxFQUFnQixTQUFoQkEsRUFBZ0I7QUFBQSxVQUFaQyxRQUFZLFNBQVpBLFFBQVk7O0FBQ3JDQywyQkFBU1AsT0FBVCxDQUFpQkksR0FBakIsRUFBc0JJLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkosRUFBeEIsQ0FBdEIsRUFBbURDLFFBQW5EO0FBQ0QsS0FOSDtBQU9ELEdBVkEsQ0FZRDs7O0FBQ0E7QUFBQSw4RkFBTyxpQkFBZ0JJLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2dCLHdCQUFhO0FBQUVaLGdCQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVVksZ0JBQUFBLFFBQVEsRUFBUkE7QUFBVixlQUFiLENBRGhCOztBQUFBO0FBQ0NQLGNBQUFBLE1BREQ7QUFBQSwrQ0FFRUosR0FBRyxDQUFDSSxNQUFELENBRkw7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlEOztBQUVELElBQU1RLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmOztBQVNBLElBQU1DLElBQUksR0FBR0Msb0JBQVFELElBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb21pc2UgZnJvbSAnLi9wcm9taXNlJztcbmltcG9ydCB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjcmVhdGVSb3V0ZXIsIHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgZ28sXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG4gIHVzZVJvdXRlcixcbiAgcm91dGluZyxcbn0gZnJvbSAnLi9Sb3V0ZXInO1xuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rJztcbmltcG9ydCB7XG4gIFJvdXRlcyxcbiAgY3JlYXRlUm91dGVzIGFzIHJvdXRlcyxcbiAgTG9jYXRpb24gYXMgUm91dGVMb2NhdGlvbixcbiAgUGFyYW1zIGFzIFJvdXRlUGFyYW1zLFxufSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IE5vU1NSIGZyb20gJy4vTm9TU1InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHAoe1xuICByb3V0ZXMsXG4gIHNzcixcbiAgaHlkcmF0ZSxcbiAgbm90Rm91bmQsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBzc3I6IChcbiAgICByb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PixcbiAgKSA9PiB7XG4gICAganN4OiBSZWFjdEVsZW1lbnQ7XG4gICAgY2FsbGJhY2s/OiAoaHRtbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIH07XG4gIGh5ZHJhdGU6IChcbiAgICByb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PixcbiAgKSA9PiB7XG4gICAganN4OiBSZWFjdEVsZW1lbnQ7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjYWxsYmFjaz86ICgpID0+IHZvaWQ7XG4gIH07XG4gIG5vdEZvdW5kOiAoKSA9PiB2b2lkO1xufSkge1xuICAvLyBoeWRyYXRlIGZvciBicm93c2VyXG4gIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgIGNyZWF0ZVJvdXRlcih7IHJvdXRlcywgbm90Rm91bmQgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChSb3V0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGUoUm91dGVyKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAoeyBqc3gsIGlkLCBjYWxsYmFjayB9KSB7XG4gICAgICAgIFJlYWN0RE9NLmh5ZHJhdGUoanN4LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gcmV0dXJuIGZvciBzc3JcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbjogc3RyaW5nKSB7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHsgcm91dGVzLCBsb2NhdGlvbiB9KTtcbiAgICByZXR1cm4gc3NyKFJvdXRlcik7XG4gIH07XG59XG5cbmNvbnN0IHJvdXRlciA9IHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgZ28sXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG59O1xuXG5jb25zdCBzdG9wID0gcHJvbWlzZS5zdG9wO1xuXG5leHBvcnQge1xuICBjcmVhdGVSb3V0ZXIsXG4gIHJvdXRlcixcbiAgdXNlUm91dGVyLFxuICByb3V0ZXMsXG4gIHJvdXRpbmcsXG4gIExpbmssXG4gIE5vU1NSLFxuICBsb2csXG4gIFJvdXRlTG9jYXRpb24sXG4gIFJvdXRlUGFyYW1zLFxuICBzdG9wLFxufTtcbiJdfQ==