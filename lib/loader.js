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
    var filename, _yield$babelLoader$ca, _yield$babelLoader$ca2, routeTree, namedRoutes, routeSource, namesMap;

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
            routeTree = nodeEval(source, filename);
            routeTree = routeTree["default"] || routeTree;

            if (routeTree.data && routeTree.match && routeTree.check && routeTree.link) {
              routeTree = routeTree.data;
            }

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


            routeSource = JSON.stringify(routeTree); // hack importComponent to be a require.ensure promise

            routeSource = routeSource.replace(/(["'])importComponent\1\s*?:\s*?(["'])(.*?)\2/g, function () {
              return "\"importComponent\": ".concat(importComponent.replace(/__component__/g, (process.env.NODE_ENV === 'development' ? "".concat(name, "/hot-loader!") : '') + arguments[3]));
            }); // convert names map to source

            namesMap = JSON.stringify(namedRoutes);
            return _context2.abrupt("return", ["\n    var data = ".concat(routeSource, ";\n    var names = ").concat(namesMap, ";\n\n    var routes = require('").concat(name, "/routes');\n    routes = routes.default || routes;\n    module.exports = routes(data, names);\n    "), inputSourceMap]);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlVHJlZSIsImRhdGEiLCJtYXRjaCIsImNoZWNrIiwibGluayIsImlzQXJyYXkiLCJjaGlsZHJlbiIsIm5hbWVkUm91dGVzIiwidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsImNvbXBvbmVudCIsImlzU3RyaW5nIiwiRXJyb3IiLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInBhdGgiLCJyZWdleE1hdGNoIiwibGFzdEluZGV4IiwiY29tcGlsZWQiLCJwYXJhbXMiLCJleGVjIiwibm90UmVnZXgiLCJzdWJzdHIiLCJpbmRleCIsImVzY2FwZVJlZ0V4cCIsInJlZ2V4Iiwic2xpY2UiLCJwdXNoIiwibGVuZ3RoIiwiX3BhdGgiLCJfcGFyYW1zIiwiZm9yRWFjaCIsIm4iLCJyb3V0ZVNvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwi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QUFDQyxTQUFMLENBQWV4QyxTQUFmLENBM0lwQixFQTZJRTs7QUFDQXNDLFlBQUFBLFdBQVcsR0FBR0EsV0FBVyxDQUFDRyxPQUFaLENBQ1osZ0RBRFksRUFFWixZQUFZO0FBQ1Ysb0RBQTZCdkUsZUFBZSxDQUFDdUUsT0FBaEIsQ0FDM0IsZ0JBRDJCLEVBRTNCLENBQUNDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQXpCLGFBQTRDNUUsSUFBNUMsb0JBQWlFLEVBQWxFLElBQ0E2RSxTQUFTLENBQUMsQ0FBRCxDQUhrQixDQUE3QjtBQUtELGFBUlcsQ0FBZCxDQTlJRixDQXlKRTs7QUFDTUMsWUFBQUEsUUExSlIsR0EwSm1CUCxJQUFJLENBQUNDLFNBQUwsQ0FBZWpDLFdBQWYsQ0ExSm5CO0FBQUEsOENBNEpTLDRCQUVRK0IsV0FGUixnQ0FHU1EsUUFIVCw0Q0FLbUI5RSxJQUxuQiwwR0FTTE0sY0FUSyxDQTVKVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUV2YWwgPSByZXF1aXJlKCdub2RlLWV2YWwnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IHsgbmFtZSB9ID0gcmVxdWlyZSgnLi4vcGFja2FnZScpO1xuY29uc3QgYmFiZWwgPSByZXF1aXJlKCdAYmFiZWwvY29yZScpO1xuXG5jb25zdCBpbXBvcnRDb21wb25lbnQgPSBgXG5mdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbXBvcnQoJ19fY29tcG9uZW50X18nKS50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgcmV0dXJuIG0uZGVmYXVsdCB8fCBtO1xuICB9KTtcbn1cbmA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgLy8gTWFrZSB0aGUgbG9hZGVyIGFzeW5jXG4gIC8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuYXN5bmMoKTtcbiAgbG9hZGVyLmNhbGwodGhpcywgc291cmNlLCBpbnB1dFNvdXJjZU1hcCkudGhlbihcbiAgICBhcmdzID0+IGNhbGxiYWNrKG51bGwsIC4uLmFyZ3MpLFxuICAgIGVyciA9PiBjYWxsYmFjayhlcnIpLFxuICApO1xufTtcblxuLy8gc3VwcG9ydCBlczYgd2l0aCBiYWJlbC1sb2FkZXJcbi8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuYXN5bmMgZnVuY3Rpb24gYmFiZWxMb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuXG4gIGxldCBvcHRpb25zID0ge1xuICAgIGZpbGVuYW1lLFxuICAgIGlucHV0U291cmNlTWFwOiBpbnB1dFNvdXJjZU1hcCB8fCB1bmRlZmluZWQsXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNvdXJjZW1hcCBiZWhhdmlvciBiYXNlZCBvbiBXZWJwYWNrJ3MgbWFwcGluZyBmbGFnXG4gICAgc291cmNlTWFwczogdGhpcy5zb3VyY2VNYXAsXG4gICAgLy8gRW5zdXJlIHRoYXQgV2VicGFjayB3aWxsIGdldCBhIGZ1bGwgYWJzb2x1dGUgcGF0aCBpbiB0aGUgc291cmNlbWFwXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gcHJvcGVybHkgbWFwIHRoZSBtb2R1bGUgYmFjayB0byBpdHMgaW50ZXJuYWwgY2FjaGVkXG4gICAgLy8gbW9kdWxlcy5cbiAgICBzb3VyY2VGaWxlTmFtZTogZmlsZW5hbWUsXG4gICAgY2FsbGVyOiB7XG4gICAgICBuYW1lOiBgJHtuYW1lfS9sb2FkZXJgLFxuICAgICAgLy8gbm9kZS1ldmFsIGNhbiBvbmx5IGV2YWwgY29tbW9uanMgbW9kdWxlXG4gICAgICBzdXBwb3J0c1N0YXRpY0VTTTogZmFsc2UsXG4gICAgICBzdXBwb3J0c0R5bmFtaWNJbXBvcnQ6IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gYmFiZWwubG9hZFBhcnRpYWxDb25maWcob3B0aW9ucyk7XG4gIG9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXBzID09PSAnaW5saW5lJykge1xuICAgIC8vIEJhYmVsIGhhcyB0aGlzIHdlaXJkIGJlaGF2aW9yIHdoZXJlIGlmIHlvdSBzZXQgXCJpbmxpbmVcIiwgd2VcbiAgICAvLyBpbmxpbmUgdGhlIHNvdXJjZW1hcCwgYW5kIHNldCAncmVzdWx0Lm1hcCA9IG51bGwnLiBUaGlzIHJlc3VsdHNcbiAgICAvLyBpbiBiYWQgYmVoYXZpb3IgZnJvbSBCYWJlbCBzaW5jZSB0aGUgbWFwcyBnZXQgcHV0IGludG8gdGhlIGNvZGUsXG4gICAgLy8gd2hpY2ggV2VicGFjayBkb2VzIG5vdCBleHBlY3QsIGFuZCBiZWNhdXNlIHRoZSBtYXAgd2UgcmV0dXJuIHRvXG4gICAgLy8gV2VicGFjayBpcyBudWxsLCB3aGljaCBpcyBhbHNvIGJhZC4gVG8gYXZvaWQgdGhhdCwgd2Ugb3ZlcnJpZGUgdGhlXG4gICAgLy8gYmVoYXZpb3IgaGVyZSBzbyBcImlubGluZVwiIGp1c3QgYmVoYXZlcyBsaWtlICd0cnVlJy5cbiAgICBvcHRpb25zLnNvdXJjZU1hcHMgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGF3YWl0IGJhYmVsLnRyYW5zZm9ybUFzeW5jKHNvdXJjZSwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcuYmFiZWxyYyA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmFkZERlcGVuZGVuY3koY29uZmlnLmJhYmVscmMpO1xuICB9XG5cbiAgcmV0dXJuIFtjb2RlLCBtYXAgfHwgdW5kZWZpbmVkXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcblxuICBbc291cmNlLCBpbnB1dFNvdXJjZU1hcF0gPSBhd2FpdCBiYWJlbExvYWRlci5jYWxsKFxuICAgIHRoaXMsXG4gICAgc291cmNlLFxuICAgIGlucHV0U291cmNlTWFwLFxuICApO1xuXG4gIC8vIGV2YWwgcm91dGVzLmpzIHNvIHdlIGNhbiB0cmF2ZXJzZSByb3V0ZVRyZWVcbiAgbGV0IHJvdXRlVHJlZSA9IG5vZGVFdmFsKHNvdXJjZSwgZmlsZW5hbWUpO1xuICByb3V0ZVRyZWUgPSByb3V0ZVRyZWUuZGVmYXVsdCB8fCByb3V0ZVRyZWU7XG5cbiAgaWYgKHJvdXRlVHJlZS5kYXRhICYmIHJvdXRlVHJlZS5tYXRjaCAmJiByb3V0ZVRyZWUuY2hlY2sgJiYgcm91dGVUcmVlLmxpbmspIHtcbiAgICByb3V0ZVRyZWUgPSByb3V0ZVRyZWUuZGF0YTtcbiAgfVxuXG4gIGlmIChfLmlzQXJyYXkocm91dGVUcmVlKSkge1xuICAgIHJvdXRlVHJlZSA9IHtcbiAgICAgIGNoaWxkcmVuOiByb3V0ZVRyZWUsXG4gICAgfTtcbiAgfVxuXG4gIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgbGV0IG5hbWVkUm91dGVzID0ge307XG5cbiAgKGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUsIGNvbnRleHQpIHtcbiAgICBpZiAobm9kZS5jb21wb25lbnQgJiYgIV8uaXNTdHJpbmcobm9kZS5jb21wb25lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbXBvbmVudCBtdXN0IGJlIHN0cmluZzogJHtub2RlLmNvbXBvbmVudH1gKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5uYW1lICYmICFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYG5hbWVkIHJvdXRlIGlzIGEgbGVhZiB0aGF0IGNhbiBub3QgaGFzIGNoaWxkcmVuOiAke25vZGUubmFtZX1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgY3VycmVudCBjb250ZXh0IHRvIGF2b2lkIGNoaWxkcmVuJ3MgY29udGV4dHNcbiAgICAvLyBhZmZlY3QgZWFjaCBvdGhlclxuICAgIGxldCBwYXRoVGVtcGxhdGUgPSBjb250ZXh0LnBhdGhUZW1wbGF0ZTtcbiAgICBsZXQgcGFyYW1zUmVnZXggPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc1JlZ2V4KTtcbiAgICBsZXQgcGFyYW1zT3B0aW9uYWwgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZXh0LnBhcmFtc09wdGlvbmFsKTtcblxuICAgIC8vIGNvbXBpbGUgcGF0aCB0byBzdXBwb3J0IHJlZ2V4IGFuZCBwYXJhbXNcbiAgICBpZiAobm9kZS5wYXRoKSB7XG4gICAgICAvLyB0d28gd2F5cyB0byBkZWNsYXJlIHJvdXRlIGFyZzpcbiAgICAgIC8vIDEuIChuYW1lOnJlZ2V4KSBvciAobmFtZT86cmVnZXgpXG4gICAgICAvLyAyLiA6bmFtZVxuICAgICAgbGV0IHJlZ2V4TWF0Y2ggPSAvXFwoKFthLXpBLVpfXVthLXpBLVpfMC05XSpcXD8/KVxcOiguKj8pXFwpfFxcOihbYS16QS1aX11bYS16QS1aXzAtOV0qKS9nO1xuICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgY29tcGlsZWQgPSAnJztcbiAgICAgIGxldCBwYXJhbXMgPSBbXTtcblxuICAgICAgbGV0IG1hdGNoID0gbnVsbDtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleE1hdGNoLmV4ZWMobm9kZS5wYXRoKSkpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihsYXN0SW5kZXgsIG1hdGNoLmluZGV4IC0gbGFzdEluZGV4KTtcbiAgICAgICAgbGFzdEluZGV4ID0gcmVnZXhNYXRjaC5sYXN0SW5kZXg7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBsZXQgbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgICBsZXQgcmVnZXggPSBtYXRjaFsyXTtcblxuICAgICAgICAvLyA6bmFtZSBpbXBsaWNpdGx5IGVuZHMgd2l0aCAnLycgb3IgdGhlIGVuZCBvZiBzdHJpbmdcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgbmFtZSA9IG1hdGNoWzNdO1xuICAgICAgICAgIHJlZ2V4ID0gJ1teL10rJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXNSZWdleFtuYW1lXSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyYW0gbmFtZSBjb25mbGljdHM6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJz8nKSB7XG4gICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgICAgY29tcGlsZWQgKz0gYCgke3JlZ2V4fSk/YDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pYDtcbiAgICAgICAgICBwYXJhbXMucHVzaChuYW1lKTtcblxuICAgICAgICAgIHBhcmFtc1JlZ2V4W25hbWVdID0gcmVnZXg7XG4gICAgICAgICAgcGFyYW1zT3B0aW9uYWxbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IGAoJHtuYW1lfSlgO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWFsIHdpdGggdGFpbFxuICAgICAgaWYgKGxhc3RJbmRleCA8IG5vZGUucGF0aC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5vdFJlZ2V4ID0gbm9kZS5wYXRoLnN1YnN0cihcbiAgICAgICAgICBsYXN0SW5kZXgsXG4gICAgICAgICAgbm9kZS5wYXRoLmxlbmd0aCAtIGxhc3RJbmRleCxcbiAgICAgICAgKTtcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xuXG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBub3RSZWdleDtcbiAgICAgIH1cblxuICAgICAgbm9kZS5fcGF0aCA9IGNvbXBpbGVkO1xuICAgICAgbm9kZS5fcGFyYW1zID0gcGFyYW1zO1xuICAgIH1cblxuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBpZiAobm9kZS5uYW1lICYmIF8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgbmFtZWRSb3V0ZXNbbm9kZS5uYW1lXSA9IHtcbiAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgcGFyYW1zT3B0aW9uYWwsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIGFkZCBpbXBvcnRDb21wb25lbnQgYXMgcGxhY2Vob2xkZXIsIHByZXBhcmUgZm9yIGhhY2tcbiAgICBpZiAobm9kZS5jb21wb25lbnQpIHtcbiAgICAgIG5vZGUuaW1wb3J0Q29tcG9uZW50ID0gbm9kZS5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gcmVjdXJzaXZlIHRyYXZlcnNlIHRvIGNoaWxkcmVuXG4gICAgaWYgKCFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAobikge1xuICAgICAgICB0cmF2ZXJzZShuLCB7XG4gICAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkocm91dGVUcmVlLCB7XG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIHBhdGhUZW1wbGF0ZTogJycsXG4gICAgcGFyYW1zUmVnZXg6IHt9LFxuICAgIHBhcmFtc09wdGlvbmFsOiB7fSxcbiAgfSk7XG5cbiAgLy8gY29udmVydCB0byBzb3VyY2Ugc28gd2UgY2FuIGhhY2sgaXQgYXMgc3RyaW5nXG4gIGxldCByb3V0ZVNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHJvdXRlVHJlZSk7XG5cbiAgLy8gaGFjayBpbXBvcnRDb21wb25lbnQgdG8gYmUgYSByZXF1aXJlLmVuc3VyZSBwcm9taXNlXG4gIHJvdXRlU291cmNlID0gcm91dGVTb3VyY2UucmVwbGFjZShcbiAgICAvKFtcIiddKWltcG9ydENvbXBvbmVudFxcMVxccyo/Olxccyo/KFtcIiddKSguKj8pXFwyL2csXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGBcImltcG9ydENvbXBvbmVudFwiOiAke2ltcG9ydENvbXBvbmVudC5yZXBsYWNlKFxuICAgICAgICAvX19jb21wb25lbnRfXy9nLFxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBgJHtuYW1lfS9ob3QtbG9hZGVyIWAgOiAnJykgK1xuICAgICAgICBhcmd1bWVudHNbM10sXG4gICAgICApfWA7XG4gICAgfSxcbiAgKTtcblxuICAvLyBjb252ZXJ0IG5hbWVzIG1hcCB0byBzb3VyY2VcbiAgY29uc3QgbmFtZXNNYXAgPSBKU09OLnN0cmluZ2lmeShuYW1lZFJvdXRlcyk7XG5cbiAgcmV0dXJuIFtcbiAgICBgXG4gICAgdmFyIGRhdGEgPSAke3JvdXRlU291cmNlfTtcbiAgICB2YXIgbmFtZXMgPSAke25hbWVzTWFwfTtcblxuICAgIHZhciByb3V0ZXMgPSByZXF1aXJlKCcke25hbWV9L3JvdXRlcycpO1xuICAgIHJvdXRlcyA9IHJvdXRlcy5kZWZhdWx0IHx8IHJvdXRlcztcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJvdXRlcyhkYXRhLCBuYW1lcyk7XG4gICAgYCxcbiAgICBpbnB1dFNvdXJjZU1hcCxcbiAgXTtcbn1cbiJdfQ==