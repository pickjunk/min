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

                args = _objectSpread(_objectSpread({}, simpleQuery(queryStr)), args); // support initialProps

                _context2.next = 15;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiZ2V0Q29tcG9uZW50IiwicmVzdWx0IiwicGF0aCIsIm5vZGUiLCJpbXBvcnRDb21wb25lbnQiLCJzc3IiLCJwdXNoIiwiTm9TU1IiLCJ0cmF2ZXJzZSIsImNvbnRleHQiLCJyZW1haW4iLCJyb3V0ZUdldENvbXBvbmVudHMiLCJyb3V0ZUFyZ3VtZW50cyIsInJlZ2V4IiwiUmVnRXhwIiwiX3BhdGgiLCJtYXRjaCIsImV4ZWMiLCJpIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiX3BhcmFtcyIsImxhc3RJbmRleCIsIml0ZXJhdG9yIiwiY2hpbGRyZW4iLCJkZWZhdWx0Q2hpbGQiLCJjaGlsZCIsIm5hbWUiLCJzdWJzdHIiLCJzaW1wbGVRdWVyeSIsInF1ZXJ5IiwiciIsInNwbGl0IiwiZmlsdGVyIiwibyIsImZvckVhY2giLCJrIiwidiIsImRlY29kZVVSSUNvbXBvbmVudCIsInJvdXRlcyIsImRhdGEiLCJuYW1lcyIsInRhcmdldCIsIl90bXAiLCJzaGlmdCIsInF1ZXJ5U3RyIiwicm9vdCIsImFyZ3MiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiY29tcG9uZW50cyIsInJvdXRlIiwiY29tcG9uZW50IiwiaW5pdGlhbFByb3BzIiwidGhlbiIsInByb3BzIiwiX3Byb3BzIiwiY2hlY2siLCJCb29sZWFuIiwibGluayIsInBhdGhuYW1lIiwicXVlcnlPYmoiLCJFcnJvciIsIm5hbWVkIiwicGF0aFRlbXBsYXRlIiwia2V5IiwicGFyYW1zT3B0aW9uYWwiLCJ2YWx1ZSIsInBhcmFtc1JlZ2V4IiwidGVzdCIsIlN0cmluZyIsInJlcGxhY2UiLCJlbmNvZGVVUklDb21wb25lbnQiLCJxcyIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4IiwiY3JlYXRlUm91dGVzIiwiXyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBc0RBLFNBQVNBLFlBQVQsQ0FDRUMsTUFERixFQUtFQyxJQUxGLEVBTUVDLElBTkYsRUFPRTtBQUNBLE1BQUksQ0FBQ0EsSUFBSSxDQUFDQyxlQUFWLEVBQTJCO0FBQ3pCO0FBQ0Q7O0FBRUQsTUFBSUQsSUFBSSxDQUFDRSxHQUFULEVBQWM7QUFDWkosSUFBQUEsTUFBTSxDQUFDSyxJQUFQLENBQVk7QUFDVkosTUFBQUEsSUFBSSxFQUFKQSxJQURVO0FBRVZFLE1BQUFBLGVBQWUsRUFBRUQsSUFBSSxDQUFDQztBQUZaLEtBQVo7QUFJRCxHQUxELE1BS087QUFDTEgsSUFBQUEsTUFBTSxDQUFDSyxJQUFQLENBQVk7QUFDVkosTUFBQUEsSUFBSSxFQUFFLFlBREk7QUFFVkUsTUFBQUEsZUFBZTtBQUFBLGlHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtREFDVEcsaUJBRFM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZMLEtBQVo7O0FBTUEsUUFBSSx1QkFBSixFQUFpQjtBQUNmTixNQUFBQSxNQUFNLENBQUNLLElBQVAsQ0FBWTtBQUNWSixRQUFBQSxJQUFJLEVBQUpBLElBRFU7QUFFVkUsUUFBQUEsZUFBZSxFQUFFRCxJQUFJLENBQUNDO0FBRlosT0FBWjtBQUlEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTSSxRQUFULENBQ0VMLElBREYsRUFFRU0sT0FGRixFQVV3QjtBQUN0QjtBQUNBO0FBQ0EsTUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUNDLE1BQXJCO0FBQ0EsTUFBSUMsa0JBQWtCLHVDQUFPRixPQUFPLENBQUNFLGtCQUFmLENBQXRCOztBQUNBLE1BQUlDLGNBQWMscUJBQVFILE9BQU8sQ0FBQ0csY0FBaEIsQ0FBbEI7O0FBRUEsTUFBSUMsS0FBSyxHQUFHLElBQUlDLE1BQUosQ0FBVyxNQUFNWCxJQUFJLENBQUNZLEtBQXRCLEVBQTZCLEdBQTdCLENBQVo7O0FBRUEsTUFBSVosSUFBSSxDQUFDWSxLQUFULEVBQWdCO0FBQ2QsUUFBSUMsTUFBSyxHQUFHLElBQVo7O0FBQ0EsUUFBS0EsTUFBSyxHQUFHSCxLQUFLLENBQUNJLElBQU4sQ0FBV1AsTUFBWCxDQUFiLEVBQWtDO0FBQ2hDVixNQUFBQSxZQUFZLENBQUNXLGtCQUFELEVBQXFCSyxNQUFLLENBQUMsQ0FBRCxDQUExQixFQUErQmIsSUFBL0IsQ0FBWjs7QUFFQSxXQUFLLElBQUllLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLE1BQUssQ0FBQ0csTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckM7QUFDQTtBQUNBLFlBQUlGLE1BQUssQ0FBQ0UsQ0FBRCxDQUFMLEtBQWFFLFNBQWpCLEVBQTRCO0FBQzFCUixVQUFBQSxjQUFjLENBQUNULElBQUksQ0FBQ2tCLE9BQUwsQ0FBY0gsQ0FBQyxHQUFHLENBQWxCLENBQUQsQ0FBZCxHQUF1Q0YsTUFBSyxDQUFDRSxDQUFELENBQTVDO0FBQ0Q7QUFDRixPQVQrQixDQVdoQzs7O0FBQ0EsVUFBSUwsS0FBSyxDQUFDUyxTQUFOLEtBQW9CWixNQUFNLENBQUNTLE1BQS9CLEVBQXVDO0FBQ3JDLFlBQUlJLFFBQVEsR0FBR3BCLElBQWYsQ0FEcUMsQ0FHckM7QUFDQTs7QUFDQSxlQUFPb0IsUUFBUSxDQUFDQyxRQUFoQixFQUEwQjtBQUN4QixjQUFJQyxZQUFZLEdBQUcsSUFBbkI7O0FBRHdCLHFEQUdORixRQUFRLENBQUNDLFFBSEg7QUFBQTs7QUFBQTtBQUd4QixnRUFBcUM7QUFBQSxrQkFBNUJFLEtBQTRCOztBQUNuQyxrQkFBSUEsS0FBSyxDQUFDWCxLQUFOLEtBQWdCSyxTQUFwQixFQUErQjtBQUM3QkssZ0JBQUFBLFlBQVksR0FBR0MsS0FBZjs7QUFFQSxvQkFBSUQsWUFBWSxDQUFDckIsZUFBakIsRUFBa0M7QUFDaENPLGtCQUFBQSxrQkFBa0IsQ0FBQ0wsSUFBbkIsQ0FBd0I7QUFDdEJKLG9CQUFBQSxJQUFJLEVBQUUsYUFEZ0I7QUFFdEJFLG9CQUFBQSxlQUFlLEVBQUVxQixZQUFZLENBQUNyQjtBQUZSLG1CQUF4QjtBQUlEOztBQUVEO0FBQ0Q7QUFDRixhQWhCdUIsQ0FrQnhCO0FBQ0E7O0FBbkJ3QjtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW9CeEIsY0FBSSxDQUFDcUIsWUFBTCxFQUFtQixPQUFPLEtBQVA7QUFFbkJGLFVBQUFBLFFBQVEsR0FBR0UsWUFBWDtBQUNEOztBQUVELGVBQU8sQ0FBQ2Qsa0JBQUQsRUFBcUJDLGNBQXJCLEVBQXFDVyxRQUFRLENBQUNJLElBQTlDLENBQVA7QUFDRDtBQUNGO0FBQ0YsR0EvQ0QsTUErQ087QUFDTDtBQUNBO0FBQ0E7QUFDQTNCLElBQUFBLFlBQVksQ0FBQ1csa0JBQUQsRUFBcUIsYUFBckIsRUFBb0NSLElBQXBDLENBQVo7QUFDRDs7QUFFRCxNQUFJQSxJQUFJLENBQUNxQixRQUFULEVBQW1CO0FBQUEsZ0RBQ0NyQixJQUFJLENBQUNxQixRQUROO0FBQUE7O0FBQUE7QUFDakIsNkRBQWlDO0FBQUEsWUFBeEJFLE1BQXdCO0FBQy9CLFlBQU16QixNQUFNLEdBQUdPLFFBQVEsQ0FBQ2tCLE1BQUQsRUFBUTtBQUM3QmhCLFVBQUFBLE1BQU0sRUFBRUEsTUFBTSxDQUFDa0IsTUFBUCxDQUFjZixLQUFLLENBQUNTLFNBQXBCLENBRHFCO0FBRzdCWCxVQUFBQSxrQkFBa0IsRUFBbEJBLGtCQUg2QjtBQUk3QkMsVUFBQUEsY0FBYyxFQUFkQTtBQUo2QixTQUFSLENBQXZCOztBQU9BLFlBQUlYLE1BQUosRUFBWTtBQUNWLGlCQUFPQSxNQUFQO0FBQ0Q7QUFDRjtBQVpnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYWxCOztBQUVELFNBQU8sS0FBUDtBQUNEOztBQXNCRCxTQUFTNEIsV0FBVCxDQUFxQkMsS0FBckIsRUFBb0M7QUFDbEMsTUFBTUMsQ0FBUyxHQUFHLEVBQWxCO0FBQ0FELEVBQUFBLEtBQUssQ0FDRkUsS0FESCxDQUNTLEdBRFQsRUFFR0MsTUFGSCxDQUVVLFVBQUNDLENBQUQ7QUFBQSxXQUFPQSxDQUFQO0FBQUEsR0FGVixFQUdHQyxPQUhILENBR1csVUFBQ0QsQ0FBRCxFQUFPO0FBQUEsbUJBQ0NBLENBQUMsQ0FBQ0YsS0FBRixDQUFRLEdBQVIsQ0FERDtBQUFBO0FBQUEsUUFDUEksQ0FETztBQUFBLFFBQ0pDLENBREk7O0FBRWROLElBQUFBLENBQUMsQ0FBQ08sa0JBQWtCLENBQUNGLENBQUQsQ0FBbkIsQ0FBRCxHQUEyQkUsa0JBQWtCLENBQUNELENBQUQsQ0FBN0M7QUFDRCxHQU5IO0FBT0EsU0FBT04sQ0FBUDtBQUNEOztBQUVjLFNBQVNRLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQTZCQyxLQUE3QixFQUFtRDtBQUNoRSxTQUFPO0FBQ0xELElBQUFBLElBQUksRUFBSkEsSUFESztBQUVDeEIsSUFBQUEsS0FGRCxpQkFFTzBCLE1BRlAsRUFFZTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDZEMsZ0JBQUFBLElBRGMsR0FDUEQsTUFBTSxDQUFDVixLQUFQLENBQWEsR0FBYixDQURPO0FBRWQ5QixnQkFBQUEsSUFGYyxHQUVQeUMsSUFBSSxDQUFDQyxLQUFMLE1BQWdCLEVBRlQ7QUFHZEMsZ0JBQUFBLFFBSGMsR0FHSEYsSUFBSSxDQUFDQyxLQUFMLE1BQWdCLEVBSGI7QUFLZEUsZ0JBQUFBLElBTGMsR0FLUE4sSUFMTztBQU1kdkMsZ0JBQUFBLE1BTmMsR0FNTE8sUUFBUSxDQUFDc0MsSUFBRCxFQUFPO0FBQzFCcEMsa0JBQUFBLE1BQU0sRUFBRVIsSUFEa0I7QUFFMUJTLGtCQUFBQSxrQkFBa0IsRUFBRSxFQUZNO0FBRzFCQyxrQkFBQUEsY0FBYyxFQUFFO0FBSFUsaUJBQVAsQ0FOSCxFQVlsQjs7QUFaa0Isc0JBYWRYLE1BQU0sS0FBSyxLQWJHO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtEQWNULEtBZFM7O0FBQUE7QUFBQSwwREFpQnFCQSxNQWpCckIsTUFpQmJVLGtCQWpCYSxlQWlCT29DLElBakJQLGVBaUJhcEIsSUFqQmIsZUFtQmxCOztBQW5Ca0I7QUFBQSx1QkFvQk9xQixPQUFPLENBQUNDLEdBQVIsQ0FDdkJ0QyxrQkFBa0IsQ0FBQ3VDLEdBQW5CLENBQXVCO0FBQUEsc0JBQUc5QyxlQUFILFNBQUdBLGVBQUg7QUFBQSx5QkFBeUJBLGVBQWUsRUFBeEM7QUFBQSxpQkFBdkIsQ0FEdUIsQ0FwQlA7O0FBQUE7QUFvQlorQyxnQkFBQUEsVUFwQlk7QUF3QlpDLGdCQUFBQSxLQXhCWSxHQXdCSkQsVUFBVSxDQUFDRCxHQUFYLENBQWUsVUFBQ0csU0FBRCxFQUFZbkMsQ0FBWjtBQUFBLHlCQUFtQjtBQUM5Q2hCLG9CQUFBQSxJQUFJLEVBQUVTLGtCQUFrQixDQUFDTyxDQUFELENBQWxCLENBQXNCaEIsSUFEa0I7QUFFOUNtRCxvQkFBQUEsU0FBUyxFQUFUQTtBQUY4QyxtQkFBbkI7QUFBQSxpQkFBZixDQXhCSSxFQTZCbEI7O0FBQ0FOLGdCQUFBQSxJQUFJLG1DQUFRbEIsV0FBVyxDQUFDZ0IsUUFBRCxDQUFuQixHQUFrQ0UsSUFBbEMsQ0FBSixDQTlCa0IsQ0FnQ2xCOztBQWhDa0I7QUFBQSx1QkFpQ1pDLE9BQU8sQ0FBQ0MsR0FBUixDQUNKRSxVQUFVLENBQUNELEdBQVgsQ0FBZSxVQUFDRyxTQUFELEVBQWU7QUFDNUIsc0JBQUlBLFNBQVMsQ0FBQ0MsWUFBZCxFQUE0QjtBQUMxQiwyQkFBT0QsU0FBUyxDQUNiQyxZQURJLENBQ1M7QUFDWnBELHNCQUFBQSxJQUFJLEVBQUpBLElBRFk7QUFFWjZDLHNCQUFBQSxJQUFJLEVBQUpBLElBRlk7QUFHWnBCLHNCQUFBQSxJQUFJLEVBQUpBO0FBSFkscUJBRFQsRUFNSjRCLElBTkksQ0FNQyxVQUFDQyxLQUFELEVBQVc7QUFDZkgsc0JBQUFBLFNBQVMsQ0FBQ0ksTUFBVixHQUFtQkQsS0FBSyxJQUFJLEVBQTVCO0FBQ0QscUJBUkksQ0FBUDtBQVNEOztBQUVESCxrQkFBQUEsU0FBUyxDQUFDSSxNQUFWLEdBQW1CLEVBQW5CO0FBQ0QsaUJBZEQsQ0FESSxDQWpDWTs7QUFBQTtBQUFBLGtEQW1EWDtBQUNMTCxrQkFBQUEsS0FBSyxFQUFMQSxLQURLO0FBRUxMLGtCQUFBQSxJQUFJLEVBQUpBLElBRks7QUFHTHBCLGtCQUFBQSxJQUFJLEVBQUpBLElBSEs7QUFJTHpCLGtCQUFBQSxJQUFJLEVBQUpBO0FBSkssaUJBbkRXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeURuQixLQTNESTtBQTRETHdELElBQUFBLEtBNURLLGlCQTREQ2hCLE1BNURELEVBNERTO0FBQ1osVUFBTXhDLElBQUksR0FBR3dDLE1BQU0sQ0FBQ1YsS0FBUCxDQUFhLEdBQWIsRUFBa0JZLEtBQWxCLE1BQTZCLEVBQTFDO0FBQ0EsVUFBTUUsSUFBSSxHQUFHTixJQUFiO0FBRUEsVUFBTXZDLE1BQU0sR0FBR08sUUFBUSxDQUFDc0MsSUFBRCxFQUFPO0FBQzVCcEMsUUFBQUEsTUFBTSxFQUFFUixJQURvQjtBQUU1QlMsUUFBQUEsa0JBQWtCLEVBQUUsRUFGUTtBQUc1QkMsUUFBQUEsY0FBYyxFQUFFO0FBSFksT0FBUCxDQUF2QjtBQU1BLGFBQU8rQyxPQUFPLENBQUMxRCxNQUFELENBQWQ7QUFDRCxLQXZFSTtBQXdFTDJELElBQUFBLElBeEVLLHVCQXdFc0I7QUFBQSxVQUFwQmpDLElBQW9CLFNBQXBCQSxJQUFvQjtBQUFBLFVBQWR6QixJQUFjLFNBQWRBLElBQWM7QUFBQSxVQUFSNkMsSUFBUSxTQUFSQSxJQUFRO0FBQ3pCQSxNQUFBQSxJQUFJLEdBQUdBLElBQUksSUFBSSxFQUFmO0FBRUEsVUFBSWMsUUFBUSxHQUFHLEdBQWY7QUFDQSxVQUFJQyxRQUFnQixHQUFHLEVBQXZCLENBSnlCLENBTXpCOztBQUNBLFVBQUluQyxJQUFKLEVBQVU7QUFDUixZQUFJLENBQUNjLEtBQUssQ0FBQ2QsSUFBRCxDQUFWLEVBQWtCO0FBQ2hCLGdCQUFNLElBQUlvQyxLQUFKLGdDQUFrQ3BDLElBQWxDLE9BQU47QUFDRDs7QUFFRCxZQUFNcUMsS0FBSyxHQUFHdkIsS0FBSyxDQUFDZCxJQUFELENBQW5CO0FBRUFrQyxRQUFBQSxRQUFRLEdBQUdHLEtBQUssQ0FBQ0MsWUFBakI7O0FBQ0EsYUFBSyxJQUFJQyxJQUFULElBQWdCRixLQUFLLENBQUNHLGNBQXRCLEVBQXNDO0FBQ3BDLGNBQU1DLEtBQUssR0FBR3JCLElBQUksQ0FBQ21CLElBQUQsQ0FBbEI7O0FBRUEsY0FBSUYsS0FBSyxDQUFDRyxjQUFOLENBQXFCRCxJQUFyQixNQUE4QixLQUE5QixJQUF1Q0UsS0FBSyxLQUFLaEQsU0FBckQsRUFBZ0U7QUFDOUQsa0JBQU0sSUFBSTJDLEtBQUoscUJBQXVCRyxJQUF2QixtQkFBTjtBQUNEOztBQUVELGNBQUlyRCxLQUFLLEdBQUcsSUFBSUMsTUFBSixDQUFXLE1BQU1rRCxLQUFLLENBQUNLLFdBQU4sQ0FBa0JILElBQWxCLENBQU4sR0FBK0IsR0FBMUMsQ0FBWjs7QUFDQSxjQUFJRSxLQUFLLElBQUl2RCxLQUFLLENBQUN5RCxJQUFOLENBQVdDLE1BQU0sQ0FBQ0gsS0FBRCxDQUFqQixNQUE4QixLQUEzQyxFQUFrRDtBQUNoRCxrQkFBTSxJQUFJTCxLQUFKLHFCQUNTRyxJQURULDhDQUNnREYsS0FBSyxDQUFDSyxXQUFOLENBQWtCSCxJQUFsQixDQURoRCxPQUFOO0FBR0Q7O0FBRUQsY0FBSUUsS0FBSyxLQUFLaEQsU0FBZCxFQUF5QjtBQUN2QnlDLFlBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDVyxPQUFULFlBQXFCTixJQUFyQixRQUE2QixFQUE3QixDQUFYO0FBQ0QsV0FGRCxNQUVPO0FBQ0xMLFlBQUFBLFFBQVEsR0FBR0EsUUFBUSxDQUFDVyxPQUFULFlBQ0xOLElBREssUUFFVE8sa0JBQWtCLENBQUNGLE1BQU0sQ0FBQ0gsS0FBRCxDQUFQLENBRlQsQ0FBWDtBQUlEO0FBQ0YsU0E5Qk8sQ0FnQ1I7OztBQUNBLGFBQUssSUFBSUYsS0FBVCxJQUFnQm5CLElBQWhCLEVBQXNCO0FBQ3BCLGNBQUlpQixLQUFLLENBQUNHLGNBQU4sQ0FBcUJELEtBQXJCLE1BQThCOUMsU0FBbEMsRUFBNkM7QUFDM0MwQyxZQUFBQSxRQUFRLENBQUNJLEtBQUQsQ0FBUixHQUFnQm5CLElBQUksQ0FBQ21CLEtBQUQsQ0FBcEI7QUFDRDtBQUNGO0FBQ0YsT0E3Q3dCLENBK0N6Qjs7O0FBQ0EsVUFBSWhFLElBQUosRUFBVTtBQUNSMkQsUUFBQUEsUUFBUSxHQUFHM0QsSUFBWDtBQUNBNEQsUUFBQUEsUUFBUSxHQUFHZixJQUFYO0FBQ0Q7O0FBRUQsdUJBQVVjLFFBQVYsU0FBcUJhLGVBQUdDLFNBQUgsQ0FBYWIsUUFBYixFQUF1QjtBQUFFYyxRQUFBQSxjQUFjLEVBQUU7QUFBbEIsT0FBdkIsQ0FBckI7QUFDRDtBQTlISSxHQUFQO0FBZ0lELEMsQ0FFRDs7O0FBQ08sU0FBU0MsWUFBVCxDQUFzQnJDLElBQXRCLEVBQTJDO0FBQ2hELFNBQU87QUFDTEEsSUFBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUN4QixJQUFBQSxLQUZELGlCQUVPOEQsQ0FGUCxFQUVVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtEQUNOLEtBRE07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZCxLQUpJO0FBS0xwQixJQUFBQSxLQUxLLGlCQUtDb0IsQ0FMRCxFQUtJO0FBQ1AsYUFBTyxLQUFQO0FBQ0QsS0FQSTtBQVFMbEIsSUFBQUEsSUFSSyxnQkFRQWtCLENBUkEsRUFRRztBQUNOLGFBQU8sRUFBUDtBQUNEO0FBVkksR0FBUDtBQVlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBOb1NTUiBmcm9tICcuL05vU1NSJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFByb3BzID0gKG1hdGNoOiB7XG4gIHBhdGg6IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn0pID0+IFByb21pc2U8b2JqZWN0PjtcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcbiAgaW5pdGlhbFByb3BzPzogSW5pdGlhbFByb3BzO1xuICBfcHJvcHM/OiBvYmplY3Q7XG59O1xuXG5leHBvcnQgdHlwZSBJbXBvcnRDb21wb25lbnQgPSAoKSA9PiBQcm9taXNlPENvbXBvbmVudDxhbnk+PjtcblxuZXhwb3J0IHR5cGUgUm91dGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBzc3I/OiBib29sZWFuO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zPzogc3RyaW5nW107XG4gIGltcG9ydENvbXBvbmVudD86IEltcG9ydENvbXBvbmVudDtcblxuICBjaGlsZHJlbj86IFJvdXRlW107XG59O1xuXG50eXBlIE5hbWVzID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcGFyYW1zUmVnZXg6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIHBhcmFtc09wdGlvbmFsOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIE1hdGNoZWRSb3V0ZSA9IFtcbiAge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IEltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBQYXJhbXMsXG4gIHN0cmluZz8sXG5dO1xuXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudChcbiAgcmVzdWx0OiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIHBhdGg6IHN0cmluZyxcbiAgbm9kZTogUm91dGUsXG4pIHtcbiAgaWYgKCFub2RlLmltcG9ydENvbXBvbmVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChub2RlLnNzcikge1xuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIHBhdGgsXG4gICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIHBhdGg6ICdfX05PX1NTUl9fJyxcbiAgICAgIGltcG9ydENvbXBvbmVudDogKGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE5vU1NSO1xuICAgICAgfSkgYXMgSW1wb3J0Q29tcG9uZW50LFxuICAgIH0pO1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBwYXRoLFxuICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKFxuICBub2RlOiBSb3V0ZSxcbiAgY29udGV4dDoge1xuICAgIHJlbWFpbjogc3RyaW5nO1xuICAgIHJvdXRlR2V0Q29tcG9uZW50czoge1xuICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gICAgfVtdO1xuICAgIHJvdXRlQXJndW1lbnRzOiBQYXJhbXM7XG4gIH0sXG4pOiBNYXRjaGVkUm91dGUgfCBmYWxzZSB7XG4gIC8vIHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHMgYWZmZWN0IGVhY2ggb3RoZXJcbiAgLy8gY29weSBjb250ZXh0XG4gIGxldCByZW1haW4gPSBjb250ZXh0LnJlbWFpbjtcbiAgbGV0IHJvdXRlR2V0Q29tcG9uZW50cyA9IFsuLi5jb250ZXh0LnJvdXRlR2V0Q29tcG9uZW50c107XG4gIGxldCByb3V0ZUFyZ3VtZW50cyA9IHsgLi4uY29udGV4dC5yb3V0ZUFyZ3VtZW50cyB9O1xuXG4gIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbm9kZS5fcGF0aCwgJ2cnKTtcblxuICBpZiAobm9kZS5fcGF0aCkge1xuICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluKSkpIHtcbiAgICAgIGdldENvbXBvbmVudChyb3V0ZUdldENvbXBvbmVudHMsIG1hdGNoWzBdLCBub2RlKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtcyFbaSAtIDFdXSA9IG1hdGNoW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1hdGNoIGhhcyByZWFjaGVkIHRhaWxcbiAgICAgIGlmIChyZWdleC5sYXN0SW5kZXggPT09IHJlbWFpbi5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbm9kZTtcblxuICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBkZWZhdWx0IHJvdXRlcyBvbiB0aGUgc3VidHJlZVxuICAgICAgICB3aGlsZSAoaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkID0gbnVsbDtcblxuICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX3BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSBjaGlsZDtcblxuICAgICAgICAgICAgICBpZiAoZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXG4gICAgICAgICAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW4gYnV0IGEgZGVmYXVsdCBvbmUgY2FuJ3QgYmUgZm91bmRcbiAgICAgICAgICAvLyBtYXRjaCB3aWxsIGJlIGZhaWwuXG4gICAgICAgICAgaWYgKCFkZWZhdWx0Q2hpbGQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIGl0ZXJhdG9yID0gZGVmYXVsdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtyb3V0ZUdldENvbXBvbmVudHMsIHJvdXRlQXJndW1lbnRzLCBpdGVyYXRvci5uYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYSByb3V0ZSB3aXRob3V0IHBhdGggKGRlZmF1bHQgcm91dGUpXG4gICAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcbiAgICAvLyBOb3RlOiBUaGlzIHdpbGwgcGVyZm9ybSBhcyBhIGRlZXAtZmlyc3QgdHJlZSBzZWFyY2hcbiAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCAnX19kZWZhdWx0X18nLCBub2RlKTtcbiAgfVxuXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcbiAgICAgICAgcmVtYWluOiByZW1haW4uc3Vic3RyKHJlZ2V4Lmxhc3RJbmRleCksXG5cbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLFxuICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlIGV4dGVuZHMgTG9jYXRpb24ge1xuICByb3V0ZToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xuICB9W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRpb24ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIGRhdGE6IFJvdXRlO1xuICBtYXRjaCh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8TG9hZGVkUm91dGUgfCBmYWxzZT47XG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcbiAgbGluayhsb2NhdGlvbjogTG9jYXRpb24pOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZVF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpIHtcbiAgY29uc3QgcjogUGFyYW1zID0ge307XG4gIHF1ZXJ5XG4gICAgLnNwbGl0KCcmJylcbiAgICAuZmlsdGVyKChvKSA9PiBvKVxuICAgIC5mb3JFYWNoKChvKSA9PiB7XG4gICAgICBjb25zdCBbaywgdl0gPSBvLnNwbGl0KCc9Jyk7XG4gICAgICByW2RlY29kZVVSSUNvbXBvbmVudChrKV0gPSBkZWNvZGVVUklDb21wb25lbnQodik7XG4gICAgfSk7XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXMoZGF0YTogUm91dGUsIG5hbWVzOiBOYW1lcyk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaCh0YXJnZXQpIHtcbiAgICAgIGxldCBfdG1wID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XG4gICAgICBsZXQgcGF0aCA9IF90bXAuc2hpZnQoKSB8fCAnJztcbiAgICAgIGxldCBxdWVyeVN0ciA9IF90bXAuc2hpZnQoKSB8fCAnJztcblxuICAgICAgbGV0IHJvb3QgPSBkYXRhO1xuICAgICAgbGV0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgLy8gbm90IG1hdGNoXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCBbcm91dGVHZXRDb21wb25lbnRzLCBhcmdzLCBuYW1lXSA9IHJlc3VsdDtcblxuICAgICAgLy8gYWN0dWFsbHkgaW1wb3J0IGNvbXBvbmVudHNcbiAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLm1hcCgoeyBpbXBvcnRDb21wb25lbnQgfSkgPT4gaW1wb3J0Q29tcG9uZW50KCkpLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgcm91dGUgPSBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50LCBpKSA9PiAoe1xuICAgICAgICBwYXRoOiByb3V0ZUdldENvbXBvbmVudHNbaV0ucGF0aCxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgfSkpO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5zaW1wbGVRdWVyeShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gc3VwcG9ydCBpbml0aWFsUHJvcHNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5pbml0aWFsUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgICAgLmluaXRpYWxQcm9wcyh7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKChwcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHt9O1xuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdXRlLFxuICAgICAgICBhcmdzLFxuICAgICAgICBuYW1lLFxuICAgICAgICBwYXRoLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNoZWNrKHRhcmdldCkge1xuICAgICAgY29uc3QgcGF0aCA9IHRhcmdldC5zcGxpdCgnPycpLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBjb25zdCByb290ID0gZGF0YTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgICByZW1haW46IHBhdGgsXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXG4gICAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gQm9vbGVhbihyZXN1bHQpO1xuICAgIH0sXG4gICAgbGluayh7IG5hbWUsIHBhdGgsIGFyZ3MgfSkge1xuICAgICAgYXJncyA9IGFyZ3MgfHwge307XG5cbiAgICAgIGxldCBwYXRobmFtZSA9ICcvJztcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAgIC8vIG5hbWVkIHJvdXRlXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBpZiAoIW5hbWVzW25hbWVdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIG5hbWVkIHJvdXRlIFske25hbWV9XWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZWQgPSBuYW1lc1tuYW1lXTtcblxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5hbWVkLnBhcmFtc09wdGlvbmFsKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2tleV07XG5cbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gZmFsc2UgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBhcmd1bWVudCBbJHtrZXl9XSBpcyByZXF1aXJlZGApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbmFtZWQucGFyYW1zUmVnZXhba2V5XSArICckJyk7XG4gICAgICAgICAgaWYgKHZhbHVlICYmIHJlZ2V4LnRlc3QoU3RyaW5nKHZhbHVlKSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBhcmd1bWVudCBbJHtrZXl9XSBpcyBpbnZhbGlkLCBtdXN0IG1hdGNoIHJlZ2V4cCBbJHtuYW1lZC5wYXJhbXNSZWdleFtrZXldfV1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKGAoJHtrZXl9KWAsICcnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICBgKCR7a2V5fSlgLFxuICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBxdWVyeSBhcmdzICh0aGUgYXJncyBleGNsdWRlIHJvdXRlIGFyZ3MpXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlPYmpba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcGF0aCByb3V0ZVxuICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBwYXRoO1xuICAgICAgICBxdWVyeU9iaiA9IGFyZ3M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwYXRobmFtZX0ke3FzLnN0cmluZ2lmeShxdWVyeU9iaiwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KX1gO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIOeUqOS6juaUr+aMgSB0eXBlc2NyaXB0IOaPkOekuueahCBtb2NrIOaWueazlVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcyhkYXRhOiBSb3V0ZSk6IFJvdXRlcyB7XG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBhc3luYyBtYXRjaChfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjaGVjayhfKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBsaW5rKF8pIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9LFxuICB9O1xufVxuIl19