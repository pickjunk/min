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
                    regex = '.+?(?=/|$)';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlVHJlZSIsImRlZmF1bHQiLCJpc0FycmF5IiwiY2hpbGRyZW4iLCJuYW1lZFJvdXRlcyIsInRyYXZlcnNlIiwibm9kZSIsImNvbnRleHQiLCJjb21wb25lbnQiLCJpc1N0cmluZyIsIkVycm9yIiwiaXNFbXB0eSIsInBhdGhUZW1wbGF0ZSIsInBhcmFtc1JlZ2V4IiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zT3B0aW9uYWwiLCJwYXRoIiwicmVnZXhNYXRjaCIsImxhc3RJbmRleCIsImNvbXBpbGVkIiwicGFyYW1zIiwibWF0Y2giLCJleGVjIiwibm90UmVnZXgiLCJzdWJzdHIiLCJpbmRleCIsImVzY2FwZVJlZ0V4cCIsInJlZ2V4Iiwic2xpY2UiLCJwdXNoIiwibGVuZ3RoIiwiX3BhdGgiLCJfcGFyYW1zIiwiZm9yRWFjaCIsIm4iLCJyb3V0ZVNvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiYXJndW1lbnRzIiwi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QUFSLENBQVlDLFFBQVosS0FBeUIsYUFBekIsYUFBNEMxRSxJQUE1QyxvQkFBaUUsRUFBbEUsSUFDRTJFLFNBQVMsQ0FBQyxDQUFELENBSGdCLENBQTdCO0FBS0QsYUFSVyxDQUFkLENBMUlGLENBcUpFOztBQUNNQyxZQUFBQSxRQXRKUixHQXNKbUJQLElBQUksQ0FBQ0MsU0FBTCxDQUFlbEMsV0FBZixDQXRKbkI7QUFBQSw4Q0F3SlMsNEJBRVFnQyxXQUZSLGdDQUdTUSxRQUhULDRDQUttQjVFLElBTG5CLDBHQVNMTSxjQVRLLENBeEpUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlRXZhbCA9IHJlcXVpcmUoJ25vZGUtZXZhbCcpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgeyBuYW1lIH0gPSByZXF1aXJlKCcuLi9wYWNrYWdlJyk7XG5jb25zdCBiYWJlbCA9IHJlcXVpcmUoJ0BiYWJlbC9jb3JlJyk7XG5cbmNvbnN0IGltcG9ydENvbXBvbmVudCA9IGBcbmZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGltcG9ydCgnX19jb21wb25lbnRfXycpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICByZXR1cm4gbS5kZWZhdWx0IHx8IG07XG4gIH0pO1xufVxuYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIC8vIE1ha2UgdGhlIGxvYWRlciBhc3luY1xuICAvLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmFzeW5jKCk7XG4gIGxvYWRlclxuICAgIC5jYWxsKHRoaXMsIHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApXG4gICAgLnRoZW4oYXJncyA9PiBjYWxsYmFjayhudWxsLCAuLi5hcmdzKSwgZXJyID0+IGNhbGxiYWNrKGVycikpO1xufTtcblxuLy8gc3VwcG9ydCBlczYgd2l0aCBiYWJlbC1sb2FkZXJcbi8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxuYXN5bmMgZnVuY3Rpb24gYmFiZWxMb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuXG4gIGxldCBvcHRpb25zID0ge1xuICAgIGZpbGVuYW1lLFxuICAgIGlucHV0U291cmNlTWFwOiBpbnB1dFNvdXJjZU1hcCB8fCB1bmRlZmluZWQsXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNvdXJjZW1hcCBiZWhhdmlvciBiYXNlZCBvbiBXZWJwYWNrJ3MgbWFwcGluZyBmbGFnXG4gICAgc291cmNlTWFwczogdGhpcy5zb3VyY2VNYXAsXG4gICAgLy8gRW5zdXJlIHRoYXQgV2VicGFjayB3aWxsIGdldCBhIGZ1bGwgYWJzb2x1dGUgcGF0aCBpbiB0aGUgc291cmNlbWFwXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gcHJvcGVybHkgbWFwIHRoZSBtb2R1bGUgYmFjayB0byBpdHMgaW50ZXJuYWwgY2FjaGVkXG4gICAgLy8gbW9kdWxlcy5cbiAgICBzb3VyY2VGaWxlTmFtZTogZmlsZW5hbWUsXG4gICAgY2FsbGVyOiB7XG4gICAgICBuYW1lOiBgJHtuYW1lfS9sb2FkZXJgLFxuICAgICAgLy8gbm9kZS1ldmFsIGNhbiBvbmx5IGV2YWwgY29tbW9uanMgbW9kdWxlXG4gICAgICBzdXBwb3J0c1N0YXRpY0VTTTogZmFsc2UsXG4gICAgICBzdXBwb3J0c0R5bmFtaWNJbXBvcnQ6IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY29uZmlnID0gYmFiZWwubG9hZFBhcnRpYWxDb25maWcob3B0aW9ucyk7XG4gIG9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5zb3VyY2VNYXBzID09PSAnaW5saW5lJykge1xuICAgIC8vIEJhYmVsIGhhcyB0aGlzIHdlaXJkIGJlaGF2aW9yIHdoZXJlIGlmIHlvdSBzZXQgXCJpbmxpbmVcIiwgd2VcbiAgICAvLyBpbmxpbmUgdGhlIHNvdXJjZW1hcCwgYW5kIHNldCAncmVzdWx0Lm1hcCA9IG51bGwnLiBUaGlzIHJlc3VsdHNcbiAgICAvLyBpbiBiYWQgYmVoYXZpb3IgZnJvbSBCYWJlbCBzaW5jZSB0aGUgbWFwcyBnZXQgcHV0IGludG8gdGhlIGNvZGUsXG4gICAgLy8gd2hpY2ggV2VicGFjayBkb2VzIG5vdCBleHBlY3QsIGFuZCBiZWNhdXNlIHRoZSBtYXAgd2UgcmV0dXJuIHRvXG4gICAgLy8gV2VicGFjayBpcyBudWxsLCB3aGljaCBpcyBhbHNvIGJhZC4gVG8gYXZvaWQgdGhhdCwgd2Ugb3ZlcnJpZGUgdGhlXG4gICAgLy8gYmVoYXZpb3IgaGVyZSBzbyBcImlubGluZVwiIGp1c3QgYmVoYXZlcyBsaWtlICd0cnVlJy5cbiAgICBvcHRpb25zLnNvdXJjZU1hcHMgPSB0cnVlO1xuICB9XG5cbiAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGF3YWl0IGJhYmVsLnRyYW5zZm9ybUFzeW5jKHNvdXJjZSwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcuYmFiZWxyYyA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLmFkZERlcGVuZGVuY3koY29uZmlnLmJhYmVscmMpO1xuICB9XG5cbiAgcmV0dXJuIFtjb2RlLCBtYXAgfHwgdW5kZWZpbmVkXTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLnJlc291cmNlUGF0aDtcblxuICBbc291cmNlLCBpbnB1dFNvdXJjZU1hcF0gPSBhd2FpdCBiYWJlbExvYWRlci5jYWxsKFxuICAgIHRoaXMsXG4gICAgc291cmNlLFxuICAgIGlucHV0U291cmNlTWFwLFxuICApO1xuXG4gIC8vIGV2YWwgcm91dGVzLmpzIHNvIHdlIGNhbiB0cmF2ZXJzZSByb3V0ZVRyZWVcbiAgbGV0IHJvdXRlVHJlZSA9IG5vZGVFdmFsKHNvdXJjZSwgZmlsZW5hbWUpO1xuICByb3V0ZVRyZWUgPSByb3V0ZVRyZWUuZGVmYXVsdCB8fCByb3V0ZVRyZWU7XG5cbiAgaWYgKF8uaXNBcnJheShyb3V0ZVRyZWUpKSB7XG4gICAgcm91dGVUcmVlID0ge1xuICAgICAgY2hpbGRyZW46IHJvdXRlVHJlZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICBsZXQgbmFtZWRSb3V0ZXMgPSB7fTtcblxuICAoZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSwgY29udGV4dCkge1xuICAgIGlmIChub2RlLmNvbXBvbmVudCAmJiAhXy5pc1N0cmluZyhub2RlLmNvbXBvbmVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29tcG9uZW50IG11c3QgYmUgc3RyaW5nOiAke25vZGUuY29tcG9uZW50fWApO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5hbWUgJiYgIV8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbmFtZWQgcm91dGUgaXMgYSBsZWFmIHRoYXQgY2FuIG5vdCBoYXMgY2hpbGRyZW46ICR7bm9kZS5uYW1lfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IGNvbnRleHQgdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0c1xuICAgIC8vIGFmZmVjdCBlYWNoIG90aGVyXG4gICAgbGV0IHBhdGhUZW1wbGF0ZSA9IGNvbnRleHQucGF0aFRlbXBsYXRlO1xuICAgIGxldCBwYXJhbXNSZWdleCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQucGFyYW1zUmVnZXgpO1xuICAgIGxldCBwYXJhbXNPcHRpb25hbCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQucGFyYW1zT3B0aW9uYWwpO1xuXG4gICAgLy8gY29tcGlsZSBwYXRoIHRvIHN1cHBvcnQgcmVnZXggYW5kIHBhcmFtc1xuICAgIGlmIChub2RlLnBhdGgpIHtcbiAgICAgIC8vIHR3byB3YXlzIHRvIGRlY2xhcmUgcm91dGUgYXJnOlxuICAgICAgLy8gMS4gKG5hbWU6cmVnZXgpIG9yIChuYW1lPzpyZWdleClcbiAgICAgIC8vIDIuIDpuYW1lXG4gICAgICBsZXQgcmVnZXhNYXRjaCA9IC9cXCgoW2EtekEtWl9dW2EtekEtWl8wLTldKlxcPz8pXFw6KC4qPylcXCl8XFw6KFthLXpBLVpfXVthLXpBLVpfMC05XSopL2c7XG4gICAgICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgICAgIGxldCBjb21waWxlZCA9ICcnO1xuICAgICAgbGV0IHBhcmFtcyA9IFtdO1xuXG4gICAgICBsZXQgbWF0Y2ggPSBudWxsO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4TWF0Y2guZXhlYyhub2RlLnBhdGgpKSkge1xuICAgICAgICBsZXQgbm90UmVnZXggPSBub2RlLnBhdGguc3Vic3RyKGxhc3RJbmRleCwgbWF0Y2guaW5kZXggLSBsYXN0SW5kZXgpO1xuICAgICAgICBsYXN0SW5kZXggPSByZWdleE1hdGNoLmxhc3RJbmRleDtcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xuXG4gICAgICAgIGxldCBuYW1lID0gbWF0Y2hbMV07XG4gICAgICAgIGxldCByZWdleCA9IG1hdGNoWzJdO1xuXG4gICAgICAgIC8vIDpuYW1lIGltcGxpY2l0bHkgZW5kcyB3aXRoICcvJyBvciB0aGUgZW5kIG9mIHN0cmluZ1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gbWF0Y2hbM107XG4gICAgICAgICAgcmVnZXggPSAnLis/KD89L3wkKSc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zUmVnZXhbbmFtZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBhcmFtIG5hbWUgY29uZmxpY3RzOiAke25hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICc/Jykge1xuICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pP2A7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KWA7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBgKCR7bmFtZX0pYDtcbiAgICAgIH1cblxuICAgICAgLy8gZGVhbCB3aXRoIHRhaWxcbiAgICAgIGlmIChsYXN0SW5kZXggPCBub2RlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIoXG4gICAgICAgICAgbGFzdEluZGV4LFxuICAgICAgICAgIG5vZGUucGF0aC5sZW5ndGggLSBsYXN0SW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX3BhdGggPSBjb21waWxlZDtcbiAgICAgIG5vZGUuX3BhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gICAgaWYgKG5vZGUubmFtZSAmJiBfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIG5hbWVkUm91dGVzW25vZGUubmFtZV0gPSB7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgcGFyYW1zUmVnZXgsXG4gICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaW1wb3J0Q29tcG9uZW50IGFzIHBsYWNlaG9sZGVyLCBwcmVwYXJlIGZvciBoYWNrXG4gICAgaWYgKG5vZGUuY29tcG9uZW50KSB7XG4gICAgICBub2RlLmltcG9ydENvbXBvbmVudCA9IG5vZGUuY29tcG9uZW50O1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSB0cmF2ZXJzZSB0byBjaGlsZHJlblxuICAgIGlmICghXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24obikge1xuICAgICAgICB0cmF2ZXJzZShuLCB7XG4gICAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkocm91dGVUcmVlLCB7XG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIHBhdGhUZW1wbGF0ZTogJycsXG4gICAgcGFyYW1zUmVnZXg6IHt9LFxuICAgIHBhcmFtc09wdGlvbmFsOiB7fSxcbiAgfSk7XG5cbiAgLy8gY29udmVydCB0byBzb3VyY2Ugc28gd2UgY2FuIGhhY2sgaXQgYXMgc3RyaW5nXG4gIGxldCByb3V0ZVNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHJvdXRlVHJlZSk7XG5cbiAgLy8gaGFjayBpbXBvcnRDb21wb25lbnQgdG8gYmUgYSByZXF1aXJlLmVuc3VyZSBwcm9taXNlXG4gIHJvdXRlU291cmNlID0gcm91dGVTb3VyY2UucmVwbGFjZShcbiAgICAvKFtcIiddKWltcG9ydENvbXBvbmVudFxcMVxccyo/Olxccyo/KFtcIiddKSguKj8pXFwyL2csXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYFwiaW1wb3J0Q29tcG9uZW50XCI6ICR7aW1wb3J0Q29tcG9uZW50LnJlcGxhY2UoXG4gICAgICAgIC9fX2NvbXBvbmVudF9fL2csXG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IGAke25hbWV9L2hvdC1sb2FkZXIhYCA6ICcnKSArXG4gICAgICAgICAgYXJndW1lbnRzWzNdLFxuICAgICAgKX1gO1xuICAgIH0sXG4gICk7XG5cbiAgLy8gY29udmVydCBuYW1lcyBtYXAgdG8gc291cmNlXG4gIGNvbnN0IG5hbWVzTWFwID0gSlNPTi5zdHJpbmdpZnkobmFtZWRSb3V0ZXMpO1xuXG4gIHJldHVybiBbXG4gICAgYFxuICAgIHZhciBkYXRhID0gJHtyb3V0ZVNvdXJjZX07XG4gICAgdmFyIG5hbWVzID0gJHtuYW1lc01hcH07XG5cbiAgICB2YXIgcm91dGVzID0gcmVxdWlyZSgnJHtuYW1lfS9yb3V0ZXMnKTtcbiAgICByb3V0ZXMgPSByb3V0ZXMuZGVmYXVsdCB8fCByb3V0ZXM7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByb3V0ZXMoZGF0YSwgbmFtZXMpO1xuICAgIGAsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gIF07XG59XG4iXX0=