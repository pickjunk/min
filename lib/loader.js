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
            } // for named routes


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

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlcyIsImRhdGEiLCJtYXRjaCIsImNoZWNrIiwibGluayIsIkVycm9yIiwicm91dGVUcmVlIiwiaXNBcnJheSIsImNoaWxkcmVuIiwibmFtZWRSb3V0ZXMiLCJ0cmF2ZXJzZSIsIm5vZGUiLCJjb250ZXh0IiwiY29tcG9uZW50IiwiaXNTdHJpbmciLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInBhdGgiLCJyZWdleE1hdGNoIiwibGFzdEluZGV4IiwiY29tcGlsZWQiLCJwYXJhbXMiLCJleGVjIiwibm90UmVnZXgiLCJzdWJzdHIiLCJpbmRleCIsImVzY2FwZVJlZ0V4cCIsInJlZ2V4Iiwic2xpY2UiLCJwdXNoIiwibGVuZ3RoIiwiX3BhdGgiLCJfcGFyYW1zIiwiZm9yRWFjaCIsIm4iLCJyb3V0ZXNTb3VyY2UiLCJKU09OIiwic3RyaW5naWZ5IiwibmFtZXMiLCJyZXBsYWNlIiwicHJvY2VzcyIs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QUlaRyxjQUFBQSxjQUFjLEVBQUU7QUFKSixhQXpHZCxFQTNCRixDQTJJRTs7O0FBQ0ltQixZQUFBQSxZQTVJTixHQTRJcUJDLElBQUksQ0FBQ0MsU0FBTCxDQUFldkIsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQm5CLE1BQU0sQ0FBQ0MsSUFBekIsRUFBK0I7QUFDL0RBLGNBQUFBLElBQUksRUFBRUssU0FEeUQ7QUFFL0RvQyxjQUFBQSxLQUFLLEVBQUVqQztBQUZ3RCxhQUEvQixDQUFmLENBNUlyQixFQWlKRTs7QUFDQThCLFlBQUFBLFlBQVksR0FBR0EsWUFBWSxDQUFDSSxPQUFiLENBQ2IsZ0RBRGEsRUFFYixZQUFZO0FBQ1Ysb0RBQTZCekUsZUFBZSxDQUFDeUUsT0FBaEIsQ0FDM0IsZ0JBRDJCLEVBRTNCLENBQUNDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQXpCLGFBQTRDOUUsSUFBNUMsb0JBQWlFLEVBQWxFLElBQ0ErRSxTQUFTLENBQUMsQ0FBRCxDQUhrQixDQUE3QjtBQUtELGFBUlksQ0FBZjtBQWxKRiw4Q0E2SlMsNEJBRVFSLFlBRlIsNENBSW1CdkUsSUFKbkIsbUdBUUxNLGNBUkssQ0E3SlQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVFdmFsID0gcmVxdWlyZSgnbm9kZS1ldmFsJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCB7IG5hbWUgfSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UnKTtcbmNvbnN0IGJhYmVsID0gcmVxdWlyZSgnQGJhYmVsL2NvcmUnKTtcblxuY29uc3QgaW1wb3J0Q29tcG9uZW50ID0gYFxuZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW1wb3J0KCdfX2NvbXBvbmVudF9fJykudGhlbihmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLmRlZmF1bHQgfHwgbTtcbiAgfSk7XG59XG5gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIC8vIE1ha2UgdGhlIGxvYWRlciBhc3luY1xuICAvLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmFzeW5jKCk7XG4gIGxvYWRlci5jYWxsKHRoaXMsIHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApLnRoZW4oXG4gICAgYXJncyA9PiBjYWxsYmFjayhudWxsLCAuLi5hcmdzKSxcbiAgICBlcnIgPT4gY2FsbGJhY2soZXJyKSxcbiAgKTtcbn07XG5cbi8vIHN1cHBvcnQgZXM2IHdpdGggYmFiZWwtbG9hZGVyXG4vLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbmFzeW5jIGZ1bmN0aW9uIGJhYmVsTG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcblxuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBmaWxlbmFtZSxcbiAgICBpbnB1dFNvdXJjZU1hcDogaW5wdXRTb3VyY2VNYXAgfHwgdW5kZWZpbmVkLFxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzb3VyY2VtYXAgYmVoYXZpb3IgYmFzZWQgb24gV2VicGFjaydzIG1hcHBpbmcgZmxhZ1xuICAgIHNvdXJjZU1hcHM6IHRoaXMuc291cmNlTWFwLFxuICAgIC8vIEVuc3VyZSB0aGF0IFdlYnBhY2sgd2lsbCBnZXQgYSBmdWxsIGFic29sdXRlIHBhdGggaW4gdGhlIHNvdXJjZW1hcFxuICAgIC8vIHNvIHRoYXQgaXQgY2FuIHByb3Blcmx5IG1hcCB0aGUgbW9kdWxlIGJhY2sgdG8gaXRzIGludGVybmFsIGNhY2hlZFxuICAgIC8vIG1vZHVsZXMuXG4gICAgc291cmNlRmlsZU5hbWU6IGZpbGVuYW1lLFxuICAgIGNhbGxlcjoge1xuICAgICAgbmFtZTogYCR7bmFtZX0vbG9hZGVyYCxcbiAgICAgIC8vIG5vZGUtZXZhbCBjYW4gb25seSBldmFsIGNvbW1vbmpzIG1vZHVsZVxuICAgICAgc3VwcG9ydHNTdGF0aWNFU006IGZhbHNlLFxuICAgICAgc3VwcG9ydHNEeW5hbWljSW1wb3J0OiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGNvbmZpZyA9IGJhYmVsLmxvYWRQYXJ0aWFsQ29uZmlnKG9wdGlvbnMpO1xuICBvcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMuc291cmNlTWFwcyA9PT0gJ2lubGluZScpIHtcbiAgICAvLyBCYWJlbCBoYXMgdGhpcyB3ZWlyZCBiZWhhdmlvciB3aGVyZSBpZiB5b3Ugc2V0IFwiaW5saW5lXCIsIHdlXG4gICAgLy8gaW5saW5lIHRoZSBzb3VyY2VtYXAsIGFuZCBzZXQgJ3Jlc3VsdC5tYXAgPSBudWxsJy4gVGhpcyByZXN1bHRzXG4gICAgLy8gaW4gYmFkIGJlaGF2aW9yIGZyb20gQmFiZWwgc2luY2UgdGhlIG1hcHMgZ2V0IHB1dCBpbnRvIHRoZSBjb2RlLFxuICAgIC8vIHdoaWNoIFdlYnBhY2sgZG9lcyBub3QgZXhwZWN0LCBhbmQgYmVjYXVzZSB0aGUgbWFwIHdlIHJldHVybiB0b1xuICAgIC8vIFdlYnBhY2sgaXMgbnVsbCwgd2hpY2ggaXMgYWxzbyBiYWQuIFRvIGF2b2lkIHRoYXQsIHdlIG92ZXJyaWRlIHRoZVxuICAgIC8vIGJlaGF2aW9yIGhlcmUgc28gXCJpbmxpbmVcIiBqdXN0IGJlaGF2ZXMgbGlrZSAndHJ1ZScuXG4gICAgb3B0aW9ucy5zb3VyY2VNYXBzID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgY29kZSwgbWFwIH0gPSBhd2FpdCBiYWJlbC50cmFuc2Zvcm1Bc3luYyhzb3VyY2UsIG9wdGlvbnMpO1xuXG4gIGlmICh0eXBlb2YgY29uZmlnLmJhYmVscmMgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5hZGREZXBlbmRlbmN5KGNvbmZpZy5iYWJlbHJjKTtcbiAgfVxuXG4gIHJldHVybiBbY29kZSwgbWFwIHx8IHVuZGVmaW5lZF07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5yZXNvdXJjZVBhdGg7XG5cbiAgW3NvdXJjZSwgaW5wdXRTb3VyY2VNYXBdID0gYXdhaXQgYmFiZWxMb2FkZXIuY2FsbChcbiAgICB0aGlzLFxuICAgIHNvdXJjZSxcbiAgICBpbnB1dFNvdXJjZU1hcCxcbiAgKTtcblxuICAvLyBldmFsIHJvdXRlcy5qcyBzbyB3ZSBjYW4gdHJhdmVyc2Ugcm91dGVUcmVlXG4gIGxldCByb3V0ZXMgPSBub2RlRXZhbChzb3VyY2UsIGZpbGVuYW1lKTtcbiAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuXG4gIGlmICghcm91dGVzLmRhdGEgfHwgIXJvdXRlcy5tYXRjaCB8fCAhcm91dGVzLmNoZWNrIHx8ICFyb3V0ZXMubGluaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCByb3V0ZXMsIGZvcmdldCB0byB3cmFwIGl0IHdpdGggcm91dGVzKCk/YClcbiAgfVxuXG4gIGxldCByb3V0ZVRyZWUgPSByb3V0ZXMuZGF0YS5kYXRhO1xuICBpZiAoXy5pc0FycmF5KHJvdXRlVHJlZSkpIHtcbiAgICByb3V0ZVRyZWUgPSB7XG4gICAgICBjaGlsZHJlbjogcm91dGVUcmVlLFxuICAgIH07XG4gIH1cblxuICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gIGxldCBuYW1lZFJvdXRlcyA9IHt9O1xuXG4gIChmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBjb250ZXh0KSB7XG4gICAgaWYgKG5vZGUuY29tcG9uZW50ICYmICFfLmlzU3RyaW5nKG5vZGUuY29tcG9uZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb21wb25lbnQgbXVzdCBiZSBzdHJpbmc6ICR7bm9kZS5jb21wb25lbnR9YCk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmFtZSAmJiAhXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBuYW1lZCByb3V0ZSBpcyBhIGxlYWYgdGhhdCBjYW4gbm90IGhhcyBjaGlsZHJlbjogJHtub2RlLm5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgY29udGV4dCB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzXG4gICAgLy8gYWZmZWN0IGVhY2ggb3RoZXJcbiAgICBsZXQgcGF0aFRlbXBsYXRlID0gY29udGV4dC5wYXRoVGVtcGxhdGU7XG4gICAgbGV0IHBhcmFtc1JlZ2V4ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNSZWdleCk7XG4gICAgbGV0IHBhcmFtc09wdGlvbmFsID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNPcHRpb25hbCk7XG5cbiAgICAvLyBjb21waWxlIHBhdGggdG8gc3VwcG9ydCByZWdleCBhbmQgcGFyYW1zXG4gICAgaWYgKG5vZGUucGF0aCkge1xuICAgICAgLy8gdHdvIHdheXMgdG8gZGVjbGFyZSByb3V0ZSBhcmc6XG4gICAgICAvLyAxLiAobmFtZTpyZWdleCkgb3IgKG5hbWU/OnJlZ2V4KVxuICAgICAgLy8gMi4gOm5hbWVcbiAgICAgIGxldCByZWdleE1hdGNoID0gL1xcKChbYS16QS1aX11bYS16QS1aXzAtOV0qXFw/PylcXDooLio/KVxcKXxcXDooW2EtekEtWl9dW2EtekEtWl8wLTldKikvZztcbiAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgbGV0IGNvbXBpbGVkID0gJyc7XG4gICAgICBsZXQgcGFyYW1zID0gW107XG5cbiAgICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXhNYXRjaC5leGVjKG5vZGUucGF0aCkpKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIobGFzdEluZGV4LCBtYXRjaC5pbmRleCAtIGxhc3RJbmRleCk7XG4gICAgICAgIGxhc3RJbmRleCA9IHJlZ2V4TWF0Y2gubGFzdEluZGV4O1xuICAgICAgICBjb21waWxlZCArPSBfLmVzY2FwZVJlZ0V4cChub3RSZWdleCk7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbWF0Y2hbMl07XG5cbiAgICAgICAgLy8gOm5hbWUgaW1wbGljaXRseSBlbmRzIHdpdGggJy8nIG9yIHRoZSBlbmQgb2Ygc3RyaW5nXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgIG5hbWUgPSBtYXRjaFszXTtcbiAgICAgICAgICByZWdleCA9ICdbXi9dKyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zUmVnZXhbbmFtZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBhcmFtIG5hbWUgY29uZmxpY3RzOiAke25hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICc/Jykge1xuICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pP2A7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KWA7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBgKCR7bmFtZX0pYDtcbiAgICAgIH1cblxuICAgICAgLy8gZGVhbCB3aXRoIHRhaWxcbiAgICAgIGlmIChsYXN0SW5kZXggPCBub2RlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIoXG4gICAgICAgICAgbGFzdEluZGV4LFxuICAgICAgICAgIG5vZGUucGF0aC5sZW5ndGggLSBsYXN0SW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX3BhdGggPSBjb21waWxlZDtcbiAgICAgIG5vZGUuX3BhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gICAgaWYgKG5vZGUubmFtZSAmJiBfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIG5hbWVkUm91dGVzW25vZGUubmFtZV0gPSB7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgcGFyYW1zUmVnZXgsXG4gICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaW1wb3J0Q29tcG9uZW50IGFzIHBsYWNlaG9sZGVyLCBwcmVwYXJlIGZvciBoYWNrXG4gICAgaWYgKG5vZGUuY29tcG9uZW50KSB7XG4gICAgICBub2RlLmltcG9ydENvbXBvbmVudCA9IG5vZGUuY29tcG9uZW50O1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSB0cmF2ZXJzZSB0byBjaGlsZHJlblxuICAgIGlmICghXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdHJhdmVyc2Uobiwge1xuICAgICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgICBwYXJhbXNPcHRpb25hbCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKHJvdXRlVHJlZSwge1xuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBwYXRoVGVtcGxhdGU6ICcnLFxuICAgIHBhcmFtc1JlZ2V4OiB7fSxcbiAgICBwYXJhbXNPcHRpb25hbDoge30sXG4gIH0pO1xuXG4gIC8vIGNvbnZlcnQgdG8gc291cmNlIHNvIHdlIGNhbiBoYWNrIGl0IGFzIHN0cmluZ1xuICBsZXQgcm91dGVzU291cmNlID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmFzc2lnbih7fSwgcm91dGVzLmRhdGEsIHtcbiAgICBkYXRhOiByb3V0ZVRyZWUsXG4gICAgbmFtZXM6IG5hbWVkUm91dGVzLFxuICB9KSk7XG5cbiAgLy8gaGFjayBpbXBvcnRDb21wb25lbnQgdG8gYmUgYSByZXF1aXJlLmVuc3VyZSBwcm9taXNlXG4gIHJvdXRlc1NvdXJjZSA9IHJvdXRlc1NvdXJjZS5yZXBsYWNlKFxuICAgIC8oW1wiJ10paW1wb3J0Q29tcG9uZW50XFwxXFxzKj86XFxzKj8oW1wiJ10pKC4qPylcXDIvZyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYFwiaW1wb3J0Q29tcG9uZW50XCI6ICR7aW1wb3J0Q29tcG9uZW50LnJlcGxhY2UoXG4gICAgICAgIC9fX2NvbXBvbmVudF9fL2csXG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IGAke25hbWV9L2hvdC1sb2FkZXIhYCA6ICcnKSArXG4gICAgICAgIGFyZ3VtZW50c1szXSxcbiAgICAgICl9YDtcbiAgICB9LFxuICApO1xuXG4gIHJldHVybiBbXG4gICAgYFxuICAgIHZhciBkYXRhID0gJHtyb3V0ZXNTb3VyY2V9O1xuXG4gICAgdmFyIHJvdXRlcyA9IHJlcXVpcmUoJyR7bmFtZX0vcm91dGVzJyk7XG4gICAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm91dGVzKGRhdGEpO1xuICAgIGAsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gIF07XG59XG4iXX0=