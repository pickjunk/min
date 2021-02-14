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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJhcHAiLCJyb3V0ZXMiLCJyZW5kZXIiLCJhZnRlclNTUiIsImh0bWwiLCJhZnRlckh5ZHJhdGUiLCJub3RGb3VuZCIsIndyYXBSZW5kZXIiLCJwYXRoIiwiUm91dGVyIiwiZG9jdW1lbnQiLCJ0aGVuIiwicGFnZSIsIlJlYWN0RE9NIiwiaHlkcmF0ZSIsInJvdXRlciIsInJlcGxhY2UiLCJwdXNoIiwiZ28iLCJiYWNrIiwiZm9yd2FyZCIsImxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFVQTs7QUFFQTs7QUFJZSxTQUFTQSxHQUFULE9BWVo7QUFBQSxNQVhEQyxNQVdDLFFBWERBLE1BV0M7QUFBQSxNQVZEQyxNQVVDLFFBVkRBLE1BVUM7QUFBQSwyQkFUREMsUUFTQztBQUFBLE1BVERBLFFBU0MsOEJBVFUsVUFBQUMsSUFBSTtBQUFBLFdBQUlBLElBQUo7QUFBQSxHQVNkO0FBQUEsTUFSREMsWUFRQyxRQVJEQSxZQVFDO0FBQUEsTUFQREMsUUFPQyxRQVBEQSxRQU9DOztBQUNEO0FBREMsV0FFY0MsVUFGZDtBQUFBO0FBQUEsSUFPRDs7O0FBUEM7QUFBQSxnR0FFRCxpQkFBMEJDLElBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ3VCLHdCQUFhUCxNQUFiLEVBQXFCTyxJQUFyQixFQUEyQkYsUUFBM0IsQ0FEdkI7O0FBQUE7QUFDUUcsY0FBQUEsTUFEUjtBQUFBLCtDQUVTUCxNQUFNLENBQUNPLE1BQUQsQ0FGZjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUZDO0FBQUE7QUFBQTs7QUFRRCxNQUFJLE9BQU9DLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDbkNILElBQUFBLFVBQVUsR0FBR0ksSUFBYixDQUFrQixVQUFTQyxJQUFULEVBQWU7QUFDL0I7QUFDQUMsMkJBQVNDLE9BQVQsQ0FBaUJGLElBQWpCLEVBQXVCRixRQUF2QixFQUFpQ0wsWUFBakM7QUFDRCxLQUhEO0FBSUQsR0FiQSxDQWVEOzs7QUFDQSxTQUFPLENBQUNFLFVBQUQsRUFBYUosUUFBYixDQUFQO0FBQ0Q7O0FBRUQsSUFBTVksTUFBTSxHQUFHO0FBQ2JDLEVBQUFBLE9BQU8sRUFBUEEsZUFEYTtBQUViQyxFQUFBQSxJQUFJLEVBQUpBLFlBRmE7QUFHYkMsRUFBQUEsRUFBRSxFQUFGQSxVQUhhO0FBSWJDLEVBQUFBLElBQUksRUFBSkEsWUFKYTtBQUtiQyxFQUFBQSxPQUFPLEVBQVBBLGVBTGE7QUFNYkMsRUFBQUEsSUFBSSxFQUFKQTtBQU5hLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY3JlYXRlUm91dGVyLCB7XG4gIHJlcGxhY2UsXG4gIHB1c2gsXG4gIGdvLFxuICBiYWNrLFxuICBmb3J3YXJkLFxuICBsaW5rLFxuICB1c2VSb3V0ZXIsXG4gIGluaXRpYWxQcm9wcyxcbn0gZnJvbSAnLi9Sb3V0ZXInO1xuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG50eXBlIFJlbmRlciA9IChyb3V0ZXI6IEZ1bmN0aW9uQ29tcG9uZW50PHZvaWQ+KSA9PiBSZWFjdEVsZW1lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcCh7XG4gIHJvdXRlcyxcbiAgcmVuZGVyLFxuICBhZnRlclNTUiA9IGh0bWwgPT4gaHRtbCxcbiAgYWZ0ZXJIeWRyYXRlLFxuICBub3RGb3VuZCxcbn06IHtcbiAgcm91dGVzOiBSb3V0ZXM7XG4gIHJlbmRlcjogUmVuZGVyO1xuICBhZnRlclNTUjogKGh0bWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICBhZnRlckh5ZHJhdGU/OiAoKSA9PiB2b2lkO1xuICBub3RGb3VuZDogKCkgPT4gdm9pZDtcbn0pIHtcbiAgLy8gd3JhcCByZW5kZXJcbiAgYXN5bmMgZnVuY3Rpb24gd3JhcFJlbmRlcihwYXRoPzogc3RyaW5nKSB7XG4gICAgY29uc3QgUm91dGVyID0gYXdhaXQgY3JlYXRlUm91dGVyKHJvdXRlcywgcGF0aCwgbm90Rm91bmQpO1xuICAgIHJldHVybiByZW5kZXIoUm91dGVyKTtcbiAgfVxuXG4gIC8vIGJyb3dzZXIgYm9vdHN0YXBcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3cmFwUmVuZGVyKCkudGhlbihmdW5jdGlvbihwYWdlKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBSZWFjdERPTS5oeWRyYXRlKHBhZ2UsIGRvY3VtZW50LCBhZnRlckh5ZHJhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmV0dXJuIGZvciBzc3JcbiAgcmV0dXJuIFt3cmFwUmVuZGVyLCBhZnRlclNTUl07XG59XG5cbmNvbnN0IHJvdXRlciA9IHtcbiAgcmVwbGFjZSxcbiAgcHVzaCxcbiAgZ28sXG4gIGJhY2ssXG4gIGZvcndhcmQsXG4gIGxpbmssXG59O1xuXG5leHBvcnQgeyBjcmVhdGVSb3V0ZXIsIHJvdXRlciwgdXNlUm91dGVyLCBpbml0aWFsUHJvcHMsIExpbmssIGxvZyB9O1xuIl19