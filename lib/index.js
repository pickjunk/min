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
      _ref$afterSSR = _ref.afterSSR,
      afterSSR = _ref$afterSSR === void 0 ? function (html) {
    return html;
  } : _ref$afterSSR,
      afterHydrate = _ref.afterHydrate,
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
    wrapRender().then(function (page) {
      // @ts-ignore
      _reactDom["default"].hydrate(page, document, afterHydrate);
    });
  } // return for ssr


  return [wrapRender, afterSSR];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJhZnRlclNTUiIsImh0bWwiLCJhZnRlckh5ZHJhdGUiLCJub3RGb3VuZCIsIndyYXBSZW5kZXIiLCJwYXRoIiwiUm91dGVyIiwiZG9jdW1lbnQiLCJ0aGVuIiwicGFnZSIsIlJlYWN0RE9NIiwiaHlkcmF0ZSIsInJvdXRlciIsInJlcGxhY2UiLCJwdXNoIiwiZ28iLCJiYWNrIiwiZm9yd2FyZCIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFVQTs7QUFDQTs7QUFDQTs7QUFJZSxTQUFTQSxHQUFULE9BWVo7QUFBQSxNQVhEQyxNQVdDLFFBWERBLE1BV0M7QUFBQSxNQVZEQyxNQVVDLFFBVkRBLE1BVUM7QUFBQSwyQkFUREMsUUFTQztBQUFBLE1BVERBLFFBU0MsOEJBVFUsVUFBQ0MsSUFBRDtBQUFBLFdBQVVBLElBQVY7QUFBQSxHQVNWO0FBQUEsTUFSREMsWUFRQyxRQVJEQSxZQVFDO0FBQUEsTUFQREMsUUFPQyxRQVBEQSxRQU9DOztBQUNEO0FBREMsV0FFY0MsVUFGZDtBQUFBO0FBQUEsSUFPRDs7O0FBUEM7QUFBQSxnR0FFRCxpQkFBMEJDLElBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ3VCLHdCQUFhUCxNQUFiLEVBQXFCTyxJQUFyQixFQUEyQkYsUUFBM0IsQ0FEdkI7O0FBQUE7QUFDUUcsY0FBQUEsTUFEUjtBQUFBLCtDQUVTUCxNQUFNLENBQUNPLE1BQUQsQ0FGZjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZDO0FBQUE7QUFBQTs7QUFRRCxNQUFJLE9BQU9DLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDbkNILElBQUFBLFVBQVUsR0FBR0ksSUFBYixDQUFrQixVQUFVQyxJQUFWLEVBQWdCO0FBQ2hDO0FBQ0FDLDJCQUFTQyxPQUFULENBQWlCRixJQUFqQixFQUF1QkYsUUFBdkIsRUFBaUNMLFlBQWpDO0FBQ0QsS0FIRDtBQUlELEdBYkEsQ0FlRDs7O0FBQ0EsU0FBTyxDQUFDRSxVQUFELEVBQWFKLFFBQWIsQ0FBUDtBQUNEOztBQUVELElBQU1ZLE1BQU0sR0FBRztBQUNiQyxFQUFBQSxPQUFPLEVBQVBBLGVBRGE7QUFFYkMsRUFBQUEsSUFBSSxFQUFKQSxZQUZhO0FBR2JDLEVBQUFBLEVBQUUsRUFBRkEsVUFIYTtBQUliQyxFQUFBQSxJQUFJLEVBQUpBLFlBSmE7QUFLYkMsRUFBQUEsT0FBTyxFQUFQQSxlQUxhO0FBTWJDLEVBQUFBLElBQUksRUFBSkE7QUFOYSxDQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNyZWF0ZVJvdXRlciwge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbiAgdXNlUm91dGVyLFxuICBpbml0aWFsUHJvcHMsXG59IGZyb20gJy4vUm91dGVyJztcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluayc7XG5pbXBvcnQgeyBSb3V0ZXMsIGNyZWF0ZVJvdXRlcyBhcyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcblxudHlwZSBSZW5kZXIgPSAocm91dGVyOiBGdW5jdGlvbkNvbXBvbmVudDx7fT4pID0+IFJlYWN0RWxlbWVudDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKHtcbiAgcm91dGVzLFxuICByZW5kZXIsXG4gIGFmdGVyU1NSID0gKGh0bWwpID0+IGh0bWwsXG4gIGFmdGVySHlkcmF0ZSxcbiAgbm90Rm91bmQsXG59OiB7XG4gIHJvdXRlczogUm91dGVzO1xuICByZW5kZXI6IFJlbmRlcjtcbiAgYWZ0ZXJTU1I6IChodG1sOiBzdHJpbmcpID0+IHN0cmluZztcbiAgYWZ0ZXJIeWRyYXRlPzogKCkgPT4gdm9pZDtcbiAgbm90Rm91bmQ6ICgpID0+IHZvaWQ7XG59KSB7XG4gIC8vIHdyYXAgcmVuZGVyXG4gIGFzeW5jIGZ1bmN0aW9uIHdyYXBSZW5kZXIocGF0aD86IHN0cmluZykge1xuICAgIGNvbnN0IFJvdXRlciA9IGF3YWl0IGNyZWF0ZVJvdXRlcihyb3V0ZXMsIHBhdGgsIG5vdEZvdW5kKTtcbiAgICByZXR1cm4gcmVuZGVyKFJvdXRlcik7XG4gIH1cblxuICAvLyBicm93c2VyIGJvb3RzdGFwXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd3JhcFJlbmRlcigpLnRoZW4oZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIFJlYWN0RE9NLmh5ZHJhdGUocGFnZSwgZG9jdW1lbnQsIGFmdGVySHlkcmF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gZm9yIHNzclxuICByZXR1cm4gW3dyYXBSZW5kZXIsIGFmdGVyU1NSXTtcbn1cblxuY29uc3Qgcm91dGVyID0ge1xuICByZXBsYWNlLFxuICBwdXNoLFxuICBnbyxcbiAgYmFjayxcbiAgZm9yd2FyZCxcbiAgbGluayxcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVJvdXRlciwgcm91dGVyLCB1c2VSb3V0ZXIsIHJvdXRlcywgaW5pdGlhbFByb3BzLCBMaW5rLCBsb2cgfTtcbiJdfQ==