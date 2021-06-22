"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var nodeEval = require('node-eval');

var _ = require('lodash');

var _require = require('../package'),
    name = _require.name;

var babel = require('@babel/core');

var importComponent = "\nfunction () {\n  return import('__component__').then(function (m) {\n    return m.default || m;\n  });\n}\n";

module.exports = function (source, inputSourceMap) {
  // Make the loader async
  // fork from babel-loader@8
  var callback = this.async();
  loader.call(this, source, inputSourceMap).then(function (args) {
    return callback.apply(void 0, [null].concat((0, _toConsumableArray2["default"])(args)));
  }, function (err) {
    return callback(err);
  });
}; // support es6 with babel-loader
// fork from babel-loader@8


function babelLoader(_x, _x2) {
  return _babelLoader.apply(this, arguments);
}

function _babelLoader() {
  _babelLoader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(source, inputSourceMap) {
    var filename, options, config, _yield$babel$transfor, code, map;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filename = this.resourcePath;
            options = {
              filename: filename,
              inputSourceMap: inputSourceMap || undefined,
              // Set the default sourcemap behavior based on Webpack's mapping flag
              sourceMaps: this.sourceMap,
              // Ensure that Webpack will get a full absolute path in the sourcemap
              // so that it can properly map the module back to its internal cached
              // modules.
              sourceFileName: filename,
              caller: {
                name: "".concat(name, "/loader"),
                // node-eval can only eval commonjs module
                supportsStaticESM: false,
                supportsDynamicImport: false
              }
            };
            config = babel.loadPartialConfig(options);
            options = config.options;

            if (options.sourceMaps === 'inline') {
              // Babel has this weird behavior where if you set "inline", we
              // inline the sourcemap, and set 'result.map = null'. This results
              // in bad behavior from Babel since the maps get put into the code,
              // which Webpack does not expect, and because the map we return to
              // Webpack is null, which is also bad. To avoid that, we override the
              // behavior here so "inline" just behaves like 'true'.
              options.sourceMaps = true;
            }

            _context.next = 7;
            return babel.transformAsync(source, options);

          case 7:
            _yield$babel$transfor = _context.sent;
            code = _yield$babel$transfor.code;
            map = _yield$babel$transfor.map;

            if (typeof config.babelrc === 'string') {
              this.addDependency(config.babelrc);
            }

            return _context.abrupt("return", [code, map || undefined]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _babelLoader.apply(this, arguments);
}

function loader(_x3, _x4) {
  return _loader.apply(this, arguments);
}

function _loader() {
  _loader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(source, inputSourceMap) {
    var filename, _yield$babelLoader$ca, _yield$babelLoader$ca2, routes, routeTree, namedRoutes, routesSource;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filename = this.resourcePath;
            _context2.next = 3;
            return babelLoader.call(this, source, inputSourceMap);

          case 3:
            _yield$babelLoader$ca = _context2.sent;
            _yield$babelLoader$ca2 = (0, _slicedToArray2["default"])(_yield$babelLoader$ca, 2);
            source = _yield$babelLoader$ca2[0];
            inputSourceMap = _yield$babelLoader$ca2[1];
            // eval routes.js so we can traverse routeTree
            routes = nodeEval(source, filename);
            routes = routes["default"] || routes;

            if (!(!routes.data || !routes.match || !routes.check || !routes.link)) {
              _context2.next = 11;
              break;
            }

            throw new Error("invalid routes, forget to wrap it with routes()?");

          case 11:
            routeTree = routes.data.data;

            if (_.isArray(routeTree)) {
              routeTree = {
                children: routeTree
              };
            } // base url


            routeTree.path = __BASE__ + routeTree.path; // for named routes

            namedRoutes = {};

            (function traverse(node, context) {
              if (node.component && !_.isString(node.component)) {
                throw new Error("component must be string: ".concat(node.component));
              }

              if (node.name && !_.isEmpty(node.children)) {
                throw new Error("named route is a leaf that can not has children: ".concat(node.name));
              } // create current context to avoid children's contexts
              // affect each other


              var pathTemplate = context.pathTemplate;
              var paramsRegex = Object.assign({}, context.paramsRegex);
              var paramsOptional = Object.assign({}, context.paramsOptional); // compile path to support regex and params

              if (node.path) {
                // two ways to declare route arg:
                // 1. (name:regex) or (name?:regex)
                // 2. :name
                var regexMatch = /\(([a-zA-Z_][a-zA-Z_0-9]*\??)\:(.*?)\)|\:([a-zA-Z_][a-zA-Z_0-9]*)/g;
                var lastIndex = 0;
                var compiled = '';
                var params = [];
                var match = null;

                while (match = regexMatch.exec(node.path)) {
                  var notRegex = node.path.substr(lastIndex, match.index - lastIndex);
                  lastIndex = regexMatch.lastIndex;
                  compiled += _.escapeRegExp(notRegex);
                  var _name = match[1];
                  var regex = match[2]; // :name implicitly ends with '/' or the end of string

                  if (!_name) {
                    _name = match[3];
                    regex = '[^/]+';
                  }

                  if (paramsRegex[_name]) {
                    throw new Error("param name conflicts: ".concat(_name));
                  }

                  if (_name.slice(-1) === '?') {
                    _name = _name.slice(0, -1);
                    compiled += "(".concat(regex, ")?");
                    params.push(_name);
                    paramsRegex[_name] = regex;
                    paramsOptional[_name] = true;
                  } else {
                    compiled += "(".concat(regex, ")");
                    params.push(_name);
                    paramsRegex[_name] = regex;
                    paramsOptional[_name] = false;
                  }

                  pathTemplate += notRegex;
                  pathTemplate += "(".concat(_name, ")");
                } // deal with tail


                if (lastIndex < node.path.length) {
                  var _notRegex = node.path.substr(lastIndex, node.path.length - lastIndex);

                  compiled += _.escapeRegExp(_notRegex);
                  pathTemplate += _notRegex;
                }

                node._path = compiled;
                node._params = params;
              } // for named routes


              if (node.name && _.isEmpty(node.children)) {
                namedRoutes[node.name] = {
                  pathTemplate: pathTemplate,
                  paramsRegex: paramsRegex,
                  paramsOptional: paramsOptional
                };
              } // add importComponent as placeholder, prepare for hack


              if (node.component) {
                node.importComponent = node.component;
              } // recursive traverse to children


              if (!_.isEmpty(node.children)) {
                _.forEach(node.children, function (n) {
                  traverse(n, {
                    pathTemplate: pathTemplate,
                    paramsRegex: paramsRegex,
                    paramsOptional: paramsOptional
                  });
                });
              }
            })(routeTree, {
              // for named routes
              pathTemplate: '',
              paramsRegex: {},
              paramsOptional: {}
            }); // convert to source so we can hack it as string


            routesSource = JSON.stringify(Object.assign({}, routes.data, {
              data: routeTree,
              names: namedRoutes
            })); // hack importComponent to be a require.ensure promise

            routesSource = routesSource.replace(/(["'])importComponent\1\s*?:\s*?(["'])(.*?)\2/g, function () {
              return "\"importComponent\": ".concat(importComponent.replace(/__component__/g, (process.env.NODE_ENV === 'development' ? "".concat(name, "/hot-loader!") : '') + arguments[3]));
            });
            return _context2.abrupt("return", ["\n    var data = ".concat(routesSource, ";\n\n    var routes = require('").concat(name, "/routes');\n    routes = routes.default || routes;\n    module.exports = routes(data);\n    "), inputSourceMap]);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlcyIsImRhdGEiLCJtYXRjaCIsImNoZWNrIiwibGluayIsIkVycm9yIiwicm91dGVUcmVlIiwiaXNBcnJheSIsImNoaWxkcmVuIiwicGF0aCIsIl9fQkFTRV9fIiwibmFtZWRSb3V0ZXMiLCJ0cmF2ZXJzZSIsIm5vZGUiLCJjb250ZXh0IiwiY29tcG9uZW50IiwiaXNTdHJpbmciLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInJlZ2V4TWF0Y2giLCJsYXN0SW5kZXgiLCJjb21waWxlZCIsInBhcmFtcyIsImV4ZWMiLCJub3RSZWdleCIsInN1YnN0ciIsImluZGV4IiwiZXNjYXBlUmVnRXhwIiwicmVnZXgiLCJzbGljZSIsInB1c2giLCJsZW5ndGgiLCJfcGF0aCIsIl9wYXJhbXMiLCJmb3JFYWNoIiwibiIsInJvdXRlc1NvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lcyIsInJlcGxhY2Ui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QUNGLGFBMUdELEVBMEdHaEIsU0ExR0gsRUEwR2M7QUFDWjtBQUNBWSxjQUFBQSxZQUFZLEVBQUUsRUFGRjtBQUdaQyxjQUFBQSxXQUFXLEVBQUUsRUFIRDtBQUlaRyxjQUFBQSxjQUFjLEVBQUU7QUFKSixhQTFHZCxFQTlCRixDQStJRTs7O0FBQ0lrQixZQUFBQSxZQWhKTixHQWdKcUJDLElBQUksQ0FBQ0MsU0FBTCxDQUNqQnRCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JyQixNQUFNLENBQUNDLElBQXpCLEVBQStCO0FBQzdCQSxjQUFBQSxJQUFJLEVBQUVLLFNBRHVCO0FBRTdCcUMsY0FBQUEsS0FBSyxFQUFFaEM7QUFGc0IsYUFBL0IsQ0FEaUIsQ0FoSnJCLEVBdUpFOztBQUNBNkIsWUFBQUEsWUFBWSxHQUFHQSxZQUFZLENBQUNJLE9BQWIsQ0FDYixnREFEYSxFQUViLFlBQVk7QUFDVixvREFBNkIxRSxlQUFlLENBQUMwRSxPQUFoQixDQUMzQixnQkFEMkIsRUFFM0IsQ0FBQ0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsYUFBekIsYUFBNEMvRSxJQUE1QyxvQkFBaUUsRUFBbEUsSUFDRWdGLFNBQVMsQ0FBQyxDQUFELENBSGdCLENBQTdCO0FBS0QsYUFSWSxDQUFmO0FBeEpGLDhDQW1LUyw0QkFFUVIsWUFGUiw0Q0FJbUJ4RSxJQUpuQixtR0FRTE0sY0FSSyxDQW5LVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUV2YWwgPSByZXF1aXJlKCdub2RlLWV2YWwnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IHsgbmFtZSB9ID0gcmVxdWlyZSgnLi4vcGFja2FnZScpO1xuY29uc3QgYmFiZWwgPSByZXF1aXJlKCdAYmFiZWwvY29yZScpO1xuXG5jb25zdCBpbXBvcnRDb21wb25lbnQgPSBgXG5mdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbXBvcnQoJ19fY29tcG9uZW50X18nKS50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgcmV0dXJuIG0uZGVmYXVsdCB8fCBtO1xuICB9KTtcbn1cbmA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgLy8gTWFrZSB0aGUgbG9hZGVyIGFzeW5jXG4gIC8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuYXN5bmMoKTtcbiAgbG9hZGVyLmNhbGwodGhpcywgc291cmNlLCBpbnB1dFNvdXJjZU1hcCkudGhlbihcbiAgICAoYXJncykgPT4gY2FsbGJhY2sobnVsbCwgLi4uYXJncyksXG4gICAgKGVycikgPT4gY2FsbGJhY2soZXJyKSxcbiAgKTtcbn07XG5cbi8vIHN1cHBvcnQgZXM2IHdpdGggYmFiZWwtbG9hZGVyXG4vLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbmFzeW5jIGZ1bmN0aW9uIGJhYmVsTG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcblxuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBmaWxlbmFtZSxcbiAgICBpbnB1dFNvdXJjZU1hcDogaW5wdXRTb3VyY2VNYXAgfHwgdW5kZWZpbmVkLFxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzb3VyY2VtYXAgYmVoYXZpb3IgYmFzZWQgb24gV2VicGFjaydzIG1hcHBpbmcgZmxhZ1xuICAgIHNvdXJjZU1hcHM6IHRoaXMuc291cmNlTWFwLFxuICAgIC8vIEVuc3VyZSB0aGF0IFdlYnBhY2sgd2lsbCBnZXQgYSBmdWxsIGFic29sdXRlIHBhdGggaW4gdGhlIHNvdXJjZW1hcFxuICAgIC8vIHNvIHRoYXQgaXQgY2FuIHByb3Blcmx5IG1hcCB0aGUgbW9kdWxlIGJhY2sgdG8gaXRzIGludGVybmFsIGNhY2hlZFxuICAgIC8vIG1vZHVsZXMuXG4gICAgc291cmNlRmlsZU5hbWU6IGZpbGVuYW1lLFxuICAgIGNhbGxlcjoge1xuICAgICAgbmFtZTogYCR7bmFtZX0vbG9hZGVyYCxcbiAgICAgIC8vIG5vZGUtZXZhbCBjYW4gb25seSBldmFsIGNvbW1vbmpzIG1vZHVsZVxuICAgICAgc3VwcG9ydHNTdGF0aWNFU006IGZhbHNlLFxuICAgICAgc3VwcG9ydHNEeW5hbWljSW1wb3J0OiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGNvbmZpZyA9IGJhYmVsLmxvYWRQYXJ0aWFsQ29uZmlnKG9wdGlvbnMpO1xuICBvcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMuc291cmNlTWFwcyA9PT0gJ2lubGluZScpIHtcbiAgICAvLyBCYWJlbCBoYXMgdGhpcyB3ZWlyZCBiZWhhdmlvciB3aGVyZSBpZiB5b3Ugc2V0IFwiaW5saW5lXCIsIHdlXG4gICAgLy8gaW5saW5lIHRoZSBzb3VyY2VtYXAsIGFuZCBzZXQgJ3Jlc3VsdC5tYXAgPSBudWxsJy4gVGhpcyByZXN1bHRzXG4gICAgLy8gaW4gYmFkIGJlaGF2aW9yIGZyb20gQmFiZWwgc2luY2UgdGhlIG1hcHMgZ2V0IHB1dCBpbnRvIHRoZSBjb2RlLFxuICAgIC8vIHdoaWNoIFdlYnBhY2sgZG9lcyBub3QgZXhwZWN0LCBhbmQgYmVjYXVzZSB0aGUgbWFwIHdlIHJldHVybiB0b1xuICAgIC8vIFdlYnBhY2sgaXMgbnVsbCwgd2hpY2ggaXMgYWxzbyBiYWQuIFRvIGF2b2lkIHRoYXQsIHdlIG92ZXJyaWRlIHRoZVxuICAgIC8vIGJlaGF2aW9yIGhlcmUgc28gXCJpbmxpbmVcIiBqdXN0IGJlaGF2ZXMgbGlrZSAndHJ1ZScuXG4gICAgb3B0aW9ucy5zb3VyY2VNYXBzID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgY29kZSwgbWFwIH0gPSBhd2FpdCBiYWJlbC50cmFuc2Zvcm1Bc3luYyhzb3VyY2UsIG9wdGlvbnMpO1xuXG4gIGlmICh0eXBlb2YgY29uZmlnLmJhYmVscmMgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5hZGREZXBlbmRlbmN5KGNvbmZpZy5iYWJlbHJjKTtcbiAgfVxuXG4gIHJldHVybiBbY29kZSwgbWFwIHx8IHVuZGVmaW5lZF07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5yZXNvdXJjZVBhdGg7XG5cbiAgW3NvdXJjZSwgaW5wdXRTb3VyY2VNYXBdID0gYXdhaXQgYmFiZWxMb2FkZXIuY2FsbChcbiAgICB0aGlzLFxuICAgIHNvdXJjZSxcbiAgICBpbnB1dFNvdXJjZU1hcCxcbiAgKTtcblxuICAvLyBldmFsIHJvdXRlcy5qcyBzbyB3ZSBjYW4gdHJhdmVyc2Ugcm91dGVUcmVlXG4gIGxldCByb3V0ZXMgPSBub2RlRXZhbChzb3VyY2UsIGZpbGVuYW1lKTtcbiAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuXG4gIGlmICghcm91dGVzLmRhdGEgfHwgIXJvdXRlcy5tYXRjaCB8fCAhcm91dGVzLmNoZWNrIHx8ICFyb3V0ZXMubGluaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCByb3V0ZXMsIGZvcmdldCB0byB3cmFwIGl0IHdpdGggcm91dGVzKCk/YCk7XG4gIH1cblxuICBsZXQgcm91dGVUcmVlID0gcm91dGVzLmRhdGEuZGF0YTtcbiAgaWYgKF8uaXNBcnJheShyb3V0ZVRyZWUpKSB7XG4gICAgcm91dGVUcmVlID0ge1xuICAgICAgY2hpbGRyZW46IHJvdXRlVHJlZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gYmFzZSB1cmxcbiAgcm91dGVUcmVlLnBhdGggPSBfX0JBU0VfXyArIHJvdXRlVHJlZS5wYXRoO1xuXG4gIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgbGV0IG5hbWVkUm91dGVzID0ge307XG5cbiAgKGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUsIGNvbnRleHQpIHtcbiAgICBpZiAobm9kZS5jb21wb25lbnQgJiYgIV8uaXNTdHJpbmcobm9kZS5jb21wb25lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbXBvbmVudCBtdXN0IGJlIHN0cmluZzogJHtub2RlLmNvbXBvbmVudH1gKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5uYW1lICYmICFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYG5hbWVkIHJvdXRlIGlzIGEgbGVhZiB0aGF0IGNhbiBub3QgaGFzIGNoaWxkcmVuOiAke25vZGUubmFtZX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCBjb250ZXh0IHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHNcbiAgICAvLyBhZmZlY3QgZWFjaCBvdGhlclxuICAgIGxldCBwYXRoVGVtcGxhdGUgPSBjb250ZXh0LnBhdGhUZW1wbGF0ZTtcbiAgICBsZXQgcGFyYW1zUmVnZXggPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc1JlZ2V4KTtcbiAgICBsZXQgcGFyYW1zT3B0aW9uYWwgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc09wdGlvbmFsKTtcblxuICAgIC8vIGNvbXBpbGUgcGF0aCB0byBzdXBwb3J0IHJlZ2V4IGFuZCBwYXJhbXNcbiAgICBpZiAobm9kZS5wYXRoKSB7XG4gICAgICAvLyB0d28gd2F5cyB0byBkZWNsYXJlIHJvdXRlIGFyZzpcbiAgICAgIC8vIDEuIChuYW1lOnJlZ2V4KSBvciAobmFtZT86cmVnZXgpXG4gICAgICAvLyAyLiA6bmFtZVxuICAgICAgbGV0IHJlZ2V4TWF0Y2ggPVxuICAgICAgICAvXFwoKFthLXpBLVpfXVthLXpBLVpfMC05XSpcXD8/KVxcOiguKj8pXFwpfFxcOihbYS16QS1aX11bYS16QS1aXzAtOV0qKS9nO1xuICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgY29tcGlsZWQgPSAnJztcbiAgICAgIGxldCBwYXJhbXMgPSBbXTtcblxuICAgICAgbGV0IG1hdGNoID0gbnVsbDtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleE1hdGNoLmV4ZWMobm9kZS5wYXRoKSkpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihsYXN0SW5kZXgsIG1hdGNoLmluZGV4IC0gbGFzdEluZGV4KTtcbiAgICAgICAgbGFzdEluZGV4ID0gcmVnZXhNYXRjaC5sYXN0SW5kZXg7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBsZXQgbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgICBsZXQgcmVnZXggPSBtYXRjaFsyXTtcblxuICAgICAgICAvLyA6bmFtZSBpbXBsaWNpdGx5IGVuZHMgd2l0aCAnLycgb3IgdGhlIGVuZCBvZiBzdHJpbmdcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgbmFtZSA9IG1hdGNoWzNdO1xuICAgICAgICAgIHJlZ2V4ID0gJ1teL10rJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXNSZWdleFtuYW1lXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyYW0gbmFtZSBjb25mbGljdHM6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJz8nKSB7XG4gICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgICAgY29tcGlsZWQgKz0gYCgke3JlZ2V4fSk/YDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pYDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IGAoJHtuYW1lfSlgO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWFsIHdpdGggdGFpbFxuICAgICAgaWYgKGxhc3RJbmRleCA8IG5vZGUucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihcbiAgICAgICAgICBsYXN0SW5kZXgsXG4gICAgICAgICAgbm9kZS5wYXRoLmxlbmd0aCAtIGxhc3RJbmRleCxcbiAgICAgICAgKTtcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgbm9kZS5fcGF0aCA9IGNvbXBpbGVkO1xuICAgICAgbm9kZS5fcGFyYW1zID0gcGFyYW1zO1xuICAgIH1cblxuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBpZiAobm9kZS5uYW1lICYmIF8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgbmFtZWRSb3V0ZXNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgcGFyYW1zT3B0aW9uYWwsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIGFkZCBpbXBvcnRDb21wb25lbnQgYXMgcGxhY2Vob2xkZXIsIHByZXBhcmUgZm9yIGhhY2tcbiAgICBpZiAobm9kZS5jb21wb25lbnQpIHtcbiAgICAgIG5vZGUuaW1wb3J0Q29tcG9uZW50ID0gbm9kZS5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gcmVjdXJzaXZlIHRyYXZlcnNlIHRvIGNoaWxkcmVuXG4gICAgaWYgKCFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAobikge1xuICAgICAgICB0cmF2ZXJzZShuLCB7XG4gICAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkocm91dGVUcmVlLCB7XG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIHBhdGhUZW1wbGF0ZTogJycsXG4gICAgcGFyYW1zUmVnZXg6IHt9LFxuICAgIHBhcmFtc09wdGlvbmFsOiB7fSxcbiAgfSk7XG5cbiAgLy8gY29udmVydCB0byBzb3VyY2Ugc28gd2UgY2FuIGhhY2sgaXQgYXMgc3RyaW5nXG4gIGxldCByb3V0ZXNTb3VyY2UgPSBKU09OLnN0cmluZ2lmeShcbiAgICBPYmplY3QuYXNzaWduKHt9LCByb3V0ZXMuZGF0YSwge1xuICAgICAgZGF0YTogcm91dGVUcmVlLFxuICAgICAgbmFtZXM6IG5hbWVkUm91dGVzLFxuICAgIH0pLFxuICApO1xuXG4gIC8vIGhhY2sgaW1wb3J0Q29tcG9uZW50IHRvIGJlIGEgcmVxdWlyZS5lbnN1cmUgcHJvbWlzZVxuICByb3V0ZXNTb3VyY2UgPSByb3V0ZXNTb3VyY2UucmVwbGFjZShcbiAgICAvKFtcIiddKWltcG9ydENvbXBvbmVudFxcMVxccyo/Olxccyo/KFtcIiddKSguKj8pXFwyL2csXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGBcImltcG9ydENvbXBvbmVudFwiOiAke2ltcG9ydENvbXBvbmVudC5yZXBsYWNlKFxuICAgICAgICAvX19jb21wb25lbnRfXy9nLFxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBgJHtuYW1lfS9ob3QtbG9hZGVyIWAgOiAnJykgK1xuICAgICAgICAgIGFyZ3VtZW50c1szXSxcbiAgICAgICl9YDtcbiAgICB9LFxuICApO1xuXG4gIHJldHVybiBbXG4gICAgYFxuICAgIHZhciBkYXRhID0gJHtyb3V0ZXNTb3VyY2V9O1xuXG4gICAgdmFyIHJvdXRlcyA9IHJlcXVpcmUoJyR7bmFtZX0vcm91dGVzJyk7XG4gICAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm91dGVzKGRhdGEpO1xuICAgIGAsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gIF07XG59XG4iXX0=