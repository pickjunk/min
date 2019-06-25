"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _qs = _interopRequireDefault(require("qs"));

function traverse(node, context) {
  // to avoid children's contexts affect each other
  // copy context
  var remain = context.remain;
  var routeGetComponents = (0, _toConsumableArray2.default)(context.routeGetComponents);
  var routeArguments = (0, _objectSpread2.default)({}, context.routeArguments);
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
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = iterator.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
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
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return false;
}

function routes(data, names) {
  return {
    match: function () {
      var _match2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(target) {
        var _tmp, path, queryStr, root, result, _result, routeGetComponents, args, name, components, route;

        return _regenerator.default.wrap(function _callee$(_context) {
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
                _result = (0, _slicedToArray2.default)(result, 3), routeGetComponents = _result[0], args = _result[1], name = _result[2]; // actually import components

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

                args = (0, _objectSpread2.default)({}, _qs.default.parse(queryStr), args); // support initialProps

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
      }));

      function match(_x) {
        return _match2.apply(this, arguments);
      }

      return match;
    }(),
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

      return "".concat(pathname).concat(_qs.default.stringify(queryObj, {
        addQueryPrefix: true
      }));
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwicm91dGVzIiwiZGF0YSIsIm5hbWVzIiwidGFyZ2V0IiwiX3RtcCIsInNwbGl0Iiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsInFzIiwicGFyc2UiLCJpbml0aWFsUHJvcHMiLCJ0aGVuIiwicHJvcHMiLCJfcHJvcHMiLCJjaGVjayIsIkJvb2xlYW4iLCJsaW5rIiwicGF0aG5hbWUiLCJxdWVyeU9iaiIsIm5hbWVkIiwicGF0aFRlbXBsYXRlIiwia2V5IiwicGFyYW1zT3B0aW9uYWwiLCJ2YWx1ZSIsIkVycm9yIiwicGFyYW1zUmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBbURBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVBVXdCO0FBQ3RCO0FBQ0E7QUFDQSxNQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ0MsTUFBckI7QUFDQSxNQUFJQyxrQkFBa0Isb0NBQU9GLE9BQU8sQ0FBQ0Usa0JBQWYsQ0FBdEI7QUFDQSxNQUFJQyxjQUFj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QUFBQSxjQUFjLEVBQUU7QUFBbEIsT0FBdkIsQ0FBckI7QUFDRDtBQXhISSxHQUFQO0FBMEhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cbnR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcbiAgaW5pdGlhbFByb3BzPzogKG1hdGNoOiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGFyZ3M/OiBQYXJhbXM7XG4gICAgbmFtZT86IHN0cmluZztcbiAgfSkgPT4gUHJvbWlzZTxvYmplY3Q+O1xuICBfcHJvcHM6IG9iamVjdDtcbn07XG5cbnR5cGUgaW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XG5cbnR5cGUgUm91dGUgPSB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGRpcmVjdG9yeT86IHN0cmluZztcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xuXG4gIF9wYXRoPzogc3RyaW5nO1xuICBfcGFyYW1zOiBzdHJpbmdbXTtcbiAgaW1wb3J0Q29tcG9uZW50PzogaW1wb3J0Q29tcG9uZW50O1xuXG4gIGNoaWxkcmVuPzogUm91dGVbXTtcbn07XG5cbnR5cGUgTmFtZXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHtcbiAgICBwYXRoVGVtcGxhdGU6IHN0cmluZztcbiAgICBwYXJhbXNSZWdleDoge1xuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICAgIH07XG4gICAgcGFyYW1zT3B0aW9uYWw6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbn07XG5cbnR5cGUgTWF0Y2hlZFJvdXRlID0gW1xuICB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xuICB9W10sXG4gIFBhcmFtcyxcbiAgc3RyaW5nP1xuXTtcblxuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiB0cmF2ZXJzZShcbiAgbm9kZTogUm91dGUsXG4gIGNvbnRleHQ6IHtcbiAgICByZW1haW46IHN0cmluZztcbiAgICByb3V0ZUdldENvbXBvbmVudHM6IHtcbiAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xuICAgIH1bXTtcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xuICB9LFxuKTogTWF0Y2hlZFJvdXRlIHwgZmFsc2Uge1xuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXG4gIC8vIGNvcHkgY29udGV4dFxuICBsZXQgcmVtYWluID0gY29udGV4dC5yZW1haW47XG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcblxuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XG5cbiAgaWYgKG5vZGUuX3BhdGgpIHtcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XG4gICAgICBpZiAobm9kZS5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgIHBhdGg6IG1hdGNoWzBdLFxuICAgICAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hdGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIG9wdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIG1hdGNoZWQgYXMgdW5kZWZpbmVkXG4gICAgICAgIC8vIGZpbHRlciB0aGVtXG4gICAgICAgIGlmIChtYXRjaFtpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcm91dGVBcmd1bWVudHNbbm9kZS5fcGFyYW1zW2kgLSAxXV0gPSBtYXRjaFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYXRjaCBoYXMgcmVhY2hlZCB0YWlsXG4gICAgICBpZiAocmVnZXgubGFzdEluZGV4ID09PSByZW1haW4ubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVyYXRvciA9IG5vZGU7XG5cbiAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgZGVmYXVsdCByb3V0ZXMgb24gdGhlIHN1YnRyZWVcbiAgICAgICAgd2hpbGUgKGl0ZXJhdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZCA9IG51bGw7XG5cbiAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLl9wYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdENoaWxkID0gY2hpbGQ7XG5cbiAgICAgICAgICAgICAgaWYgKGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICAgICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuIGJ1dCBhIGRlZmF1bHQgb25lIGNhbid0IGJlIGZvdW5kXG4gICAgICAgICAgLy8gbWF0Y2ggd2lsbCBiZSBmYWlsLlxuICAgICAgICAgIGlmICghZGVmYXVsdENoaWxkKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBpdGVyYXRvciA9IGRlZmF1bHRDaGlsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbcm91dGVHZXRDb21wb25lbnRzLCByb3V0ZUFyZ3VtZW50cywgaXRlcmF0b3IubmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGEgcm91dGUgd2l0aG91dCBwYXRoIChkZWZhdWx0IHJvdXRlKVxuICAgIC8vIHJlZ2FyZGVkIGFzIGFsd2F5cyBtYXRjaGVkXG4gICAgLy8gTm90ZTogVGhpcyB3aWxsIHBlcmZvcm0gYXMgYSBkZWVwLWZpcnN0IHRyZWUgc2VhcmNoXG4gICAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XG4gICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXG4gICAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKGNoaWxkLCB7XG4gICAgICAgIHJlbWFpbjogcmVtYWluLnN1YnN0cihyZWdleC5sYXN0SW5kZXgpLFxuXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cyxcbiAgICAgICAgcm91dGVBcmd1bWVudHMsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZSB7XG4gIHJvdXRlOiB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIGNvbXBvbmVudDogQ29tcG9uZW50PGFueT47XG4gIH1bXTtcbiAgYXJnczogUGFyYW1zO1xuICBuYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XG4gIG1hdGNoKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTxMb2FkZWRSb3V0ZSB8IGZhbHNlPjtcbiAgY2hlY2sodGFyZ2V0OiBzdHJpbmcpOiBib29sZWFuO1xuICBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKGRhdGE6IFJvdXRlLCBuYW1lczogTmFtZXMpOiBSb3V0ZXMge1xuICByZXR1cm4ge1xuICAgIGFzeW5jIG1hdGNoKHRhcmdldCkge1xuICAgICAgbGV0IF90bXAgPSB0YXJnZXQuc3BsaXQoJz8nKTtcbiAgICAgIGxldCBwYXRoID0gX3RtcC5zaGlmdCgpIHx8ICcnO1xuICAgICAgbGV0IHF1ZXJ5U3RyID0gX3RtcC5zaGlmdCgpIHx8ICcnO1xuXG4gICAgICBsZXQgcm9vdCA9IGRhdGE7XG4gICAgICBsZXQgcmVzdWx0ID0gdHJhdmVyc2Uocm9vdCwge1xuICAgICAgICByZW1haW46IHBhdGgsXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXG4gICAgICAgIHJvdXRlQXJndW1lbnRzOiB7fSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBub3QgbWF0Y2hcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbGV0IFtyb3V0ZUdldENvbXBvbmVudHMsIGFyZ3MsIG5hbWVdID0gcmVzdWx0O1xuXG4gICAgICAvLyBhY3R1YWxseSBpbXBvcnQgY29tcG9uZW50c1xuICAgICAgY29uc3QgY29tcG9uZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMubWFwKCh7IGltcG9ydENvbXBvbmVudCB9KSA9PiBpbXBvcnRDb21wb25lbnQoKSksXG4gICAgICApO1xuXG4gICAgICBjb25zdCByb3V0ZSA9IGNvbXBvbmVudHMubWFwKChjb21wb25lbnQsIGkpID0+ICh7XG4gICAgICAgIHBhdGg6IHJvdXRlR2V0Q29tcG9uZW50c1tpXS5wYXRoLFxuICAgICAgICBjb21wb25lbnQsXG4gICAgICB9KSk7XG5cbiAgICAgIC8vIHBhcnNlIHF1ZXJ5IHN0cmluZyAmIG1lcmdlIGFyZ3NcbiAgICAgIGFyZ3MgPSB7IC4uLnFzLnBhcnNlKHF1ZXJ5U3RyKSwgLi4uYXJncyB9O1xuXG4gICAgICAvLyBzdXBwb3J0IGluaXRpYWxQcm9wc1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGNvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5pbml0aWFsUHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgICAgICAgLmluaXRpYWxQcm9wcyh7XG4gICAgICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC50aGVuKHByb3BzID0+IHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0gcHJvcHMgfHwge307XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSB7fTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3V0ZSxcbiAgICAgICAgYXJncyxcbiAgICAgICAgbmFtZSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjaGVjayh0YXJnZXQpIHtcbiAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xuICAgICAgY29uc3Qgcm9vdCA9IGRhdGE7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzdWx0KTtcbiAgICB9LFxuICAgIGxpbmsobmFtZSwgYXJncykge1xuICAgICAgYXJncyA9IGFyZ3MgfHwge307XG5cbiAgICAgIGxldCBwYXRobmFtZSA9ICcvJztcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XG5cbiAgICAgIGxldCBuYW1lZCA9IG5hbWVzW25hbWVdO1xuICAgICAgaWYgKG5hbWVkKSB7XG4gICAgICAgIC8vIG5hbWVkIHJvdXRlXG4gICAgICAgIHBhdGhuYW1lID0gbmFtZWQucGF0aFRlbXBsYXRlO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuYW1lZC5wYXJhbXNPcHRpb25hbCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1trZXldO1xuXG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IGZhbHNlICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXJndW1lbnQgWyR7a2V5fV0gaXMgcmVxdWlyZWRgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiByZWdleC50ZXN0KFN0cmluZyh2YWx1ZSkpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7XG4gICAgICAgICAgICAgICAgbmFtZWQucGFyYW1zUmVnZXhba2V5XVxuICAgICAgICAgICAgICB9XWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoYCgke2tleX0pYCwgJycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgIGAoJHtrZXl9KWAsXG4gICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHF1ZXJ5IGFyZ3MgKHRoZSBhcmdzIGV4Y2x1ZGUgcm91dGUgYXJncylcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBxdWVyeU9ialtrZXldID0gYXJnc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcGF0aCByb3V0ZVxuICAgICAgICBwYXRobmFtZSA9IG5hbWU7XG4gICAgICAgIHF1ZXJ5T2JqID0gYXJncztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3BhdGhuYW1lfSR7cXMuc3RyaW5naWZ5KHF1ZXJ5T2JqLCB7IGFkZFF1ZXJ5UHJlZml4OiB0cnVlIH0pfWA7XG4gICAgfSxcbiAgfTtcbn1cbiJdfQ==