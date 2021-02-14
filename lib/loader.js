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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2FkZXIuanMiXSwibmFtZXMiOlsibm9kZUV2YWwiLCJyZXF1aXJlIiwiXyIsIm5hbWUiLCJiYWJlbCIsImltcG9ydENvbXBvbmVudCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzb3VyY2UiLCJpbnB1dFNvdXJjZU1hcCIsImNhbGxiYWNrIiwiYXN5bmMiLCJsb2FkZXIiLCJjYWxsIiwidGhlbiIsImFyZ3MiLCJlcnIiLCJiYWJlbExvYWRlciIsImZpbGVuYW1lIiwicmVzb3VyY2VQYXRoIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInNvdXJjZU1hcHMiLCJzb3VyY2VNYXAiLCJzb3VyY2VGaWxlTmFtZSIsImNhbGxlciIsInN1cHBvcnRzU3RhdGljRVNNIiwic3VwcG9ydHNEeW5hbWljSW1wb3J0IiwiY29uZmlnIiwibG9hZFBhcnRpYWxDb25maWciLCJ0cmFuc2Zvcm1Bc3luYyIsImNvZGUiLCJtYXAiLCJiYWJlbHJjIiwiYWRkRGVwZW5kZW5jeSIsInJvdXRlVHJlZSIsImlzQXJyYXkiLCJjaGlsZHJlbiIsIm5hbWVkUm91dGVzIiwidHJhdmVyc2UiLCJub2RlIiwiY29udGV4dCIsImNvbXBvbmVudCIsImlzU3RyaW5nIiwiRXJyb3IiLCJpc0VtcHR5IiwicGF0aFRlbXBsYXRlIiwicGFyYW1zUmVnZXgiLCJPYmplY3QiLCJhc3NpZ24iLCJwYXJhbXNPcHRpb25hbCIsInBhdGgiLCJyZWdleE1hdGNoIiwibGFzdEluZGV4IiwiY29tcGlsZWQiLCJwYXJhbXMiLCJtYXRjaCIsImV4ZWMiLCJub3RSZWdleCIsInN1YnN0ciIsImluZGV4IiwiZXNjYXBlUmVnRXhwIiwicmVnZXgiLCJzbGljZSIsInB1c2giLCJsZW5ndGgiLCJfcGF0aCIsIl9wYXJhbXMiLCJmb3JFYWNoIiwibiIsInJvdXRlU291cmNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcGxhY2UiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJhcmd1bWVudHMiLCJuYW1lc01hcCJd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QXlCLGFBQXpCLGFBQTRDekUsSUFBNUMsb0JBQWlFLEVBQWxFLElBQ0UwRSxTQUFTLENBQUMsQ0FBRCxDQUhnQixDQUE3QjtBQUtELGFBUlcsQ0FBZCxDQTFJRixDQXFKRTs7QUFDTUMsWUFBQUEsUUF0SlIsR0FzSm1CUCxJQUFJLENBQUNDLFNBQUwsQ0FBZWxDLFdBQWYsQ0F0Sm5CO0FBQUEsOENBd0pTLDRCQUVRZ0MsV0FGUixnQ0FHU1EsUUFIVCw0Q0FLbUIzRSxJQUxuQiwwR0FTTE0sY0FUSyxDQXhKVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgbm9kZUV2YWwgPSByZXF1aXJlKCdub2RlLWV2YWwnKTtcbmNvbnN0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmNvbnN0IHsgbmFtZSB9ID0gcmVxdWlyZSgnLi4vcGFja2FnZScpO1xuY29uc3QgYmFiZWwgPSByZXF1aXJlKCdAYmFiZWwvY29yZScpO1xuXG5jb25zdCBpbXBvcnRDb21wb25lbnQgPSBgXG5mdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbXBvcnQoJ19fY29tcG9uZW50X18nKS50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgcmV0dXJuIG0uZGVmYXVsdCB8fCBtO1xuICB9KTtcbn1cbmA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICAvLyBNYWtlIHRoZSBsb2FkZXIgYXN5bmNcbiAgLy8gZm9yayBmcm9tIGJhYmVsLWxvYWRlckA4XG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5hc3luYygpO1xuICBsb2FkZXIuY2FsbCh0aGlzLCBzb3VyY2UsIGlucHV0U291cmNlTWFwKS50aGVuKFxuICAgIGFyZ3MgPT4gY2FsbGJhY2sobnVsbCwgLi4uYXJncyksXG4gICAgZXJyID0+IGNhbGxiYWNrKGVyciksXG4gICk7XG59O1xuXG4vLyBzdXBwb3J0IGVzNiB3aXRoIGJhYmVsLWxvYWRlclxuLy8gZm9yayBmcm9tIGJhYmVsLWxvYWRlckA4XG5hc3luYyBmdW5jdGlvbiBiYWJlbExvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIGNvbnN0IGZpbGVuYW1lID0gdGhpcy5yZXNvdXJjZVBhdGg7XG5cbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgZmlsZW5hbWUsXG4gICAgaW5wdXRTb3VyY2VNYXA6IGlucHV0U291cmNlTWFwIHx8IHVuZGVmaW5lZCxcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc291cmNlbWFwIGJlaGF2aW9yIGJhc2VkIG9uIFdlYnBhY2sncyBtYXBwaW5nIGZsYWdcbiAgICBzb3VyY2VNYXBzOiB0aGlzLnNvdXJjZU1hcCxcbiAgICAvLyBFbnN1cmUgdGhhdCBXZWJwYWNrIHdpbGwgZ2V0IGEgZnVsbCBhYnNvbHV0ZSBwYXRoIGluIHRoZSBzb3VyY2VtYXBcbiAgICAvLyBzbyB0aGF0IGl0IGNhbiBwcm9wZXJseSBtYXAgdGhlIG1vZHVsZSBiYWNrIHRvIGl0cyBpbnRlcm5hbCBjYWNoZWRcbiAgICAvLyBtb2R1bGVzLlxuICAgIHNvdXJjZUZpbGVOYW1lOiBmaWxlbmFtZSxcbiAgICBjYWxsZXI6IHtcbiAgICAgIG5hbWU6IGAke25hbWV9L2xvYWRlcmAsXG4gICAgICAvLyBub2RlLWV2YWwgY2FuIG9ubHkgZXZhbCBjb21tb25qcyBtb2R1bGVcbiAgICAgIHN1cHBvcnRzU3RhdGljRVNNOiBmYWxzZSxcbiAgICAgIHN1cHBvcnRzRHluYW1pY0ltcG9ydDogZmFsc2UsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBjb25maWcgPSBiYWJlbC5sb2FkUGFydGlhbENvbmZpZyhvcHRpb25zKTtcbiAgb3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zLnNvdXJjZU1hcHMgPT09ICdpbmxpbmUnKSB7XG4gICAgLy8gQmFiZWwgaGFzIHRoaXMgd2VpcmQgYmVoYXZpb3Igd2hlcmUgaWYgeW91IHNldCBcImlubGluZVwiLCB3ZVxuICAgIC8vIGlubGluZSB0aGUgc291cmNlbWFwLCBhbmQgc2V0ICdyZXN1bHQubWFwID0gbnVsbCcuIFRoaXMgcmVzdWx0c1xuICAgIC8vIGluIGJhZCBiZWhhdmlvciBmcm9tIEJhYmVsIHNpbmNlIHRoZSBtYXBzIGdldCBwdXQgaW50byB0aGUgY29kZSxcbiAgICAvLyB3aGljaCBXZWJwYWNrIGRvZXMgbm90IGV4cGVjdCwgYW5kIGJlY2F1c2UgdGhlIG1hcCB3ZSByZXR1cm4gdG9cbiAgICAvLyBXZWJwYWNrIGlzIG51bGwsIHdoaWNoIGlzIGFsc28gYmFkLiBUbyBhdm9pZCB0aGF0LCB3ZSBvdmVycmlkZSB0aGVcbiAgICAvLyBiZWhhdmlvciBoZXJlIHNvIFwiaW5saW5lXCIganVzdCBiZWhhdmVzIGxpa2UgJ3RydWUnLlxuICAgIG9wdGlvbnMuc291cmNlTWFwcyA9IHRydWU7XG4gIH1cblxuICBjb25zdCB7IGNvZGUsIG1hcCB9ID0gYXdhaXQgYmFiZWwudHJhbnNmb3JtQXN5bmMoc291cmNlLCBvcHRpb25zKTtcblxuICBpZiAodHlwZW9mIGNvbmZpZy5iYWJlbHJjID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuYWRkRGVwZW5kZW5jeShjb25maWcuYmFiZWxyYyk7XG4gIH1cblxuICByZXR1cm4gW2NvZGUsIG1hcCB8fCB1bmRlZmluZWRdO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkZXIoc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICBjb25zdCBmaWxlbmFtZSA9IHRoaXMucmVzb3VyY2VQYXRoO1xuXG4gIFtzb3VyY2UsIGlucHV0U291cmNlTWFwXSA9IGF3YWl0IGJhYmVsTG9hZGVyLmNhbGwoXG4gICAgdGhpcyxcbiAgICBzb3VyY2UsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gICk7XG5cbiAgLy8gZXZhbCByb3V0ZXMuanMgc28gd2UgY2FuIHRyYXZlcnNlIHJvdXRlVHJlZVxuICBsZXQgcm91dGVUcmVlID0gbm9kZUV2YWwoc291cmNlLCBmaWxlbmFtZSk7XG4gIHJvdXRlVHJlZSA9IHJvdXRlVHJlZS5kZWZhdWx0IHx8IHJvdXRlVHJlZTtcblxuICBpZiAoXy5pc0FycmF5KHJvdXRlVHJlZSkpIHtcbiAgICByb3V0ZVRyZWUgPSB7XG4gICAgICBjaGlsZHJlbjogcm91dGVUcmVlLFxuICAgIH07XG4gIH1cblxuICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gIGxldCBuYW1lZFJvdXRlcyA9IHt9O1xuXG4gIChmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBjb250ZXh0KSB7XG4gICAgaWYgKG5vZGUuY29tcG9uZW50ICYmICFfLmlzU3RyaW5nKG5vZGUuY29tcG9uZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb21wb25lbnQgbXVzdCBiZSBzdHJpbmc6ICR7bm9kZS5jb21wb25lbnR9YCk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmFtZSAmJiAhXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBuYW1lZCByb3V0ZSBpcyBhIGxlYWYgdGhhdCBjYW4gbm90IGhhcyBjaGlsZHJlbjogJHtub2RlLm5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGN1cnJlbnQgY29udGV4dCB0byBhdm9pZCBjaGlsZHJlbidzIGNvbnRleHRzXG4gICAgLy8gYWZmZWN0IGVhY2ggb3RoZXJcbiAgICBsZXQgcGF0aFRlbXBsYXRlID0gY29udGV4dC5wYXRoVGVtcGxhdGU7XG4gICAgbGV0IHBhcmFtc1JlZ2V4ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNSZWdleCk7XG4gICAgbGV0IHBhcmFtc09wdGlvbmFsID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGV4dC5wYXJhbXNPcHRpb25hbCk7XG5cbiAgICAvLyBjb21waWxlIHBhdGggdG8gc3VwcG9ydCByZWdleCBhbmQgcGFyYW1zXG4gICAgaWYgKG5vZGUucGF0aCkge1xuICAgICAgLy8gdHdvIHdheXMgdG8gZGVjbGFyZSByb3V0ZSBhcmc6XG4gICAgICAvLyAxLiAobmFtZTpyZWdleCkgb3IgKG5hbWU/OnJlZ2V4KVxuICAgICAgLy8gMi4gOm5hbWVcbiAgICAgIGxldCByZWdleE1hdGNoID0gL1xcKChbYS16QS1aX11bYS16QS1aXzAtOV0qXFw/PylcXDooLio/KVxcKXxcXDooW2EtekEtWl9dW2EtekEtWl8wLTldKikvZztcbiAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgbGV0IGNvbXBpbGVkID0gJyc7XG4gICAgICBsZXQgcGFyYW1zID0gW107XG5cbiAgICAgIGxldCBtYXRjaCA9IG51bGw7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gcmVnZXhNYXRjaC5leGVjKG5vZGUucGF0aCkpKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIobGFzdEluZGV4LCBtYXRjaC5pbmRleCAtIGxhc3RJbmRleCk7XG4gICAgICAgIGxhc3RJbmRleCA9IHJlZ2V4TWF0Y2gubGFzdEluZGV4O1xuICAgICAgICBjb21waWxlZCArPSBfLmVzY2FwZVJlZ0V4cChub3RSZWdleCk7XG5cbiAgICAgICAgbGV0IG5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgbGV0IHJlZ2V4ID0gbWF0Y2hbMl07XG5cbiAgICAgICAgLy8gOm5hbWUgaW1wbGljaXRseSBlbmRzIHdpdGggJy8nIG9yIHRoZSBlbmQgb2Ygc3RyaW5nXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgIG5hbWUgPSBtYXRjaFszXTtcbiAgICAgICAgICByZWdleCA9ICdbXi9dKyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zUmVnZXhbbmFtZV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHBhcmFtIG5hbWUgY29uZmxpY3RzOiAke25hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICc/Jykge1xuICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICAgIGNvbXBpbGVkICs9IGAoJHtyZWdleH0pP2A7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21waWxlZCArPSBgKCR7cmVnZXh9KWA7XG4gICAgICAgICAgcGFyYW1zLnB1c2gobmFtZSk7XG5cbiAgICAgICAgICBwYXJhbXNSZWdleFtuYW1lXSA9IHJlZ2V4O1xuICAgICAgICAgIHBhcmFtc09wdGlvbmFsW25hbWVdID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSArPSBgKCR7bmFtZX0pYDtcbiAgICAgIH1cblxuICAgICAgLy8gZGVhbCB3aXRoIHRhaWxcbiAgICAgIGlmIChsYXN0SW5kZXggPCBub2RlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAgIGxldCBub3RSZWdleCA9IG5vZGUucGF0aC5zdWJzdHIoXG4gICAgICAgICAgbGFzdEluZGV4LFxuICAgICAgICAgIG5vZGUucGF0aC5sZW5ndGggLSBsYXN0SW5kZXgsXG4gICAgICAgICk7XG4gICAgICAgIGNvbXBpbGVkICs9IF8uZXNjYXBlUmVnRXhwKG5vdFJlZ2V4KTtcblxuICAgICAgICBwYXRoVGVtcGxhdGUgKz0gbm90UmVnZXg7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX3BhdGggPSBjb21waWxlZDtcbiAgICAgIG5vZGUuX3BhcmFtcyA9IHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBmb3IgbmFtZWQgcm91dGVzXG4gICAgaWYgKG5vZGUubmFtZSAmJiBfLmlzRW1wdHkobm9kZS5jaGlsZHJlbikpIHtcbiAgICAgIG5hbWVkUm91dGVzW25vZGUubmFtZV0gPSB7XG4gICAgICAgIHBhdGhUZW1wbGF0ZSxcbiAgICAgICAgcGFyYW1zUmVnZXgsXG4gICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBhZGQgaW1wb3J0Q29tcG9uZW50IGFzIHBsYWNlaG9sZGVyLCBwcmVwYXJlIGZvciBoYWNrXG4gICAgaWYgKG5vZGUuY29tcG9uZW50KSB7XG4gICAgICBub2RlLmltcG9ydENvbXBvbmVudCA9IG5vZGUuY29tcG9uZW50O1xuICAgIH1cblxuICAgIC8vIHJlY3Vyc2l2ZSB0cmF2ZXJzZSB0byBjaGlsZHJlblxuICAgIGlmICghXy5pc0VtcHR5KG5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24obikge1xuICAgICAgICB0cmF2ZXJzZShuLCB7XG4gICAgICAgICAgcGF0aFRlbXBsYXRlLFxuICAgICAgICAgIHBhcmFtc1JlZ2V4LFxuICAgICAgICAgIHBhcmFtc09wdGlvbmFsLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkocm91dGVUcmVlLCB7XG4gICAgLy8gZm9yIG5hbWVkIHJvdXRlc1xuICAgIHBhdGhUZW1wbGF0ZTogJycsXG4gICAgcGFyYW1zUmVnZXg6IHt9LFxuICAgIHBhcmFtc09wdGlvbmFsOiB7fSxcbiAgfSk7XG5cbiAgLy8gY29udmVydCB0byBzb3VyY2Ugc28gd2UgY2FuIGhhY2sgaXQgYXMgc3RyaW5nXG4gIGxldCByb3V0ZVNvdXJjZSA9IEpTT04uc3RyaW5naWZ5KHJvdXRlVHJlZSk7XG5cbiAgLy8gaGFjayBpbXBvcnRDb21wb25lbnQgdG8gYmUgYSByZXF1aXJlLmVuc3VyZSBwcm9taXNlXG4gIHJvdXRlU291cmNlID0gcm91dGVTb3VyY2UucmVwbGFjZShcbiAgICAvKFtcIiddKWltcG9ydENvbXBvbmVudFxcMVxccyo/Olxccyo/KFtcIiddKSguKj8pXFwyL2csXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYFwiaW1wb3J0Q29tcG9uZW50XCI6ICR7aW1wb3J0Q29tcG9uZW50LnJlcGxhY2UoXG4gICAgICAgIC9fX2NvbXBvbmVudF9fL2csXG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/IGAke25hbWV9L2hvdC1sb2FkZXIhYCA6ICcnKSArXG4gICAgICAgICAgYXJndW1lbnRzWzNdLFxuICAgICAgKX1gO1xuICAgIH0sXG4gICk7XG5cbiAgLy8gY29udmVydCBuYW1lcyBtYXAgdG8gc291cmNlXG4gIGNvbnN0IG5hbWVzTWFwID0gSlNPTi5zdHJpbmdpZnkobmFtZWRSb3V0ZXMpO1xuXG4gIHJldHVybiBbXG4gICAgYFxuICAgIHZhciBkYXRhID0gJHtyb3V0ZVNvdXJjZX07XG4gICAgdmFyIG5hbWVzID0gJHtuYW1lc01hcH07XG5cbiAgICB2YXIgcm91dGVzID0gcmVxdWlyZSgnJHtuYW1lfS9yb3V0ZXMnKTtcbiAgICByb3V0ZXMgPSByb3V0ZXMuZGVmYXVsdCB8fCByb3V0ZXM7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByb3V0ZXMoZGF0YSwgbmFtZXMpO1xuICAgIGAsXG4gICAgaW5wdXRTb3VyY2VNYXAsXG4gIF07XG59XG4iXX0=