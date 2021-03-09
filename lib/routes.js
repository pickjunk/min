"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routes;
exports.Redirect = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _qs = _interopRequireDefault(require("qs"));

var _utils = require("./utils");

var _NoSSR = _interopRequireDefault(require("./NoSSR"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Redirect = function Redirect(location) {
  (0, _classCallCheck2["default"])(this, Redirect);
  (0, _defineProperty2["default"])(this, "location", void 0);
  this.location = location;
};

exports.Redirect = Redirect;

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

function redirect(location) {
  return new Redirect(location);
}

function routes(_ref2) {
  var data = _ref2.data,
      names = _ref2.names,
      notFound = _ref2.notFound;

  if (!data || !notFound) {
    throw new Error('invalid routes');
  }

  function match(_x) {
    return _match2.apply(this, arguments);
  }

  function _match2() {
    _match2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(target) {
      var _loop, _ret;

      return _regenerator["default"].wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
                var _tmp, path, queryStr, root, result, href, _result, routeGetComponents, args, name, components, routeGetProps, _iterator3, _step3, p, route;

                return _regenerator["default"].wrap(function _loop$(_context2) {
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
                          _context2.next = 11;
                          break;
                        }

                        href = link(notFound);

                        if (!(href == target)) {
                          _context2.next = 9;
                          break;
                        }

                        throw new Error('notFound page can not be not found!');

                      case 9:
                        target = href;
                        return _context2.abrupt("return", "continue");

                      case 11:
                        _result = (0, _slicedToArray2["default"])(result, 3), routeGetComponents = _result[0], args = _result[1], name = _result[2]; // actually import components

                        _context2.next = 14;
                        return Promise.all(routeGetComponents.map(function (_ref4) {
                          var importComponent = _ref4.importComponent;
                          return importComponent();
                        }));

                      case 14:
                        components = _context2.sent;
                        // parse query string & merge args
                        args = _objectSpread(_objectSpread({}, simpleQuery(queryStr)), args); // get components props

                        _context2.next = 18;
                        return Promise.all(components.map(function (component) {
                          if (component.routing) {
                            return component.routing({
                              path: path,
                              args: args,
                              name: name
                            }, redirect);
                          }
                        }));

                      case 18:
                        routeGetProps = _context2.sent;
                        // redirect
                        _iterator3 = _createForOfIteratorHelper(routeGetProps);
                        _context2.prev = 20;

                        _iterator3.s();

                      case 22:
                        if ((_step3 = _iterator3.n()).done) {
                          _context2.next = 29;
                          break;
                        }

                        p = _step3.value;

                        if (!(p instanceof Redirect)) {
                          _context2.next = 27;
                          break;
                        }

                        target = link(p.location);
                        return _context2.abrupt("continue", 27);

                      case 27:
                        _context2.next = 22;
                        break;

                      case 29:
                        _context2.next = 34;
                        break;

                      case 31:
                        _context2.prev = 31;
                        _context2.t0 = _context2["catch"](20);

                        _iterator3.e(_context2.t0);

                      case 34:
                        _context2.prev = 34;

                        _iterator3.f();

                        return _context2.finish(34);

                      case 37:
                        route = components.map(function (component, i) {
                          return {
                            path: routeGetComponents[i].path,
                            component: component,
                            props: routeGetProps[i] || {}
                          };
                        });
                        return _context2.abrupt("return", {
                          v: {
                            route: route,
                            location: {
                              name: name,
                              path: path,
                              args: args
                            }
                          }
                        });

                      case 39:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _loop, null, [[20, 31, 34, 37]]);
              });

            case 1:
              if (!true) {
                _context3.next = 10;
                break;
              }

              return _context3.delegateYield(_loop(), "t0", 3);

            case 3:
              _ret = _context3.t0;

              if (!(_ret === "continue")) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("continue", 1);

            case 6:
              if (!((0, _typeof2["default"])(_ret) === "object")) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", _ret.v);

            case 8:
              _context3.next = 1;
              break;

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));
    return _match2.apply(this, arguments);
  }

  function check(target) {
    var path = target.split('?').shift() || '';
    var root = data;
    var result = traverse(root, {
      remain: path,
      routeGetComponents: [],
      routeArguments: {}
    });
    return Boolean(result);
  }

  function link(_ref3) {
    var name = _ref3.name,
        path = _ref3.path,
        args = _ref3.args;
    args = args || {};
    var pathname = '/';
    var queryObj = {}; // named route

    if (names && name) {
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

  return {
    data: {
      data: data,
      names: names,
      notFound: notFound
    },
    match: match,
    check: check,
    link: link
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiUmVkaXJlY3QiLCJsb2NhdGlvbiIsImdldENvbXBvbmVudCIsInJlc3VsdCIsInBhdGgiLCJub2RlIiwiaW1wb3J0Q29tcG9uZW50Iiwic3NyIiwicHVzaCIsIk5vU1NSIiwidHJhdmVyc2UiLCJjb250ZXh0IiwicmVtYWluIiwicm91dGVHZXRDb21wb25lbnRzIiwicm91dGVBcmd1bWVudHMiLCJyZWdleCIsIlJlZ0V4cCIsIl9wYXRoIiwibWF0Y2giLCJleGVjIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZWRpcmVjdCIsInJvdXRlcyIsImRhdGEiLCJuYW1lcyIsIm5vdEZvdW5kIiwiRXJyb3IiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJocmVmIiwibGluayIsImFyZ3MiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiY29tcG9uZW50cyIsImNvbXBvbmVudCIsInJvdXRpbmciLCJyb3V0ZUdldFByb3BzIiwicCIsInJvdXRlIiwicHJvcHMiLCJjaGVjayIsIkJvb2xlYW4iLCJwYXRobmFtZSIsInF1ZXJ5T2JqIiwibmFtZWQiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwicGFyYW1zUmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInFzIiwic3RyaW5naWZ5IiwiYWRkUXVlcnlQcmVmaXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUNB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QyxFQUE2QztBQUMzQzhDLFVBQUFBLFFBQVEsQ0FBQ0csS0FBRCxDQUFSLEdBQWdCakIsSUFBSSxDQUFDaUIsS0FBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRixLQTdDMkMsQ0ErQzVDOzs7QUFDQSxRQUFJbkUsSUFBSixFQUFVO0FBQ1IrRCxNQUFBQSxRQUFRLEdBQUcvRCxJQUFYO0FBQ0FnRSxNQUFBQSxRQUFRLEdBQUdkLElBQVg7QUFDRDs7QUFFRCxxQkFBVWEsUUFBVixTQUFxQlksZUFBR0MsU0FBSCxDQUFhWixRQUFiLEVBQXVCO0FBQUVhLE1BQUFBLGNBQWMsRUFBRTtBQUFsQixLQUF2QixDQUFyQjtBQUNEOztBQUVELFNBQU87QUFDTHRDLElBQUFBLElBQUksRUFBRTtBQUNKQSxNQUFBQSxJQUFJLEVBQUpBLElBREk7QUFFSkMsTUFBQUEsS0FBSyxFQUFMQSxLQUZJO0FBR0pDLE1BQUFBLFFBQVEsRUFBUkE7QUFISSxLQUREO0FBTUwzQixJQUFBQSxLQUFLLEVBQUxBLEtBTks7QUFPTCtDLElBQUFBLEtBQUssRUFBTEEsS0FQSztBQVFMWixJQUFBQSxJQUFJLEVBQUpBO0FBUkssR0FBUDtBQVVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBOb1NTUiBmcm9tICcuL05vU1NSJztcblxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0IHtcbiAgbG9jYXRpb246IExvY2F0aW9uO1xuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUm91dGluZyA9IChcbiAgbG9jYXRpb246IHtcbiAgICBwYXRoPzogc3RyaW5nO1xuICAgIGFyZ3M/OiBQYXJhbXM7XG4gICAgbmFtZT86IHN0cmluZztcbiAgfSxcbiAgcmVkaXJlY3Q6IChsb2NhdGlvbjogTG9jYXRpb24pID0+IFJlZGlyZWN0LFxuKSA9PiBQcm9taXNlPFJvdXRlUHJvcHMgfCBSZWRpcmVjdCB8IHVuZGVmaW5lZD47XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudDxUPiA9IENvbXBvbmVudFR5cGU8VD4gJiB7XG4gIHJvdXRpbmc/OiBSb3V0aW5nO1xufTtcblxuZXhwb3J0IHR5cGUgSW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XG5cbmV4cG9ydCB0eXBlIFJvdXRlTm9kZSA9IHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgZGlyZWN0b3J5Pzogc3RyaW5nO1xuICBjb21wb25lbnQ/OiBzdHJpbmc7XG4gIHNzcj86IGJvb2xlYW47XG5cbiAgX3BhdGg/OiBzdHJpbmc7XG4gIF9wYXJhbXM/OiBzdHJpbmdbXTtcbiAgaW1wb3J0Q29tcG9uZW50PzogSW1wb3J0Q29tcG9uZW50O1xuXG4gIGNoaWxkcmVuPzogUm91dGVOb2RlW107XG59O1xuXG5leHBvcnQgdHlwZSBSb3V0ZU5hbWVzID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcGFyYW1zUmVnZXg6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIHBhcmFtc09wdGlvbmFsOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBSb3V0ZURhdGEgPSB7XG4gIGRhdGE6IFJvdXRlTm9kZTtcbiAgbm90Rm91bmQ6IExvY2F0aW9uO1xuICBuYW1lcz86IFJvdXRlTmFtZXM7XG59O1xuXG5leHBvcnQgdHlwZSBNYXRjaGVkUm91dGUgPSBbXG4gIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gIH1bXSxcbiAgUGFyYW1zLFxuICBzdHJpbmc/LFxuXTtcblxuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBSb3V0ZVByb3BzID0ge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZFJvdXRlIHtcbiAgcm91dGU6IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgY29tcG9uZW50OiBDb21wb25lbnQ8YW55PjtcbiAgICBwcm9wczogUm91dGVQcm9wcztcbiAgfVtdO1xuICBsb2NhdGlvbjogTG9jYXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYXRpb24ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBhcmdzPzogUGFyYW1zO1xufVxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnQoXG4gIHJlc3VsdDoge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IEltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBwYXRoOiBzdHJpbmcsXG4gIG5vZGU6IFJvdXRlTm9kZSxcbikge1xuICBpZiAoIW5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG5vZGUuc3NyKSB7XG4gICAgcmVzdWx0LnB1c2goe1xuICAgICAgcGF0aCxcbiAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnB1c2goe1xuICAgICAgcGF0aDogJ19fTk9fU1NSX18nLFxuICAgICAgaW1wb3J0Q29tcG9uZW50OiAoYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gTm9TU1I7XG4gICAgICB9KSBhcyBJbXBvcnRDb21wb25lbnQsXG4gICAgfSk7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHBhdGgsXG4gICAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJhdmVyc2UoXG4gIG5vZGU6IFJvdXRlTm9kZSxcbiAgY29udGV4dDoge1xuICAgIHJlbWFpbjogc3RyaW5nO1xuICAgIHJvdXRlR2V0Q29tcG9uZW50czoge1xuICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gICAgfVtdO1xuICAgIHJvdXRlQXJndW1lbnRzOiBQYXJhbXM7XG4gIH0sXG4pOiBNYXRjaGVkUm91dGUgfCBmYWxzZSB7XG4gIC8vIHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHMgYWZmZWN0IGVhY2ggb3RoZXJcbiAgLy8gY29weSBjb250ZXh0XG4gIGxldCByZW1haW4gPSBjb250ZXh0LnJlbWFpbjtcbiAgbGV0IHJvdXRlR2V0Q29tcG9uZW50cyA9IFsuLi5jb250ZXh0LnJvdXRlR2V0Q29tcG9uZW50c107XG4gIGxldCByb3V0ZUFyZ3VtZW50cyA9IHsgLi4uY29udGV4dC5yb3V0ZUFyZ3VtZW50cyB9O1xuXG4gIGxldCByZWdleCA9IG5ldyBSZWdFeHAoJ14nICsgbm9kZS5fcGF0aCwgJ2cnKTtcblxuICBpZiAobm9kZS5fcGF0aCkge1xuICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgaWYgKChtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluKSkpIHtcbiAgICAgIGdldENvbXBvbmVudChyb3V0ZUdldENvbXBvbmVudHMsIG1hdGNoWzBdLCBub2RlKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtcyFbaSAtIDFdXSA9IG1hdGNoW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1hdGNoIGhhcyByZWFjaGVkIHRhaWxcbiAgICAgIGlmIChyZWdleC5sYXN0SW5kZXggPT09IHJlbWFpbi5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbm9kZTtcblxuICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW5cbiAgICAgICAgLy8gc2VhcmNoIGZvciBkZWZhdWx0IHJvdXRlcyBvbiB0aGUgc3VidHJlZVxuICAgICAgICB3aGlsZSAoaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICBsZXQgZGVmYXVsdENoaWxkID0gbnVsbDtcblxuICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuX3BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSBjaGlsZDtcblxuICAgICAgICAgICAgICBpZiAoZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXG4gICAgICAgICAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW4gYnV0IGEgZGVmYXVsdCBvbmUgY2FuJ3QgYmUgZm91bmRcbiAgICAgICAgICAvLyBtYXRjaCB3aWxsIGJlIGZhaWwuXG4gICAgICAgICAgaWYgKCFkZWZhdWx0Q2hpbGQpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIGl0ZXJhdG9yID0gZGVmYXVsdENoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtyb3V0ZUdldENvbXBvbmVudHMsIHJvdXRlQXJndW1lbnRzLCBpdGVyYXRvci5uYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gYSByb3V0ZSB3aXRob3V0IHBhdGggKGRlZmF1bHQgcm91dGUpXG4gICAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcbiAgICAvLyBOb3RlOiBUaGlzIHdpbGwgcGVyZm9ybSBhcyBhIGRlZXAtZmlyc3QgdHJlZSBzZWFyY2hcbiAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCAnX19kZWZhdWx0X18nLCBub2RlKTtcbiAgfVxuXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcbiAgICAgICAgcmVtYWluOiByZW1haW4uc3Vic3RyKHJlZ2V4Lmxhc3RJbmRleCksXG5cbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLFxuICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIGRhdGE6IFJvdXRlRGF0YTtcbiAgbWF0Y2godGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPExvYWRlZFJvdXRlPjtcbiAgY2hlY2sodGFyZ2V0OiBzdHJpbmcpOiBib29sZWFuO1xuICBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc2ltcGxlUXVlcnkocXVlcnk6IHN0cmluZykge1xuICBjb25zdCByOiBQYXJhbXMgPSB7fTtcbiAgcXVlcnlcbiAgICAuc3BsaXQoJyYnKVxuICAgIC5maWx0ZXIoKG8pID0+IG8pXG4gICAgLmZvckVhY2goKG8pID0+IHtcbiAgICAgIGNvbnN0IFtrLCB2XSA9IG8uc3BsaXQoJz0nKTtcbiAgICAgIHJbZGVjb2RlVVJJQ29tcG9uZW50KGspXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9KTtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0KGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICByZXR1cm4gbmV3IFJlZGlyZWN0KGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKHsgZGF0YSwgbmFtZXMsIG5vdEZvdW5kIH06IFJvdXRlRGF0YSk6IFJvdXRlcyB7XG4gIGlmICghZGF0YSB8fCAhbm90Rm91bmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcm91dGVzJyk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBtYXRjaCh0YXJnZXQ6IHN0cmluZykge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZXQgX3RtcCA9IHRhcmdldC5zcGxpdCgnPycpO1xuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICAgIGxldCByb290ID0gZGF0YTtcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vdCBtYXRjaFxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsobm90Rm91bmQpO1xuICAgICAgICBpZiAoaHJlZiA9PSB0YXJnZXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdEZvdW5kIHBhZ2UgY2FuIG5vdCBiZSBub3QgZm91bmQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQgPSBocmVmO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IFtyb3V0ZUdldENvbXBvbmVudHMsIGFyZ3MsIG5hbWVdID0gcmVzdWx0O1xuXG4gICAgICAvLyBhY3R1YWxseSBpbXBvcnQgY29tcG9uZW50c1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMubWFwKCh7IGltcG9ydENvbXBvbmVudCB9KSA9PiBpbXBvcnRDb21wb25lbnQoKSksXG4gICAgICApO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5zaW1wbGVRdWVyeShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gZ2V0IGNvbXBvbmVudHMgcHJvcHNcbiAgICAgIGNvbnN0IHJvdXRlR2V0UHJvcHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnQucm91dGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5yb3V0aW5nKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlZGlyZWN0LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgLy8gcmVkaXJlY3RcbiAgICAgIGZvciAobGV0IHAgb2Ygcm91dGVHZXRQcm9wcykge1xuICAgICAgICBpZiAocCBpbnN0YW5jZW9mIFJlZGlyZWN0KSB7XG4gICAgICAgICAgdGFyZ2V0ID0gbGluayhwLmxvY2F0aW9uKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByb3V0ZSA9IGNvbXBvbmVudHMubWFwKChjb21wb25lbnQsIGkpID0+ICh7XG4gICAgICAgIHBhdGg6IHJvdXRlR2V0Q29tcG9uZW50c1tpXS5wYXRoLFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIHByb3BzOiByb3V0ZUdldFByb3BzW2ldIHx8IHt9LFxuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgbG9jYXRpb246IHsgbmFtZSwgcGF0aCwgYXJncyB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVjayh0YXJnZXQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgIGNvbnN0IHJvb3QgPSBkYXRhO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICB9KTtcblxuICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaW5rKHsgbmFtZSwgcGF0aCwgYXJncyB9OiBMb2NhdGlvbikge1xuICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuXG4gICAgbGV0IHBhdGhuYW1lID0gJy8nO1xuICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAvLyBuYW1lZCByb3V0ZVxuICAgIGlmIChuYW1lcyAmJiBuYW1lKSB7XG4gICAgICBpZiAoIW5hbWVzW25hbWVdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBuYW1lZCByb3V0ZSBbJHtuYW1lfV1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmFtZWQgPSBuYW1lc1tuYW1lXTtcblxuICAgICAgcGF0aG5hbWUgPSBuYW1lZC5wYXRoVGVtcGxhdGU7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gbmFtZWQucGFyYW1zT3B0aW9uYWwpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2tleV07XG5cbiAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyZ3VtZW50IFske2tleX1dIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICBpZiAodmFsdWUgJiYgcmVnZXgudGVzdChTdHJpbmcodmFsdWUpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7bmFtZWQucGFyYW1zUmVnZXhba2V5XX1dYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoYCgke2tleX0pYCwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShcbiAgICAgICAgICAgIGAoJHtrZXl9KWAsXG4gICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxuICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXRoIHJvdXRlXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHBhdGhuYW1lID0gcGF0aDtcbiAgICAgIHF1ZXJ5T2JqID0gYXJncztcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGF0YToge1xuICAgICAgZGF0YSxcbiAgICAgIG5hbWVzLFxuICAgICAgbm90Rm91bmQsXG4gICAgfSxcbiAgICBtYXRjaCxcbiAgICBjaGVjayxcbiAgICBsaW5rLFxuICB9O1xufVxuIl19