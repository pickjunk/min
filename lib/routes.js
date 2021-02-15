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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyb3V0ZXMiLCJkYXRhIiwibmFtZXMiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsImluaXRpYWxQcm9wcyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwibmFtZWQiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwiRXJyb3IiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCIsImNyZWF0ZVJvdXRlcyIsIl8iLCJfXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBcURBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVBVXdCO0FBQ3RCO0FB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USxrQkFBa0IsQ0FBQ0YsTUFBTSxDQUFDSixLQUFELENBQVAsQ0FGVCxDQUFYO0FBSUQ7QUFDRixTQTFCUSxDQTRCVDs7O0FBQ0EsYUFBSyxJQUFJRixLQUFULElBQWdCbEIsSUFBaEIsRUFBc0I7QUFDcEIsY0FBSWdCLEtBQUssQ0FBQ0csY0FBTixDQUFxQkQsS0FBckIsTUFBOEI5QyxTQUFsQyxFQUE2QztBQUMzQzJDLFlBQUFBLFFBQVEsQ0FBQ0csS0FBRCxDQUFSLEdBQWdCbEIsSUFBSSxDQUFDa0IsS0FBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRixPQWxDRCxNQWtDTztBQUNMO0FBQ0FKLFFBQUFBLFFBQVEsR0FBR25DLElBQVg7QUFDQW9DLFFBQUFBLFFBQVEsR0FBR2YsSUFBWDtBQUNEOztBQUVELHVCQUFVYyxRQUFWLFNBQXFCYSxlQUFHQyxTQUFILENBQWFiLFFBQWIsRUFBdUI7QUFBRWMsUUFBQUEsY0FBYyxFQUFFO0FBQWxCLE9BQXZCLENBQXJCO0FBQ0Q7QUF2SEksR0FBUDtBQXlIRCxDLENBRUQ7OztBQUNPLFNBQVNDLFlBQVQsQ0FBc0JyQyxJQUF0QixFQUEyQztBQUNoRCxTQUFPO0FBQ0xBLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVDNUIsSUFBQUEsS0FGRCxpQkFFT2tFLENBRlAsRUFFVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrREFDTixLQURNOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWQsS0FKSTtBQUtMcEIsSUFBQUEsS0FMSyxpQkFLQ29CLENBTEQsRUFLSTtBQUNQLGFBQU8sS0FBUDtBQUNELEtBUEk7QUFRTGxCLElBQUFBLElBUkssZ0JBUUFrQixDQVJBLEVBUUdDLEVBUkgsRUFRTztBQUNWLGFBQU8sRUFBUDtBQUNEO0FBVkksR0FBUDtBQVlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cbmV4cG9ydCB0eXBlIEluaXRpYWxQcm9wcyA9IChtYXRjaDoge1xuICBwYXRoOiBzdHJpbmc7XG4gIGFyZ3M/OiBQYXJhbXM7XG4gIG5hbWU/OiBzdHJpbmc7XG59KSA9PiBQcm9taXNlPG9iamVjdD47XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudDxUPiA9IENvbXBvbmVudFR5cGU8VD4gJiB7XG4gIGluaXRpYWxQcm9wcz86IEluaXRpYWxQcm9wcztcbiAgX3Byb3BzPzogb2JqZWN0O1xufTtcblxuZXhwb3J0IHR5cGUgaW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XG5cbmV4cG9ydCB0eXBlIFJvdXRlID0ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG4gIGNvbXBvbmVudD86IHN0cmluZztcblxuICBfcGF0aD86IHN0cmluZztcbiAgX3BhcmFtcz86IHN0cmluZ1tdO1xuICBpbXBvcnRDb21wb25lbnQ/OiBpbXBvcnRDb21wb25lbnQ7XG5cbiAgY2hpbGRyZW4/OiBSb3V0ZVtdO1xufTtcblxudHlwZSBOYW1lcyA9IHtcbiAgW2tleTogc3RyaW5nXToge1xuICAgIHBhdGhUZW1wbGF0ZTogc3RyaW5nO1xuICAgIHBhcmFtc1JlZ2V4OiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBwYXJhbXNPcHRpb25hbDoge1xuICAgICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbiAgICB9O1xuICB9O1xufTtcblxudHlwZSBNYXRjaGVkUm91dGUgPSBbXG4gIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgaW1wb3J0Q29tcG9uZW50OiBpbXBvcnRDb21wb25lbnQ7XG4gIH1bXSxcbiAgUGFyYW1zLFxuICBzdHJpbmc/LFxuXTtcblxuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiB0cmF2ZXJzZShcbiAgbm9kZTogUm91dGUsXG4gIGNvbnRleHQ6IHtcbiAgICByZW1haW46IHN0cmluZztcbiAgICByb3V0ZUdldENvbXBvbmVudHM6IHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xuICAgIH1bXTtcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xuICB9LFxuKTogTWF0Y2hlZFJvdXRlIHwgZmFsc2Uge1xuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXG4gIC8vIGNvcHkgY29udGV4dFxuICBsZXQgcmVtYWluID0gY29udGV4dC5yZW1haW47XG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcblxuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XG5cbiAgaWYgKG5vZGUuX3BhdGgpIHtcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XG4gICAgICBpZiAobm9kZS5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgIHBhdGg6IG1hdGNoWzBdLFxuICAgICAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIG9wdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIG1hdGNoZWQgYXMgdW5kZWZpbmVkXG4gICAgICAgIC8vIGZpbHRlciB0aGVtXG4gICAgICAgIGlmIChtYXRjaFtpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcm91dGVBcmd1bWVudHNbbm9kZS5fcGFyYW1zIVtpIC0gMV1dID0gbWF0Y2hbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWF0Y2ggaGFzIHJlYWNoZWQgdGFpbFxuICAgICAgaWYgKHJlZ2V4Lmxhc3RJbmRleCA9PT0gcmVtYWluLmxlbmd0aCkge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSBub2RlO1xuXG4gICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlblxuICAgICAgICAvLyBzZWFyY2ggZm9yIGRlZmF1bHQgcm91dGVzIG9uIHRoZSBzdWJ0cmVlXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGQgPSBudWxsO1xuXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5fcGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRDaGlsZCA9IGNoaWxkO1xuXG4gICAgICAgICAgICAgIGlmIChkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGF0aDogJ19fZGVmYXVsdF9fJyxcbiAgICAgICAgICAgICAgICAgIGltcG9ydENvbXBvbmVudDogZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlbiBidXQgYSBkZWZhdWx0IG9uZSBjYW4ndCBiZSBmb3VuZFxuICAgICAgICAgIC8vIG1hdGNoIHdpbGwgYmUgZmFpbC5cbiAgICAgICAgICBpZiAoIWRlZmF1bHRDaGlsZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgaXRlcmF0b3IgPSBkZWZhdWx0Q2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3JvdXRlR2V0Q29tcG9uZW50cywgcm91dGVBcmd1bWVudHMsIGl0ZXJhdG9yLm5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhIHJvdXRlIHdpdGhvdXQgcGF0aCAoZGVmYXVsdCByb3V0ZSlcbiAgICAvLyByZWdhcmRlZCBhcyBhbHdheXMgbWF0Y2hlZFxuICAgIC8vIE5vdGU6IFRoaXMgd2lsbCBwZXJmb3JtIGFzIGEgZGVlcC1maXJzdCB0cmVlIHNlYXJjaFxuICAgIGlmIChub2RlLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShjaGlsZCwge1xuICAgICAgICByZW1haW46IHJlbWFpbi5zdWJzdHIocmVnZXgubGFzdEluZGV4KSxcblxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMsXG4gICAgICAgIHJvdXRlQXJndW1lbnRzLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGUge1xuICByb3V0ZToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xuICB9W107XG4gIGFyZ3M6IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXMge1xuICBkYXRhOiBSb3V0ZTtcbiAgbWF0Y2godGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPExvYWRlZFJvdXRlIHwgZmFsc2U+O1xuICBjaGVjayh0YXJnZXQ6IHN0cmluZyk6IGJvb2xlYW47XG4gIGxpbmsobmFtZTogc3RyaW5nLCBhcmdzPzogUGFyYW1zKTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVRdWVyeShxdWVyeTogc3RyaW5nKSB7XG4gIGNvbnN0IHI6IFBhcmFtcyA9IHt9O1xuICBxdWVyeVxuICAgIC5zcGxpdCgnJicpXG4gICAgLmZpbHRlcigobykgPT4gbylcbiAgICAuZm9yRWFjaCgobykgPT4ge1xuICAgICAgY29uc3QgW2ssIHZdID0gby5zcGxpdCgnPScpO1xuICAgICAgcltkZWNvZGVVUklDb21wb25lbnQoayldID0gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH0pO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKGRhdGE6IFJvdXRlLCBuYW1lczogTmFtZXMpOiBSb3V0ZXMge1xuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgYXN5bmMgbWF0Y2godGFyZ2V0KSB7XG4gICAgICBsZXQgX3RtcCA9IHRhcmdldC5zcGxpdCgnPycpO1xuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICAgIGxldCByb290ID0gZGF0YTtcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vdCBtYXRjaFxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBsZXQgW3JvdXRlR2V0Q29tcG9uZW50cywgYXJncywgbmFtZV0gPSByZXN1bHQ7XG5cbiAgICAgIC8vIGFjdHVhbGx5IGltcG9ydCBjb21wb25lbnRzXG4gICAgICBjb25zdCBjb21wb25lbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5tYXAoKHsgaW1wb3J0Q29tcG9uZW50IH0pID0+IGltcG9ydENvbXBvbmVudCgpKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJvdXRlID0gY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaSkgPT4gKHtcbiAgICAgICAgcGF0aDogcm91dGVHZXRDb21wb25lbnRzW2ldLnBhdGgsXG4gICAgICAgIGNvbXBvbmVudCxcbiAgICAgIH0pKTtcblxuICAgICAgLy8gcGFyc2UgcXVlcnkgc3RyaW5nICYgbWVyZ2UgYXJnc1xuICAgICAgYXJncyA9IHsgLi4uc2ltcGxlUXVlcnkocXVlcnlTdHIpLCAuLi5hcmdzIH07XG5cbiAgICAgIC8vIHN1cHBvcnQgaW5pdGlhbFByb3BzXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnQuaW5pdGlhbFByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XG4gICAgICAgICAgICAgIC5pbml0aWFsUHJvcHMoe1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0gcHJvcHMgfHwge307XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSB7fTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgYXJncyxcbiAgICAgICAgbmFtZSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjaGVjayh0YXJnZXQpIHtcbiAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgICAgY29uc3Qgcm9vdCA9IGRhdGE7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzdWx0KTtcbiAgICB9LFxuICAgIGxpbmsobmFtZSwgYXJncykge1xuICAgICAgYXJncyA9IGFyZ3MgfHwge307XG5cbiAgICAgIGxldCBwYXRobmFtZSA9ICcvJztcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAgIGxldCBuYW1lZCA9IG5hbWVzW25hbWVdO1xuICAgICAgaWYgKG5hbWVkKSB7XG4gICAgICAgIC8vIG5hbWVkIHJvdXRlXG4gICAgICAgIHBhdGhuYW1lID0gbmFtZWQucGF0aFRlbXBsYXRlO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuYW1lZC5wYXJhbXNPcHRpb25hbCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1trZXldO1xuXG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXJndW1lbnQgWyR7a2V5fV0gaXMgcmVxdWlyZWRgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiByZWdleC50ZXN0KFN0cmluZyh2YWx1ZSkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7bmFtZWQucGFyYW1zUmVnZXhba2V5XX1dYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShgKCR7a2V5fSlgLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgYCgke2tleX0pYCxcbiAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJncykge1xuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwYXRoIHJvdXRlXG4gICAgICAgIHBhdGhuYW1lID0gbmFtZTtcbiAgICAgICAgcXVlcnlPYmogPSBhcmdzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcbiAgICB9LFxuICB9O1xufVxuXG4vLyDnlKjkuo7mlK/mjIEgdHlwZXNjcmlwdCDmj5DnpLrnmoQgbW9jayDmlrnms5VcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb3V0ZXMoZGF0YTogUm91dGUpOiBSb3V0ZXMge1xuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgYXN5bmMgbWF0Y2goXykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY2hlY2soXykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgbGluayhfLCBfXykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG4gIH07XG59XG4iXX0=