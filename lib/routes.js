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

  var routeArguments = _objectSpread({}, context.routeArguments); // a route without path (default route)
  // regarded as always matched


  if (!node._path) {
    getComponent(routeGetComponents, '__default__', node);

    if (node.children) {
      var _iterator = _createForOfIteratorHelper(node.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          var result = traverse(child, {
            remain: remain,
            routeGetComponents: routeGetComponents,
            routeArguments: routeArguments
          });

          if (result) {
            return result;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  } // a route with path (normal route)
  // try to match by Regexp
  else {
      var regex = new RegExp('^' + node._path, 'g');
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

            var _iterator2 = _createForOfIteratorHelper(iterator.children),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _child = _step2.value;

                if (_child._path === undefined) {
                  defaultChild = _child;

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
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (!defaultChild) {
              return false;
            }

            iterator = defaultChild;
          }

          return [routeGetComponents, routeArguments, iterator.name];
        }

        if (node.children) {
          var _iterator3 = _createForOfIteratorHelper(node.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _child2 = _step3.value;

              var _result = traverse(_child2, {
                remain: remain.substr(regex.lastIndex),
                routeGetComponents: routeGetComponents,
                routeArguments: routeArguments
              });

              if (_result) {
                return _result;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
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
                var _tmp, path, queryStr, root, result, href, _result2, routeGetComponents, args, name, components, routeGetProps, isRedirect, _iterator4, _step4, p, route;

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
                        _result2 = (0, _slicedToArray2["default"])(result, 3), routeGetComponents = _result2[0], args = _result2[1], name = _result2[2]; // actually import components

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
                        isRedirect = false;
                        _iterator4 = _createForOfIteratorHelper(routeGetProps);
                        _context2.prev = 21;

                        _iterator4.s();

                      case 23:
                        if ((_step4 = _iterator4.n()).done) {
                          _context2.next = 31;
                          break;
                        }

                        p = _step4.value;

                        if (!(p instanceof Redirect)) {
                          _context2.next = 29;
                          break;
                        }

                        target = link(p.location);
                        isRedirect = true;
                        return _context2.abrupt("break", 31);

                      case 29:
                        _context2.next = 23;
                        break;

                      case 31:
                        _context2.next = 36;
                        break;

                      case 33:
                        _context2.prev = 33;
                        _context2.t0 = _context2["catch"](21);

                        _iterator4.e(_context2.t0);

                      case 36:
                        _context2.prev = 36;

                        _iterator4.f();

                        return _context2.finish(36);

                      case 39:
                        if (!isRedirect) {
                          _context2.next = 41;
                          break;
                        }

                        return _context2.abrupt("return", "continue");

                      case 41:
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

                      case 43:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _loop, null, [[21, 33, 36, 39]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsiUmVkaXJlY3QiLCJsb2NhdGlvbiIsImdldENvbXBvbmVudCIsInJlc3VsdCIsInBhdGgiLCJub2RlIiwiaW1wb3J0Q29tcG9uZW50Iiwic3NyIiwicHVzaCIsIk5vU1NSIiwidHJhdmVyc2UiLCJjb250ZXh0IiwicmVtYWluIiwicm91dGVHZXRDb21wb25lbnRzIiwicm91dGVBcmd1bWVudHMiLCJfcGF0aCIsImNoaWxkcmVuIiwiY2hpbGQiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiZXhlYyIsImkiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJfcGFyYW1zIiwibGFzdEluZGV4IiwiaXRlcmF0b3IiLCJkZWZhdWx0Q2hpbGQiLCJuYW1lIiwic3Vic3RyIiwic2ltcGxlUXVlcnkiLCJxdWVyeSIsInIiLCJzcGxpdCIsImZpbHRlciIsIm8iLCJmb3JFYWNoIiwiayIsInYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZWRpcmVjdCIsInJvdXRlcyIsImRhdGEiLCJuYW1lcyIsIm5vdEZvdW5kIiwiRXJyb3IiLCJ0YXJnZXQiLCJfdG1wIiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJocmVmIiwibGluayIsImFyZ3MiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwiY29tcG9uZW50cyIsImNvbXBvbmVudCIsInJvdXRpbmciLCJyb3V0ZUdldFByb3BzIiwiaXNSZWRpcmVjdCIsInAiLCJyb3V0ZSIsInByb3BzIiwiY2hlY2siLCJCb29sZWFuIiwicGF0aG5hbWUiLCJxdWVyeU9iaiIsIm5hbWVkIiwicGF0aFRlbXBsYXRlIiwia2V5IiwicGFyYW1zT3B0aW9uYWwiLCJ2YWx1ZSIsInBhcmFtc1JlZ2V4IiwidGVzdCIsIlN0cmluZyIsInJlcGxhY2UiLCJlbmNvZGVVUklDb21wb25lbnQiLCJxcyIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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O0FBSEksS0FERDtBQU1MekIsSUFBQUEsS0FBSyxFQUFMQSxLQU5LO0FBT0w4QyxJQUFBQSxLQUFLLEVBQUxBLEtBUEs7QUFRTGIsSUFBQUEsSUFBSSxFQUFKQTtBQVJLLEdBQVA7QUFVRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuaW1wb3J0IHsgaXNCcm93c2VyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTm9TU1IgZnJvbSAnLi9Ob1NTUic7XG5cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdCB7XG4gIGxvY2F0aW9uOiBMb2NhdGlvbjtcbiAgY29uc3RydWN0b3IobG9jYXRpb246IExvY2F0aW9uKSB7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRpbmcgPSAoXG4gIGxvY2F0aW9uOiB7XG4gICAgcGF0aD86IHN0cmluZztcbiAgICBhcmdzPzogUGFyYW1zO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gIH0sXG4gIHJlZGlyZWN0OiAobG9jYXRpb246IExvY2F0aW9uKSA9PiBSZWRpcmVjdCxcbikgPT4gUHJvbWlzZTxSb3V0ZVByb3BzIHwgUmVkaXJlY3QgfCB1bmRlZmluZWQ+O1xuXG5leHBvcnQgdHlwZSBDb21wb25lbnQ8VD4gPSBDb21wb25lbnRUeXBlPFQ+ICYge1xuICByb3V0aW5nPzogUm91dGluZztcbn07XG5cbmV4cG9ydCB0eXBlIEltcG9ydENvbXBvbmVudCA9ICgpID0+IFByb21pc2U8Q29tcG9uZW50PGFueT4+O1xuXG5leHBvcnQgdHlwZSBSb3V0ZU5vZGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuICBzc3I/OiBib29sZWFuO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zPzogc3RyaW5nW107XG4gIGltcG9ydENvbXBvbmVudD86IEltcG9ydENvbXBvbmVudDtcblxuICBjaGlsZHJlbj86IFJvdXRlTm9kZVtdO1xufTtcblxuZXhwb3J0IHR5cGUgUm91dGVOYW1lcyA9IHtcbiAgW2tleTogc3RyaW5nXToge1xuICAgIHBhdGhUZW1wbGF0ZTogc3RyaW5nO1xuICAgIHBhcmFtc1JlZ2V4OiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG4gICAgfTtcbiAgICBwYXJhbXNPcHRpb25hbDoge1xuICAgICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgUm91dGVEYXRhID0ge1xuICBkYXRhOiBSb3V0ZU5vZGU7XG4gIG5vdEZvdW5kOiBMb2NhdGlvbjtcbiAgbmFtZXM/OiBSb3V0ZU5hbWVzO1xufTtcblxuZXhwb3J0IHR5cGUgTWF0Y2hlZFJvdXRlID0gW1xuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIFBhcmFtcyxcbiAgc3RyaW5nPyxcbl07XG5cbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUm91dGVQcm9wcyA9IHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlOiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGNvbXBvbmVudDogQ29tcG9uZW50PGFueT47XG4gICAgcHJvcHM6IFJvdXRlUHJvcHM7XG4gIH1bXTtcbiAgbG9jYXRpb246IExvY2F0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvY2F0aW9uIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgYXJncz86IFBhcmFtcztcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KFxuICByZXN1bHQ6IHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgaW1wb3J0Q29tcG9uZW50OiBJbXBvcnRDb21wb25lbnQ7XG4gIH1bXSxcbiAgcGF0aDogc3RyaW5nLFxuICBub2RlOiBSb3V0ZU5vZGUsXG4pIHtcbiAgaWYgKCFub2RlLmltcG9ydENvbXBvbmVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChub2RlLnNzcikge1xuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIHBhdGgsXG4gICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgIHBhdGg6ICdfX05PX1NTUl9fJyxcbiAgICAgIGltcG9ydENvbXBvbmVudDogKGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE5vU1NSO1xuICAgICAgfSkgYXMgSW1wb3J0Q29tcG9uZW50LFxuICAgIH0pO1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBwYXRoLFxuICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNlKFxuICBub2RlOiBSb3V0ZU5vZGUsXG4gIGNvbnRleHQ6IHtcbiAgICByZW1haW46IHN0cmluZztcbiAgICByb3V0ZUdldENvbXBvbmVudHM6IHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGltcG9ydENvbXBvbmVudDogSW1wb3J0Q29tcG9uZW50O1xuICAgIH1bXTtcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xuICB9LFxuKTogTWF0Y2hlZFJvdXRlIHwgZmFsc2Uge1xuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXG4gIC8vIGNvcHkgY29udGV4dFxuICBsZXQgcmVtYWluID0gY29udGV4dC5yZW1haW47XG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcblxuICAvLyBhIHJvdXRlIHdpdGhvdXQgcGF0aCAoZGVmYXVsdCByb3V0ZSlcbiAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcbiAgaWYgKCFub2RlLl9wYXRoKSB7XG4gICAgZ2V0Q29tcG9uZW50KHJvdXRlR2V0Q29tcG9uZW50cywgJ19fZGVmYXVsdF9fJywgbm9kZSk7XG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShjaGlsZCwge1xuICAgICAgICAgIHJlbWFpbixcblxuICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cyxcbiAgICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gYSByb3V0ZSB3aXRoIHBhdGggKG5vcm1hbCByb3V0ZSlcbiAgLy8gdHJ5IHRvIG1hdGNoIGJ5IFJlZ2V4cFxuICBlbHNlIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XG4gICAgbGV0IG1hdGNoID0gbnVsbDtcblxuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XG4gICAgICBnZXRDb21wb25lbnQocm91dGVHZXRDb21wb25lbnRzLCBtYXRjaFswXSwgbm9kZSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gb3B0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgbWF0Y2hlZCBhcyB1bmRlZmluZWRcbiAgICAgICAgLy8gZmlsdGVyIHRoZW1cbiAgICAgICAgaWYgKG1hdGNoW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByb3V0ZUFyZ3VtZW50c1tub2RlLl9wYXJhbXMhW2kgLSAxXV0gPSBtYXRjaFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXRjaCBoYXMgcmVhY2hlZCB0YWlsXG4gICAgICBpZiAocmVnZXgubGFzdEluZGV4ID09PSByZW1haW4ubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG5vZGU7XG5cbiAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgZGVmYXVsdCByb3V0ZXMgb24gdGhlIHN1YnRyZWVcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZCA9IG51bGw7XG5cbiAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLl9wYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdENoaWxkID0gY2hpbGQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICAgICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuIGJ1dCBhIGRlZmF1bHQgb25lIGNhbid0IGJlIGZvdW5kXG4gICAgICAgICAgLy8gbWF0Y2ggd2lsbCBiZSBmYWlsLlxuICAgICAgICAgIGlmICghZGVmYXVsdENoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXRlcmF0b3IgPSBkZWZhdWx0Q2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3JvdXRlR2V0Q29tcG9uZW50cywgcm91dGVBcmd1bWVudHMsIGl0ZXJhdG9yLm5hbWVdO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcbiAgICAgICAgICAgIHJlbWFpbjogcmVtYWluLnN1YnN0cihyZWdleC5sYXN0SW5kZXgpLFxuXG4gICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMsXG4gICAgICAgICAgICByb3V0ZUFyZ3VtZW50cyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIGRhdGE6IFJvdXRlRGF0YTtcbiAgbWF0Y2godGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPExvYWRlZFJvdXRlPjtcbiAgY2hlY2sodGFyZ2V0OiBzdHJpbmcpOiBib29sZWFuO1xuICBsaW5rKGxvY2F0aW9uOiBMb2NhdGlvbik6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc2ltcGxlUXVlcnkocXVlcnk6IHN0cmluZykge1xuICBjb25zdCByOiBQYXJhbXMgPSB7fTtcbiAgcXVlcnlcbiAgICAuc3BsaXQoJyYnKVxuICAgIC5maWx0ZXIoKG8pID0+IG8pXG4gICAgLmZvckVhY2goKG8pID0+IHtcbiAgICAgIGNvbnN0IFtrLCB2XSA9IG8uc3BsaXQoJz0nKTtcbiAgICAgIHJbZGVjb2RlVVJJQ29tcG9uZW50KGspXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9KTtcbiAgcmV0dXJuIHI7XG59XG5cbmZ1bmN0aW9uIHJlZGlyZWN0KGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICByZXR1cm4gbmV3IFJlZGlyZWN0KGxvY2F0aW9uKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKHsgZGF0YSwgbmFtZXMsIG5vdEZvdW5kIH06IFJvdXRlRGF0YSk6IFJvdXRlcyB7XG4gIGlmICghZGF0YSB8fCAhbm90Rm91bmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcm91dGVzJyk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBtYXRjaCh0YXJnZXQ6IHN0cmluZykge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZXQgX3RtcCA9IHRhcmdldC5zcGxpdCgnPycpO1xuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICAgIGxldCByb290ID0gZGF0YTtcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG5vdCBtYXRjaFxuICAgICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsobm90Rm91bmQpO1xuICAgICAgICBpZiAoaHJlZiA9PSB0YXJnZXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdEZvdW5kIHBhZ2UgY2FuIG5vdCBiZSBub3QgZm91bmQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQgPSBocmVmO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IFtyb3V0ZUdldENvbXBvbmVudHMsIGFyZ3MsIG5hbWVdID0gcmVzdWx0O1xuXG4gICAgICAvLyBhY3R1YWxseSBpbXBvcnQgY29tcG9uZW50c1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMubWFwKCh7IGltcG9ydENvbXBvbmVudCB9KSA9PiBpbXBvcnRDb21wb25lbnQoKSksXG4gICAgICApO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5zaW1wbGVRdWVyeShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gZ2V0IGNvbXBvbmVudHMgcHJvcHNcbiAgICAgIGNvbnN0IHJvdXRlR2V0UHJvcHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnQucm91dGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5yb3V0aW5nKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlZGlyZWN0LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgLy8gcmVkaXJlY3RcbiAgICAgIGxldCBpc1JlZGlyZWN0ID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBwIG9mIHJvdXRlR2V0UHJvcHMpIHtcbiAgICAgICAgaWYgKHAgaW5zdGFuY2VvZiBSZWRpcmVjdCkge1xuICAgICAgICAgIHRhcmdldCA9IGxpbmsocC5sb2NhdGlvbik7XG4gICAgICAgICAgaXNSZWRpcmVjdCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc1JlZGlyZWN0KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByb3V0ZSA9IGNvbXBvbmVudHMubWFwKChjb21wb25lbnQsIGkpID0+ICh7XG4gICAgICAgIHBhdGg6IHJvdXRlR2V0Q29tcG9uZW50c1tpXS5wYXRoLFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICAgIHByb3BzOiByb3V0ZUdldFByb3BzW2ldIHx8IHt9LFxuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgbG9jYXRpb246IHsgbmFtZSwgcGF0aCwgYXJncyB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGVjayh0YXJnZXQ6IHN0cmluZykge1xuICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgIGNvbnN0IHJvb3QgPSBkYXRhO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICB9KTtcblxuICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaW5rKHsgbmFtZSwgcGF0aCwgYXJncyB9OiBMb2NhdGlvbikge1xuICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuXG4gICAgbGV0IHBhdGhuYW1lID0gJy8nO1xuICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAvLyBuYW1lZCByb3V0ZVxuICAgIGlmIChuYW1lcyAmJiBuYW1lKSB7XG4gICAgICBpZiAoIW5hbWVzW25hbWVdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biBuYW1lZCByb3V0ZSBbJHtuYW1lfV1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmFtZWQgPSBuYW1lc1tuYW1lXTtcblxuICAgICAgcGF0aG5hbWUgPSBuYW1lZC5wYXRoVGVtcGxhdGU7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gbmFtZWQucGFyYW1zT3B0aW9uYWwpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzW2tleV07XG5cbiAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyZ3VtZW50IFske2tleX1dIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICBpZiAodmFsdWUgJiYgcmVnZXgudGVzdChTdHJpbmcodmFsdWUpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7bmFtZWQucGFyYW1zUmVnZXhba2V5XX1dYCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoYCgke2tleX0pYCwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShcbiAgICAgICAgICAgIGAoJHtrZXl9KWAsXG4gICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxuICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXRoIHJvdXRlXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIHBhdGhuYW1lID0gcGF0aDtcbiAgICAgIHF1ZXJ5T2JqID0gYXJncztcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGF0YToge1xuICAgICAgZGF0YSxcbiAgICAgIG5hbWVzLFxuICAgICAgbm90Rm91bmQsXG4gICAgfSxcbiAgICBtYXRjaCxcbiAgICBjaGVjayxcbiAgICBsaW5rLFxuICB9O1xufVxuIl19