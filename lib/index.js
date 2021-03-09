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
    var routes, ssr, hydrate, initialRoute, Router, _hydrate, jsx, id, callback;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = _ref.routes, ssr = _ref.ssr, hydrate = _ref.hydrate;

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
              initialRoute: initialRoute
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
                          initialRoute: initialRoute
                        });

                      case 5:
                        Router = _context.sent;
                        _ssr = ssr(Router), jsx = _ssr.jsx, callback = _ssr.callback;
                        return _context.abrupt("return", {
                          jsx: jsx,
                          callback: callback,
                          isNotFound: routes.check(location)
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
  go: _Router.go,
  back: _Router.back,
  forward: _Router.forward,
  link: _Router.link
};
exports.router = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibWF0Y2giLCJpbml0aWFsUm91dGUiLCJSb3V0ZXIiLCJqc3giLCJpZCIsImNhbGxiYWNrIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibG9jYXRpb24iLCJpc05vdEZvdW5kIiwiY2hlY2siLCJyb3V0ZXIiLCJyZXBsYWNlIiwicHVzaCIsImdvIiwiYmFjayIsImZvcndhcmQiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7O1NBRThCQSxHOzs7Ozt1RkFBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLFlBQUFBLE1BRGEsUUFDYkEsTUFEYSxFQUViQyxHQUZhLFFBRWJBLEdBRmEsRUFHYkMsT0FIYSxRQUdiQSxPQUhhOztBQUFBLGlCQXFCVCx1QkFyQlM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFzQmdCRixNQUFNLENBQUNHLEtBQVAsQ0FBYSw2QkFBYixDQXRCaEI7O0FBQUE7QUFzQkxDLFlBQUFBLFlBdEJLO0FBQUE7QUFBQSxtQkF1QlUsd0JBQWE7QUFDaENKLGNBQUFBLE1BQU0sRUFBTkEsTUFEZ0M7QUFFaENJLGNBQUFBLFlBQVksRUFBWkE7QUFGZ0MsYUFBYixDQXZCVjs7QUFBQTtBQXVCTEMsWUFBQUEsTUF2Qks7QUFBQSx1QkEyQm1CSCxPQUFPLENBQUNHLE1BQUQsQ0EzQjFCLEVBMkJIQyxHQTNCRyxZQTJCSEEsR0EzQkcsRUEyQkVDLEVBM0JGLFlBMkJFQSxFQTNCRixFQTJCTUMsUUEzQk4sWUEyQk1BLFFBM0JOOztBQTRCWEMsaUNBQVNQLE9BQVQsQ0FBaUJJLEdBQWpCLEVBQXNCSSxRQUFRLENBQUNDLGNBQVQsQ0FBd0JKLEVBQXhCLENBQXRCLEVBQW1EQyxRQUFuRDs7QUE1Qlc7QUFBQTtBQUFBLHdHQWdDTixpQkFBZ0JJLFFBQWhCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUNzQlosTUFBTSxDQUFDRyxLQUFQLENBQWFTLFFBQWIsQ0FEdEI7O0FBQUE7QUFDQ1Isd0JBQUFBLFlBREQ7QUFBQTtBQUFBLCtCQUVnQix3QkFBYTtBQUNoQ0osMEJBQUFBLE1BQU0sRUFBTkEsTUFEZ0M7QUFFaENJLDBCQUFBQSxZQUFZLEVBQVpBO0FBRmdDLHlCQUFiLENBRmhCOztBQUFBO0FBRUNDLHdCQUFBQSxNQUZEO0FBQUEsK0JBTXFCSixHQUFHLENBQUNJLE1BQUQsQ0FOeEIsRUFNR0MsR0FOSCxRQU1HQSxHQU5ILEVBTVFFLFFBTlIsUUFNUUEsUUFOUjtBQUFBLHlEQU9FO0FBQ0xGLDBCQUFBQSxHQUFHLEVBQUhBLEdBREs7QUFFTEUsMEJBQUFBLFFBQVEsRUFBUkEsUUFGSztBQUdMSywwQkFBQUEsVUFBVSxFQUFFYixNQUFNLENBQUNjLEtBQVAsQ0FBYUYsUUFBYjtBQUhQLHlCQVBGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBaENNOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUErQ2YsSUFBTUcsTUFBTSxHQUFHO0FBQ2JDLEVBQUFBLE9BQU8sRUFBUEEsZUFEYTtBQUViQyxFQUFBQSxJQUFJLEVBQUpBLFlBRmE7QUFHYkMsRUFBQUEsRUFBRSxFQUFGQSxVQUhhO0FBSWJDLEVBQUFBLElBQUksRUFBSkEsWUFKYTtBQUtiQyxFQUFBQSxPQUFPLEVBQVBBLGVBTGE7QUFNYkMsRUFBQUEsSUFBSSxFQUFKQTtBQU5hLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3JlYXRlUm91dGVyLCB7XG4gIHJlcGxhY2UsXG4gIHB1c2gsXG4gIGdvLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxuICB1c2VSb3V0ZXIsXG4gIHJvdXRpbmcsXG4gIHdpbmRvd0xvY2F0aW9uLFxufSBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnO1xuaW1wb3J0IHJvdXRlcywge1xuICBSb3V0ZXMsXG4gIExvY2F0aW9uIGFzIFJvdXRlTG9jYXRpb24sXG4gIFBhcmFtcyBhcyBSb3V0ZVBhcmFtcyxcbn0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBOb1NTUiBmcm9tICcuL05vU1NSJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXBwKHtcbiAgcm91dGVzLFxuICBzc3IsXG4gIGh5ZHJhdGUsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICBzc3I6IChcbiAgICByb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PixcbiAgKSA9PiB7XG4gICAganN4OiBSZWFjdEVsZW1lbnQ7XG4gICAgY2FsbGJhY2s/OiAoaHRtbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIH07XG4gIGh5ZHJhdGU6IChcbiAgICByb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PixcbiAgKSA9PiB7XG4gICAganN4OiBSZWFjdEVsZW1lbnQ7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjYWxsYmFjaz86ICgpID0+IHZvaWQ7XG4gIH07XG59KSB7XG4gIC8vIGh5ZHJhdGUgZm9yIGJyb3dzZXJcbiAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgY29uc3QgaW5pdGlhbFJvdXRlID0gYXdhaXQgcm91dGVzLm1hdGNoKHdpbmRvd0xvY2F0aW9uKCkpO1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcih7XG4gICAgICByb3V0ZXMsXG4gICAgICBpbml0aWFsUm91dGUsXG4gICAgfSk7XG4gICAgY29uc3QgeyBqc3gsIGlkLCBjYWxsYmFjayB9ID0gaHlkcmF0ZShSb3V0ZXIpO1xuICAgIFJlYWN0RE9NLmh5ZHJhdGUoanN4LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIHJldHVybiBmb3Igc3NyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAobG9jYXRpb246IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxSb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGluaXRpYWxSb3V0ZSxcbiAgICB9KTtcbiAgICBjb25zdCB7IGpzeCwgY2FsbGJhY2sgfSA9IHNzcihSb3V0ZXIpO1xuICAgIHJldHVybiB7XG4gICAgICBqc3gsXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGlzTm90Rm91bmQ6IHJvdXRlcy5jaGVjayhsb2NhdGlvbiksXG4gICAgfTtcbiAgfTtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZVJvdXRlcixcbiAgcm91dGVyLFxuICB1c2VSb3V0ZXIsXG4gIHJvdXRlcyxcbiAgcm91dGluZyxcbiAgTGluayxcbiAgTm9TU1IsXG4gIGxvZyxcbiAgUm91dGVMb2NhdGlvbixcbiAgUm91dGVQYXJhbXMsXG59O1xuIl19