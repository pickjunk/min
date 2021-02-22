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
                  name: name,
                  path: path
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
    link: function link(_ref2) {
      var name = _ref2.name,
          path = _ref2.path,
          args = _ref2.args;
      args = args || {};
      var pathname = '/';
      var queryObj = {}; // named route

      if (name) {
        if (!names[name]) {
          throw new Error("unknown named route [".concat(name, "]"));
        }

        var named = names[name];
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
      } // path route


      if (path) {
        pathname = path;
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
    link: function link(_) {
      return '';
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiZ2V0Q29tcG9uZW50IiwicmVzdWx0IiwicGF0aCIsIm5vZGUiLCJpbXBvcnRDb21wb25lbnQiLCJzc3IiLCJwdXNoIiwidHJhdmVyc2UiLCJjb250ZXh0IiwicmVtYWluIiwicm91dGVHZXRDb21wb25lbnRzIiwicm91dGVBcmd1bWVudHMiLCJyZWdleCIsIlJlZ0V4cCIsIl9wYXRoIiwibWF0Y2giLCJleGVjIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyb3V0ZXMiLCJkYXRhIiwibmFtZXMiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsImluaXRpYWxQcm9wcyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwiRXJyb3IiLCJuYW1lZCIsInBhdGhUZW1wbGF0ZSIsImtleSIsInBhcmFtc09wdGlvbmFsIiwidmFsdWUiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCIsImNyZWF0ZVJvdXRlcyIsIl8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQXNEQSxTQUFTQSxZQUFULENBQ0VDLE1BREYsRUFL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Q04sS0FETTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVkLEtBSkk7QUFLTHBCLElBQUFBLEtBTEssaUJBS0NvQixDQUxELEVBS0k7QUFDUCxhQUFPLEtBQVA7QUFDRCxLQVBJO0FBUUxsQixJQUFBQSxJQVJLLGdCQVFBa0IsQ0FSQSxFQVFHO0FBQ04sYUFBTyxFQUFQO0FBQ0Q7QUFWSSxHQUFQO0FBWUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcbmltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBJbml0aWFsUHJvcHMgPSAobWF0Y2g6IHtcbiAgcGF0aDogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xuICBuYW1lPzogc3RyaW5nO1xufSkgPT4gUHJvbWlzZTxvYmplY3Q+O1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnQ8VD4gPSBDb21wb25lbnRUeXBlPFQ+ICYge1xuICBpbml0aWFsUHJvcHM/OiBJbml0aWFsUHJvcHM7XG4gIF9wcm9wcz86IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEltcG9ydENvbXBvbmVudCA9ICgpID0+IFByb21pc2U8Q29tcG9uZW50PGFueT4+O1xuXG5leHBvcnQgdHlwZSBSb3V0ZSA9IHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZGlyZWN0b3J5Pzogc3RyaW5nO1xuICBjb21wb25lbnQ/OiBzdHJpbmc7XG4gIHNzcj86IGJvb2xlYW47XG5cbiAgX3BhdGg/OiBzdHJpbmc7XG4gIF9wYXJhbXM/OiBzdHJpbmdbXTtcbiAgaW1wb3J0Q29tcG9uZW50PzogSW1wb3J0Q29tcG9uZW50O1xuXG4gIGNoaWxkcmVuPzogUm91dGVbXTtcbn07XG5cbnR5cGUgTmFtZXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHtcbiAgICBwYXRoVGVtcGxhdGU6IHN0cmluZztcbiAgICBwYXJhbXNSZWdleDoge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG4gICAgcGFyYW1zT3B0aW9uYWw6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbn07XG5cbnR5cGUgTWF0Y2hlZFJvdXRlID0gW1xuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIFBhcmFtcyxcbiAgc3RyaW5nPyxcbl07XG5cbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KFxuICByZXN1bHQ6IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gIH1bXSxcbiAgcGF0aDogc3RyaW5nLFxuICBub2RlOiBSb3V0ZSxcbikge1xuICBpZiAobm9kZS5pbXBvcnRDb21wb25lbnQgJiYgKG5vZGUuc3NyIHx8IGlzQnJvd3NlcigpKSkge1xuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIHBhdGgsXG4gICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKFxuICBub2RlOiBSb3V0ZSxcbiAgY29udGV4dDoge1xuICAgIHJlbWFpbjogc3RyaW5nO1xuICAgIHJvdXRlR2V0Q29tcG9uZW50czoge1xuICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gICAgfVtdO1xuICAgIHJvdXRlQXJndW1lbnRzOiBQYXJhbXM7XG4gIH0sXG4pOiBNYXRjaGVkUm91dGUgfCBmYWxzZSB7XG4gIC8vIHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHMgYWZmZWN0IGVhY2ggb3RoZXJcbiAgLy8gY29weSBjb250ZXh0XG4gIGxldCByZW1haW4gPSBjb250ZXh0LnJlbWFpbjtcbiAgbGV0IHJvdXRlR2V0Q29tcG9uZW50cyA9IFsuLi5jb250ZXh0LnJvdXRlR2V0Q29tcG9uZW50c107XG4gIGxldCByb3V0ZUFyZ3VtZW50cyA9IHsgLi4uY29udGV4dC5yb3V0ZUFyZ3VtZW50cyB9O1xuXG4gIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbm9kZS5fcGF0aCwgJ2cnKTtcblxuICBpZiAobm9kZS5fcGF0aCkge1xuICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluKSkpIHtcbiAgICAgIGdldENvbXBvbmVudChyb3V0ZUdldENvbXBvbmVudHMsIG1hdGNoWzBdLCBub2RlKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtcyFbaSAtIDFdXSA9IG1hdGNoW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1hdGNoIGhhcyByZWFjaGVkIHRhaWxcbiAgICAgIGlmIChyZWdleC5sYXN0SW5kZXggPT09IHJlbWFpbi5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbm9kZTtcblxuICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBkZWZhdWx0IHJvdXRlcyBvbiB0aGUgc3VidHJlZVxuICAgICAgICB3aGlsZSAoaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkID0gbnVsbDtcblxuICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX3BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSBjaGlsZDtcblxuICAgICAgICAgICAgICBpZiAoZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXG4gICAgICAgICAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW4gYnV0IGEgZGVmYXVsdCBvbmUgY2FuJ3QgYmUgZm91bmRcbiAgICAgICAgICAvLyBtYXRjaCB3aWxsIGJlIGZhaWwuXG4gICAgICAgICAgaWYgKCFkZWZhdWx0Q2hpbGQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIGl0ZXJhdG9yID0gZGVmYXVsdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtyb3V0ZUdldENvbXBvbmVudHMsIHJvdXRlQXJndW1lbnRzLCBpdGVyYXRvci5uYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYSByb3V0ZSB3aXRob3V0IHBhdGggKGRlZmF1bHQgcm91dGUpXG4gICAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcbiAgICAvLyBOb3RlOiBUaGlzIHdpbGwgcGVyZm9ybSBhcyBhIGRlZXAtZmlyc3QgdHJlZSBzZWFyY2hcbiAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCAnX19kZWZhdWx0X18nLCBub2RlKTtcbiAgfVxuXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcbiAgICAgICAgcmVtYWluOiByZW1haW4uc3Vic3RyKHJlZ2V4Lmxhc3RJbmRleCksXG5cbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLFxuICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlIGV4dGVuZHMgTG9jYXRpb24ge1xuICByb3V0ZToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xuICB9W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRpb24ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIGRhdGE6IFJvdXRlO1xuICBtYXRjaCh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8TG9hZGVkUm91dGUgfCBmYWxzZT47XG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcbiAgbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZVF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpIHtcbiAgY29uc3QgcjogUGFyYW1zID0ge307XG4gIHF1ZXJ5XG4gICAgLnNwbGl0KCcmJylcbiAgICAuZmlsdGVyKChvKSA9PiBvKVxuICAgIC5mb3JFYWNoKChvKSA9PiB7XG4gICAgICBjb25zdCBbaywgdl0gPSBvLnNwbGl0KCc9Jyk7XG4gICAgICByW2RlY29kZVVSSUNvbXBvbmVudChrKV0gPSBkZWNvZGVVUklDb21wb25lbnQodik7XG4gICAgfSk7XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoZGF0YTogUm91dGUsIG5hbWVzOiBOYW1lcyk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaCh0YXJnZXQpIHtcbiAgICAgIGxldCBfdG1wID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XG4gICAgICBsZXQgcGF0aCA9IF90bXAuc2hpZnQoKSB8fCAnJztcbiAgICAgIGxldCBxdWVyeVN0ciA9IF90bXAuc2hpZnQoKSB8fCAnJztcblxuICAgICAgbGV0IHJvb3QgPSBkYXRhO1xuICAgICAgbGV0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgLy8gbm90IG1hdGNoXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCBbcm91dGVHZXRDb21wb25lbnRzLCBhcmdzLCBuYW1lXSA9IHJlc3VsdDtcblxuICAgICAgLy8gYWN0dWFsbHkgaW1wb3J0IGNvbXBvbmVudHNcbiAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLm1hcCgoeyBpbXBvcnRDb21wb25lbnQgfSkgPT4gaW1wb3J0Q29tcG9uZW50KCkpLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgcm91dGUgPSBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50LCBpKSA9PiAoe1xuICAgICAgICBwYXRoOiByb3V0ZUdldENvbXBvbmVudHNbaV0ucGF0aCxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgfSkpO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5zaW1wbGVRdWVyeShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gc3VwcG9ydCBpbml0aWFsUHJvcHNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5pbml0aWFsUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgICAgLmluaXRpYWxQcm9wcyh7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKChwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHt9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdXRlLFxuICAgICAgICBhcmdzLFxuICAgICAgICBuYW1lLFxuICAgICAgICBwYXRoLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNoZWNrKHRhcmdldCkge1xuICAgICAgY29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdCgnPycpLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBjb25zdCByb290ID0gZGF0YTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgICByZW1haW46IHBhdGgsXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXG4gICAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gQm9vbGVhbihyZXN1bHQpO1xuICAgIH0sXG4gICAgbGluayh7IG5hbWUsIHBhdGgsIGFyZ3MgfSkge1xuICAgICAgYXJncyA9IGFyZ3MgfHwge307XG5cbiAgICAgIGxldCBwYXRobmFtZSA9ICcvJztcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAgIC8vIG5hbWVkIHJvdXRlXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBpZiAoIW5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIG5hbWVkIHJvdXRlIFske25hbWV9XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZWQgPSBuYW1lc1tuYW1lXTtcblxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5hbWVkLnBhcmFtc09wdGlvbmFsKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2tleV07XG5cbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gZmFsc2UgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhcmd1bWVudCBbJHtrZXl9XSBpcyByZXF1aXJlZGApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbmFtZWQucGFyYW1zUmVnZXhba2V5XSArICckJyk7XG4gICAgICAgICAgaWYgKHZhbHVlICYmIHJlZ2V4LnRlc3QoU3RyaW5nKHZhbHVlKSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBhcmd1bWVudCBbJHtrZXl9XSBpcyBpbnZhbGlkLCBtdXN0IG1hdGNoIHJlZ2V4cCBbJHtuYW1lZC5wYXJhbXNSZWdleFtrZXldfV1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKGAoJHtrZXl9KWAsICcnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICBgKCR7a2V5fSlgLFxuICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBxdWVyeSBhcmdzICh0aGUgYXJncyBleGNsdWRlIHJvdXRlIGFyZ3MpXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlPYmpba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcGF0aCByb3V0ZVxuICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBwYXRoO1xuICAgICAgICBxdWVyeU9iaiA9IGFyZ3M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwYXRobmFtZX0ke3FzLnN0cmluZ2lmeShxdWVyeU9iaiwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KX1gO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIOeUqOS6juaUr+aMgSB0eXBlc2NyaXB0IOaPkOekuueahCBtb2NrIOaWueazlVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcyhkYXRhOiBSb3V0ZSk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaChfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjaGVjayhfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBsaW5rKF8pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9LFxuICB9O1xufVxuIl19