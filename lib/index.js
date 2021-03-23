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
  link: _Router.link
};
exports.router = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibGlrZUFwcCIsIm1hdGNoIiwiaW5pdGlhbFJvdXRlIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwibm90Rm91bmQiLCJjaGVjayIsInJvdXRlciIsInJlcGxhY2UiLCJwdXNoIiwiYmFjayIsImZvcndhcmQiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7O1NBRThCQSxHOzs7Ozt1RkFBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLFlBQUFBLE1BRGEsUUFDYkEsTUFEYSxFQUViQyxHQUZhLFFBRWJBLEdBRmEsRUFHYkMsT0FIYSxRQUdiQSxPQUhhLHNCQUliQyxPQUphLEVBSWJBLE9BSmEsNkJBSUgsS0FKRzs7QUFBQSxpQkF1QlQsdUJBdkJTO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBd0JnQkgsTUFBTSxDQUFDSSxLQUFQLENBQWEsNkJBQWIsQ0F4QmhCOztBQUFBO0FBd0JMQyxZQUFBQSxZQXhCSztBQUFBO0FBQUEsbUJBeUJVLHdCQUFhO0FBQ2hDTCxjQUFBQSxNQUFNLEVBQU5BLE1BRGdDO0FBRWhDSyxjQUFBQSxZQUFZLEVBQVpBLFlBRmdDO0FBR2hDRixjQUFBQSxPQUFPLEVBQVBBO0FBSGdDLGFBQWIsQ0F6QlY7O0FBQUE7QUF5QkxHLFlBQUFBLE1BekJLO0FBQUEsdUJBOEJtQkosT0FBTyxDQUFDSSxNQUFELENBOUIxQixFQThCSEMsR0E5QkcsWUE4QkhBLEdBOUJHLEVBOEJFQyxFQTlCRixZQThCRUEsRUE5QkYsRUE4Qk1DLFFBOUJOLFlBOEJNQSxRQTlCTjs7QUErQlhDLGlDQUFTUixPQUFULENBQWlCSyxHQUFqQixFQUFzQkksUUFBUSxDQUFDQyxjQUFULENBQXdCSixFQUF4QixDQUF0QixFQUFtREMsUUFBbkQ7O0FBL0JXO0FBQUE7QUFBQSx3R0FtQ04saUJBQWdCSSxRQUFoQjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFDc0JiLE1BQU0sQ0FBQ0ksS0FBUCxDQUFhUyxRQUFiLENBRHRCOztBQUFBO0FBQ0NSLHdCQUFBQSxZQUREO0FBQUE7QUFBQSwrQkFFZ0Isd0JBQWE7QUFDaENMLDBCQUFBQSxNQUFNLEVBQU5BLE1BRGdDO0FBRWhDSywwQkFBQUEsWUFBWSxFQUFaQSxZQUZnQztBQUdoQ0YsMEJBQUFBLE9BQU8sRUFBUEE7QUFIZ0MseUJBQWIsQ0FGaEI7O0FBQUE7QUFFQ0csd0JBQUFBLE1BRkQ7QUFBQSwrQkFPcUJMLEdBQUcsQ0FBQ0ssTUFBRCxDQVB4QixFQU9HQyxHQVBILFFBT0dBLEdBUEgsRUFPUUUsUUFQUixRQU9RQSxRQVBSO0FBQUEseURBUUU7QUFDTEYsMEJBQUFBLEdBQUcsRUFBSEEsR0FESztBQUVMRSwwQkFBQUEsUUFBUSxFQUFSQSxRQUZLO0FBR0xLLDBCQUFBQSxRQUFRLEVBQUUsQ0FBQ2QsTUFBTSxDQUFDZSxLQUFQLENBQWFGLFFBQWI7QUFITix5QkFSRjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW5DTTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBbURmLElBQU1HLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLElBQUksRUFBSkEsWUFIYTtBQUliQyxFQUFBQSxPQUFPLEVBQVBBLGVBSmE7QUFLYkMsRUFBQUEsSUFBSSxFQUFKQTtBQUxhLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3JlYXRlUm91dGVyLCB7XG4gIHJlcGxhY2UsXG4gIHB1c2gsXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG4gIHVzZVJvdXRlcixcbiAgcm91dGluZyxcbiAgd2luZG93TG9jYXRpb24sXG59IGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluayc7XG5pbXBvcnQgcm91dGVzLCB7XG4gIFJvdXRlcyxcbiAgTG9jYXRpb24gYXMgUm91dGVMb2NhdGlvbixcbiAgUGFyYW1zIGFzIFJvdXRlUGFyYW1zLFxufSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IE5vU1NSIGZyb20gJy4vTm9TU1InO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBhcHAoe1xuICByb3V0ZXMsXG4gIHNzcixcbiAgaHlkcmF0ZSxcbiAgbGlrZUFwcCA9IGZhbHNlLFxufToge1xuICByb3V0ZXM6IFJvdXRlcztcbiAgc3NyOiAoXG4gICAgcm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4sXG4gICkgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGNhbGxiYWNrPzogKGh0bWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICB9O1xuICBoeWRyYXRlOiAoXG4gICAgcm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4sXG4gICkgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xuICB9O1xuICBsaWtlQXBwPzogYm9vbGVhbjtcbn0pIHtcbiAgLy8gaHlkcmF0ZSBmb3IgYnJvd3NlclxuICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICBjb25zdCBpbml0aWFsUm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2god2luZG93TG9jYXRpb24oKSk7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGluaXRpYWxSb3V0ZSxcbiAgICAgIGxpa2VBcHAsXG4gICAgfSk7XG4gICAgY29uc3QgeyBqc3gsIGlkLCBjYWxsYmFjayB9ID0gaHlkcmF0ZShSb3V0ZXIpO1xuICAgIFJlYWN0RE9NLmh5ZHJhdGUoanN4LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIHJldHVybiBmb3Igc3NyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAobG9jYXRpb246IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxSb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGluaXRpYWxSb3V0ZSxcbiAgICAgIGxpa2VBcHAsXG4gICAgfSk7XG4gICAgY29uc3QgeyBqc3gsIGNhbGxiYWNrIH0gPSBzc3IoUm91dGVyKTtcbiAgICByZXR1cm4ge1xuICAgICAganN4LFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBub3RGb3VuZDogIXJvdXRlcy5jaGVjayhsb2NhdGlvbiksXG4gICAgfTtcbiAgfTtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlUm91dGVyLFxuICByb3V0ZXIsXG4gIHVzZVJvdXRlcixcbiAgcm91dGVzLFxuICByb3V0aW5nLFxuICBMaW5rLFxuICBOb1NTUixcbiAgbG9nLFxuICBSb3V0ZUxvY2F0aW9uLFxuICBSb3V0ZVBhcmFtcyxcbn07XG4iXX0=