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

          delete args[_key];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMudHMiXSwibmFtZXMiOlsidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsInJlbWFpbiIsInJvdXRlR2V0Q29tcG9uZW50cyIsInJvdXRlQXJndW1lbnRzIiwicmVnZXgiLCJSZWdFeHAiLCJfcGF0aCIsIm1hdGNoIiwiZXhlYyIsImltcG9ydENvbXBvbmVudCIsInB1c2giLCJwYXRoIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsIl9wYXJhbXMiLCJsYXN0SW5kZXgiLCJpdGVyYXRvciIsImNoaWxkcmVuIiwiZGVmYXVsdENoaWxkIiwiY2hpbGQiLCJuYW1lIiwicmVzdWx0Iiwic3Vic3RyIiwicm91dGVzIiwiZGF0YSIsIm5hbWVzIiwidGFyZ2V0IiwiX3RtcCIsInNwbGl0Iiwic2hpZnQiLCJxdWVyeVN0ciIsInJvb3QiLCJhcmdzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsImNvbXBvbmVudHMiLCJyb3V0ZSIsImNvbXBvbmVudCIsInFzIiwicGFyc2UiLCJpbml0aWFsUHJvcHMiLCJ0aGVuIiwicHJvcHMiLCJfcHJvcHMiLCJjaGVjayIsIkJvb2xlYW4iLCJsaW5rIiwicGF0aG5hbWUiLCJxdWVyeU9iaiIsIm5hbWVkIiwicGF0aFRlbXBsYXRlIiwia2V5IiwicGFyYW1zT3B0aW9uYWwiLCJ2YWx1ZSIsIkVycm9yIiwicGFyYW1zUmVnZXgiLCJ0ZXN0IiwiU3RyaW5nIiwicmVwbGFjZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmeSIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBbURBLFNBQVNBLFFBQVQsQ0FDRUMsSUFERixFQUVFQyxPQUZGLEVBVXdCO0FBQ3RCO0FBQ0E7QUFDQSxNQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQ0MsTUFBckI7QUFDQSxNQUFJQyxrQkFBa0Isb0NBQU9GLE9BQU8sQ0FBQ0Usa0JBQWYsQ0FBdEI7QUFDQSxNQUFJQyxjQUFj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WUFBR3NCLFNBQUgsQ0FBYVosUUFBYixFQUF1QjtBQUFFYSxRQUFBQSxjQUFjLEVBQUU7QUFBbEIsT0FBdkIsQ0FBckI7QUFDRDtBQTFISSxHQUFQO0FBNEhEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHFzIGZyb20gJ3FzJztcclxuXHJcbnR5cGUgQ29tcG9uZW50PFQ+ID0gQ29tcG9uZW50VHlwZTxUPiAmIHtcclxuICBpbml0aWFsUHJvcHM/OiAobWF0Y2g6IHtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIGFyZ3M/OiBQYXJhbXM7XHJcbiAgICBuYW1lPzogc3RyaW5nO1xyXG4gIH0pID0+IFByb21pc2U8b2JqZWN0PjtcclxuICBfcHJvcHM6IG9iamVjdDtcclxufTtcclxuXHJcbnR5cGUgaW1wb3J0Q29tcG9uZW50ID0gKCkgPT4gUHJvbWlzZTxDb21wb25lbnQ8YW55Pj47XHJcblxyXG50eXBlIFJvdXRlID0ge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgcGF0aD86IHN0cmluZztcclxuICBkaXJlY3Rvcnk/OiBzdHJpbmc7XHJcbiAgY29tcG9uZW50Pzogc3RyaW5nO1xyXG5cclxuICBfcGF0aD86IHN0cmluZztcclxuICBfcGFyYW1zOiBzdHJpbmdbXTtcclxuICBpbXBvcnRDb21wb25lbnQ/OiBpbXBvcnRDb21wb25lbnQ7XHJcblxyXG4gIGNoaWxkcmVuPzogUm91dGVbXTtcclxufTtcclxuXHJcbnR5cGUgTmFtZXMgPSB7XHJcbiAgW2tleTogc3RyaW5nXToge1xyXG4gICAgcGF0aFRlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBwYXJhbXNSZWdleDoge1xyXG4gICAgICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgcGFyYW1zT3B0aW9uYWw6IHtcclxuICAgICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcclxuICAgIH07XHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgTWF0Y2hlZFJvdXRlID0gW1xyXG4gIHtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIGltcG9ydENvbXBvbmVudDogaW1wb3J0Q29tcG9uZW50O1xyXG4gIH1bXSxcclxuICBQYXJhbXMsXHJcbiAgc3RyaW5nP1xyXG5dO1xyXG5cclxuZXhwb3J0IHR5cGUgUGFyYW1zID0ge1xyXG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcclxufTtcclxuXHJcbmZ1bmN0aW9uIHRyYXZlcnNlKFxyXG4gIG5vZGU6IFJvdXRlLFxyXG4gIGNvbnRleHQ6IHtcclxuICAgIHJlbWFpbjogc3RyaW5nO1xyXG4gICAgcm91dGVHZXRDb21wb25lbnRzOiB7XHJcbiAgICAgIHBhdGg6IHN0cmluZztcclxuICAgICAgaW1wb3J0Q29tcG9uZW50OiBpbXBvcnRDb21wb25lbnQ7XHJcbiAgICB9W107XHJcbiAgICByb3V0ZUFyZ3VtZW50czogUGFyYW1zO1xyXG4gIH0sXHJcbik6IE1hdGNoZWRSb3V0ZSB8IGZhbHNlIHtcclxuICAvLyB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzIGFmZmVjdCBlYWNoIG90aGVyXHJcbiAgLy8gY29weSBjb250ZXh0XHJcbiAgbGV0IHJlbWFpbiA9IGNvbnRleHQucmVtYWluO1xyXG4gIGxldCByb3V0ZUdldENvbXBvbmVudHMgPSBbLi4uY29udGV4dC5yb3V0ZUdldENvbXBvbmVudHNdO1xyXG4gIGxldCByb3V0ZUFyZ3VtZW50cyA9IHsgLi4uY29udGV4dC5yb3V0ZUFyZ3VtZW50cyB9O1xyXG5cclxuICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIG5vZGUuX3BhdGgsICdnJyk7XHJcblxyXG4gIGlmIChub2RlLl9wYXRoKSB7XHJcbiAgICBsZXQgbWF0Y2ggPSBudWxsO1xyXG4gICAgaWYgKChtYXRjaCA9IHJlZ2V4LmV4ZWMocmVtYWluKSkpIHtcclxuICAgICAgaWYgKG5vZGUuaW1wb3J0Q29tcG9uZW50KSB7XHJcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xyXG4gICAgICAgICAgcGF0aDogbWF0Y2hbMF0sXHJcbiAgICAgICAgICBpbXBvcnRDb21wb25lbnQ6IG5vZGUuaW1wb3J0Q29tcG9uZW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hdGNoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gb3B0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgbWF0Y2hlZCBhcyB1bmRlZmluZWRcclxuICAgICAgICAvLyBmaWx0ZXIgdGhlbVxyXG4gICAgICAgIGlmIChtYXRjaFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByb3V0ZUFyZ3VtZW50c1tub2RlLl9wYXJhbXNbaSAtIDFdXSA9IG1hdGNoW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbWF0Y2ggaGFzIHJlYWNoZWQgdGFpbFxyXG4gICAgICBpZiAocmVnZXgubGFzdEluZGV4ID09PSByZW1haW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgbGV0IGl0ZXJhdG9yID0gbm9kZTtcclxuXHJcbiAgICAgICAgLy8gaWYgaGF2aW5nIGNoaWxkcmVuXHJcbiAgICAgICAgLy8gc2VhcmNoIGZvciBkZWZhdWx0IHJvdXRlcyBvbiB0aGUgc3VidHJlZVxyXG4gICAgICAgIHdoaWxlIChpdGVyYXRvci5jaGlsZHJlbikge1xyXG4gICAgICAgICAgbGV0IGRlZmF1bHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgaXRlcmF0b3IuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLl9wYXRoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBkZWZhdWx0Q2hpbGQgPSBjaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKGRlZmF1bHRDaGlsZC5pbXBvcnRDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlR2V0Q29tcG9uZW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgcGF0aDogJ19fZGVmYXVsdF9fJyxcclxuICAgICAgICAgICAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBkZWZhdWx0Q2hpbGQuaW1wb3J0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGlmIGhhdmluZyBjaGlsZHJlbiBidXQgYSBkZWZhdWx0IG9uZSBjYW4ndCBiZSBmb3VuZFxyXG4gICAgICAgICAgLy8gbWF0Y2ggd2lsbCBiZSBmYWlsLlxyXG4gICAgICAgICAgaWYgKCFkZWZhdWx0Q2hpbGQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICBpdGVyYXRvciA9IGRlZmF1bHRDaGlsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbcm91dGVHZXRDb21wb25lbnRzLCByb3V0ZUFyZ3VtZW50cywgaXRlcmF0b3IubmFtZV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYSByb3V0ZSB3aXRob3V0IHBhdGggKGRlZmF1bHQgcm91dGUpXHJcbiAgICAvLyByZWdhcmRlZCBhcyBhbHdheXMgbWF0Y2hlZFxyXG4gICAgLy8gTm90ZTogVGhpcyB3aWxsIHBlcmZvcm0gYXMgYSBkZWVwLWZpcnN0IHRyZWUgc2VhcmNoXHJcbiAgICBpZiAobm9kZS5pbXBvcnRDb21wb25lbnQpIHtcclxuICAgICAgcm91dGVHZXRDb21wb25lbnRzLnB1c2goe1xyXG4gICAgICAgIHBhdGg6ICdfX2RlZmF1bHRfXycsXHJcbiAgICAgICAgaW1wb3J0Q29tcG9uZW50OiBub2RlLmltcG9ydENvbXBvbmVudCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSB0cmF2ZXJzZShjaGlsZCwge1xyXG4gICAgICAgIHJlbWFpbjogcmVtYWluLnN1YnN0cihyZWdleC5sYXN0SW5kZXgpLFxyXG5cclxuICAgICAgICByb3V0ZUdldENvbXBvbmVudHMsXHJcbiAgICAgICAgcm91dGVBcmd1bWVudHMsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZSB7XHJcbiAgcm91dGU6IHtcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIGNvbXBvbmVudDogQ29tcG9uZW50PGFueT47XHJcbiAgfVtdO1xyXG4gIGFyZ3M6IFBhcmFtcztcclxuICBuYW1lPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlcyB7XHJcbiAgbWF0Y2godGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPExvYWRlZFJvdXRlIHwgZmFsc2U+O1xyXG4gIGNoZWNrKHRhcmdldDogc3RyaW5nKTogYm9vbGVhbjtcclxuICBsaW5rKG5hbWU6IHN0cmluZywgYXJncz86IFBhcmFtcyk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91dGVzKGRhdGE6IFJvdXRlLCBuYW1lczogTmFtZXMpOiBSb3V0ZXMge1xyXG4gIHJldHVybiB7XHJcbiAgICBhc3luYyBtYXRjaCh0YXJnZXQpIHtcclxuICAgICAgbGV0IF90bXAgPSB0YXJnZXQuc3BsaXQoJz8nKTtcclxuICAgICAgbGV0IHBhdGggPSBfdG1wLnNoaWZ0KCkgfHwgJyc7XHJcbiAgICAgIGxldCBxdWVyeVN0ciA9IF90bXAuc2hpZnQoKSB8fCAnJztcclxuXHJcbiAgICAgIGxldCByb290ID0gZGF0YTtcclxuICAgICAgbGV0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcclxuICAgICAgICByZW1haW46IHBhdGgsXHJcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcclxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gbm90IG1hdGNoXHJcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgW3JvdXRlR2V0Q29tcG9uZW50cywgYXJncywgbmFtZV0gPSByZXN1bHQ7XHJcblxyXG4gICAgICAvLyBhY3R1YWxseSBpbXBvcnQgY29tcG9uZW50c1xyXG4gICAgICBjb25zdCBjb21wb25lbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzLm1hcCgoeyBpbXBvcnRDb21wb25lbnQgfSkgPT4gaW1wb3J0Q29tcG9uZW50KCkpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3Qgcm91dGUgPSBjb21wb25lbnRzLm1hcCgoY29tcG9uZW50LCBpKSA9PiAoe1xyXG4gICAgICAgIHBhdGg6IHJvdXRlR2V0Q29tcG9uZW50c1tpXS5wYXRoLFxyXG4gICAgICAgIGNvbXBvbmVudCxcclxuICAgICAgfSkpO1xyXG5cclxuICAgICAgLy8gcGFyc2UgcXVlcnkgc3RyaW5nICYgbWVyZ2UgYXJnc1xyXG4gICAgICBhcmdzID0geyAuLi5xcy5wYXJzZShxdWVyeVN0ciksIC4uLmFyZ3MgfTtcclxuXHJcbiAgICAgIC8vIHN1cHBvcnQgaW5pdGlhbFByb3BzXHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICAgIGNvbXBvbmVudHMubWFwKGNvbXBvbmVudCA9PiB7XHJcbiAgICAgICAgICBpZiAoY29tcG9uZW50LmluaXRpYWxQcm9wcykge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgLmluaXRpYWxQcm9wcyh7XHJcbiAgICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgICAgYXJncyxcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAudGhlbihwcm9wcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuX3Byb3BzID0gcHJvcHMgfHwge307XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29tcG9uZW50Ll9wcm9wcyA9IHt9O1xyXG4gICAgICAgIH0pLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByb3V0ZSxcclxuICAgICAgICBhcmdzLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY2hlY2sodGFyZ2V0KSB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuc3BsaXQoJz8nKS5zaGlmdCgpIHx8ICcnO1xyXG4gICAgICBjb25zdCByb290ID0gZGF0YTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyYXZlcnNlKHJvb3QsIHtcclxuICAgICAgICByZW1haW46IHBhdGgsXHJcbiAgICAgICAgcm91dGVHZXRDb21wb25lbnRzOiBbXSxcclxuICAgICAgICByb3V0ZUFyZ3VtZW50czoge30sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIEJvb2xlYW4ocmVzdWx0KTtcclxuICAgIH0sXHJcbiAgICBsaW5rKG5hbWUsIGFyZ3MpIHtcclxuICAgICAgYXJncyA9IGFyZ3MgfHwge307XHJcblxyXG4gICAgICBsZXQgcGF0aG5hbWUgPSAnLyc7XHJcbiAgICAgIGxldCBxdWVyeU9iajogUGFyYW1zID0ge307XHJcblxyXG4gICAgICBsZXQgbmFtZWQgPSBuYW1lc1tuYW1lXTtcclxuICAgICAgaWYgKG5hbWVkKSB7XHJcbiAgICAgICAgLy8gbmFtZWQgcm91dGVcclxuICAgICAgICBwYXRobmFtZSA9IG5hbWVkLnBhdGhUZW1wbGF0ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5hbWVkLnBhcmFtc09wdGlvbmFsKSB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3Nba2V5XTtcclxuXHJcbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gZmFsc2UgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGFyZ3VtZW50IFske2tleX1dIGlzIHJlcXVpcmVkYCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBuYW1lZC5wYXJhbXNSZWdleFtrZXldICsgJyQnKTtcclxuICAgICAgICAgIGlmICh2YWx1ZSAmJiByZWdleC50ZXN0KFN0cmluZyh2YWx1ZSkpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgYGFyZ3VtZW50IFske2tleX1dIGlzIGludmFsaWQsIG11c3QgbWF0Y2ggcmVnZXhwIFske1xyXG4gICAgICAgICAgICAgICAgbmFtZWQucGFyYW1zUmVnZXhba2V5XVxyXG4gICAgICAgICAgICAgIH1dYCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoYCgke2tleX0pYCwgJycpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgIGAoJHtrZXl9KWAsXHJcbiAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRlbGV0ZSBhcmdzW2tleV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgcXVlcnkgYXJncyAodGhlIGFyZ3MgZXhjbHVkZSByb3V0ZSBhcmdzKVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhcmdzKSB7XHJcbiAgICAgICAgICBpZiAobmFtZWQucGFyYW1zT3B0aW9uYWxba2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5T2JqW2tleV0gPSBhcmdzW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHBhdGggcm91dGVcclxuICAgICAgICBwYXRobmFtZSA9IG5hbWU7XHJcbiAgICAgICAgcXVlcnlPYmogPSBhcmdzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCR7cGF0aG5hbWV9JHtxcy5zdHJpbmdpZnkocXVlcnlPYmosIHsgYWRkUXVlcnlQcmVmaXg6IHRydWUgfSl9YDtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iXX0=