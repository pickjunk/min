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
      if (node.importComponent && ((0, _utils.isBrowser)() || node.ssr)) {
        routeGetComponents.push({
          path: _match[0],
          importComponent: node.importComponent
        });
      }

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
    if (node.importComponent) {
      routeGetComponents.push({
        path: '__default__',
        importComponent: node.importComponent
      });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInNzciIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyb3V0ZXMiLCJkYXRhIiwibmFtZXMiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsImluaXRpYWxQcm9wcyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwibmFtZWQiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwiRXJyb3IiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCIsImNyZWF0ZVJvdXRlcyIsIl8iLCJfXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBc0RBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVB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YWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFByb3BzID0gKG1hdGNoOiB7XG4gIHBhdGg6IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn0pID0+IFByb21pc2U8b2JqZWN0PjtcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcbiAgaW5pdGlhbFByb3BzPzogSW5pdGlhbFByb3BzO1xuICBfcHJvcHM/OiBvYmplY3Q7XG59O1xuXG5leHBvcnQgdHlwZSBpbXBvcnRDb21wb25lbnQgPSAoKSA9PiBQcm9taXNlPENvbXBvbmVudDxhbnk+PjtcblxuZXhwb3J0IHR5cGUgUm91dGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBzc3I/OiBib29sZWFuO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zPzogc3RyaW5nW107XG4gIGltcG9ydENvbXBvbmVudD86IGltcG9ydENvbXBvbmVudDtcblxuICBjaGlsZHJlbj86IFJvdXRlW107XG59O1xuXG50eXBlIE5hbWVzID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcGFyYW1zUmVnZXg6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIHBhcmFtc09wdGlvbmFsOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIE1hdGNoZWRSb3V0ZSA9IFtcbiAge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IGltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBQYXJhbXMsXG4gIHN0cmluZz8sXG5dO1xuXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKFxuICBub2RlOiBSb3V0ZSxcbiAgY29udGV4dDoge1xuICAgIHJlbWFpbjogc3RyaW5nO1xuICAgIHJvdXRlR2V0Q29tcG9uZW50czoge1xuICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgaW1wb3J0Q29tcG9uZW50OiBpbXBvcnRDb21wb25lbnQ7XG4gICAgfVtdO1xuICAgIHJvdXRlQXJndW1lbnRzOiBQYXJhbXM7XG4gIH0sXG4pOiBNYXRjaGVkUm91dGUgfCBmYWxzZSB7XG4gIC8vIHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHMgYWZmZWN0IGVhY2ggb3RoZXJcbiAgLy8gY29weSBjb250ZXh0XG4gIGxldCByZW1haW4gPSBjb250ZXh0LnJlbWFpbjtcbiAgbGV0IHJvdXRlR2V0Q29tcG9uZW50cyA9IFsuLi5jb250ZXh0LnJvdXRlR2V0Q29tcG9uZW50c107XG4gIGxldCByb3V0ZUFyZ3VtZW50cyA9IHsgLi4uY29udGV4dC5yb3V0ZUFyZ3VtZW50cyB9O1xuXG4gIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbm9kZS5fcGF0aCwgJ2cnKTtcblxuICBpZiAobm9kZS5fcGF0aCkge1xuICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluKSkpIHtcbiAgICAgIGlmIChub2RlLmltcG9ydENvbXBvbmVudCAmJiAoaXNCcm93c2VyKCkgfHwgbm9kZS5zc3IpKSB7XG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBtYXRjaFswXSxcbiAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtcyFbaSAtIDFdXSA9IG1hdGNoW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1hdGNoIGhhcyByZWFjaGVkIHRhaWxcbiAgICAgIGlmIChyZWdleC5sYXN0SW5kZXggPT09IHJlbWFpbi5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbm9kZTtcblxuICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBkZWZhdWx0IHJvdXRlcyBvbiB0aGUgc3VidHJlZVxuICAgICAgICB3aGlsZSAoaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkID0gbnVsbDtcblxuICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX3BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSBjaGlsZDtcblxuICAgICAgICAgICAgICBpZiAoZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXG4gICAgICAgICAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW4gYnV0IGEgZGVmYXVsdCBvbmUgY2FuJ3QgYmUgZm91bmRcbiAgICAgICAgICAvLyBtYXRjaCB3aWxsIGJlIGZhaWwuXG4gICAgICAgICAgaWYgKCFkZWZhdWx0Q2hpbGQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIGl0ZXJhdG9yID0gZGVmYXVsdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtyb3V0ZUdldENvbXBvbmVudHMsIHJvdXRlQXJndW1lbnRzLCBpdGVyYXRvci5uYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYSByb3V0ZSB3aXRob3V0IHBhdGggKGRlZmF1bHQgcm91dGUpXG4gICAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcbiAgICAvLyBOb3RlOiBUaGlzIHdpbGwgcGVyZm9ybSBhcyBhIGRlZXAtZmlyc3QgdHJlZSBzZWFyY2hcbiAgICBpZiAobm9kZS5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgcGF0aDogJ19fZGVmYXVsdF9fJyxcbiAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcbiAgICAgICAgcmVtYWluOiByZW1haW4uc3Vic3RyKHJlZ2V4Lmxhc3RJbmRleCksXG5cbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLFxuICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlIHtcbiAgcm91dGU6IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgY29tcG9uZW50OiBDb21wb25lbnQ8YW55PjtcbiAgfVtdO1xuICBhcmdzOiBQYXJhbXM7XG4gIG5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVzIHtcbiAgZGF0YTogUm91dGU7XG4gIG1hdGNoKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTxMb2FkZWRSb3V0ZSB8IGZhbHNlPjtcbiAgY2hlY2sodGFyZ2V0OiBzdHJpbmcpOiBib29sZWFuO1xuICBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc2ltcGxlUXVlcnkocXVlcnk6IHN0cmluZykge1xuICBjb25zdCByOiBQYXJhbXMgPSB7fTtcbiAgcXVlcnlcbiAgICAuc3BsaXQoJyYnKVxuICAgIC5maWx0ZXIoKG8pID0+IG8pXG4gICAgLmZvckVhY2goKG8pID0+IHtcbiAgICAgIGNvbnN0IFtrLCB2XSA9IG8uc3BsaXQoJz0nKTtcbiAgICAgIHJbZGVjb2RlVVJJQ29tcG9uZW50KGspXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9KTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlcyhkYXRhOiBSb3V0ZSwgbmFtZXM6IE5hbWVzKTogUm91dGVzIHtcbiAgcmV0dXJuIHtcbiAgICBkYXRhLFxuICAgIGFzeW5jIG1hdGNoKHRhcmdldCkge1xuICAgICAgbGV0IF90bXAgPSB0YXJnZXQuc3BsaXQoJz8nKTtcbiAgICAgIGxldCBwYXRoID0gX3RtcC5zaGlmdCgpIHx8ICcnO1xuICAgICAgbGV0IHF1ZXJ5U3RyID0gX3RtcC5zaGlmdCgpIHx8ICcnO1xuXG4gICAgICBsZXQgcm9vdCA9IGRhdGE7XG4gICAgICBsZXQgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgICByZW1haW46IHBhdGgsXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXG4gICAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBub3QgbWF0Y2hcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbGV0IFtyb3V0ZUdldENvbXBvbmVudHMsIGFyZ3MsIG5hbWVdID0gcmVzdWx0O1xuXG4gICAgICAvLyBhY3R1YWxseSBpbXBvcnQgY29tcG9uZW50c1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMubWFwKCh7IGltcG9ydENvbXBvbmVudCB9KSA9PiBpbXBvcnRDb21wb25lbnQoKSksXG4gICAgICApO1xuXG4gICAgICBjb25zdCByb3V0ZSA9IGNvbXBvbmVudHMubWFwKChjb21wb25lbnQsIGkpID0+ICh7XG4gICAgICAgIHBhdGg6IHJvdXRlR2V0Q29tcG9uZW50c1tpXS5wYXRoLFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICB9KSk7XG5cbiAgICAgIC8vIHBhcnNlIHF1ZXJ5IHN0cmluZyAmIG1lcmdlIGFyZ3NcbiAgICAgIGFyZ3MgPSB7IC4uLnNpbXBsZVF1ZXJ5KHF1ZXJ5U3RyKSwgLi4uYXJncyB9O1xuXG4gICAgICAvLyBzdXBwb3J0IGluaXRpYWxQcm9wc1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50LmluaXRpYWxQcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICAgICAgICAuaW5pdGlhbFByb3BzKHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oKHByb3BzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0ge307XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm91dGUsXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIG5hbWUsXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hlY2sodGFyZ2V0KSB7XG4gICAgICBjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KCc/Jykuc2hpZnQoKSB8fCAnJztcbiAgICAgIGNvbnN0IHJvb3QgPSBkYXRhO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCk7XG4gICAgfSxcbiAgICBsaW5rKG5hbWUsIGFyZ3MpIHtcbiAgICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuXG4gICAgICBsZXQgcGF0aG5hbWUgPSAnLyc7XG4gICAgICBsZXQgcXVlcnlPYmo6IFBhcmFtcyA9IHt9O1xuXG4gICAgICBsZXQgbmFtZWQgPSBuYW1lc1tuYW1lXTtcbiAgICAgIGlmIChuYW1lZCkge1xuICAgICAgICAvLyBuYW1lZCByb3V0ZVxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmFtZWQucGFyYW1zT3B0aW9uYWwpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3Nba2V5XTtcblxuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSBmYWxzZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyZ3VtZW50IFske2tleX1dIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBuYW1lZC5wYXJhbXNSZWdleFtrZXldICsgJyQnKTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgcmVnZXgudGVzdChTdHJpbmcodmFsdWUpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYGFyZ3VtZW50IFske2tleX1dIGlzIGludmFsaWQsIG11c3QgbWF0Y2ggcmVnZXhwIFske25hbWVkLnBhcmFtc1JlZ2V4W2tleV19XWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoYCgke2tleX0pYCwgJycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgIGAoJHtrZXl9KWAsXG4gICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHF1ZXJ5IGFyZ3MgKHRoZSBhcmdzIGV4Y2x1ZGUgcm91dGUgYXJncylcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeU9ialtrZXldID0gYXJnc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcGF0aCByb3V0ZVxuICAgICAgICBwYXRobmFtZSA9IG5hbWU7XG4gICAgICAgIHF1ZXJ5T2JqID0gYXJncztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXMuc3RyaW5naWZ5KHF1ZXJ5T2JqLCB7IGFkZFF1ZXJ5UHJlZml4OiB0cnVlIH0pfWA7XG4gICAgfSxcbiAgfTtcbn1cblxuLy8g55So5LqO5pSv5oyBIHR5cGVzY3JpcHQg5o+Q56S655qEIG1vY2sg5pa55rOVXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzKGRhdGE6IFJvdXRlKTogUm91dGVzIHtcbiAgcmV0dXJuIHtcbiAgICBkYXRhLFxuICAgIGFzeW5jIG1hdGNoKF8pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGNoZWNrKF8pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGxpbmsoXywgX18pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9LFxuICB9O1xufVxuIl19