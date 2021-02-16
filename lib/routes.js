"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routes;
exports.createRoutes = createRoutes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _qs = _interopRequireDefault(require("qs"));

var _utils = require("./utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getComponent(result, path, node) {
  if (node.importComponent && (node.ssr || (0, _utils.isBrowser)())) {
    result.push({
      path: path,
      importComponent: node.importComponent
    });
  }
}

function traverse(node, context) {
  // to avoid children's contexts affect each other
  // copy context
  var remain = context.remain;
  var routeGetComponents = (0, _toConsumableArray2["default"])(context.routeGetComponents);

  var routeArguments = _objectSpread({}, context.routeArguments);

  var regex = new RegExp('^' + node._path, 'g');

  if (node._path) {
    var _match = null;

    if (_match = regex.exec(remain)) {
      getComponent(routeGetComponents, _match[0], node);

      for (var i = 1; i < _match.length; i++) {
        // optional arguments will be matched as undefined
        // filter them
        if (_match[i] !== undefined) {
          routeArguments[node._params[i - 1]] = _match[i];
        }
      } // match has reached tail


      if (regex.lastIndex === remain.length) {
        var iterator = node; // if having children
        // search for default routes on the subtree

        while (iterator.children) {
          var defaultChild = null;

          var _iterator = _createForOfIteratorHelper(iterator.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var child = _step.value;

              if (child._path === undefined) {
                defaultChild = child;

                if (defaultChild.importComponent) {
                  routeGetComponents.push({
                    path: '__default__',
                    importComponent: defaultChild.importComponent
                  });
                }

                break;
              }
            } // if having children but a default one can't be found
            // match will be fail.

          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          if (!defaultChild) return false;
          iterator = defaultChild;
        }

        return [routeGetComponents, routeArguments, iterator.name];
      }
    }
  } else {
    // a route without path (default route)
    // regarded as always matched
    // Note: This will perform as a deep-first tree search
    getComponent(routeGetComponents, '__default__', node);
  }

  if (node.children) {
    var _iterator2 = _createForOfIteratorHelper(node.children),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _child = _step2.value;
        var result = traverse(_child, {
          remain: remain.substr(regex.lastIndex),
          routeGetComponents: routeGetComponents,
          routeArguments: routeArguments
        });

        if (result) {
          return result;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return false;
}

function simpleQuery(query) {
  var r = {};
  query.split('&').filter(function (o) {
    return o;
  }).forEach(function (o) {
    var _o$split = o.split('='),
        _o$split2 = (0, _slicedToArray2["default"])(_o$split, 2),
        k = _o$split2[0],
        v = _o$split2[1];

    r[decodeURIComponent(k)] = decodeURIComponent(v);
  });
  return r;
}

function routes(data, names) {
  return {
    data: data,
    match: function match(target) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _tmp, path, queryStr, root, result, _result, routeGetComponents, args, name, components, route;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _tmp = target.split('?');
                path = _tmp.shift() || '';
                queryStr = _tmp.shift() || '';
                root = data;
                result = traverse(root, {
                  remain: path,
                  routeGetComponents: [],
                  routeArguments: {}
                }); // not match

                if (!(result === false)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", false);

              case 7:
                _result = (0, _slicedToArray2["default"])(result, 3), routeGetComponents = _result[0], args = _result[1], name = _result[2]; // actually import components

                _context.next = 10;
                return Promise.all(routeGetComponents.map(function (_ref) {
                  var importComponent = _ref.importComponent;
                  return importComponent();
                }));

              case 10:
                components = _context.sent;
                route = components.map(function (component, i) {
                  return {
                    path: routeGetComponents[i].path,
                    component: component
                  };
                }); // parse query string & merge args

                args = _objectSpread(_objectSpread({}, simpleQuery(queryStr)), args); // support initialProps

                _context.next = 15;
                return Promise.all(components.map(function (component) {
                  if (component.initialProps) {
                    return component.initialProps({
                      path: path,
                      args: args,
                      name: name
                    }).then(function (props) {
                      component._props = props || {};
                    });
                  }

                  component._props = {};
                }));

              case 15:
                return _context.abrupt("return", {
                  route: route,
                  args: args,
                  name: name
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    check: function check(target) {
      var path = target.split('?').shift() || '';
      var root = data;
      var result = traverse(root, {
        remain: path,
        routeGetComponents: [],
        routeArguments: {}
      });
      return Boolean(result);
    },
    link: function link(name, args) {
      args = args || {};
      var pathname = '/';
      var queryObj = {};
      var named = names[name];

      if (named) {
        // named route
        pathname = named.pathTemplate;

        for (var _key in named.paramsOptional) {
          var value = args[_key];

          if (named.paramsOptional[_key] === false && value === undefined) {
            throw new Error("argument [".concat(_key, "] is required"));
          }

          var regex = new RegExp('^' + named.paramsRegex[_key] + '$');

          if (value && regex.test(String(value)) === false) {
            throw new Error("argument [".concat(_key, "] is invalid, must match regexp [").concat(named.paramsRegex[_key], "]"));
          }

          if (value === undefined) {
            pathname = pathname.replace("(".concat(_key, ")"), '');
          } else {
            pathname = pathname.replace("(".concat(_key, ")"), encodeURIComponent(String(value)));
          }
        } // get query args (the args exclude route args)


        for (var _key2 in args) {
          if (named.paramsOptional[_key2] === undefined) {
            queryObj[_key2] = args[_key2];
          }
        }
      } else {
        // path route
        pathname = name;
        queryObj = args;
      }

      return "".concat(pathname).concat(_qs["default"].stringify(queryObj, {
        addQueryPrefix: true
      }));
    }
  };
} // 用于支持 typescript 提示的 mock 方法


function createRoutes(data) {
  return {
    data: data,
    match: function match(_) {
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", false);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    check: function check(_) {
      return false;
    },
    link: function link(_, __) {
      return '';
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiZ2V0Q29tcG9uZW50IiwicmVzdWx0IiwicGF0aCIsIm5vZGUiLCJpbXBvcnRDb21wb25lbnQiLCJzc3IiLCJwdXNoIiwidHJhdmVyc2UiLCJjb250ZXh0IiwicmVtYWluIiwicm91dGVHZXRDb21wb25lbnRzIiwicm91dGVBcmd1bWVudHMiLCJyZWdleCIsIlJlZ0V4cCIsIl9wYXRoIiwibWF0Y2giLCJleGVjIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyb3V0ZXMiLCJkYXRhIiwibmFtZXMiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsImluaXRpYWxQcm9wcyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwibmFtZWQiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwiRXJyb3IiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCIsImNyZWF0ZVJvdXRlcyIsIl8iLCJfXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBc0RBLFNBQVNBLFlBQVQsQ0FDRUMsTUFE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bnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFByb3BzID0gKG1hdGNoOiB7XG4gIHBhdGg6IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn0pID0+IFByb21pc2U8b2JqZWN0PjtcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcbiAgaW5pdGlhbFByb3BzPzogSW5pdGlhbFByb3BzO1xuICBfcHJvcHM/OiBvYmplY3Q7XG59O1xuXG5leHBvcnQgdHlwZSBJbXBvcnRDb21wb25lbnQgPSAoKSA9PiBQcm9taXNlPENvbXBvbmVudDxhbnk+PjtcblxuZXhwb3J0IHR5cGUgUm91dGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBzc3I/OiBib29sZWFuO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zPzogc3RyaW5nW107XG4gIGltcG9ydENvbXBvbmVudD86IEltcG9ydENvbXBvbmVudDtcblxuICBjaGlsZHJlbj86IFJvdXRlW107XG59O1xuXG50eXBlIE5hbWVzID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcGFyYW1zUmVnZXg6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIHBhcmFtc09wdGlvbmFsOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIE1hdGNoZWRSb3V0ZSA9IFtcbiAge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IEltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBQYXJhbXMsXG4gIHN0cmluZz8sXG5dO1xuXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudChcbiAgcmVzdWx0OiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIHBhdGg6IHN0cmluZyxcbiAgbm9kZTogUm91dGUsXG4pIHtcbiAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50ICYmIChub2RlLnNzciB8fCBpc0Jyb3dzZXIoKSkpIHtcbiAgICByZXN1bHQucHVzaCh7XG4gICAgICBwYXRoLFxuICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShcbiAgbm9kZTogUm91dGUsXG4gIGNvbnRleHQ6IHtcbiAgICByZW1haW46IHN0cmluZztcbiAgICByb3V0ZUdldENvbXBvbmVudHM6IHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICAgIH1bXTtcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xuICB9LFxuKTogTWF0Y2hlZFJvdXRlIHwgZmFsc2Uge1xuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXG4gIC8vIGNvcHkgY29udGV4dFxuICBsZXQgcmVtYWluID0gY29udGV4dC5yZW1haW47XG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcblxuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XG5cbiAgaWYgKG5vZGUuX3BhdGgpIHtcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XG4gICAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCBtYXRjaFswXSwgbm9kZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gb3B0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgbWF0Y2hlZCBhcyB1bmRlZmluZWRcbiAgICAgICAgLy8gZmlsdGVyIHRoZW1cbiAgICAgICAgaWYgKG1hdGNoW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByb3V0ZUFyZ3VtZW50c1tub2RlLl9wYXJhbXMhW2kgLSAxXV0gPSBtYXRjaFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXRjaCBoYXMgcmVhY2hlZCB0YWlsXG4gICAgICBpZiAocmVnZXgubGFzdEluZGV4ID09PSByZW1haW4ubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG5vZGU7XG5cbiAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgZGVmYXVsdCByb3V0ZXMgb24gdGhlIHN1YnRyZWVcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZCA9IG51bGw7XG5cbiAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLl9wYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdENoaWxkID0gY2hpbGQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICAgICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuIGJ1dCBhIGRlZmF1bHQgb25lIGNhbid0IGJlIGZvdW5kXG4gICAgICAgICAgLy8gbWF0Y2ggd2lsbCBiZSBmYWlsLlxuICAgICAgICAgIGlmICghZGVmYXVsdENoaWxkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBpdGVyYXRvciA9IGRlZmF1bHRDaGlsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbcm91dGVHZXRDb21wb25lbnRzLCByb3V0ZUFyZ3VtZW50cywgaXRlcmF0b3IubmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGEgcm91dGUgd2l0aG91dCBwYXRoIChkZWZhdWx0IHJvdXRlKVxuICAgIC8vIHJlZ2FyZGVkIGFzIGFsd2F5cyBtYXRjaGVkXG4gICAgLy8gTm90ZTogVGhpcyB3aWxsIHBlcmZvcm0gYXMgYSBkZWVwLWZpcnN0IHRyZWUgc2VhcmNoXG4gICAgZ2V0Q29tcG9uZW50KHJvdXRlR2V0Q29tcG9uZW50cywgJ19fZGVmYXVsdF9fJywgbm9kZSk7XG4gIH1cblxuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKGNoaWxkLCB7XG4gICAgICAgIHJlbWFpbjogcmVtYWluLnN1YnN0cihyZWdleC5sYXN0SW5kZXgpLFxuXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cyxcbiAgICAgICAgcm91dGVBcmd1bWVudHMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlOiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGNvbXBvbmVudDogQ29tcG9uZW50PGFueT47XG4gIH1bXTtcbiAgYXJnczogUGFyYW1zO1xuICBuYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIGRhdGE6IFJvdXRlO1xuICBtYXRjaCh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8TG9hZGVkUm91dGUgfCBmYWxzZT47XG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZVF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpIHtcbiAgY29uc3QgcjogUGFyYW1zID0ge307XG4gIHF1ZXJ5XG4gICAgLnNwbGl0KCcmJylcbiAgICAuZmlsdGVyKChvKSA9PiBvKVxuICAgIC5mb3JFYWNoKChvKSA9PiB7XG4gICAgICBjb25zdCBbaywgdl0gPSBvLnNwbGl0KCc9Jyk7XG4gICAgICByW2RlY29kZVVSSUNvbXBvbmVudChrKV0gPSBkZWNvZGVVUklDb21wb25lbnQodik7XG4gICAgfSk7XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoZGF0YTogUm91dGUsIG5hbWVzOiBOYW1lcyk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaCh0YXJnZXQpIHtcbiAgICAgIGxldCBfdG1wID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XG4gICAgICBsZXQgcGF0aCA9IF90bXAuc2hpZnQoKSB8fCAnJztcbiAgICAgIGxldCBxdWVyeVN0ciA9IF90bXAuc2hpZnQoKSB8fCAnJztcblxuICAgICAgbGV0IHJvb3QgPSBkYXRhO1xuICAgICAgbGV0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgLy8gbm90IG1hdGNoXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCBbcm91dGVHZXRDb21wb25lbnRzLCBhcmdzLCBuYW1lXSA9IHJlc3VsdDtcblxuICAgICAgLy8gYWN0dWFsbHkgaW1wb3J0IGNvbXBvbmVudHNcbiAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLm1hcCgoeyBpbXBvcnRDb21wb25lbnQgfSkgPT4gaW1wb3J0Q29tcG9uZW50KCkpLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgcm91dGUgPSBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50LCBpKSA9PiAoe1xuICAgICAgICBwYXRoOiByb3V0ZUdldENvbXBvbmVudHNbaV0ucGF0aCxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgfSkpO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5zaW1wbGVRdWVyeShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gc3VwcG9ydCBpbml0aWFsUHJvcHNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5pbml0aWFsUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgICAgLmluaXRpYWxQcm9wcyh7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKChwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHt9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdXRlLFxuICAgICAgICBhcmdzLFxuICAgICAgICBuYW1lLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNoZWNrKHRhcmdldCkge1xuICAgICAgY29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdCgnPycpLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBjb25zdCByb290ID0gZGF0YTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgICByZW1haW46IHBhdGgsXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXG4gICAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gQm9vbGVhbihyZXN1bHQpO1xuICAgIH0sXG4gICAgbGluayhuYW1lLCBhcmdzKSB7XG4gICAgICBhcmdzID0gYXJncyB8fCB7fTtcblxuICAgICAgbGV0IHBhdGhuYW1lID0gJy8nO1xuICAgICAgbGV0IHF1ZXJ5T2JqOiBQYXJhbXMgPSB7fTtcblxuICAgICAgbGV0IG5hbWVkID0gbmFtZXNbbmFtZV07XG4gICAgICBpZiAobmFtZWQpIHtcbiAgICAgICAgLy8gbmFtZWQgcm91dGVcbiAgICAgICAgcGF0aG5hbWUgPSBuYW1lZC5wYXRoVGVtcGxhdGU7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5hbWVkLnBhcmFtc09wdGlvbmFsKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2tleV07XG5cbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gZmFsc2UgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhcmd1bWVudCBbJHtrZXl9XSBpcyByZXF1aXJlZGApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbmFtZWQucGFyYW1zUmVnZXhba2V5XSArICckJyk7XG4gICAgICAgICAgaWYgKHZhbHVlICYmIHJlZ2V4LnRlc3QoU3RyaW5nKHZhbHVlKSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBhcmd1bWVudCBbJHtrZXl9XSBpcyBpbnZhbGlkLCBtdXN0IG1hdGNoIHJlZ2V4cCBbJHtuYW1lZC5wYXJhbXNSZWdleFtrZXldfV1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKGAoJHtrZXl9KWAsICcnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICBgKCR7a2V5fSlgLFxuICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBxdWVyeSBhcmdzICh0aGUgYXJncyBleGNsdWRlIHJvdXRlIGFyZ3MpXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlPYmpba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBhdGggcm91dGVcbiAgICAgICAgcGF0aG5hbWUgPSBuYW1lO1xuICAgICAgICBxdWVyeU9iaiA9IGFyZ3M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwYXRobmFtZX0ke3FzLnN0cmluZ2lmeShxdWVyeU9iaiwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KX1gO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIOeUqOS6juaUr+aMgSB0eXBlc2NyaXB0IOaPkOekuueahCBtb2NrIOaWueazlVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcyhkYXRhOiBSb3V0ZSk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaChfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjaGVjayhfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBsaW5rKF8sIF9fKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==