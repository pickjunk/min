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
    return callback.apply(void 0, [null].concat((0, _toConsumableArray2.default)(args)));
  }, function (err) {
    return callback(err);
  });
}; // support es6 with babel-loader
// fork from babel-loader@8


function babelLoader(_x, _x2) {
  return _babelLoader.apply(this, arguments);
}

function _babelLoader() {
  _babelLoader = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(source, inputSourceMap) {
    var filename, options, config, _ref, code, map;

    return _regenerator.default.wrap(function _callee$(_context) {
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
            _ref = _context.sent;
            code = _ref.code;
            map = _ref.map;

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
  _loader = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(source, inputSourceMap) {
    var filename, _ref2, _ref3, routeTree, namedRoutes, routeSource, namesMap;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filename = this.resourcePath;
            _context2.next = 3;
            return babelLoader.call(this, source, inputSourceMap);

          case 3:
            _ref2 = _context2.sent;
            _ref3 = (0, _slicedToArray2.default)(_ref2, 2);
            source = _ref3[0];
            inputSourceMap = _ref3[1];
            // eval routes.js so we can traverse routeTree
            routeTree = nodeEval(source, filename);
            routeTree = routeTree.default || routeTree;

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

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlVHJlZSIsImRlZmF1bHQiLCJpc0FycmF5IiwiY2hpbGRyZW4iLCJuYW1lZFJvdXRlcyIsInRyYXZlcnNlIiwibm9kZSIsImNvbnRleHQiLCJjb21wb25lbnQiLCJpc1N0cmluZyIsIkVycm9yIiwiaXNFbXB0eSIsInBhdGhUZW1wbGF0ZSIsInBhcmFtc1JlZ2V4IiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zT3B0aW9uYWwiLCJwYXRoIiwicmVnZXhNYXRjaCIsImxhc3RJbmRleCIsImNvbXBpbGVkIiwicGFyYW1zIiwibWF0Y2giLCJleGVjIiwibm90UmVnZXgiLCJzdWJzdHIiLCJpbmRleCIsImVzY2FwZVJlZ0V4cCIsInJlZ2V4Iiwic2xpY2UiLCJwdXNoIiwibGVuZ3RoIiwiX3BhdGgiLCJfcGFyYW1zIiwiZm9yRWFjaCIsIm4iLCJyb3V0ZVNvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiYXJndW1lbnRzIiwi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LEdBQVIsQ0FBWUMsUUFBWixLQUF5QixhQUF6QixhQUE0QzFFLElBQTVDLG9CQUFpRSxFQUFsRSxJQUNFMkUsU0FBUyxDQUFDLENBQUQsQ0FIZ0IsQ0FBN0I7QUFLRCxhQVJXLENBQWQsQ0ExSUYsQ0FxSkU7O0FBQ01DLFlBQUFBLFFBdEpSLEdBc0ptQlAsSUFBSSxDQUFDQyxTQUFMLENBQWVsQyxXQUFmLENBdEpuQjtBQUFBLDhDQXdKUyw0QkFFUWdDLFdBRlIsZ0NBR1NRLFFBSFQsNENBS21CNUUsSUFMbkIsMEdBU0xNLGNBVEssQ0F4SlQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vZGVFdmFsID0gcmVxdWlyZSgnbm9kZS1ldmFsJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCB7IG5hbWUgfSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UnKTtcbmNvbnN0IGJhYmVsID0gcmVxdWlyZSgnQGJhYmVsL2NvcmUnKTtcblxuY29uc3QgaW1wb3J0Q29tcG9uZW50ID0gYFxuZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW1wb3J0KCdfX2NvbXBvbmVudF9fJykudGhlbihmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBtLmRlZmF1bHQgfHwgbTtcbiAgfSk7XG59XG5gO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgLy8gTWFrZSB0aGUgbG9hZGVyIGFzeW5jXG4gIC8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuYXN5bmMoKTtcbiAgbG9hZGVyLmNhbGwodGhpcywgc291cmNlLCBpbnB1dFNvdXJjZU1hcCkudGhlbihcbiAgICBhcmdzID0+IGNhbGxiYWNrKG51bGwsIC4uLmFyZ3MpLFxuICAgIGVyciA9PiBjYWxsYmFjayhlcnIpLFxuICApO1xufTtcblxuLy8gc3VwcG9ydCBlczYgd2l0aCBiYWJlbC1sb2FkZXJcbi8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuYXN5bmMgZnVuY3Rpb24gYmFiZWxMb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuXG4gIGxldCBvcHRpb25zID0ge1xuICAgIGZpbGVuYW1lLFxuICAgIGlucHV0U291cmNlTWFwOiBpbnB1dFNvdXJjZU1hcCB8fCB1bmRlZmluZWQsXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNvdXJjZW1hcCBiZWhhdmlvciBiYXNlZCBvbiBXZWJwYWNrJ3MgbWFwcGluZyBmbGFnXG4gICAgc291cmNlTWFwczogdGhpcy5zb3VyY2VNYXAsXG4gICAgLy8gRW5zdXJlIHRoYXQgV2VicGFjayB3aWxsIGdldCBhIGZ1bGwgYWJzb2x1dGUgcGF0aCBpbiB0aGUgc291cmNlbWFwXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gcHJvcGVybHkgbWFwIHRoZSBtb2R1bGUgYmFjayB0byBpdHMgaW50ZXJuYWwgY2FjaGVkXG4gICAgLy8gbW9kdWxlcy5cbiAgICBzb3VyY2VGaWxlTmFtZTogZmlsZW5hbWUsXG4gICAgY2FsbGVyOiB7XG4gICAgICBuYW1lOiBgJHtuYW1lfS9sb2FkZXJgLFxuICAgICAgLy8gbm9kZS1ldmFsIGNhbiBvbmx5IGV2YWwgY29tbW9uanMgbW9kdWxlXG4gICAgICBzdXBwb3J0c1N0YXRpY0VTTTogZmFsc2UsXG4gICAgICBzdXBwb3J0c0R5bmFtaWNJbXBvcnQ6IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gYmFiZWwubG9hZFBhcnRpYWxDb25maWcob3B0aW9ucyk7XG4gIG9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXBzID09PSAnaW5saW5lJykge1xuICAgIC8vIEJhYmVsIGhhcyB0aGlzIHdlaXJkIGJlaGF2aW9yIHdoZXJlIGlmIHlvdSBzZXQgXCJpbmxpbmVcIiwgd2VcbiAgICAvLyBpbmxpbmUgdGhlIHNvdXJjZW1hcCwgYW5kIHNldCAncmVzdWx0Lm1hcCA9IG51bGwnLiBUaGlzIHJlc3VsdHNcbiAgICAvLyBpbiBiYWQgYmVoYXZpb3IgZnJvbSBCYWJlbCBzaW5jZSB0aGUgbWFwcyBnZXQgcHV0IGludG8gdGhlIGNvZGUsXG4gICAgLy8gd2hpY2ggV2VicGFjayBkb2VzIG5vdCBleHBlY3QsIGFuZCBiZWNhdXNlIHRoZSBtYXAgd2UgcmV0dXJuIHRvXG4gICAgLy8gV2VicGFjayBpcyBudWxsLCB3aGljaCBpcyBhbHNvIGJhZC4gVG8gYXZvaWQgdGhhdCwgd2Ugb3ZlcnJpZGUgdGhlXG4gICAgLy8gYmVoYXZpb3IgaGVyZSBzbyBcImlubGluZVwiIGp1c3QgYmVoYXZlcyBsaWtlICd0cnVlJy5cbiAgICBvcHRpb25zLnNvdXJjZU1hcHMgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGF3YWl0IGJhYmVsLnRyYW5zZm9ybUFzeW5jKHNvdXJjZSwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcuYmFiZWxyYyA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmFkZERlcGVuZGVuY3koY29uZmlnLmJhYmVscmMpO1xuICB9XG5cbiAgcmV0dXJuIFtjb2RlLCBtYXAgfHwgdW5kZWZpbmVkXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcblxuICBbc291cmNlLCBpbnB1dFNvdXJjZU1hcF0gPSBhd2FpdCBiYWJlbExvYWRlci5jYWxsKFxuICAgIHRoaXMsXG4gICAgc291cmNlLFxuICAgIGlucHV0U291cmNlTWFwLFxuICApO1xuXG4gIC8vIGV2YWwgcm91dGVzLmpzIHNvIHdlIGNhbiB0cmF2ZXJzZSByb3V0ZVRyZWVcbiAgbGV0IHJvdXRlVHJlZSA9IG5vZGVFdmFsKHNvdXJjZSwgZmlsZW5hbWUpO1xuICByb3V0ZVRyZWUgPSByb3V0ZVRyZWUuZGVmYXVsdCB8fCByb3V0ZVRyZWU7XG5cbiAgaWYgKF8uaXNBcnJheShyb3V0ZVRyZWUpKSB7XG4gICAgcm91dGVUcmVlID0ge1xuICAgICAgY2hpbGRyZW46IHJvdXRlVHJlZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICBsZXQgbmFtZWRSb3V0ZXMgPSB7fTtcblxuICAoZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSwgY29udGV4dCkge1xuICAgIGlmIChub2RlLmNvbXBvbmVudCAmJiAhXy5pc1N0cmluZyhub2RlLmNvbXBvbmVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29tcG9uZW50IG11c3QgYmUgc3RyaW5nOiAke25vZGUuY29tcG9uZW50fWApO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5hbWUgJiYgIV8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbmFtZWQgcm91dGUgaXMgYSBsZWFmIHRoYXQgY2FuIG5vdCBoYXMgY2hpbGRyZW46ICR7bm9kZS5uYW1lfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IGNvbnRleHQgdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0c1xuICAgIC8vIGFmZmVjdCBlYWNoIG90aGVyXG4gICAgbGV0IHBhdGhUZW1wbGF0ZSA9IGNvbnRleHQucGF0aFRlbXBsYXRlO1xuICAgIGxldCBwYXJhbXNSZWdleCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQucGFyYW1zUmVnZXgpO1xuICAgIGxldCBwYXJhbXNPcHRpb25hbCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQucGFyYW1zT3B0aW9uYWwpO1xuXG4gICAgLy8gY29tcGlsZSBwYXRoIHRvIHN1cHBvcnQgcmVnZXggYW5kIHBhcmFtc1xuICAgIGlmIChub2RlLnBhdGgpIHtcbiAgICAgIC8vIHR3byB3YXlzIHRvIGRlY2xhcmUgcm91dGUgYXJnOlxuICAgICAgLy8gMS4gKG5hbWU6cmVnZXgpIG9yIChuYW1lPzpyZWdleClcbiAgICAgIC8vIDIuIDpuYW1lXG4gICAgICBsZXQgcmVnZXhNYXRjaCA9IC9cXCgoW2EtekEtWl9dW2EtekEtWl8wLTldKlxcPz8pXFw6KC4qPylcXCl8XFw6KFthLXpBLVpfXVthLXpBLVpfMC05XSopL2c7XG4gICAgICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgICAgIGxldCBjb21waWxlZCA9ICcnO1xuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuXG4gICAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4TWF0Y2guZXhlYyhub2RlLnBhdGgpKSkge1xuICAgICAgICBsZXQgbm90UmVnZXggPSBub2RlLnBhdGguc3Vic3RyKGxhc3RJbmRleCwgbWF0Y2guaW5kZXggLSBsYXN0SW5kZXgpO1xuICAgICAgICBsYXN0SW5kZXggPSByZWdleE1hdGNoLmxhc3RJbmRleDtcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xuXG4gICAgICAgIGxldCBuYW1lID0gbWF0Y2hbMV07XG4gICAgICAgIGxldCByZWdleCA9IG1hdGNoWzJdO1xuXG4gICAgICAgIC8vIDpuYW1lIGltcGxpY2l0bHkgZW5kcyB3aXRoICcvJyBvciB0aGUgZW5kIG9mIHN0cmluZ1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gbWF0Y2hbM107XG4gICAgICAgICAgcmVnZXggPSAnW14vXSsnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtc1JlZ2V4W25hbWVdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwYXJhbSBuYW1lIGNvbmZsaWN0czogJHtuYW1lfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hbWUuc2xpY2UoLTEpID09PSAnPycpIHtcbiAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCAtMSk7XG5cbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KT9gO1xuICAgICAgICAgIHBhcmFtcy5wdXNoKG5hbWUpO1xuXG4gICAgICAgICAgcGFyYW1zUmVnZXhbbmFtZV0gPSByZWdleDtcbiAgICAgICAgICBwYXJhbXNPcHRpb25hbFtuYW1lXSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGlsZWQgKz0gYCgke3JlZ2V4fSlgO1xuICAgICAgICAgIHBhcmFtcy5wdXNoKG5hbWUpO1xuXG4gICAgICAgICAgcGFyYW1zUmVnZXhbbmFtZV0gPSByZWdleDtcbiAgICAgICAgICBwYXJhbXNPcHRpb25hbFtuYW1lXSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IG5vdFJlZ2V4O1xuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gYCgke25hbWV9KWA7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlYWwgd2l0aCB0YWlsXG4gICAgICBpZiAobGFzdEluZGV4IDwgbm9kZS5wYXRoLmxlbmd0aCkge1xuICAgICAgICBsZXQgbm90UmVnZXggPSBub2RlLnBhdGguc3Vic3RyKFxuICAgICAgICAgIGxhc3RJbmRleCxcbiAgICAgICAgICBub2RlLnBhdGgubGVuZ3RoIC0gbGFzdEluZGV4LFxuICAgICAgICApO1xuICAgICAgICBjb21waWxlZCArPSBfLmVzY2FwZVJlZ0V4cChub3RSZWdleCk7XG5cbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IG5vdFJlZ2V4O1xuICAgICAgfVxuXG4gICAgICBub2RlLl9wYXRoID0gY29tcGlsZWQ7XG4gICAgICBub2RlLl9wYXJhbXMgPSBwYXJhbXM7XG4gICAgfVxuXG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIGlmIChub2RlLm5hbWUgJiYgXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBuYW1lZFJvdXRlc1tub2RlLm5hbWVdID0ge1xuICAgICAgICBwYXRoVGVtcGxhdGUsXG4gICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICBwYXJhbXNPcHRpb25hbCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gYWRkIGltcG9ydENvbXBvbmVudCBhcyBwbGFjZWhvbGRlciwgcHJlcGFyZSBmb3IgaGFja1xuICAgIGlmIChub2RlLmNvbXBvbmVudCkge1xuICAgICAgbm9kZS5pbXBvcnRDb21wb25lbnQgPSBub2RlLmNvbXBvbmVudDtcbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmUgdHJhdmVyc2UgdG8gY2hpbGRyZW5cbiAgICBpZiAoIV8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdHJhdmVyc2Uobiwge1xuICAgICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgICBwYXJhbXNSZWdleCxcbiAgICAgICAgICBwYXJhbXNPcHRpb25hbCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKHJvdXRlVHJlZSwge1xuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcbiAgICBwYXRoVGVtcGxhdGU6ICcnLFxuICAgIHBhcmFtc1JlZ2V4OiB7fSxcbiAgICBwYXJhbXNPcHRpb25hbDoge30sXG4gIH0pO1xuXG4gIC8vIGNvbnZlcnQgdG8gc291cmNlIHNvIHdlIGNhbiBoYWNrIGl0IGFzIHN0cmluZ1xuICBsZXQgcm91dGVTb3VyY2UgPSBKU09OLnN0cmluZ2lmeShyb3V0ZVRyZWUpO1xuXG4gIC8vIGhhY2sgaW1wb3J0Q29tcG9uZW50IHRvIGJlIGEgcmVxdWlyZS5lbnN1cmUgcHJvbWlzZVxuICByb3V0ZVNvdXJjZSA9IHJvdXRlU291cmNlLnJlcGxhY2UoXG4gICAgLyhbXCInXSlpbXBvcnRDb21wb25lbnRcXDFcXHMqPzpcXHMqPyhbXCInXSkoLio/KVxcMi9nLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGBcImltcG9ydENvbXBvbmVudFwiOiAke2ltcG9ydENvbXBvbmVudC5yZXBsYWNlKFxuICAgICAgICAvX19jb21wb25lbnRfXy9nLFxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBgJHtuYW1lfS9ob3QtbG9hZGVyIWAgOiAnJykgK1xuICAgICAgICAgIGFyZ3VtZW50c1szXSxcbiAgICAgICl9YDtcbiAgICB9LFxuICApO1xuXG4gIC8vIGNvbnZlcnQgbmFtZXMgbWFwIHRvIHNvdXJjZVxuICBjb25zdCBuYW1lc01hcCA9IEpTT04uc3RyaW5naWZ5KG5hbWVkUm91dGVzKTtcblxuICByZXR1cm4gW1xuICAgIGBcbiAgICB2YXIgZGF0YSA9ICR7cm91dGVTb3VyY2V9O1xuICAgIHZhciBuYW1lcyA9ICR7bmFtZXNNYXB9O1xuXG4gICAgdmFyIHJvdXRlcyA9IHJlcXVpcmUoJyR7bmFtZX0vcm91dGVzJyk7XG4gICAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm91dGVzKGRhdGEsIG5hbWVzKTtcbiAgICBgLFxuICAgIGlucHV0U291cmNlTWFwLFxuICBdO1xufVxuIl19