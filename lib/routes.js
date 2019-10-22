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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwicm91dGVzIiwiZGF0YSIsIm5hbWVzIiwidGFyZ2V0IiwiX3RtcCIsInNwbGl0Iiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsInFzIiwicGFyc2UiLCJpbml0aWFsUHJvcHMiLCJ0aGVuIiwicHJvcHMiLCJfcHJvcHMiLCJjaGVjayIsIkJvb2xlYW4iLCJsaW5rIiwicGF0aG5hbWUiLCJxdWVyeU9iaiIsIm5hbWVkIiwicGF0aFRlbXBsYXRlIiwia2V5IiwicGFyYW1zT3B0aW9uYWwiLCJ2YWx1ZSIsIkVycm9yIiwicGFyYW1zUmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBcURBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVBVXdCO0FBQ3RCO0FBQ0E7QUFDQSxNQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ0MsTUFBckI7QUFDQSxNQUFJQyxrQkFBa0Isb0NBQU9GLE9BQU8sQ0FBQ0Usa0JBQWYsQ0FBdEI7QUFDQSxNQUFJQyxjQUFj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QUFBQSxjQUFjLEVBQUU7QUFBbEIsT0FBdkIsQ0FBckI7QUFDRDtBQXhISSxHQUFQO0FBMEhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cbmV4cG9ydCB0eXBlIEluaXRpYWxQcm9wcyA9IChtYXRjaDoge1xuICBwYXRoOiBzdHJpbmc7XG4gIGFyZ3M/OiBQYXJhbXM7XG4gIG5hbWU/OiBzdHJpbmc7XG59KSA9PiBQcm9taXNlPG9iamVjdD47XG5cbmV4cG9ydCB0eXBlIENvbXBvbmVudDxUPiA9IENvbXBvbmVudFR5cGU8VD4gJiB7XG4gIGluaXRpYWxQcm9wcz86IEluaXRpYWxQcm9wcztcbiAgX3Byb3BzOiBvYmplY3Q7XG59O1xuXG50eXBlIGltcG9ydENvbXBvbmVudCA9ICgpID0+IFByb21pc2U8Q29tcG9uZW50PGFueT4+O1xuXG50eXBlIFJvdXRlID0ge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XG4gIGNvbXBvbmVudD86IHN0cmluZztcblxuICBfcGF0aD86IHN0cmluZztcbiAgX3BhcmFtczogc3RyaW5nW107XG4gIGltcG9ydENvbXBvbmVudD86IGltcG9ydENvbXBvbmVudDtcblxuICBjaGlsZHJlbj86IFJvdXRlW107XG59O1xuXG50eXBlIE5hbWVzID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcGFyYW1zUmVnZXg6IHtcbiAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgICB9O1xuICAgIHBhcmFtc09wdGlvbmFsOiB7XG4gICAgICBba2V5OiBzdHJpbmddOiBib29sZWFuO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIE1hdGNoZWRSb3V0ZSA9IFtcbiAge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBpbXBvcnRDb21wb25lbnQ6IGltcG9ydENvbXBvbmVudDtcbiAgfVtdLFxuICBQYXJhbXMsXG4gIHN0cmluZz9cbl07XG5cbmV4cG9ydCB0eXBlIFBhcmFtcyA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuZnVuY3Rpb24gdHJhdmVyc2UoXG4gIG5vZGU6IFJvdXRlLFxuICBjb250ZXh0OiB7XG4gICAgcmVtYWluOiBzdHJpbmc7XG4gICAgcm91dGVHZXRDb21wb25lbnRzOiB7XG4gICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICBpbXBvcnRDb21wb25lbnQ6IGltcG9ydENvbXBvbmVudDtcbiAgICB9W107XG4gICAgcm91dGVBcmd1bWVudHM6IFBhcmFtcztcbiAgfSxcbik6IE1hdGNoZWRSb3V0ZSB8IGZhbHNlIHtcbiAgLy8gdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0cyBhZmZlY3QgZWFjaCBvdGhlclxuICAvLyBjb3B5IGNvbnRleHRcbiAgbGV0IHJlbWFpbiA9IGNvbnRleHQucmVtYWluO1xuICBsZXQgcm91dGVHZXRDb21wb25lbnRzID0gWy4uLmNvbnRleHQucm91dGVHZXRDb21wb25lbnRzXTtcbiAgbGV0IHJvdXRlQXJndW1lbnRzID0geyAuLi5jb250ZXh0LnJvdXRlQXJndW1lbnRzIH07XG5cbiAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBub2RlLl9wYXRoLCAnZycpO1xuXG4gIGlmIChub2RlLl9wYXRoKSB7XG4gICAgbGV0IG1hdGNoID0gbnVsbDtcbiAgICBpZiAoKG1hdGNoID0gcmVnZXguZXhlYyhyZW1haW4pKSkge1xuICAgICAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcbiAgICAgICAgICBwYXRoOiBtYXRjaFswXSxcbiAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBvcHRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBtYXRjaGVkIGFzIHVuZGVmaW5lZFxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxuICAgICAgICBpZiAobWF0Y2hbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJvdXRlQXJndW1lbnRzW25vZGUuX3BhcmFtc1tpIC0gMV1dID0gbWF0Y2hbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWF0Y2ggaGFzIHJlYWNoZWQgdGFpbFxuICAgICAgaWYgKHJlZ2V4Lmxhc3RJbmRleCA9PT0gcmVtYWluLmxlbmd0aCkge1xuICAgICAgICBsZXQgaXRlcmF0b3IgPSBub2RlO1xuXG4gICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlblxuICAgICAgICAvLyBzZWFyY2ggZm9yIGRlZmF1bHQgcm91dGVzIG9uIHRoZSBzdWJ0cmVlXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci5jaGlsZHJlbikge1xuICAgICAgICAgIGxldCBkZWZhdWx0Q2hpbGQgPSBudWxsO1xuXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgaXRlcmF0b3IuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5fcGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRDaGlsZCA9IGNoaWxkO1xuXG4gICAgICAgICAgICAgIGlmIChkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGF0aDogJ19fZGVmYXVsdF9fJyxcbiAgICAgICAgICAgICAgICAgIGltcG9ydENvbXBvbmVudDogZGVmYXVsdENoaWxkLmltcG9ydENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlbiBidXQgYSBkZWZhdWx0IG9uZSBjYW4ndCBiZSBmb3VuZFxuICAgICAgICAgIC8vIG1hdGNoIHdpbGwgYmUgZmFpbC5cbiAgICAgICAgICBpZiAoIWRlZmF1bHRDaGlsZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgaXRlcmF0b3IgPSBkZWZhdWx0Q2hpbGQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3JvdXRlR2V0Q29tcG9uZW50cywgcm91dGVBcmd1bWVudHMsIGl0ZXJhdG9yLm5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBhIHJvdXRlIHdpdGhvdXQgcGF0aCAoZGVmYXVsdCByb3V0ZSlcbiAgICAvLyByZWdhcmRlZCBhcyBhbHdheXMgbWF0Y2hlZFxuICAgIC8vIE5vdGU6IFRoaXMgd2lsbCBwZXJmb3JtIGFzIGEgZGVlcC1maXJzdCB0cmVlIHNlYXJjaFxuICAgIGlmIChub2RlLmltcG9ydENvbXBvbmVudCkge1xuICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xuICAgICAgICBwYXRoOiAnX19kZWZhdWx0X18nLFxuICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShjaGlsZCwge1xuICAgICAgICByZW1haW46IHJlbWFpbi5zdWJzdHIocmVnZXgubGFzdEluZGV4KSxcblxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMsXG4gICAgICAgIHJvdXRlQXJndW1lbnRzLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGUge1xuICByb3V0ZToge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudDxhbnk+O1xuICB9W107XG4gIGFyZ3M6IFBhcmFtcztcbiAgbmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXMge1xuICBtYXRjaCh0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8TG9hZGVkUm91dGUgfCBmYWxzZT47XG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcbiAgbGluayhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBQYXJhbXMpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdXRlcyhkYXRhOiBSb3V0ZSwgbmFtZXM6IE5hbWVzKTogUm91dGVzIHtcbiAgcmV0dXJuIHtcbiAgICBhc3luYyBtYXRjaCh0YXJnZXQpIHtcbiAgICAgIGxldCBfdG1wID0gdGFyZ2V0LnNwbGl0KCc/Jyk7XG4gICAgICBsZXQgcGF0aCA9IF90bXAuc2hpZnQoKSB8fCAnJztcbiAgICAgIGxldCBxdWVyeVN0ciA9IF90bXAuc2hpZnQoKSB8fCAnJztcblxuICAgICAgbGV0IHJvb3QgPSBkYXRhO1xuICAgICAgbGV0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcbiAgICAgICAgcmVtYWluOiBwYXRoLFxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHM6IFtdLFxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXG4gICAgICB9KTtcblxuICAgICAgLy8gbm90IG1hdGNoXG4gICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGxldCBbcm91dGVHZXRDb21wb25lbnRzLCBhcmdzLCBuYW1lXSA9IHJlc3VsdDtcblxuICAgICAgLy8gYWN0dWFsbHkgaW1wb3J0IGNvbXBvbmVudHNcbiAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLm1hcCgoeyBpbXBvcnRDb21wb25lbnQgfSkgPT4gaW1wb3J0Q29tcG9uZW50KCkpLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgcm91dGUgPSBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50LCBpKSA9PiAoe1xuICAgICAgICBwYXRoOiByb3V0ZUdldENvbXBvbmVudHNbaV0ucGF0aCxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgfSkpO1xuXG4gICAgICAvLyBwYXJzZSBxdWVyeSBzdHJpbmcgJiBtZXJnZSBhcmdzXG4gICAgICBhcmdzID0geyAuLi5xcy5wYXJzZShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcblxuICAgICAgLy8gc3VwcG9ydCBpbml0aWFsUHJvcHNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBjb21wb25lbnRzLm1hcChjb21wb25lbnQgPT4ge1xuICAgICAgICAgIGlmIChjb21wb25lbnQuaW5pdGlhbFByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XG4gICAgICAgICAgICAgIC5pbml0aWFsUHJvcHMoe1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgYXJncyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbihwcm9wcyA9PiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0ge307XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm91dGUsXG4gICAgICAgIGFyZ3MsXG4gICAgICAgIG5hbWUsXG4gICAgICB9O1xuICAgIH0sXG4gICAgY2hlY2sodGFyZ2V0KSB7XG4gICAgICBjb25zdCBwYXRoID0gdGFyZ2V0LnNwbGl0KCc/Jykuc2hpZnQoKSB8fCAnJztcbiAgICAgIGNvbnN0IHJvb3QgPSBkYXRhO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShyb290LCB7XG4gICAgICAgIHJlbWFpbjogcGF0aCxcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcbiAgICAgICAgcm91dGVBcmd1bWVudHM6IHt9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCk7XG4gICAgfSxcbiAgICBsaW5rKG5hbWUsIGFyZ3MpIHtcbiAgICAgIGFyZ3MgPSBhcmdzIHx8IHt9O1xuXG4gICAgICBsZXQgcGF0aG5hbWUgPSAnLyc7XG4gICAgICBsZXQgcXVlcnlPYmo6IFBhcmFtcyA9IHt9O1xuXG4gICAgICBsZXQgbmFtZWQgPSBuYW1lc1tuYW1lXTtcbiAgICAgIGlmIChuYW1lZCkge1xuICAgICAgICAvLyBuYW1lZCByb3V0ZVxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmFtZWQucGFyYW1zT3B0aW9uYWwpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3Nba2V5XTtcblxuICAgICAgICAgIGlmIChuYW1lZC5wYXJhbXNPcHRpb25hbFtrZXldID09PSBmYWxzZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyZ3VtZW50IFske2tleX1dIGlzIHJlcXVpcmVkYCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBuYW1lZC5wYXJhbXNSZWdleFtrZXldICsgJyQnKTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgcmVnZXgudGVzdChTdHJpbmcodmFsdWUpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYGFyZ3VtZW50IFske2tleX1dIGlzIGludmFsaWQsIG11c3QgbWF0Y2ggcmVnZXhwIFske1xuICAgICAgICAgICAgICAgIG5hbWVkLnBhcmFtc1JlZ2V4W2tleV1cbiAgICAgICAgICAgICAgfV1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKGAoJHtrZXl9KWAsICcnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICBgKCR7a2V5fSlgLFxuICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHZhbHVlKSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBxdWVyeSBhcmdzICh0aGUgYXJncyBleGNsdWRlIHJvdXRlIGFyZ3MpXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XG4gICAgICAgICAgaWYgKG5hbWVkLnBhcmFtc09wdGlvbmFsW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcXVlcnlPYmpba2V5XSA9IGFyZ3Nba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBhdGggcm91dGVcbiAgICAgICAgcGF0aG5hbWUgPSBuYW1lO1xuICAgICAgICBxdWVyeU9iaiA9IGFyZ3M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwYXRobmFtZX0ke3FzLnN0cmluZ2lmeShxdWVyeU9iaiwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KX1gO1xuICAgIH0sXG4gIH07XG59XG4iXX0=