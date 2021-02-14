"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _qs = _interopRequireDefault(require("qs"));

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
      if (node.importComponent) {
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
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyb3V0ZXMiLCJkYXRhIiwibmFtZXMiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsImluaXRpYWxQcm9wcyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwibmFtZWQiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwiRXJyb3IiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFxREEsU0FBU0EsUUFBVCxDQUNFQyxJQURGLEVBRUVDLE9BRkYsRUFVd0I7QUFDdEI7QUFDQTtBQUNBLE1BQUlDLE1BQU0sR0FBR0Qs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Q0YsU0ExQlEsQ0E0QlQ7OztBQUNBLGFBQUssSUFBSUYsS0FBVCxJQUFnQmxCLElBQWhCLEVBQXNCO0FBQ3BCLGNBQUlnQixLQUFLLENBQUNHLGNBQU4sQ0FBcUJELEtBQXJCLE1BQThCOUMsU0FBbEMsRUFBNkM7QUFDM0MyQyxZQUFBQSxRQUFRLENBQUNHLEtBQUQsQ0FBUixHQUFnQmxCLElBQUksQ0FBQ2tCLEtBQUQsQ0FBcEI7QUFDRDtBQUNGO0FBQ0YsT0FsQ0QsTUFrQ087QUFDTDtBQUNBSixRQUFBQSxRQUFRLEdBQUduQyxJQUFYO0FBQ0FvQyxRQUFBQSxRQUFRLEdBQUdmLElBQVg7QUFDRDs7QUFFRCx1QkFBVWMsUUFBVixTQUFxQmEsZUFBR0MsU0FBSCxDQUFhYixRQUFiLEVBQXVCO0FBQUVjLFFBQUFBLGNBQWMsRUFBRTtBQUFsQixPQUF2QixDQUFyQjtBQUNEO0FBdEhJLEdBQVA7QUF3SEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHFzIGZyb20gJ3FzJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFByb3BzID0gKG1hdGNoOiB7XG4gIHBhdGg6IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn0pID0+IFByb21pc2U8b2JqZWN0PjtcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcbiAgaW5pdGlhbFByb3BzPzogSW5pdGlhbFByb3BzO1xuICBfcHJvcHM6IG9iamVjdDtcbn07XG5cbnR5cGUgaW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XG5cbnR5cGUgUm91dGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zOiBzdHJpbmdbXTtcbiAgaW1wb3J0Q29tcG9uZW50PzogaW1wb3J0Q29tcG9uZW50O1xuXG4gIGNoaWxkcmVuPzogUm91dGVbXTtcbn07XG5cbnR5cGUgTmFtZXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHtcbiAgICBwYXRoVGVtcGxhdGU6IHN0cmluZztcbiAgICBwYXJhbXNSZWdleDoge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG4gICAgcGFyYW1zT3B0aW9uYWw6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbn07XG5cbnR5cGUgTWF0Y2hlZFJvdXRlID0gW1xuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIFBhcmFtcyxcbiAgc3RyaW5nPyxcbl07XG5cbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gdHJhdmVyc2UoXG4gIG5vZGU6IFJvdXRlLFxuICBjb250ZXh0OiB7XG4gICAgcmVtYWluOiBzdHJpbmc7XG4gICAgcm91dGVHZXRDb21wb25lbnRzOiB7XG4gICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICBpbXBvcnRDb21wb25lbnQ6IGltcG9ydENvbXBvbmVudDtcbiAgICB9W107XG4gICAgcm91dGVBcmd1bWVudHM6IFBhcmFtcztcbiAgfSxcbik6IE1hdGNoZWRSb3V0ZSB8IGZhbHNlIHtcbiAgLy8gdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0cyBhZmZlY3QgZWFjaCBvdGhlclxuICAvLyBjb3B5IGNvbnRleHRcbiAgbGV0IHJlbWFpbiA9IGNvbnRleHQucmVtYWluO1xuICBsZXQgcm91dGVHZXRDb21wb25lbnRzID0gWy4uLmNvbnRleHQucm91dGVHZXRDb21wb25lbnRzXTtcbiAgbGV0IHJvdXRlQXJndW1lbnRzID0geyAuLi5jb250ZXh0LnJvdXRlQXJndW1lbnRzIH07XG5cbiAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBub2RlLl9wYXRoLCAnZycpO1xuXG4gIGlmIChub2RlLl9wYXRoKSB7XG4gICAgbGV0IG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gcmVnZXguZXhlYyhyZW1haW4pKSkge1xuICAgICAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBtYXRjaFswXSxcbiAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtc1tpIC0gMV1dID0gbWF0Y2hbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWF0Y2ggaGFzIHJlYWNoZWQgdGFpbFxuICAgICAgaWYgKHJlZ2V4Lmxhc3RJbmRleCA9PT0gcmVtYWluLmxlbmd0aCkge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSBub2RlO1xuXG4gICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlblxuICAgICAgICAvLyBzZWFyY2ggZm9yIGRlZmF1bHQgcm91dGVzIG9uIHRoZSBzdWJ0cmVlXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGQgPSBudWxsO1xuXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5fcGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRDaGlsZCA9IGNoaWxkO1xuXG4gICAgICAgICAgICAgIGlmIChkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGF0aDogJ19fZGVmYXVsdF9fJyxcbiAgICAgICAgICAgICAgICAgIGltcG9ydENvbXBvbmVudDogZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlbiBidXQgYSBkZWZhdWx0IG9uZSBjYW4ndCBiZSBmb3VuZFxuICAgICAgICAgIC8vIG1hdGNoIHdpbGwgYmUgZmFpbC5cbiAgICAgICAgICBpZiAoIWRlZmF1bHRDaGlsZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgaXRlcmF0b3IgPSBkZWZhdWx0Q2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3JvdXRlR2V0Q29tcG9uZW50cywgcm91dGVBcmd1bWVudHMsIGl0ZXJhdG9yLm5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhIHJvdXRlIHdpdGhvdXQgcGF0aCAoZGVmYXVsdCByb3V0ZSlcbiAgICAvLyByZWdhcmRlZCBhcyBhbHdheXMgbWF0Y2hlZFxuICAgIC8vIE5vdGU6IFRoaXMgd2lsbCBwZXJmb3JtIGFzIGEgZGVlcC1maXJzdCB0cmVlIHNlYXJjaFxuICAgIGlmIChub2RlLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShjaGlsZCwge1xuICAgICAgICByZW1haW46IHJlbWFpbi5zdWJzdHIocmVnZXgubGFzdEluZGV4KSxcblxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMsXG4gICAgICAgIHJvdXRlQXJndW1lbnRzLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGUge1xuICByb3V0ZToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xuICB9W107XG4gIGFyZ3M6IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXMge1xuICBtYXRjaCh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8TG9hZGVkUm91dGUgfCBmYWxzZT47XG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZVF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpIHtcbiAgY29uc3QgcjogUGFyYW1zID0ge307XG4gIHF1ZXJ5XG4gICAgLnNwbGl0KCcmJylcbiAgICAuZmlsdGVyKChvKSA9PiBvKVxuICAgIC5mb3JFYWNoKChvKSA9PiB7XG4gICAgICBjb25zdCBbaywgdl0gPSBvLnNwbGl0KCc9Jyk7XG4gICAgICByW2RlY29kZVVSSUNvbXBvbmVudChrKV0gPSBkZWNvZGVVUklDb21wb25lbnQodik7XG4gICAgfSk7XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoZGF0YTogUm91dGUsIG5hbWVzOiBOYW1lcyk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgYXN5bmMgbWF0Y2godGFyZ2V0KSB7XG4gICAgICBsZXQgX3RtcCA9IHRhcmdldC5zcGxpdCgnPycpO1xuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICAgIGxldCByb290ID0gZGF0YTtcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vdCBtYXRjaFxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBsZXQgW3JvdXRlR2V0Q29tcG9uZW50cywgYXJncywgbmFtZV0gPSByZXN1bHQ7XG5cbiAgICAgIC8vIGFjdHVhbGx5IGltcG9ydCBjb21wb25lbnRzXG4gICAgICBjb25zdCBjb21wb25lbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5tYXAoKHsgaW1wb3J0Q29tcG9uZW50IH0pID0+IGltcG9ydENvbXBvbmVudCgpKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJvdXRlID0gY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaSkgPT4gKHtcbiAgICAgICAgcGF0aDogcm91dGVHZXRDb21wb25lbnRzW2ldLnBhdGgsXG4gICAgICAgIGNvbXBvbmVudCxcbiAgICAgIH0pKTtcblxuICAgICAgLy8gcGFyc2UgcXVlcnkgc3RyaW5nICYgbWVyZ2UgYXJnc1xuICAgICAgYXJncyA9IHsgLi4uc2ltcGxlUXVlcnkocXVlcnlTdHIpLCAuLi5hcmdzIH07XG5cbiAgICAgIC8vIHN1cHBvcnQgaW5pdGlhbFByb3BzXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnQuaW5pdGlhbFByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XG4gICAgICAgICAgICAgIC5pbml0aWFsUHJvcHMoe1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0gcHJvcHMgfHwge307XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSB7fTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgYXJncyxcbiAgICAgICAgbmFtZSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjaGVjayh0YXJnZXQpIHtcbiAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgICAgY29uc3Qgcm9vdCA9IGRhdGE7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzdWx0KTtcbiAgICB9LFxuICAgIGxpbmsobmFtZSwgYXJncykge1xuICAgICAgYXJncyA9IGFyZ3MgfHwge307XG5cbiAgICAgIGxldCBwYXRobmFtZSA9ICcvJztcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAgIGxldCBuYW1lZCA9IG5hbWVzW25hbWVdO1xuICAgICAgaWYgKG5hbWVkKSB7XG4gICAgICAgIC8vIG5hbWVkIHJvdXRlXG4gICAgICAgIHBhdGhuYW1lID0gbmFtZWQucGF0aFRlbXBsYXRlO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuYW1lZC5wYXJhbXNPcHRpb25hbCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1trZXldO1xuXG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXJndW1lbnQgWyR7a2V5fV0gaXMgcmVxdWlyZWRgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiByZWdleC50ZXN0KFN0cmluZyh2YWx1ZSkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7bmFtZWQucGFyYW1zUmVnZXhba2V5XX1dYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShgKCR7a2V5fSlgLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgYCgke2tleX0pYCxcbiAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJncykge1xuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwYXRoIHJvdXRlXG4gICAgICAgIHBhdGhuYW1lID0gbmFtZTtcbiAgICAgICAgcXVlcnlPYmogPSBhcmdzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcbiAgICB9LFxuICB9O1xufVxuIl19