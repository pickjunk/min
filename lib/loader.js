"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsImdldE9wdGlvbnMiLCJyb3V0ZXMiLCJkYXRhIiwibWF0Y2giLCJjaGVjayIsImxpbmsiLCJFcnJvciIsInJvdXRlVHJlZSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsImJhc2UiLCJwYXRoIiwibmFtZWRSb3V0ZXMiLCJ0cmF2ZXJzZSIsIm5vZGUiLCJjb250ZXh0IiwiY29tcG9uZW50IiwiaXNTdHJpbmciLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInJlZ2V4TWF0Y2giLCJsYXN0SW5kZXgiLCJjb21waWxlZCIsInBhcmFtcyIsImV4ZWMiLCJub3RSZWdleCIsInN1YnN0ciIsImluZGV4IiwiZXNjYXBlUmVnRXhwIiwicmVnZXgiLCJzbGljZSIsInB1c2giLCJsZW5ndGgiLCJfcGF0aCIsIl9wYXJhbXMiLCJmb3JFYWNoIiwibiIsInJvdXRlc1NvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJuYW1lcyIs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ZXZhbCcpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgeyBuYW1lIH0gPSByZXF1aXJlKCcuLi9wYWNrYWdlJyk7XG5jb25zdCBiYWJlbCA9IHJlcXVpcmUoJ0BiYWJlbC9jb3JlJyk7XG5cbmNvbnN0IGltcG9ydENvbXBvbmVudCA9IGBcbmZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGltcG9ydCgnX19jb21wb25lbnRfXycpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICByZXR1cm4gbS5kZWZhdWx0IHx8IG07XG4gIH0pO1xufVxuYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICAvLyBNYWtlIHRoZSBsb2FkZXIgYXN5bmNcbiAgLy8gZm9yayBmcm9tIGJhYmVsLWxvYWRlckA4XG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5hc3luYygpO1xuICBsb2FkZXIuY2FsbCh0aGlzLCBzb3VyY2UsIGlucHV0U291cmNlTWFwKS50aGVuKFxuICAgIChhcmdzKSA9PiBjYWxsYmFjayhudWxsLCAuLi5hcmdzKSxcbiAgICAoZXJyKSA9PiBjYWxsYmFjayhlcnIpLFxuICApO1xufTtcblxuLy8gc3VwcG9ydCBlczYgd2l0aCBiYWJlbC1sb2FkZXJcbi8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuYXN5bmMgZnVuY3Rpb24gYmFiZWxMb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuXG4gIGxldCBvcHRpb25zID0ge1xuICAgIGZpbGVuYW1lLFxuICAgIGlucHV0U291cmNlTWFwOiBpbnB1dFNvdXJjZU1hcCB8fCB1bmRlZmluZWQsXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNvdXJjZW1hcCBiZWhhdmlvciBiYXNlZCBvbiBXZWJwYWNrJ3MgbWFwcGluZyBmbGFnXG4gICAgc291cmNlTWFwczogdGhpcy5zb3VyY2VNYXAsXG4gICAgLy8gRW5zdXJlIHRoYXQgV2VicGFjayB3aWxsIGdldCBhIGZ1bGwgYWJzb2x1dGUgcGF0aCBpbiB0aGUgc291cmNlbWFwXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gcHJvcGVybHkgbWFwIHRoZSBtb2R1bGUgYmFjayB0byBpdHMgaW50ZXJuYWwgY2FjaGVkXG4gICAgLy8gbW9kdWxlcy5cbiAgICBzb3VyY2VGaWxlTmFtZTogZmlsZW5hbWUsXG4gICAgY2FsbGVyOiB7XG4gICAgICBuYW1lOiBgJHtuYW1lfS9sb2FkZXJgLFxuICAgICAgLy8gbm9kZS1ldmFsIGNhbiBvbmx5IGV2YWwgY29tbW9uanMgbW9kdWxlXG4gICAgICBzdXBwb3J0c1N0YXRpY0VTTTogZmFsc2UsXG4gICAgICBzdXBwb3J0c0R5bmFtaWNJbXBvcnQ6IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gYmFiZWwubG9hZFBhcnRpYWxDb25maWcob3B0aW9ucyk7XG4gIG9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXBzID09PSAnaW5saW5lJykge1xuICAgIC8vIEJhYmVsIGhhcyB0aGlzIHdlaXJkIGJlaGF2aW9yIHdoZXJlIGlmIHlvdSBzZXQgXCJpbmxpbmVcIiwgd2VcbiAgICAvLyBpbmxpbmUgdGhlIHNvdXJjZW1hcCwgYW5kIHNldCAncmVzdWx0Lm1hcCA9IG51bGwnLiBUaGlzIHJlc3VsdHNcbiAgICAvLyBpbiBiYWQgYmVoYXZpb3IgZnJvbSBCYWJlbCBzaW5jZSB0aGUgbWFwcyBnZXQgcHV0IGludG8gdGhlIGNvZGUsXG4gICAgLy8gd2hpY2ggV2VicGFjayBkb2VzIG5vdCBleHBlY3QsIGFuZCBiZWNhdXNlIHRoZSBtYXAgd2UgcmV0dXJuIHRvXG4gICAgLy8gV2VicGFjayBpcyBudWxsLCB3aGljaCBpcyBhbHNvIGJhZC4gVG8gYXZvaWQgdGhhdCwgd2Ugb3ZlcnJpZGUgdGhlXG4gICAgLy8gYmVoYXZpb3IgaGVyZSBzbyBcImlubGluZVwiIGp1c3QgYmVoYXZlcyBsaWtlICd0cnVlJy5cbiAgICBvcHRpb25zLnNvdXJjZU1hcHMgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGF3YWl0IGJhYmVsLnRyYW5zZm9ybUFzeW5jKHNvdXJjZSwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcuYmFiZWxyYyA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmFkZERlcGVuZGVuY3koY29uZmlnLmJhYmVscmMpO1xuICB9XG5cbiAgcmV0dXJuIFtjb2RlLCBtYXAgfHwgdW5kZWZpbmVkXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcbiAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuXG4gIFtzb3VyY2UsIGlucHV0U291cmNlTWFwXSA9IGF3YWl0IGJhYmVsTG9hZGVyLmNhbGwoXG4gICAgdGhpcyxcbiAgICBzb3VyY2UsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gICk7XG5cbiAgLy8gZXZhbCByb3V0ZXMuanMgc28gd2UgY2FuIHRyYXZlcnNlIHJvdXRlVHJlZVxuICBsZXQgcm91dGVzID0gbm9kZUV2YWwoc291cmNlLCBmaWxlbmFtZSk7XG4gIHJvdXRlcyA9IHJvdXRlcy5kZWZhdWx0IHx8IHJvdXRlcztcblxuICBpZiAoIXJvdXRlcy5kYXRhIHx8ICFyb3V0ZXMubWF0Y2ggfHwgIXJvdXRlcy5jaGVjayB8fCAhcm91dGVzLmxpbmspIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgcm91dGVzLCBmb3JnZXQgdG8gd3JhcCBpdCB3aXRoIHJvdXRlcygpP2ApO1xuICB9XG5cbiAgbGV0IHJvdXRlVHJlZSA9IHJvdXRlcy5kYXRhLmRhdGE7XG4gIGlmIChfLmlzQXJyYXkocm91dGVUcmVlKSkge1xuICAgIHJvdXRlVHJlZSA9IHtcbiAgICAgIGNoaWxkcmVuOiByb3V0ZVRyZWUsXG4gICAgfTtcbiAgfVxuXG4gIC8vIGJhc2UgdXJsXG4gIGlmIChvcHRpb25zLmJhc2UpIHtcbiAgICByb3V0ZVRyZWUucGF0aCA9IHJvdXRlVHJlZS5wYXRoIHx8ICcnO1xuICAgIHJvdXRlVHJlZS5wYXRoID0gb3B0aW9ucy5iYXNlICsgcm91dGVUcmVlLnBhdGg7XG4gIH1cblxuICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gIGxldCBuYW1lZFJvdXRlcyA9IHt9O1xuXG4gIChmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBjb250ZXh0KSB7XG4gICAgaWYgKG5vZGUuY29tcG9uZW50ICYmICFfLmlzU3RyaW5nKG5vZGUuY29tcG9uZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb21wb25lbnQgbXVzdCBiZSBzdHJpbmc6ICR7bm9kZS5jb21wb25lbnR9YCk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmFtZSAmJiAhXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBuYW1lZCByb3V0ZSBpcyBhIGxlYWYgdGhhdCBjYW4gbm90IGhhcyBjaGlsZHJlbjogJHtub2RlLm5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgY29udGV4dCB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzXG4gICAgLy8gYWZmZWN0IGVhY2ggb3RoZXJcbiAgICBsZXQgcGF0aFRlbXBsYXRlID0gY29udGV4dC5wYXRoVGVtcGxhdGU7XG4gICAgbGV0IHBhcmFtc1JlZ2V4ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNSZWdleCk7XG4gICAgbGV0IHBhcmFtc09wdGlvbmFsID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNPcHRpb25hbCk7XG5cbiAgICAvLyBjb21waWxlIHBhdGggdG8gc3VwcG9ydCByZWdleCBhbmQgcGFyYW1zXG4gICAgaWYgKG5vZGUucGF0aCkge1xuICAgICAgLy8gdHdvIHdheXMgdG8gZGVjbGFyZSByb3V0ZSBhcmc6XG4gICAgICAvLyAxLiAobmFtZTpyZWdleCkgb3IgKG5hbWU/OnJlZ2V4KVxuICAgICAgLy8gMi4gOm5hbWVcbiAgICAgIGxldCByZWdleE1hdGNoID1cbiAgICAgICAgL1xcKChbYS16QS1aX11bYS16QS1aXzAtOV0qXFw/PylcXDooLio/KVxcKXxcXDooW2EtekEtWl9dW2EtekEtWl8wLTldKikvZztcbiAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgbGV0IGNvbXBpbGVkID0gJyc7XG4gICAgICBsZXQgcGFyYW1zID0gW107XG5cbiAgICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXhNYXRjaC5leGVjKG5vZGUucGF0aCkpKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIobGFzdEluZGV4LCBtYXRjaC5pbmRleCAtIGxhc3RJbmRleCk7XG4gICAgICAgIGxhc3RJbmRleCA9IHJlZ2V4TWF0Y2gubGFzdEluZGV4O1xuICAgICAgICBjb21waWxlZCArPSBfLmVzY2FwZVJlZ0V4cChub3RSZWdleCk7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbWF0Y2hbMl07XG5cbiAgICAgICAgLy8gOm5hbWUgaW1wbGljaXRseSBlbmRzIHdpdGggJy8nIG9yIHRoZSBlbmQgb2Ygc3RyaW5nXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgIG5hbWUgPSBtYXRjaFszXTtcbiAgICAgICAgICByZWdleCA9ICdbXi9dKyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zUmVnZXhbbmFtZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBhcmFtIG5hbWUgY29uZmxpY3RzOiAke25hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICc/Jykge1xuICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pP2A7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KWA7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBgKCR7bmFtZX0pYDtcbiAgICAgIH1cblxuICAgICAgLy8gZGVhbCB3aXRoIHRhaWxcbiAgICAgIGlmIChsYXN0SW5kZXggPCBub2RlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIoXG4gICAgICAgICAgbGFzdEluZGV4LFxuICAgICAgICAgIG5vZGUucGF0aC5sZW5ndGggLSBsYXN0SW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX3BhdGggPSBjb21waWxlZDtcbiAgICAgIG5vZGUuX3BhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gICAgaWYgKG5vZGUubmFtZSAmJiBfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIG5hbWVkUm91dGVzW25vZGUubmFtZV0gPSB7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgcGFyYW1zUmVnZXgsXG4gICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaW1wb3J0Q29tcG9uZW50IGFzIHBsYWNlaG9sZGVyLCBwcmVwYXJlIGZvciBoYWNrXG4gICAgaWYgKG5vZGUuY29tcG9uZW50KSB7XG4gICAgICBub2RlLmltcG9ydENvbXBvbmVudCA9IG5vZGUuY29tcG9uZW50O1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSB0cmF2ZXJzZSB0byBjaGlsZHJlblxuICAgIGlmICghXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdHJhdmVyc2Uobiwge1xuICAgICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgICBwYXJhbXNPcHRpb25hbCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKHJvdXRlVHJlZSwge1xuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBwYXRoVGVtcGxhdGU6ICcnLFxuICAgIHBhcmFtc1JlZ2V4OiB7fSxcbiAgICBwYXJhbXNPcHRpb25hbDoge30sXG4gIH0pO1xuXG4gIC8vIGNvbnZlcnQgdG8gc291cmNlIHNvIHdlIGNhbiBoYWNrIGl0IGFzIHN0cmluZ1xuICBsZXQgcm91dGVzU291cmNlID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgcm91dGVzLmRhdGEsIHtcbiAgICAgIGRhdGE6IHJvdXRlVHJlZSxcbiAgICAgIG5hbWVzOiBuYW1lZFJvdXRlcyxcbiAgICB9KSxcbiAgKTtcblxuICAvLyBoYWNrIGltcG9ydENvbXBvbmVudCB0byBiZSBhIHJlcXVpcmUuZW5zdXJlIHByb21pc2VcbiAgcm91dGVzU291cmNlID0gcm91dGVzU291cmNlLnJlcGxhY2UoXG4gICAgLyhbXCInXSlpbXBvcnRDb21wb25lbnRcXDFcXHMqPzpcXHMqPyhbXCInXSkoLio/KVxcMi9nLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBgXCJpbXBvcnRDb21wb25lbnRcIjogJHtpbXBvcnRDb21wb25lbnQucmVwbGFjZShcbiAgICAgICAgL19fY29tcG9uZW50X18vZyxcbiAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnID8gYCR7bmFtZX0vaG90LWxvYWRlciFgIDogJycpICtcbiAgICAgICAgICBhcmd1bWVudHNbM10sXG4gICAgICApfWA7XG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gW1xuICAgIGBcbiAgICB2YXIgZGF0YSA9ICR7cm91dGVzU291cmNlfTtcblxuICAgIHZhciByb3V0ZXMgPSByZXF1aXJlKCcke25hbWV9L3JvdXRlcycpO1xuICAgIHJvdXRlcyA9IHJvdXRlcy5kZWZhdWx0IHx8IHJvdXRlcztcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJvdXRlcyhkYXRhKTtcbiAgICBgLFxuICAgIGlucHV0U291cmNlTWFwLFxuICBdO1xufVxuIl19