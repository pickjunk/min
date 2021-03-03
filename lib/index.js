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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibm90Rm91bmQiLCJ0aGVuIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwicm91dGVyIiwicmVwbGFjZSIsInB1c2giLCJnbyIsImJhY2siLCJmb3J3YXJkIiwibGluayIsInN0b3AiLCJwcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBRWUsU0FBU0EsR0FBVCxPQXFCWjtBQUFBLE1BcEJEQyxNQW9CQyxRQXBCREEsTUFvQkM7QUFBQSxNQW5CREMsR0FtQkMsUUFuQkRBLEdBbUJDO0FBQUEsTUFsQkRDLE9Ba0JDLFFBbEJEQSxPQWtCQztBQUFBLE1BakJEQyxRQWlCQyxRQWpCREEsUUFpQkM7O0FBQ0Q7QUFDQSxNQUFJLHVCQUFKLEVBQWlCO0FBQ2YsNEJBQWE7QUFBRUgsTUFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVHLE1BQUFBLFFBQVEsRUFBUkE7QUFBVixLQUFiLEVBQ0dDLElBREgsQ0FDUSxVQUFVQyxNQUFWLEVBQWtCO0FBQ3RCLGFBQU9ILE9BQU8sQ0FBQ0csTUFBRCxDQUFkO0FBQ0QsS0FISCxFQUlHRCxJQUpILENBSVEsaUJBQWlDO0FBQUEsVUFBckJFLEdBQXFCLFNBQXJCQSxHQUFxQjtBQUFBLFVBQWhCQyxFQUFnQixTQUFoQkEsRUFBZ0I7QUFBQSxVQUFaQyxRQUFZLFNBQVpBLFFBQVk7O0FBQ3JDQywyQkFBU1AsT0FBVCxDQUFpQkksR0FBakIsRUFBc0JJLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkosRUFBeEIsQ0FBdEIsRUFBbURDLFFBQW5EO0FBQ0QsS0FOSDtBQU9ELEdBVkEsQ0FZRDs7O0FBQ0E7QUFBQSw4RkFBTyxpQkFBZ0JJLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ2dCLHdCQUFhO0FBQUVaLGdCQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVVksZ0JBQUFBLFFBQVEsRUFBUkE7QUFBVixlQUFiLENBRGhCOztBQUFBO0FBQ0NQLGNBQUFBLE1BREQ7QUFBQSwrQ0FFRUosR0FBRyxDQUFDSSxNQUFELENBRkw7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBUDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlEOztBQUVELElBQU1RLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmOzs7QUFTQSxJQUFNQyxJQUFJLEdBQUdDLG9CQUFRRCxJQUFSLEVBQWIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvbWlzZSBmcm9tICcuL3Byb21pc2UnO1xuaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgdXNlUm91dGVyLFxuICBpbml0aWFsUHJvcHMsXG59IGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluayc7XG5pbXBvcnQge1xuICBSb3V0ZXMsXG4gIGNyZWF0ZVJvdXRlcyBhcyByb3V0ZXMsXG4gIExvY2F0aW9uIGFzIFJvdXRlTG9jYXRpb24sXG4gIFBhcmFtcyBhcyBSb3V0ZVBhcmFtcyxcbn0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBOb1NTUiBmcm9tICcuL05vU1NSJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKHtcbiAgcm91dGVzLFxuICBzc3IsXG4gIGh5ZHJhdGUsXG4gIG5vdEZvdW5kLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgc3NyOiAoXG4gICAgcm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4sXG4gICkgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGNhbGxiYWNrPzogKGh0bWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICB9O1xuICBoeWRyYXRlOiAoXG4gICAgcm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4sXG4gICkgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xuICB9O1xuICBub3RGb3VuZDogKCkgPT4gdm9pZDtcbn0pIHtcbiAgLy8gaHlkcmF0ZSBmb3IgYnJvd3NlclxuICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICBjcmVhdGVSb3V0ZXIoeyByb3V0ZXMsIG5vdEZvdW5kIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAoUm91dGVyKSB7XG4gICAgICAgIHJldHVybiBoeWRyYXRlKFJvdXRlcik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHsganN4LCBpZCwgY2FsbGJhY2sgfSkge1xuICAgICAgICBSZWFjdERPTS5oeWRyYXRlKGpzeCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIHJldHVybiBmb3Igc3NyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAobG9jYXRpb246IHN0cmluZykge1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcih7IHJvdXRlcywgbG9jYXRpb24gfSk7XG4gICAgcmV0dXJuIHNzcihSb3V0ZXIpO1xuICB9O1xufVxuXG5jb25zdCByb3V0ZXIgPSB7XG4gIHJlcGxhY2UsXG4gIHB1c2gsXG4gIGdvLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxufTtcblxuY29uc3Qgc3RvcCA9IHByb21pc2Uuc3RvcCgpO1xuXG5leHBvcnQge1xuICBjcmVhdGVSb3V0ZXIsXG4gIHJvdXRlcixcbiAgdXNlUm91dGVyLFxuICByb3V0ZXMsXG4gIGluaXRpYWxQcm9wcyxcbiAgTGluayxcbiAgTm9TU1IsXG4gIGxvZyxcbiAgUm91dGVMb2NhdGlvbixcbiAgUm91dGVQYXJhbXMsXG4gIHN0b3AsXG59O1xuIl19