"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routes;
exports.createRoutes = createRoutes;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _qs = _interopRequireDefault(require("qs"));

var _utils = require("./utils");

var _NoSSR = _interopRequireDefault(require("./NoSSR"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getComponent(result, path, node) {
  if (!node.importComponent) {
    return;
  }

  if (node.ssr) {
    result.push({
      path: path,
      importComponent: node.importComponent
    });
  } else {
    result.push({
      path: '__NO_SSR__',
      importComponent: function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", _NoSSR["default"]);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function importComponent() {
          return _ref.apply(this, arguments);
        };
      }()
    });

    if ((0, _utils.isBrowser)()) {
      result.push({
        path: path,
        importComponent: node.importComponent
      });
    }
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
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _tmp, path, queryStr, root, result, _result, routeGetComponents, args, name, components, route;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
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
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", false);

              case 7:
                _result = (0, _slicedToArray2["default"])(result, 3), routeGetComponents = _result[0], args = _result[1], name = _result[2]; // actually import components

                _context2.next = 10;
                return Promise.all(routeGetComponents.map(function (_ref2) {
                  var importComponent = _ref2.importComponent;
                  return importComponent();
                }));

              case 10:
                components = _context2.sent;
                route = components.map(function (component, i) {
                  return {
                    path: routeGetComponents[i].path,
                    component: component
                  };
                }); // parse query string & merge args

                args = _objectSpread(_objectSpread({}, simpleQuery(queryStr)), args); // support routing

                _context2.next = 15;
                return Promise.all(components.map(function (component) {
                  if (component.routing) {
                    return component.routing({
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
                return _context2.abrupt("return", {
                  route: route,
                  args: args,
                  name: name,
                  path: path
                });

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
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
    link: function link(_ref3) {
      var name = _ref3.name,
          path = _ref3.path,
          args = _ref3.args;
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
      return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", false);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiZ2V0Q29tcG9uZW50IiwicmVzdWx0IiwicGF0aCIsIm5vZGUiLCJpbXBvcnRDb21wb25lbnQiLCJzc3IiLCJwdXNoIiwiTm9TU1IiLCJ0cmF2ZXJzZSIsImNvbnRleHQiLCJyZW1haW4iLCJyb3V0ZUdldENvbXBvbmVudHMiLCJyb3V0ZUFyZ3VtZW50cyIsInJlZ2V4IiwiUmVnRXhwIiwiX3BhdGgiLCJtYXRjaCIsImV4ZWMiLCJpIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX3BhcmFtcyIsImxhc3RJbmRleCIsIml0ZXJhdG9yIiwiY2hpbGRyZW4iLCJkZWZhdWx0Q2hpbGQiLCJjaGlsZCIsIm5hbWUiLCJzdWJzdHIiLCJzaW1wbGVRdWVyeSIsInF1ZXJ5IiwiciIsInNwbGl0IiwiZmlsdGVyIiwibyIsImZvckVhY2giLCJrIiwidiIsImRlY29kZVVSSUNvbXBvbmVudCIsInJvdXRlcyIsImRhdGEiLCJuYW1lcyIsInRhcmdldCIsIl90bXAiLCJzaGlmdCIsInF1ZXJ5U3RyIiwicm9vdCIsImFyZ3MiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiY29tcG9uZW50cyIsInJvdXRlIiwiY29tcG9uZW50Iiwicm91dGluZyIsInRoZW4iLCJwcm9wcyIsIl9wcm9wcyIsImNoZWNrIiwiQm9vbGVhbiIsImxpbmsiLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwiRXJyb3IiLCJuYW1lZCIsInBhdGhUZW1wbGF0ZSIsImtleSIsInBhcmFtc09wdGlvbmFsIiwidmFsdWUiLCJwYXJhbXNSZWdleCIsInRlc3QiLCJTdHJpbmciLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicXMiLCJzdHJpbmdpZnkiLCJhZGRRdWVyeVByZWZpeCIsImNyZWF0ZVJvdXRlcyIsIl8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQXNEQSxTQUFTQSxZQUFULENBQ0VD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QixDQStDekI7OztBQUNBLFVBQUloRSxJQUFKLEVBQVU7QUFDUjJELFFBQUFBLFFBQVEsR0FBRzNELElBQVg7QUFDQTRELFFBQUFBLFFBQVEsR0FBR2YsSUFBWDtBQUNEOztBQUVELHVCQUFVYyxRQUFWLFNBQXFCYSxlQUFHQyxTQUFILENBQWFiLFFBQWIsRUFBdUI7QUFBRWMsUUFBQUEsY0FBYyxFQUFFO0FBQWxCLE9BQXZCLENBQXJCO0FBQ0Q7QUE5SEksR0FBUDtBQWdJRCxDLENBRUQ7OztBQUNPLFNBQVNDLFlBQVQsQ0FBc0JyQyxJQUF0QixFQUEyQztBQUNoRCxTQUFPO0FBQ0xBLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVDeEIsSUFBQUEsS0FGRCxpQkFFTzhELENBRlAsRUFFVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrREFDTixLQURNOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWQsS0FKSTtBQUtMcEIsSUFBQUEsS0FMSyxpQkFLQ29CLENBTEQsRUFLSTtBQUNQLGFBQU8sS0FBUDtBQUNELEtBUEk7QUFRTGxCLElBQUFBLElBUkssZ0JBUUFrQixDQVJBLEVBUUc7QUFDTixhQUFPLEVBQVA7QUFDRDtBQVZJLEdBQVA7QUFZRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTm9TU1IgZnJvbSAnLi9Ob1NTUic7XG5cbmV4cG9ydCB0eXBlIFJvdXRpbmcgPSAobWF0Y2g6IHtcbiAgcGF0aDogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xuICBuYW1lPzogc3RyaW5nO1xufSkgPT4gUHJvbWlzZTxvYmplY3Q+O1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnQ8VD4gPSBDb21wb25lbnRUeXBlPFQ+ICYge1xuICByb3V0aW5nPzogUm91dGluZztcbiAgX3Byb3BzPzogb2JqZWN0O1xufTtcblxuZXhwb3J0IHR5cGUgSW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XG5cbmV4cG9ydCB0eXBlIFJvdXRlID0ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG4gIGNvbXBvbmVudD86IHN0cmluZztcbiAgc3NyPzogYm9vbGVhbjtcblxuICBfcGF0aD86IHN0cmluZztcbiAgX3BhcmFtcz86IHN0cmluZ1tdO1xuICBpbXBvcnRDb21wb25lbnQ/OiBJbXBvcnRDb21wb25lbnQ7XG5cbiAgY2hpbGRyZW4/OiBSb3V0ZVtdO1xufTtcblxudHlwZSBOYW1lcyA9IHtcbiAgW2tleTogc3RyaW5nXToge1xuICAgIHBhdGhUZW1wbGF0ZTogc3RyaW5nO1xuICAgIHBhcmFtc1JlZ2V4OiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBwYXJhbXNPcHRpb25hbDoge1xuICAgICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbiAgICB9O1xuICB9O1xufTtcblxudHlwZSBNYXRjaGVkUm91dGUgPSBbXG4gIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gIH1bXSxcbiAgUGFyYW1zLFxuICBzdHJpbmc/LFxuXTtcblxuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnQoXG4gIHJlc3VsdDoge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IEltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBwYXRoOiBzdHJpbmcsXG4gIG5vZGU6IFJvdXRlLFxuKSB7XG4gIGlmICghbm9kZS5pbXBvcnRDb21wb25lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobm9kZS5zc3IpIHtcbiAgICByZXN1bHQucHVzaCh7XG4gICAgICBwYXRoLFxuICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQucHVzaCh7XG4gICAgICBwYXRoOiAnX19OT19TU1JfXycsXG4gICAgICBpbXBvcnRDb21wb25lbnQ6IChhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBOb1NTUjtcbiAgICAgIH0pIGFzIEltcG9ydENvbXBvbmVudCxcbiAgICB9KTtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgcGF0aCxcbiAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShcbiAgbm9kZTogUm91dGUsXG4gIGNvbnRleHQ6IHtcbiAgICByZW1haW46IHN0cmluZztcbiAgICByb3V0ZUdldENvbXBvbmVudHM6IHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICAgIH1bXTtcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xuICB9LFxuKTogTWF0Y2hlZFJvdXRlIHwgZmFsc2Uge1xuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXG4gIC8vIGNvcHkgY29udGV4dFxuICBsZXQgcmVtYWluID0gY29udGV4dC5yZW1haW47XG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcblxuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XG5cbiAgaWYgKG5vZGUuX3BhdGgpIHtcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XG4gICAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCBtYXRjaFswXSwgbm9kZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gb3B0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgbWF0Y2hlZCBhcyB1bmRlZmluZWRcbiAgICAgICAgLy8gZmlsdGVyIHRoZW1cbiAgICAgICAgaWYgKG1hdGNoW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByb3V0ZUFyZ3VtZW50c1tub2RlLl9wYXJhbXMhW2kgLSAxXV0gPSBtYXRjaFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXRjaCBoYXMgcmVhY2hlZCB0YWlsXG4gICAgICBpZiAocmVnZXgubGFzdEluZGV4ID09PSByZW1haW4ubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG5vZGU7XG5cbiAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgZGVmYXVsdCByb3V0ZXMgb24gdGhlIHN1YnRyZWVcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZCA9IG51bGw7XG5cbiAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLl9wYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdENoaWxkID0gY2hpbGQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICAgICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuIGJ1dCBhIGRlZmF1bHQgb25lIGNhbid0IGJlIGZvdW5kXG4gICAgICAgICAgLy8gbWF0Y2ggd2lsbCBiZSBmYWlsLlxuICAgICAgICAgIGlmICghZGVmYXVsdENoaWxkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBpdGVyYXRvciA9IGRlZmF1bHRDaGlsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbcm91dGVHZXRDb21wb25lbnRzLCByb3V0ZUFyZ3VtZW50cywgaXRlcmF0b3IubmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGEgcm91dGUgd2l0aG91dCBwYXRoIChkZWZhdWx0IHJvdXRlKVxuICAgIC8vIHJlZ2FyZGVkIGFzIGFsd2F5cyBtYXRjaGVkXG4gICAgLy8gTm90ZTogVGhpcyB3aWxsIHBlcmZvcm0gYXMgYSBkZWVwLWZpcnN0IHRyZWUgc2VhcmNoXG4gICAgZ2V0Q29tcG9uZW50KHJvdXRlR2V0Q29tcG9uZW50cywgJ19fZGVmYXVsdF9fJywgbm9kZSk7XG4gIH1cblxuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKGNoaWxkLCB7XG4gICAgICAgIHJlbWFpbjogcmVtYWluLnN1YnN0cihyZWdleC5sYXN0SW5kZXgpLFxuXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cyxcbiAgICAgICAgcm91dGVBcmd1bWVudHMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZSBleHRlbmRzIExvY2F0aW9uIHtcbiAgcm91dGU6IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgY29tcG9uZW50OiBDb21wb25lbnQ8YW55PjtcbiAgfVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvY2F0aW9uIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXMge1xuICBkYXRhOiBSb3V0ZTtcbiAgbWF0Y2godGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPExvYWRlZFJvdXRlIHwgZmFsc2U+O1xuICBjaGVjayh0YXJnZXQ6IHN0cmluZyk6IGJvb2xlYW47XG4gIGxpbmsobG9jYXRpb246IExvY2F0aW9uKTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVRdWVyeShxdWVyeTogc3RyaW5nKSB7XG4gIGNvbnN0IHI6IFBhcmFtcyA9IHt9O1xuICBxdWVyeVxuICAgIC5zcGxpdCgnJicpXG4gICAgLmZpbHRlcigobykgPT4gbylcbiAgICAuZm9yRWFjaCgobykgPT4ge1xuICAgICAgY29uc3QgW2ssIHZdID0gby5zcGxpdCgnPScpO1xuICAgICAgcltkZWNvZGVVUklDb21wb25lbnQoayldID0gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH0pO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKGRhdGE6IFJvdXRlLCBuYW1lczogTmFtZXMpOiBSb3V0ZXMge1xuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgYXN5bmMgbWF0Y2godGFyZ2V0KSB7XG4gICAgICBsZXQgX3RtcCA9IHRhcmdldC5zcGxpdCgnPycpO1xuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICAgIGxldCByb290ID0gZGF0YTtcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vdCBtYXRjaFxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBsZXQgW3JvdXRlR2V0Q29tcG9uZW50cywgYXJncywgbmFtZV0gPSByZXN1bHQ7XG5cbiAgICAgIC8vIGFjdHVhbGx5IGltcG9ydCBjb21wb25lbnRzXG4gICAgICBjb25zdCBjb21wb25lbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5tYXAoKHsgaW1wb3J0Q29tcG9uZW50IH0pID0+IGltcG9ydENvbXBvbmVudCgpKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHJvdXRlID0gY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaSkgPT4gKHtcbiAgICAgICAgcGF0aDogcm91dGVHZXRDb21wb25lbnRzW2ldLnBhdGgsXG4gICAgICAgIGNvbXBvbmVudCxcbiAgICAgIH0pKTtcblxuICAgICAgLy8gcGFyc2UgcXVlcnkgc3RyaW5nICYgbWVyZ2UgYXJnc1xuICAgICAgYXJncyA9IHsgLi4uc2ltcGxlUXVlcnkocXVlcnlTdHIpLCAuLi5hcmdzIH07XG5cbiAgICAgIC8vIHN1cHBvcnQgcm91dGluZ1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50LnJvdXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgICAgLnJvdXRpbmcoe1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigocHJvcHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0gcHJvcHMgfHwge307XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSB7fTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgYXJncyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcGF0aCxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjaGVjayh0YXJnZXQpIHtcbiAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgICAgY29uc3Qgcm9vdCA9IGRhdGE7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzdWx0KTtcbiAgICB9LFxuICAgIGxpbmsoeyBuYW1lLCBwYXRoLCBhcmdzIH0pIHtcbiAgICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuXG4gICAgICBsZXQgcGF0aG5hbWUgPSAnLyc7XG4gICAgICBsZXQgcXVlcnlPYmo6IFBhcmFtcyA9IHt9O1xuXG4gICAgICAvLyBuYW1lZCByb3V0ZVxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgaWYgKCFuYW1lc1tuYW1lXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBuYW1lZCByb3V0ZSBbJHtuYW1lfV1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVkID0gbmFtZXNbbmFtZV07XG5cbiAgICAgICAgcGF0aG5hbWUgPSBuYW1lZC5wYXRoVGVtcGxhdGU7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuYW1lZC5wYXJhbXNPcHRpb25hbCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1trZXldO1xuXG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXJndW1lbnQgWyR7a2V5fV0gaXMgcmVxdWlyZWRgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiByZWdleC50ZXN0KFN0cmluZyh2YWx1ZSkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7bmFtZWQucGFyYW1zUmVnZXhba2V5XX1dYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShgKCR7a2V5fSlgLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgYCgke2tleX0pYCxcbiAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXJncykge1xuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHBhdGggcm91dGVcbiAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgIHBhdGhuYW1lID0gcGF0aDtcbiAgICAgICAgcXVlcnlPYmogPSBhcmdzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcbiAgICB9LFxuICB9O1xufVxuXG4vLyDnlKjkuo7mlK/mjIEgdHlwZXNjcmlwdCDmj5DnpLrnmoQgbW9jayDmlrnms5VcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb3V0ZXMoZGF0YTogUm91dGUpOiBSb3V0ZXMge1xuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgYXN5bmMgbWF0Y2goXykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY2hlY2soXykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgbGluayhfKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==