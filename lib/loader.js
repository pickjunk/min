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
    var filename, options, _yield$babelLoader$ca, _yield$babelLoader$ca2, routes, routeTree, namedRoutes, routesSource;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filename = this.resourcePath;
            options = this.getOptions();
            _context2.next = 4;
            return babelLoader.call(this, source, inputSourceMap);

          case 4:
            _yield$babelLoader$ca = _context2.sent;
            _yield$babelLoader$ca2 = (0, _slicedToArray2["default"])(_yield$babelLoader$ca, 2);
            source = _yield$babelLoader$ca2[0];
            inputSourceMap = _yield$babelLoader$ca2[1];
            // eval routes.js so we can traverse routeTree
            routes = nodeEval(source, filename);
            routes = routes["default"] || routes;

            if (!(!routes.data || !routes.match || !routes.check || !routes.link)) {
              _context2.next = 12;
              break;
            }

            throw new Error("invalid routes, forget to wrap it with routes()?");

          case 12:
            routeTree = routes.data.data;

            if (_.isArray(routeTree)) {
              routeTree = {
                children: routeTree
              };
            } // base url


            if (options.base) {
              routeTree.path = routeTree.path || '';
              routeTree.path = options.base + routeTree.path;
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

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsImdldE9wdGlvbnMiLCJyb3V0ZXMiLCJkYXRhIiwibWF0Y2giLCJjaGVjayIsImxpbmsiLCJFcnJvciIsInJvdXRlVHJlZSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsImJhc2UiLCJwYXRoIiwibmFtZWRSb3V0ZXMiLCJ0cmF2ZXJzZSIsIm5vZGUiLCJjb250ZXh0IiwiY29tcG9uZW50IiwiaXNTdHJpbmciLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInJlZ2V4TWF0Y2giLCJsYXN0SW5kZXgiLCJjb21waWxlZCIsInBhcmFtcyIsImV4ZWMiLCJub3RSZWdleCIsInN1YnN0ciIsImluZGV4IiwiZXNjYXBlUmVnRXhwIiwicmVnZXgiLCJzbGljZSIsInB1c2giLCJsZW5ndGgiLCJfcGF0aCIsIl9wYXJhbXMiLCJmb3JFYWNoIiwibiIsInJvdXRlc1NvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lcyIs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cmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCB7IG5hbWUgfSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UnKTtcbmNvbnN0IGJhYmVsID0gcmVxdWlyZSgnQGJhYmVsL2NvcmUnKTtcblxuY29uc3QgaW1wb3J0Q29tcG9uZW50ID0gYFxuZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW1wb3J0KCdfX2NvbXBvbmVudF9fJykudGhlbihmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLmRlZmF1bHQgfHwgbTtcbiAgfSk7XG59XG5gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIC8vIE1ha2UgdGhlIGxvYWRlciBhc3luY1xuICAvLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmFzeW5jKCk7XG4gIGxvYWRlci5jYWxsKHRoaXMsIHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApLnRoZW4oXG4gICAgKGFyZ3MpID0+IGNhbGxiYWNrKG51bGwsIC4uLmFyZ3MpLFxuICAgIChlcnIpID0+IGNhbGxiYWNrKGVyciksXG4gICk7XG59O1xuXG4vLyBzdXBwb3J0IGVzNiB3aXRoIGJhYmVsLWxvYWRlclxuLy8gZm9yayBmcm9tIGJhYmVsLWxvYWRlckA4XG5hc3luYyBmdW5jdGlvbiBiYWJlbExvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5yZXNvdXJjZVBhdGg7XG5cbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgZmlsZW5hbWUsXG4gICAgaW5wdXRTb3VyY2VNYXA6IGlucHV0U291cmNlTWFwIHx8IHVuZGVmaW5lZCxcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc291cmNlbWFwIGJlaGF2aW9yIGJhc2VkIG9uIFdlYnBhY2sncyBtYXBwaW5nIGZsYWdcbiAgICBzb3VyY2VNYXBzOiB0aGlzLnNvdXJjZU1hcCxcbiAgICAvLyBFbnN1cmUgdGhhdCBXZWJwYWNrIHdpbGwgZ2V0IGEgZnVsbCBhYnNvbHV0ZSBwYXRoIGluIHRoZSBzb3VyY2VtYXBcbiAgICAvLyBzbyB0aGF0IGl0IGNhbiBwcm9wZXJseSBtYXAgdGhlIG1vZHVsZSBiYWNrIHRvIGl0cyBpbnRlcm5hbCBjYWNoZWRcbiAgICAvLyBtb2R1bGVzLlxuICAgIHNvdXJjZUZpbGVOYW1lOiBmaWxlbmFtZSxcbiAgICBjYWxsZXI6IHtcbiAgICAgIG5hbWU6IGAke25hbWV9L2xvYWRlcmAsXG4gICAgICAvLyBub2RlLWV2YWwgY2FuIG9ubHkgZXZhbCBjb21tb25qcyBtb2R1bGVcbiAgICAgIHN1cHBvcnRzU3RhdGljRVNNOiBmYWxzZSxcbiAgICAgIHN1cHBvcnRzRHluYW1pY0ltcG9ydDogZmFsc2UsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBjb25maWcgPSBiYWJlbC5sb2FkUGFydGlhbENvbmZpZyhvcHRpb25zKTtcbiAgb3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnNvdXJjZU1hcHMgPT09ICdpbmxpbmUnKSB7XG4gICAgLy8gQmFiZWwgaGFzIHRoaXMgd2VpcmQgYmVoYXZpb3Igd2hlcmUgaWYgeW91IHNldCBcImlubGluZVwiLCB3ZVxuICAgIC8vIGlubGluZSB0aGUgc291cmNlbWFwLCBhbmQgc2V0ICdyZXN1bHQubWFwID0gbnVsbCcuIFRoaXMgcmVzdWx0c1xuICAgIC8vIGluIGJhZCBiZWhhdmlvciBmcm9tIEJhYmVsIHNpbmNlIHRoZSBtYXBzIGdldCBwdXQgaW50byB0aGUgY29kZSxcbiAgICAvLyB3aGljaCBXZWJwYWNrIGRvZXMgbm90IGV4cGVjdCwgYW5kIGJlY2F1c2UgdGhlIG1hcCB3ZSByZXR1cm4gdG9cbiAgICAvLyBXZWJwYWNrIGlzIG51bGwsIHdoaWNoIGlzIGFsc28gYmFkLiBUbyBhdm9pZCB0aGF0LCB3ZSBvdmVycmlkZSB0aGVcbiAgICAvLyBiZWhhdmlvciBoZXJlIHNvIFwiaW5saW5lXCIganVzdCBiZWhhdmVzIGxpa2UgJ3RydWUnLlxuICAgIG9wdGlvbnMuc291cmNlTWFwcyA9IHRydWU7XG4gIH1cblxuICBjb25zdCB7IGNvZGUsIG1hcCB9ID0gYXdhaXQgYmFiZWwudHJhbnNmb3JtQXN5bmMoc291cmNlLCBvcHRpb25zKTtcblxuICBpZiAodHlwZW9mIGNvbmZpZy5iYWJlbHJjID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuYWRkRGVwZW5kZW5jeShjb25maWcuYmFiZWxyYyk7XG4gIH1cblxuICByZXR1cm4gW2NvZGUsIG1hcCB8fCB1bmRlZmluZWRdO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG5cbiAgW3NvdXJjZSwgaW5wdXRTb3VyY2VNYXBdID0gYXdhaXQgYmFiZWxMb2FkZXIuY2FsbChcbiAgICB0aGlzLFxuICAgIHNvdXJjZSxcbiAgICBpbnB1dFNvdXJjZU1hcCxcbiAgKTtcblxuICAvLyBldmFsIHJvdXRlcy5qcyBzbyB3ZSBjYW4gdHJhdmVyc2Ugcm91dGVUcmVlXG4gIGxldCByb3V0ZXMgPSBub2RlRXZhbChzb3VyY2UsIGZpbGVuYW1lKTtcbiAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuXG4gIGlmICghcm91dGVzLmRhdGEgfHwgIXJvdXRlcy5tYXRjaCB8fCAhcm91dGVzLmNoZWNrIHx8ICFyb3V0ZXMubGluaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCByb3V0ZXMsIGZvcmdldCB0byB3cmFwIGl0IHdpdGggcm91dGVzKCk/YCk7XG4gIH1cblxuICBsZXQgcm91dGVUcmVlID0gcm91dGVzLmRhdGEuZGF0YTtcbiAgaWYgKF8uaXNBcnJheShyb3V0ZVRyZWUpKSB7XG4gICAgcm91dGVUcmVlID0ge1xuICAgICAgY2hpbGRyZW46IHJvdXRlVHJlZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gYmFzZSB1cmxcbiAgaWYgKG9wdGlvbnMuYmFzZSkge1xuICAgIHJvdXRlVHJlZS5wYXRoID0gcm91dGVUcmVlLnBhdGggfHwgJyc7XG4gICAgcm91dGVUcmVlLnBhdGggPSBvcHRpb25zLmJhc2UgKyByb3V0ZVRyZWUucGF0aDtcbiAgfVxuXG4gIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgbGV0IG5hbWVkUm91dGVzID0ge307XG5cbiAgKGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUsIGNvbnRleHQpIHtcbiAgICBpZiAobm9kZS5jb21wb25lbnQgJiYgIV8uaXNTdHJpbmcobm9kZS5jb21wb25lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbXBvbmVudCBtdXN0IGJlIHN0cmluZzogJHtub2RlLmNvbXBvbmVudH1gKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5uYW1lICYmICFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYG5hbWVkIHJvdXRlIGlzIGEgbGVhZiB0aGF0IGNhbiBub3QgaGFzIGNoaWxkcmVuOiAke25vZGUubmFtZX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCBjb250ZXh0IHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHNcbiAgICAvLyBhZmZlY3QgZWFjaCBvdGhlclxuICAgIGxldCBwYXRoVGVtcGxhdGUgPSBjb250ZXh0LnBhdGhUZW1wbGF0ZTtcbiAgICBsZXQgcGFyYW1zUmVnZXggPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc1JlZ2V4KTtcbiAgICBsZXQgcGFyYW1zT3B0aW9uYWwgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc09wdGlvbmFsKTtcblxuICAgIC8vIGNvbXBpbGUgcGF0aCB0byBzdXBwb3J0IHJlZ2V4IGFuZCBwYXJhbXNcbiAgICBpZiAobm9kZS5wYXRoKSB7XG4gICAgICAvLyB0d28gd2F5cyB0byBkZWNsYXJlIHJvdXRlIGFyZzpcbiAgICAgIC8vIDEuIChuYW1lOnJlZ2V4KSBvciAobmFtZT86cmVnZXgpXG4gICAgICAvLyAyLiA6bmFtZVxuICAgICAgbGV0IHJlZ2V4TWF0Y2ggPVxuICAgICAgICAvXFwoKFthLXpBLVpfXVthLXpBLVpfMC05XSpcXD8/KVxcOiguKj8pXFwpfFxcOihbYS16QS1aX11bYS16QS1aXzAtOV0qKS9nO1xuICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgY29tcGlsZWQgPSAnJztcbiAgICAgIGxldCBwYXJhbXMgPSBbXTtcblxuICAgICAgbGV0IG1hdGNoID0gbnVsbDtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleE1hdGNoLmV4ZWMobm9kZS5wYXRoKSkpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihsYXN0SW5kZXgsIG1hdGNoLmluZGV4IC0gbGFzdEluZGV4KTtcbiAgICAgICAgbGFzdEluZGV4ID0gcmVnZXhNYXRjaC5sYXN0SW5kZXg7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBsZXQgbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgICBsZXQgcmVnZXggPSBtYXRjaFsyXTtcblxuICAgICAgICAvLyA6bmFtZSBpbXBsaWNpdGx5IGVuZHMgd2l0aCAnLycgb3IgdGhlIGVuZCBvZiBzdHJpbmdcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgbmFtZSA9IG1hdGNoWzNdO1xuICAgICAgICAgIHJlZ2V4ID0gJ1teL10rJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXNSZWdleFtuYW1lXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyYW0gbmFtZSBjb25mbGljdHM6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJz8nKSB7XG4gICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgICAgY29tcGlsZWQgKz0gYCgke3JlZ2V4fSk/YDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pYDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IGAoJHtuYW1lfSlgO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWFsIHdpdGggdGFpbFxuICAgICAgaWYgKGxhc3RJbmRleCA8IG5vZGUucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihcbiAgICAgICAgICBsYXN0SW5kZXgsXG4gICAgICAgICAgbm9kZS5wYXRoLmxlbmd0aCAtIGxhc3RJbmRleCxcbiAgICAgICAgKTtcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgbm9kZS5fcGF0aCA9IGNvbXBpbGVkO1xuICAgICAgbm9kZS5fcGFyYW1zID0gcGFyYW1zO1xuICAgIH1cblxuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBpZiAobm9kZS5uYW1lICYmIF8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgbmFtZWRSb3V0ZXNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgcGFyYW1zT3B0aW9uYWwsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIGFkZCBpbXBvcnRDb21wb25lbnQgYXMgcGxhY2Vob2xkZXIsIHByZXBhcmUgZm9yIGhhY2tcbiAgICBpZiAobm9kZS5jb21wb25lbnQpIHtcbiAgICAgIG5vZGUuaW1wb3J0Q29tcG9uZW50ID0gbm9kZS5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gcmVjdXJzaXZlIHRyYXZlcnNlIHRvIGNoaWxkcmVuXG4gICAgaWYgKCFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAobikge1xuICAgICAgICB0cmF2ZXJzZShuLCB7XG4gICAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkocm91dGVUcmVlLCB7XG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIHBhdGhUZW1wbGF0ZTogJycsXG4gICAgcGFyYW1zUmVnZXg6IHt9LFxuICAgIHBhcmFtc09wdGlvbmFsOiB7fSxcbiAgfSk7XG5cbiAgLy8gY29udmVydCB0byBzb3VyY2Ugc28gd2UgY2FuIGhhY2sgaXQgYXMgc3RyaW5nXG4gIGxldCByb3V0ZXNTb3VyY2UgPSBKU09OLnN0cmluZ2lmeShcbiAgICBPYmplY3QuYXNzaWduKHt9LCByb3V0ZXMuZGF0YSwge1xuICAgICAgZGF0YTogcm91dGVUcmVlLFxuICAgICAgbmFtZXM6IG5hbWVkUm91dGVzLFxuICAgIH0pLFxuICApO1xuXG4gIC8vIGhhY2sgaW1wb3J0Q29tcG9uZW50IHRvIGJlIGEgcmVxdWlyZS5lbnN1cmUgcHJvbWlzZVxuICByb3V0ZXNTb3VyY2UgPSByb3V0ZXNTb3VyY2UucmVwbGFjZShcbiAgICAvKFtcIiddKWltcG9ydENvbXBvbmVudFxcMVxccyo/Olxccyo/KFtcIiddKSguKj8pXFwyL2csXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGBcImltcG9ydENvbXBvbmVudFwiOiAke2ltcG9ydENvbXBvbmVudC5yZXBsYWNlKFxuICAgICAgICAvX19jb21wb25lbnRfXy9nLFxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBgJHtuYW1lfS9ob3QtbG9hZGVyIWAgOiAnJykgK1xuICAgICAgICAgIGFyZ3VtZW50c1szXSxcbiAgICAgICl9YDtcbiAgICB9LFxuICApO1xuXG4gIHJldHVybiBbXG4gICAgYFxuICAgIHZhciBkYXRhID0gJHtyb3V0ZXNTb3VyY2V9O1xuXG4gICAgdmFyIHJvdXRlcyA9IHJlcXVpcmUoJyR7bmFtZX0vcm91dGVzJyk7XG4gICAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm91dGVzKGRhdGEpO1xuICAgIGAsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gIF07XG59XG4iXX0=