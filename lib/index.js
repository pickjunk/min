"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

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
    return _routes["default"];
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
exports.router = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Router = _interopRequireWildcard(require("./Router"));

var _Link = _interopRequireDefault(require("./Link"));

var _routes = _interopRequireWildcard(require("./routes"));

var _logger = _interopRequireDefault(require("./logger"));

var _utils = require("./utils");

var _NoSSR = _interopRequireDefault(require("./NoSSR"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function app(_x) {
  return _app.apply(this, arguments);
}

function _app() {
  _app = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var routes, ssr, hydrate, _ref$likeApp, likeApp, initialRoute, Router, _hydrate, jsx, id, callback;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = _ref.routes, ssr = _ref.ssr, hydrate = _ref.hydrate, _ref$likeApp = _ref.likeApp, likeApp = _ref$likeApp === void 0 ? false : _ref$likeApp;

            if (!(0, _utils.isBrowser)()) {
              _context2.next = 10;
              break;
            }

            _context2.next = 4;
            return routes.match((0, _Router.windowLocation)());

          case 4:
            initialRoute = _context2.sent;
            _context2.next = 7;
            return (0, _Router["default"])({
              routes: routes,
              initialRoute: initialRoute,
              likeApp: likeApp
            });

          case 7:
            Router = _context2.sent;
            _hydrate = hydrate(Router), jsx = _hydrate.jsx, id = _hydrate.id, callback = _hydrate.callback;

            _reactDom["default"].hydrate(jsx, document.getElementById(id), callback);

          case 10:
            return _context2.abrupt("return", /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(location) {
                var initialRoute, Router, _ssr, jsx, callback;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return routes.match(location);

                      case 2:
                        initialRoute = _context.sent;
                        _context.next = 5;
                        return (0, _Router["default"])({
                          routes: routes,
                          initialRoute: initialRoute,
                          likeApp: likeApp
                        });

                      case 5:
                        Router = _context.sent;
                        _ssr = ssr(Router), jsx = _ssr.jsx, callback = _ssr.callback;
                        return _context.abrupt("return", {
                          jsx: jsx,
                          callback: callback,
                          notFound: !routes.check(location)
                        });

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _app.apply(this, arguments);
}

var router = {
  replace: _Router.replace,
  push: _Router.push,
  back: _Router.back,
  forward: _Router.forward,
  link: _Router.link,
  onChange: _Router.onChange
};
exports.router = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibGlrZUFwcCIsIm1hdGNoIiwiaW5pdGlhbFJvdXRlIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwibm90Rm91bmQiLCJjaGVjayIsInJvdXRlciIsInJlcGxhY2UiLCJwdXNoIiwiYmFjayIsImZvcndhcmQiLCJsaW5rIiwib25DaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFLQTs7QUFDQTs7QUFDQTs7Ozs7O1NBRThCQSxHOzs7Ozt1RkFBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLFlBQUFBLE1BRGEsUUFDYkEsTUFEYSxFQUViQyxHQUZhLFFBRWJBLEdBRmEsRUFHYkMsT0FIYSxRQUdiQSxPQUhhLHNCQUliQyxPQUphLEVBSWJBLE9BSmEsNkJBSUgsS0FKRzs7QUFBQSxpQkFtQlQsdUJBbkJTO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBb0JnQkgsTUFBTSxDQUFDSSxLQUFQLENBQWEsNkJBQWIsQ0FwQmhCOztBQUFBO0FBb0JMQyxZQUFBQSxZQXBCSztBQUFBO0FBQUEsbUJBcUJVLHdCQUFhO0FBQ2hDTCxjQUFBQSxNQUFNLEVBQU5BLE1BRGdDO0FBRWhDSyxjQUFBQSxZQUFZLEVBQVpBLFlBRmdDO0FBR2hDRixjQUFBQSxPQUFPLEVBQVBBO0FBSGdDLGFBQWIsQ0FyQlY7O0FBQUE7QUFxQkxHLFlBQUFBLE1BckJLO0FBQUEsdUJBMEJtQkosT0FBTyxDQUFDSSxNQUFELENBMUIxQixFQTBCSEMsR0ExQkcsWUEwQkhBLEdBMUJHLEVBMEJFQyxFQTFCRixZQTBCRUEsRUExQkYsRUEwQk1DLFFBMUJOLFlBMEJNQSxRQTFCTjs7QUEyQlhDLGlDQUFTUixPQUFULENBQWlCSyxHQUFqQixFQUFzQkksUUFBUSxDQUFDQyxjQUFULENBQXdCSixFQUF4QixDQUF0QixFQUFtREMsUUFBbkQ7O0FBM0JXO0FBQUE7QUFBQSx3R0ErQk4saUJBQWdCSSxRQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFDc0JiLE1BQU0sQ0FBQ0ksS0FBUCxDQUFhUyxRQUFiLENBRHRCOztBQUFBO0FBQ0NSLHdCQUFBQSxZQUREO0FBQUE7QUFBQSwrQkFFZ0Isd0JBQWE7QUFDaENMLDBCQUFBQSxNQUFNLEVBQU5BLE1BRGdDO0FBRWhDSywwQkFBQUEsWUFBWSxFQUFaQSxZQUZnQztBQUdoQ0YsMEJBQUFBLE9BQU8sRUFBUEE7QUFIZ0MseUJBQWIsQ0FGaEI7O0FBQUE7QUFFQ0csd0JBQUFBLE1BRkQ7QUFBQSwrQkFPcUJMLEdBQUcsQ0FBQ0ssTUFBRCxDQVB4QixFQU9HQyxHQVBILFFBT0dBLEdBUEgsRUFPUUUsUUFQUixRQU9RQSxRQVBSO0FBQUEseURBUUU7QUFDTEYsMEJBQUFBLEdBQUcsRUFBSEEsR0FESztBQUVMRSwwQkFBQUEsUUFBUSxFQUFSQSxRQUZLO0FBR0xLLDBCQUFBQSxRQUFRLEVBQUUsQ0FBQ2QsTUFBTSxDQUFDZSxLQUFQLENBQWFGLFFBQWI7QUFITix5QkFSRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQS9CTTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBK0NmLElBQU1HLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLElBQUksRUFBSkEsWUFIYTtBQUliQyxFQUFBQSxPQUFPLEVBQVBBLGVBSmE7QUFLYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUxhO0FBTWJDLEVBQUFBLFFBQVEsRUFBUkE7QUFOYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxuICBvbkNoYW5nZSxcbiAgdXNlUm91dGVyLFxuICByb3V0aW5nLFxuICB3aW5kb3dMb2NhdGlvbixcbn0gZnJvbSAnLi9Sb3V0ZXInO1xuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rJztcbmltcG9ydCByb3V0ZXMsIHtcbiAgUm91dGVzLFxuICBMb2NhdGlvbiBhcyBSb3V0ZUxvY2F0aW9uLFxuICBQYXJhbXMgYXMgUm91dGVQYXJhbXMsXG59IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTm9TU1IgZnJvbSAnLi9Ob1NTUic7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgc3NyLFxuICBoeWRyYXRlLFxuICBsaWtlQXBwID0gZmFsc2UsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBzc3I6IChyb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PikgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGNhbGxiYWNrPzogKGh0bWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICB9O1xuICBoeWRyYXRlOiAocm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4pID0+IHtcbiAgICBqc3g6IFJlYWN0RWxlbWVudDtcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhbGxiYWNrPzogKCkgPT4gdm9pZDtcbiAgfTtcbiAgbGlrZUFwcD86IGJvb2xlYW47XG59KSB7XG4gIC8vIGh5ZHJhdGUgZm9yIGJyb3dzZXJcbiAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgY29uc3QgaW5pdGlhbFJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcih7XG4gICAgICByb3V0ZXMsXG4gICAgICBpbml0aWFsUm91dGUsXG4gICAgICBsaWtlQXBwLFxuICAgIH0pO1xuICAgIGNvbnN0IHsganN4LCBpZCwgY2FsbGJhY2sgfSA9IGh5ZHJhdGUoUm91dGVyKTtcbiAgICBSZWFjdERPTS5oeWRyYXRlKGpzeCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsUm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2gobG9jYXRpb24pO1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcih7XG4gICAgICByb3V0ZXMsXG4gICAgICBpbml0aWFsUm91dGUsXG4gICAgICBsaWtlQXBwLFxuICAgIH0pO1xuICAgIGNvbnN0IHsganN4LCBjYWxsYmFjayB9ID0gc3NyKFJvdXRlcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGpzeCxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgbm90Rm91bmQ6ICFyb3V0ZXMuY2hlY2sobG9jYXRpb24pLFxuICAgIH07XG4gIH07XG59XG5cbmNvbnN0IHJvdXRlciA9IHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgb25DaGFuZ2UsXG59O1xuXG5leHBvcnQge1xuICBjcmVhdGVSb3V0ZXIsXG4gIHJvdXRlcixcbiAgdXNlUm91dGVyLFxuICByb3V0ZXMsXG4gIHJvdXRpbmcsXG4gIExpbmssXG4gIE5vU1NSLFxuICBsb2csXG4gIFJvdXRlTG9jYXRpb24sXG4gIFJvdXRlUGFyYW1zLFxufTtcbiJdfQ==