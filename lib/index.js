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
  link: _Router.link
};
exports.router = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJzc3IiLCJoeWRyYXRlIiwibGlrZUFwcCIsIm1hdGNoIiwiaW5pdGlhbFJvdXRlIiwiUm91dGVyIiwianN4IiwiaWQiLCJjYWxsYmFjayIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxvY2F0aW9uIiwibm90Rm91bmQiLCJjaGVjayIsInJvdXRlciIsInJlcGxhY2UiLCJwdXNoIiwiYmFjayIsImZvcndhcmQiLCJsaW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBVUE7O0FBQ0E7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7OztTQUU4QkEsRzs7Ozs7dUZBQWY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNiQyxZQUFBQSxNQURhLFFBQ2JBLE1BRGEsRUFFYkMsR0FGYSxRQUViQSxHQUZhLEVBR2JDLE9BSGEsUUFHYkEsT0FIYSxzQkFJYkMsT0FKYSxFQUliQSxPQUphLDZCQUlILEtBSkc7O0FBQUEsaUJBbUJULHVCQW5CUztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQW9CZ0JILE1BQU0sQ0FBQ0ksS0FBUCxDQUFhLDZCQUFiLENBcEJoQjs7QUFBQTtBQW9CTEMsWUFBQUEsWUFwQks7QUFBQTtBQUFBLG1CQXFCVSx3QkFBYTtBQUNoQ0wsY0FBQUEsTUFBTSxFQUFOQSxNQURnQztBQUVoQ0ssY0FBQUEsWUFBWSxFQUFaQSxZQUZnQztBQUdoQ0YsY0FBQUEsT0FBTyxFQUFQQTtBQUhnQyxhQUFiLENBckJWOztBQUFBO0FBcUJMRyxZQUFBQSxNQXJCSztBQUFBLHVCQTBCbUJKLE9BQU8sQ0FBQ0ksTUFBRCxDQTFCMUIsRUEwQkhDLEdBMUJHLFlBMEJIQSxHQTFCRyxFQTBCRUMsRUExQkYsWUEwQkVBLEVBMUJGLEVBMEJNQyxRQTFCTixZQTBCTUEsUUExQk47O0FBMkJYQyxpQ0FBU1IsT0FBVCxDQUFpQkssR0FBakIsRUFBc0JJLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QkosRUFBeEIsQ0FBdEIsRUFBbURDLFFBQW5EOztBQTNCVztBQUFBO0FBQUEsd0dBK0JOLGlCQUFnQkksUUFBaEI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBQ3NCYixNQUFNLENBQUNJLEtBQVAsQ0FBYVMsUUFBYixDQUR0Qjs7QUFBQTtBQUNDUix3QkFBQUEsWUFERDtBQUFBO0FBQUEsK0JBRWdCLHdCQUFhO0FBQ2hDTCwwQkFBQUEsTUFBTSxFQUFOQSxNQURnQztBQUVoQ0ssMEJBQUFBLFlBQVksRUFBWkEsWUFGZ0M7QUFHaENGLDBCQUFBQSxPQUFPLEVBQVBBO0FBSGdDLHlCQUFiLENBRmhCOztBQUFBO0FBRUNHLHdCQUFBQSxNQUZEO0FBQUEsK0JBT3FCTCxHQUFHLENBQUNLLE1BQUQsQ0FQeEIsRUFPR0MsR0FQSCxRQU9HQSxHQVBILEVBT1FFLFFBUFIsUUFPUUEsUUFQUjtBQUFBLHlEQVFFO0FBQ0xGLDBCQUFBQSxHQUFHLEVBQUhBLEdBREs7QUFFTEUsMEJBQUFBLFFBQVEsRUFBUkEsUUFGSztBQUdMSywwQkFBQUEsUUFBUSxFQUFFLENBQUNkLE1BQU0sQ0FBQ2UsS0FBUCxDQUFhRixRQUFiO0FBSE4seUJBUkY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUEvQk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQStDZixJQUFNRyxNQUFNLEdBQUc7QUFDYkMsRUFBQUEsT0FBTyxFQUFQQSxlQURhO0FBRWJDLEVBQUFBLElBQUksRUFBSkEsWUFGYTtBQUdiQyxFQUFBQSxJQUFJLEVBQUpBLFlBSGE7QUFJYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUphO0FBS2JDLEVBQUFBLElBQUksRUFBSkE7QUFMYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxuICB1c2VSb3V0ZXIsXG4gIHJvdXRpbmcsXG4gIHdpbmRvd0xvY2F0aW9uLFxufSBmcm9tICcuL1JvdXRlcic7XG5pbXBvcnQgTGluayBmcm9tICcuL0xpbmsnO1xuaW1wb3J0IHJvdXRlcywge1xuICBSb3V0ZXMsXG4gIExvY2F0aW9uIGFzIFJvdXRlTG9jYXRpb24sXG4gIFBhcmFtcyBhcyBSb3V0ZVBhcmFtcyxcbn0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBOb1NTUiBmcm9tICcuL05vU1NSJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXBwKHtcbiAgcm91dGVzLFxuICBzc3IsXG4gIGh5ZHJhdGUsXG4gIGxpa2VBcHAgPSBmYWxzZSxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIHNzcjogKHJvdXRlcjogRnVuY3Rpb25Db21wb25lbnQ8e30+KSA9PiB7XG4gICAganN4OiBSZWFjdEVsZW1lbnQ7XG4gICAgY2FsbGJhY2s/OiAoaHRtbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIH07XG4gIGh5ZHJhdGU6IChyb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHt9PikgPT4ge1xuICAgIGpzeDogUmVhY3RFbGVtZW50O1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xuICB9O1xuICBsaWtlQXBwPzogYm9vbGVhbjtcbn0pIHtcbiAgLy8gaHlkcmF0ZSBmb3IgYnJvd3NlclxuICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICBjb25zdCBpbml0aWFsUm91dGUgPSBhd2FpdCByb3V0ZXMubWF0Y2god2luZG93TG9jYXRpb24oKSk7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGluaXRpYWxSb3V0ZSxcbiAgICAgIGxpa2VBcHAsXG4gICAgfSk7XG4gICAgY29uc3QgeyBqc3gsIGlkLCBjYWxsYmFjayB9ID0gaHlkcmF0ZShSb3V0ZXIpO1xuICAgIFJlYWN0RE9NLmh5ZHJhdGUoanN4LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIHJldHVybiBmb3Igc3NyXG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiAobG9jYXRpb246IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxSb3V0ZSA9IGF3YWl0IHJvdXRlcy5tYXRjaChsb2NhdGlvbik7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHtcbiAgICAgIHJvdXRlcyxcbiAgICAgIGluaXRpYWxSb3V0ZSxcbiAgICAgIGxpa2VBcHAsXG4gICAgfSk7XG4gICAgY29uc3QgeyBqc3gsIGNhbGxiYWNrIH0gPSBzc3IoUm91dGVyKTtcbiAgICByZXR1cm4ge1xuICAgICAganN4LFxuICAgICAgY2FsbGJhY2ssXG4gICAgICBub3RGb3VuZDogIXJvdXRlcy5jaGVjayhsb2NhdGlvbiksXG4gICAgfTtcbiAgfTtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlUm91dGVyLFxuICByb3V0ZXIsXG4gIHVzZVJvdXRlcixcbiAgcm91dGVzLFxuICByb3V0aW5nLFxuICBMaW5rLFxuICBOb1NTUixcbiAgbG9nLFxuICBSb3V0ZUxvY2F0aW9uLFxuICBSb3V0ZVBhcmFtcyxcbn07XG4iXX0=