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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlVHJlZSIsImRlZmF1bHQiLCJpc0FycmF5IiwiY2hpbGRyZW4iLCJuYW1lZFJvdXRlcyIsInRyYXZlcnNlIiwibm9kZSIsImNvbnRleHQiLCJjb21wb25lbnQiLCJpc1N0cmluZyIsIkVycm9yIiwiaXNFbXB0eSIsInBhdGhUZW1wbGF0ZSIsInBhcmFtc1JlZ2V4IiwiT2JqZWN0IiwiYXNzaWduIiwicGFyYW1zT3B0aW9uYWwiLCJwYXRoIiwicmVnZXhNYXRjaCIsImxhc3RJbmRleCIsImNvbXBpbGVkIiwicGFyYW1zIiwibWF0Y2giLCJleGVjIiwibm90UmVnZXgiLCJzdWJzdHIiLCJpbmRleCIsImVzY2FwZVJlZ0V4cCIsInJlZ2V4Iiwic2xpY2UiLCJwdXNoIiwibGVuZ3RoIiwiX3BhdGgiLCJfcGFyYW1zIiwiZm9yRWFjaCIsIm4iLCJyb3V0ZVNvdXJjZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiYXJndW1lbnRzIiwi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QUFSLENBQVlDLFFBQVosS0FBeUIsYUFBekIsYUFBNEMxRSxJQUE1QyxvQkFBaUUsRUFBbEUsSUFDRTJFLFNBQVMsQ0FBQyxDQUFELENBSGdCLENBQTdCO0FBS0QsYUFSVyxDQUFkLENBMUlGLENBcUpFOztBQUNNQyxZQUFBQSxRQXRKUixHQXNKbUJQLElBQUksQ0FBQ0MsU0FBTCxDQUFlbEMsV0FBZixDQXRKbkI7QUFBQSw4Q0F3SlMsNEJBRVFnQyxXQUZSLGdDQUdTUSxRQUhULDRDQUttQjVFLElBTG5CLDBHQVNMTSxjQVRLLENBeEpUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlRXZhbCA9IHJlcXVpcmUoJ25vZGUtZXZhbCcpO1xyXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcbmNvbnN0IHsgbmFtZSB9ID0gcmVxdWlyZSgnLi4vcGFja2FnZScpO1xyXG5jb25zdCBiYWJlbCA9IHJlcXVpcmUoJ0BiYWJlbC9jb3JlJyk7XHJcblxyXG5jb25zdCBpbXBvcnRDb21wb25lbnQgPSBgXHJcbmZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gaW1wb3J0KCdfX2NvbXBvbmVudF9fJykudGhlbihmdW5jdGlvbiAobSkge1xyXG4gICAgcmV0dXJuIG0uZGVmYXVsdCB8fCBtO1xyXG4gIH0pO1xyXG59XHJcbmA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcclxuICAvLyBNYWtlIHRoZSBsb2FkZXIgYXN5bmNcclxuICAvLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcclxuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuYXN5bmMoKTtcclxuICBsb2FkZXJcclxuICAgIC5jYWxsKHRoaXMsIHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApXHJcbiAgICAudGhlbihhcmdzID0+IGNhbGxiYWNrKG51bGwsIC4uLmFyZ3MpLCBlcnIgPT4gY2FsbGJhY2soZXJyKSk7XHJcbn07XHJcblxyXG4vLyBzdXBwb3J0IGVzNiB3aXRoIGJhYmVsLWxvYWRlclxyXG4vLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcclxuYXN5bmMgZnVuY3Rpb24gYmFiZWxMb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5yZXNvdXJjZVBhdGg7XHJcblxyXG4gIGxldCBvcHRpb25zID0ge1xyXG4gICAgZmlsZW5hbWUsXHJcbiAgICBpbnB1dFNvdXJjZU1hcDogaW5wdXRTb3VyY2VNYXAgfHwgdW5kZWZpbmVkLFxyXG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNvdXJjZW1hcCBiZWhhdmlvciBiYXNlZCBvbiBXZWJwYWNrJ3MgbWFwcGluZyBmbGFnXHJcbiAgICBzb3VyY2VNYXBzOiB0aGlzLnNvdXJjZU1hcCxcclxuICAgIC8vIEVuc3VyZSB0aGF0IFdlYnBhY2sgd2lsbCBnZXQgYSBmdWxsIGFic29sdXRlIHBhdGggaW4gdGhlIHNvdXJjZW1hcFxyXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gcHJvcGVybHkgbWFwIHRoZSBtb2R1bGUgYmFjayB0byBpdHMgaW50ZXJuYWwgY2FjaGVkXHJcbiAgICAvLyBtb2R1bGVzLlxyXG4gICAgc291cmNlRmlsZU5hbWU6IGZpbGVuYW1lLFxyXG4gICAgY2FsbGVyOiB7XHJcbiAgICAgIG5hbWU6IGAke25hbWV9L2xvYWRlcmAsXHJcbiAgICAgIC8vIG5vZGUtZXZhbCBjYW4gb25seSBldmFsIGNvbW1vbmpzIG1vZHVsZVxyXG4gICAgICBzdXBwb3J0c1N0YXRpY0VTTTogZmFsc2UsXHJcbiAgICAgIHN1cHBvcnRzRHluYW1pY0ltcG9ydDogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IGJhYmVsLmxvYWRQYXJ0aWFsQ29uZmlnKG9wdGlvbnMpO1xyXG4gIG9wdGlvbnMgPSBjb25maWcub3B0aW9ucztcclxuXHJcbiAgaWYgKG9wdGlvbnMuc291cmNlTWFwcyA9PT0gJ2lubGluZScpIHtcclxuICAgIC8vIEJhYmVsIGhhcyB0aGlzIHdlaXJkIGJlaGF2aW9yIHdoZXJlIGlmIHlvdSBzZXQgXCJpbmxpbmVcIiwgd2VcclxuICAgIC8vIGlubGluZSB0aGUgc291cmNlbWFwLCBhbmQgc2V0ICdyZXN1bHQubWFwID0gbnVsbCcuIFRoaXMgcmVzdWx0c1xyXG4gICAgLy8gaW4gYmFkIGJlaGF2aW9yIGZyb20gQmFiZWwgc2luY2UgdGhlIG1hcHMgZ2V0IHB1dCBpbnRvIHRoZSBjb2RlLFxyXG4gICAgLy8gd2hpY2ggV2VicGFjayBkb2VzIG5vdCBleHBlY3QsIGFuZCBiZWNhdXNlIHRoZSBtYXAgd2UgcmV0dXJuIHRvXHJcbiAgICAvLyBXZWJwYWNrIGlzIG51bGwsIHdoaWNoIGlzIGFsc28gYmFkLiBUbyBhdm9pZCB0aGF0LCB3ZSBvdmVycmlkZSB0aGVcclxuICAgIC8vIGJlaGF2aW9yIGhlcmUgc28gXCJpbmxpbmVcIiBqdXN0IGJlaGF2ZXMgbGlrZSAndHJ1ZScuXHJcbiAgICBvcHRpb25zLnNvdXJjZU1hcHMgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGF3YWl0IGJhYmVsLnRyYW5zZm9ybUFzeW5jKHNvdXJjZSwgb3B0aW9ucyk7XHJcblxyXG4gIGlmICh0eXBlb2YgY29uZmlnLmJhYmVscmMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB0aGlzLmFkZERlcGVuZGVuY3koY29uZmlnLmJhYmVscmMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtjb2RlLCBtYXAgfHwgdW5kZWZpbmVkXTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcclxuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xyXG5cclxuICBbc291cmNlLCBpbnB1dFNvdXJjZU1hcF0gPSBhd2FpdCBiYWJlbExvYWRlci5jYWxsKFxyXG4gICAgdGhpcyxcclxuICAgIHNvdXJjZSxcclxuICAgIGlucHV0U291cmNlTWFwLFxyXG4gICk7XHJcblxyXG4gIC8vIGV2YWwgcm91dGVzLmpzIHNvIHdlIGNhbiB0cmF2ZXJzZSByb3V0ZVRyZWVcclxuICBsZXQgcm91dGVUcmVlID0gbm9kZUV2YWwoc291cmNlLCBmaWxlbmFtZSk7XHJcbiAgcm91dGVUcmVlID0gcm91dGVUcmVlLmRlZmF1bHQgfHwgcm91dGVUcmVlO1xyXG5cclxuICBpZiAoXy5pc0FycmF5KHJvdXRlVHJlZSkpIHtcclxuICAgIHJvdXRlVHJlZSA9IHtcclxuICAgICAgY2hpbGRyZW46IHJvdXRlVHJlZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBmb3IgbmFtZWQgcm91dGVzXHJcbiAgbGV0IG5hbWVkUm91dGVzID0ge307XHJcblxyXG4gIChmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBjb250ZXh0KSB7XHJcbiAgICBpZiAobm9kZS5jb21wb25lbnQgJiYgIV8uaXNTdHJpbmcobm9kZS5jb21wb25lbnQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY29tcG9uZW50IG11c3QgYmUgc3RyaW5nOiAke25vZGUuY29tcG9uZW50fWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlLm5hbWUgJiYgIV8uaXNFbXB0eShub2RlLmNoaWxkcmVuKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYG5hbWVkIHJvdXRlIGlzIGEgbGVhZiB0aGF0IGNhbiBub3QgaGFzIGNoaWxkcmVuOiAke25vZGUubmFtZX1gLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBjdXJyZW50IGNvbnRleHQgdG8gYXZvaWQgY2hpbGRyZW4ncyBjb250ZXh0c1xyXG4gICAgLy8gYWZmZWN0IGVhY2ggb3RoZXJcclxuICAgIGxldCBwYXRoVGVtcGxhdGUgPSBjb250ZXh0LnBhdGhUZW1wbGF0ZTtcclxuICAgIGxldCBwYXJhbXNSZWdleCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRleHQucGFyYW1zUmVnZXgpO1xyXG4gICAgbGV0IHBhcmFtc09wdGlvbmFsID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNPcHRpb25hbCk7XHJcblxyXG4gICAgLy8gY29tcGlsZSBwYXRoIHRvIHN1cHBvcnQgcmVnZXggYW5kIHBhcmFtc1xyXG4gICAgaWYgKG5vZGUucGF0aCkge1xyXG4gICAgICAvLyB0d28gd2F5cyB0byBkZWNsYXJlIHJvdXRlIGFyZzpcclxuICAgICAgLy8gMS4gKG5hbWU6cmVnZXgpIG9yIChuYW1lPzpyZWdleClcclxuICAgICAgLy8gMi4gOm5hbWVcclxuICAgICAgbGV0IHJlZ2V4TWF0Y2ggPSAvXFwoKFthLXpBLVpfXVthLXpBLVpfMC05XSpcXD8/KVxcOiguKj8pXFwpfFxcOihbYS16QS1aX11bYS16QS1aXzAtOV0qKS9nO1xyXG4gICAgICBsZXQgbGFzdEluZGV4ID0gMDtcclxuICAgICAgbGV0IGNvbXBpbGVkID0gJyc7XHJcbiAgICAgIGxldCBwYXJhbXMgPSBbXTtcclxuXHJcbiAgICAgIGxldCBtYXRjaCA9IG51bGw7XHJcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWdleE1hdGNoLmV4ZWMobm9kZS5wYXRoKSkpIHtcclxuICAgICAgICBsZXQgbm90UmVnZXggPSBub2RlLnBhdGguc3Vic3RyKGxhc3RJbmRleCwgbWF0Y2guaW5kZXggLSBsYXN0SW5kZXgpO1xyXG4gICAgICAgIGxhc3RJbmRleCA9IHJlZ2V4TWF0Y2gubGFzdEluZGV4O1xyXG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcclxuXHJcbiAgICAgICAgbGV0IG5hbWUgPSBtYXRjaFsxXTtcclxuICAgICAgICBsZXQgcmVnZXggPSBtYXRjaFsyXTtcclxuXHJcbiAgICAgICAgLy8gOm5hbWUgaW1wbGljaXRseSBlbmRzIHdpdGggJy8nIG9yIHRoZSBlbmQgb2Ygc3RyaW5nXHJcbiAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICBuYW1lID0gbWF0Y2hbM107XHJcbiAgICAgICAgICByZWdleCA9ICcuKz8oPz0vfCQpJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXNSZWdleFtuYW1lXSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwYXJhbSBuYW1lIGNvbmZsaWN0czogJHtuYW1lfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5hbWUuc2xpY2UoLTEpID09PSAnPycpIHtcclxuICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0xKTtcclxuXHJcbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KT9gO1xyXG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XHJcblxyXG4gICAgICAgICAgcGFyYW1zUmVnZXhbbmFtZV0gPSByZWdleDtcclxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29tcGlsZWQgKz0gYCgke3JlZ2V4fSlgO1xyXG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XHJcblxyXG4gICAgICAgICAgcGFyYW1zUmVnZXhbbmFtZV0gPSByZWdleDtcclxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XHJcbiAgICAgICAgcGF0aFRlbXBsYXRlICs9IGAoJHtuYW1lfSlgO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkZWFsIHdpdGggdGFpbFxyXG4gICAgICBpZiAobGFzdEluZGV4IDwgbm9kZS5wYXRoLmxlbmd0aCkge1xyXG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIoXHJcbiAgICAgICAgICBsYXN0SW5kZXgsXHJcbiAgICAgICAgICBub2RlLnBhdGgubGVuZ3RoIC0gbGFzdEluZGV4LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29tcGlsZWQgKz0gXy5lc2NhcGVSZWdFeHAobm90UmVnZXgpO1xyXG5cclxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5vZGUuX3BhdGggPSBjb21waWxlZDtcclxuICAgICAgbm9kZS5fcGFyYW1zID0gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcclxuICAgIGlmIChub2RlLm5hbWUgJiYgXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XHJcbiAgICAgIG5hbWVkUm91dGVzW25vZGUubmFtZV0gPSB7XHJcbiAgICAgICAgcGF0aFRlbXBsYXRlLFxyXG4gICAgICAgIHBhcmFtc1JlZ2V4LFxyXG4gICAgICAgIHBhcmFtc09wdGlvbmFsLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZCBpbXBvcnRDb21wb25lbnQgYXMgcGxhY2Vob2xkZXIsIHByZXBhcmUgZm9yIGhhY2tcclxuICAgIGlmIChub2RlLmNvbXBvbmVudCkge1xyXG4gICAgICBub2RlLmltcG9ydENvbXBvbmVudCA9IG5vZGUuY29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlY3Vyc2l2ZSB0cmF2ZXJzZSB0byBjaGlsZHJlblxyXG4gICAgaWYgKCFfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcclxuICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIGZ1bmN0aW9uKG4pIHtcclxuICAgICAgICB0cmF2ZXJzZShuLCB7XHJcbiAgICAgICAgICBwYXRoVGVtcGxhdGUsXHJcbiAgICAgICAgICBwYXJhbXNSZWdleCxcclxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KShyb3V0ZVRyZWUsIHtcclxuICAgIC8vIGZvciBuYW1lZCByb3V0ZXNcclxuICAgIHBhdGhUZW1wbGF0ZTogJycsXHJcbiAgICBwYXJhbXNSZWdleDoge30sXHJcbiAgICBwYXJhbXNPcHRpb25hbDoge30sXHJcbiAgfSk7XHJcblxyXG4gIC8vIGNvbnZlcnQgdG8gc291cmNlIHNvIHdlIGNhbiBoYWNrIGl0IGFzIHN0cmluZ1xyXG4gIGxldCByb3V0ZVNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHJvdXRlVHJlZSk7XHJcblxyXG4gIC8vIGhhY2sgaW1wb3J0Q29tcG9uZW50IHRvIGJlIGEgcmVxdWlyZS5lbnN1cmUgcHJvbWlzZVxyXG4gIHJvdXRlU291cmNlID0gcm91dGVTb3VyY2UucmVwbGFjZShcclxuICAgIC8oW1wiJ10paW1wb3J0Q29tcG9uZW50XFwxXFxzKj86XFxzKj8oW1wiJ10pKC4qPylcXDIvZyxcclxuICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gYFwiaW1wb3J0Q29tcG9uZW50XCI6ICR7aW1wb3J0Q29tcG9uZW50LnJlcGxhY2UoXHJcbiAgICAgICAgL19fY29tcG9uZW50X18vZyxcclxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBgJHtuYW1lfS9ob3QtbG9hZGVyIWAgOiAnJykgK1xyXG4gICAgICAgICAgYXJndW1lbnRzWzNdLFxyXG4gICAgICApfWA7XHJcbiAgICB9LFxyXG4gICk7XHJcblxyXG4gIC8vIGNvbnZlcnQgbmFtZXMgbWFwIHRvIHNvdXJjZVxyXG4gIGNvbnN0IG5hbWVzTWFwID0gSlNPTi5zdHJpbmdpZnkobmFtZWRSb3V0ZXMpO1xyXG5cclxuICByZXR1cm4gW1xyXG4gICAgYFxyXG4gICAgdmFyIGRhdGEgPSAke3JvdXRlU291cmNlfTtcclxuICAgIHZhciBuYW1lcyA9ICR7bmFtZXNNYXB9O1xyXG5cclxuICAgIHZhciByb3V0ZXMgPSByZXF1aXJlKCcke25hbWV9L3JvdXRlcycpO1xyXG4gICAgcm91dGVzID0gcm91dGVzLmRlZmF1bHQgfHwgcm91dGVzO1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByb3V0ZXMoZGF0YSwgbmFtZXMpO1xyXG4gICAgYCxcclxuICAgIGlucHV0U291cmNlTWFwLFxyXG4gIF07XHJcbn1cclxuIl19