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
      var pathname = '';
      var queryObj = {};

      if (name[0] !== '/') {
        // named route
        var named = names[name];

        if (named === undefined) {
          throw new Error("unknown named route: ".concat(name));
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwicm91dGVzIiwiZGF0YSIsIm5hbWVzIiwidGFyZ2V0IiwiX3RtcCIsInNwbGl0Iiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsInFzIiwicGFyc2UiLCJpbml0aWFsUHJvcHMiLCJ0aGVuIiwicHJvcHMiLCJfcHJvcHMiLCJjaGVjayIsIkJvb2xlYW4iLCJsaW5rIiwicGF0aG5hbWUiLCJxdWVyeU9iaiIsIm5hbWVkIiwiRXJyb3IiLCJwYXRoVGVtcGxhdGUiLCJrZXkiLCJwYXJhbXNPcHRpb25hbCIsInZhbHVlIiwicGFyYW1zUmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBbURBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVBVXdCO0FBQ3RCO0FBQ0E7QUFDQSxNQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ0MsTUFBckI7QUFDQSxNQUFJQyxrQkFBa0Isb0NBQU9GLE9BQU8sQ0FBQ0Usa0JBQWYsQ0FBdEI7QUFDQSxNQUFJQyxjQUFj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QUFBLFFBQVEsR0FBRzVCLElBQVg7QUFDQTZCLFFBQUFBLFFBQVEsR0FBR2pCLElBQVg7QUFDRDs7QUFFRCx1QkFBVWdCLFFBQVYsU0FBcUJULFlBQUdzQixTQUFILENBQWFaLFFBQWIsRUFBdUI7QUFBRWEsUUFBQUEsY0FBYyxFQUFFO0FBQWxCLE9BQXZCLENBQXJCO0FBQ0Q7QUEzSEksR0FBUDtBQTZIRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBxcyBmcm9tICdxcyc7XHJcblxyXG50eXBlIENvbXBvbmVudDxUPiA9IENvbXBvbmVudFR5cGU8VD4gJiB7XHJcbiAgaW5pdGlhbFByb3BzPzogKG1hdGNoOiB7XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICBhcmdzPzogUGFyYW1zO1xyXG4gICAgbmFtZT86IHN0cmluZztcclxuICB9KSA9PiBQcm9taXNlPG9iamVjdD47XHJcbiAgX3Byb3BzOiBvYmplY3Q7XHJcbn07XHJcblxyXG50eXBlIGltcG9ydENvbXBvbmVudCA9ICgpID0+IFByb21pc2U8Q29tcG9uZW50PGFueT4+O1xyXG5cclxudHlwZSBSb3V0ZSA9IHtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIHBhdGg/OiBzdHJpbmc7XHJcbiAgZGlyZWN0b3J5Pzogc3RyaW5nO1xyXG4gIGNvbXBvbmVudD86IHN0cmluZztcclxuXHJcbiAgX3BhdGg/OiBzdHJpbmc7XHJcbiAgX3BhcmFtczogc3RyaW5nW107XHJcbiAgaW1wb3J0Q29tcG9uZW50PzogaW1wb3J0Q29tcG9uZW50O1xyXG5cclxuICBjaGlsZHJlbj86IFJvdXRlW107XHJcbn07XHJcblxyXG50eXBlIE5hbWVzID0ge1xyXG4gIFtrZXk6IHN0cmluZ106IHtcclxuICAgIHBhdGhUZW1wbGF0ZTogc3RyaW5nO1xyXG4gICAgcGFyYW1zUmVnZXg6IHtcclxuICAgICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHBhcmFtc09wdGlvbmFsOiB7XHJcbiAgICAgIFtrZXk6IHN0cmluZ106IGJvb2xlYW47XHJcbiAgICB9O1xyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIE1hdGNoZWRSb3V0ZSA9IFtcclxuICB7XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICBpbXBvcnRDb21wb25lbnQ6IGltcG9ydENvbXBvbmVudDtcclxuICB9W10sXHJcbiAgUGFyYW1zLFxyXG4gIHN0cmluZz9cclxuXTtcclxuXHJcbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHtcclxuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB0cmF2ZXJzZShcclxuICBub2RlOiBSb3V0ZSxcclxuICBjb250ZXh0OiB7XHJcbiAgICByZW1haW46IHN0cmluZztcclxuICAgIHJvdXRlR2V0Q29tcG9uZW50czoge1xyXG4gICAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xyXG4gICAgfVtdO1xyXG4gICAgcm91dGVBcmd1bWVudHM6IFBhcmFtcztcclxuICB9LFxyXG4pOiBNYXRjaGVkUm91dGUgfCBmYWxzZSB7XHJcbiAgLy8gdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0cyBhZmZlY3QgZWFjaCBvdGhlclxyXG4gIC8vIGNvcHkgY29udGV4dFxyXG4gIGxldCByZW1haW4gPSBjb250ZXh0LnJlbWFpbjtcclxuICBsZXQgcm91dGVHZXRDb21wb25lbnRzID0gWy4uLmNvbnRleHQucm91dGVHZXRDb21wb25lbnRzXTtcclxuICBsZXQgcm91dGVBcmd1bWVudHMgPSB7IC4uLmNvbnRleHQucm91dGVBcmd1bWVudHMgfTtcclxuXHJcbiAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBub2RlLl9wYXRoLCAnZycpO1xyXG5cclxuICBpZiAobm9kZS5fcGF0aCkge1xyXG4gICAgbGV0IG1hdGNoID0gbnVsbDtcclxuICAgIGlmICgobWF0Y2ggPSByZWdleC5leGVjKHJlbWFpbikpKSB7XHJcbiAgICAgIGlmIChub2RlLmltcG9ydENvbXBvbmVudCkge1xyXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcclxuICAgICAgICAgIHBhdGg6IG1hdGNoWzBdLFxyXG4gICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIG9wdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIG1hdGNoZWQgYXMgdW5kZWZpbmVkXHJcbiAgICAgICAgLy8gZmlsdGVyIHRoZW1cclxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcm91dGVBcmd1bWVudHNbbm9kZS5fcGFyYW1zW2kgLSAxXV0gPSBtYXRjaFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG1hdGNoIGhhcyByZWFjaGVkIHRhaWxcclxuICAgICAgaWYgKHJlZ2V4Lmxhc3RJbmRleCA9PT0gcmVtYWluLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBpdGVyYXRvciA9IG5vZGU7XHJcblxyXG4gICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlblxyXG4gICAgICAgIC8vIHNlYXJjaCBmb3IgZGVmYXVsdCByb3V0ZXMgb24gdGhlIHN1YnRyZWVcclxuICAgICAgICB3aGlsZSAoaXRlcmF0b3IuY2hpbGRyZW4pIHtcclxuICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGl0ZXJhdG9yLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5fcGF0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdENoaWxkID0gY2hpbGQ7XHJcblxyXG4gICAgICAgICAgICAgIGlmIChkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZUdldENvbXBvbmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXHJcbiAgICAgICAgICAgICAgICAgIGltcG9ydENvbXBvbmVudDogZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBpZiBoYXZpbmcgY2hpbGRyZW4gYnV0IGEgZGVmYXVsdCBvbmUgY2FuJ3QgYmUgZm91bmRcclxuICAgICAgICAgIC8vIG1hdGNoIHdpbGwgYmUgZmFpbC5cclxuICAgICAgICAgIGlmICghZGVmYXVsdENoaWxkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgaXRlcmF0b3IgPSBkZWZhdWx0Q2hpbGQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW3JvdXRlR2V0Q29tcG9uZW50cywgcm91dGVBcmd1bWVudHMsIGl0ZXJhdG9yLm5hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGEgcm91dGUgd2l0aG91dCBwYXRoIChkZWZhdWx0IHJvdXRlKVxyXG4gICAgLy8gcmVnYXJkZWQgYXMgYWx3YXlzIG1hdGNoZWRcclxuICAgIC8vIE5vdGU6IFRoaXMgd2lsbCBwZXJmb3JtIGFzIGEgZGVlcC1maXJzdCB0cmVlIHNlYXJjaFxyXG4gICAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XHJcbiAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcclxuICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxyXG4gICAgICAgIGltcG9ydENvbXBvbmVudDogbm9kZS5pbXBvcnRDb21wb25lbnQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcclxuICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UoY2hpbGQsIHtcclxuICAgICAgICByZW1haW46IHJlbWFpbi5zdWJzdHIocmVnZXgubGFzdEluZGV4KSxcclxuXHJcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLFxyXG4gICAgICAgIHJvdXRlQXJndW1lbnRzLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGUge1xyXG4gIHJvdXRlOiB7XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xyXG4gIH1bXTtcclxuICBhcmdzOiBQYXJhbXM7XHJcbiAgbmFtZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXMge1xyXG4gIG1hdGNoKHRhcmdldDogc3RyaW5nKTogUHJvbWlzZTxMb2FkZWRSb3V0ZSB8IGZhbHNlPjtcclxuICBjaGVjayh0YXJnZXQ6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlcyhkYXRhOiBSb3V0ZSwgbmFtZXM6IE5hbWVzKTogUm91dGVzIHtcclxuICByZXR1cm4ge1xyXG4gICAgYXN5bmMgbWF0Y2godGFyZ2V0KSB7XHJcbiAgICAgIGxldCBfdG1wID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XHJcbiAgICAgIGxldCBwYXRoID0gX3RtcC5zaGlmdCgpIHx8ICcnO1xyXG4gICAgICBsZXQgcXVlcnlTdHIgPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XHJcblxyXG4gICAgICBsZXQgcm9vdCA9IGRhdGE7XHJcbiAgICAgIGxldCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XHJcbiAgICAgICAgcmVtYWluOiBwYXRoLFxyXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXHJcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIG5vdCBtYXRjaFxyXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IFtyb3V0ZUdldENvbXBvbmVudHMsIGFyZ3MsIG5hbWVdID0gcmVzdWx0O1xyXG5cclxuICAgICAgLy8gYWN0dWFsbHkgaW1wb3J0IGNvbXBvbmVudHNcclxuICAgICAgY29uc3QgY29tcG9uZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5tYXAoKHsgaW1wb3J0Q29tcG9uZW50IH0pID0+IGltcG9ydENvbXBvbmVudCgpKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IHJvdXRlID0gY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaSkgPT4gKHtcclxuICAgICAgICBwYXRoOiByb3V0ZUdldENvbXBvbmVudHNbaV0ucGF0aCxcclxuICAgICAgICBjb21wb25lbnQsXHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIC8vIHBhcnNlIHF1ZXJ5IHN0cmluZyAmIG1lcmdlIGFyZ3NcclxuICAgICAgYXJncyA9IHsgLi4ucXMucGFyc2UocXVlcnlTdHIpLCAuLi5hcmdzIH07XHJcblxyXG4gICAgICAvLyBzdXBwb3J0IGluaXRpYWxQcm9wc1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgICBjb21wb25lbnRzLm1hcChjb21wb25lbnQgPT4ge1xyXG4gICAgICAgICAgaWYgKGNvbXBvbmVudC5pbml0aWFsUHJvcHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgIC5pbml0aWFsUHJvcHMoe1xyXG4gICAgICAgICAgICAgICAgcGF0aCxcclxuICAgICAgICAgICAgICAgIGFyZ3MsXHJcbiAgICAgICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4ocHJvcHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbXBvbmVudC5fcHJvcHMgPSB7fTtcclxuICAgICAgICB9KSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcm91dGUsXHJcbiAgICAgICAgYXJncyxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNoZWNrKHRhcmdldCkge1xyXG4gICAgICBjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KCc/Jykuc2hpZnQoKSB8fCAnJztcclxuICAgICAgY29uc3Qgcm9vdCA9IGRhdGE7XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XHJcbiAgICAgICAgcmVtYWluOiBwYXRoLFxyXG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50czogW10sXHJcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCk7XHJcbiAgICB9LFxyXG4gICAgbGluayhuYW1lLCBhcmdzKSB7XHJcbiAgICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xyXG5cclxuICAgICAgbGV0IHBhdGhuYW1lID0gJyc7XHJcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XHJcblxyXG4gICAgICBpZiAobmFtZVswXSAhPT0gJy8nKSB7XHJcbiAgICAgICAgLy8gbmFtZWQgcm91dGVcclxuICAgICAgICBsZXQgbmFtZWQgPSBuYW1lc1tuYW1lXTtcclxuICAgICAgICBpZiAobmFtZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIG5hbWVkIHJvdXRlOiAke25hbWV9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmFtZWQucGFyYW1zT3B0aW9uYWwpIHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJnc1trZXldO1xyXG5cclxuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSBmYWxzZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgYXJndW1lbnQgWyR7a2V5fV0gaXMgcmVxdWlyZWRgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV0gKyAnJCcpO1xyXG4gICAgICAgICAgaWYgKHZhbHVlICYmIHJlZ2V4LnRlc3QoU3RyaW5nKHZhbHVlKSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICBgYXJndW1lbnQgWyR7a2V5fV0gaXMgaW52YWxpZCwgbXVzdCBtYXRjaCByZWdleHAgWyR7XHJcbiAgICAgICAgICAgICAgICBuYW1lZC5wYXJhbXNSZWdleFtrZXldXHJcbiAgICAgICAgICAgICAgfV1gLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZShgKCR7a2V5fSlgLCAnJyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgYCgke2tleX0pYCxcclxuICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XHJcbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHBhdGggcm91dGVcclxuICAgICAgICBwYXRobmFtZSA9IG5hbWU7XHJcbiAgICAgICAgcXVlcnlPYmogPSBhcmdzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXX0=