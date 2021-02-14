"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var esprima = require('esprima');

var estraverse = require('estraverse');

var _ = require('lodash');

var escodegen = require('escodegen');

module.exports = function (source, inputSourceMap) {
  // Make the loader async
  // fork from babel-loader@8
  var callback = this.async();
  loader.call(this, source, inputSourceMap).then(function (args) {
    return callback.apply(void 0, [null].concat((0, _toConsumableArray2["default"])(args)));
  }, function (err) {
    return callback(err);
  });
};

function loader(_x, _x2) {
  return _loader.apply(this, arguments);
}

function _loader() {
  _loader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(source, inputSourceMap) {
    var ast;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // parse
            ast = esprima.parseModule(source); // transform

            ast = estraverse.replace(ast, {
              enter: function enter(node) {
                // skip all BlockStatement to make traversing
                // only on the top scope
                if (node.type === 'BlockStatement') {
                  this.skip();
                  return;
                }
              },
              leave: function leave(node) {
                var hotAST = esprima.parseScript("require('react-hot-loader/root').hot(module)").body[0].expression;
                var moduleExportsAST = esprima.parseScript("module.exports").body[0];
                var exportsAST = esprima.parseScript("exports").body[0];

                if (node.type === 'ExportDefaultDeclaration') {
                  hotAST.arguments = [node.declaration];
                  node.declaration = hotAST;
                  return node;
                }

                if (node.type === 'AssignmentExpression' && _.isEqual(node.left, moduleExportsAST.expression)) {
                  hotAST.arguments = [node.right];
                  node.right = hotAST;
                  return node;
                }

                if (node.type === 'AssignmentExpression' && _.isEqual(node.left, exportsAST.expression)) {
                  hotAST.arguments = [node.right];
                  node.right = hotAST;
                  return node;
                }
              }
            }); // generate

            source = escodegen.generate(ast);
            return _context.abrupt("return", [source, inputSourceMap]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loader.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob3QtbG9hZGVyLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJyZXF1aXJlIiwiZXN0cmF2ZXJzZSIsIl8iLCJlc2NvZGVnZW4iLCJtb2R1bGUiLCJleHBvcnRzIiwic291cmNlIiwiaW5wdXRTb3VyY2VNYXAiLCJjYWxsYmFjayIsImFzeW5jIiwibG9hZGVyIiwiY2FsbCIsInRoZW4iLCJhcmdzIiwiZXJyIiwiYXN0IiwicGFyc2VNb2R1bGUiLCJyZXBsYWNlIiwiZW50ZXIiLCJub2RlIiwidHlwZSIsInNraXAiLCJsZWF2ZSIsImhvdEFTVCIsInBhcnNlU2NyaXB0IiwiYm9keSIsImV4cHJlc3Npb24iLCJtb2R1bGVFeHBvcnRzQVNUIiwiZXhwb3J0c0FTVCIsImFyZ3VtZW50cyIsImRlY2xhcmF0aW9uIiwiaXNFcXVhbCIsImxlZnQiLCJyaWdodCIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFDQSxJQUFNQyxVQUFVLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQTFCOztBQUNBLElBQU1FLENBQUMsR0FBR0YsT0FBTyxDQUFDLFFBQUQsQ0FBakI7O0FBQ0EsSUFBTUcsU0FBUyxHQUFHSCxPQUFPLENBQUMsV0FBRCxDQUF6Qjs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUJDLGNBQWpCLEVBQWlDO0FBQ2hEO0FBQ0E7QUFDQSxNQUFNQyxRQUFRLEdBQUcsS0FBS0MsS0FBTCxFQUFqQjtBQUNBQyxFQUFBQSxNQUFNLENBQ0hDLElBREgsQ0FDUSxJQURSLEVBQ2NMLE1BRGQsRUFDc0JDLGNBRHRCLEVBRUdLLElBRkgsQ0FFUSxVQUFBQyxJQUFJO0FBQUEsV0FBSUwsUUFBUSxNQUFSLFVBQVMsSUFBVCw2Q0FBa0JLLElBQWxCLEdBQUo7QUFBQSxHQUZaLEVBRXlDLFVBQUFDLEdBQUc7QUFBQSxXQUFJTixRQUFRLENBQUNNLEdBQUQsQ0FBWjtBQUFBLEdBRjVDO0FBR0QsQ0FQRDs7U0FTZUosTTs7Ozs7MEZBQWYsaUJBQXNCSixNQUF0QixFQUE4QkMsY0FBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0U7QUFDSVEsWUFBQUEsR0FGTixHQUVZaEIsT0FBTyxDQUFDaUIsV0FBUixDQUFvQlYsTUFBcEIsQ0FGWixFQUlFOztBQUNBUyxZQUFBQSxHQUFHLEdBQUdkLFVBQVUsQ0FBQ2dCLE9BQVgsQ0FBbUJGLEdBQW5CLEVBQXdCO0FBQzVCRyxjQUFBQSxLQUQ0QixpQkFDdEJDLElBRHNCLEVBQ2hCO0FBQ1Y7QUFDQTtBQUNBLG9CQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBYyxnQkFBbEIsRUFBb0M7QUFDbEMsdUJBQUtDLElBQUw7QUFDQTtBQUNEO0FBQ0YsZUFSMkI7QUFTNUJDLGNBQUFBLEtBVDRCLGlCQVN0QkgsSUFUc0IsRUFTaEI7QUFDVixvQkFBTUksTUFBTSxHQUFHeEIsT0FBTyxDQUFDeUIsV0FBUixpREFFYkMsSUFGYSxDQUVSLENBRlEsRUFFTEMsVUFGVjtBQUdBLG9CQUFNQyxnQkFBZ0IsR0FBRzVCLE9BQU8sQ0FBQ3lCLFdBQVIsbUJBQXNDQyxJQUF0QyxDQUEyQyxDQUEzQyxDQUF6QjtBQUNBLG9CQUFNRyxVQUFVLEdBQUc3QixPQUFPLENBQUN5QixXQUFSLFlBQStCQyxJQUEvQixDQUFvQyxDQUFwQyxDQUFuQjs7QUFFQSxvQkFBSU4sSUFBSSxDQUFDQyxJQUFMLEtBQWMsMEJBQWxCLEVBQThDO0FBQzVDRyxrQkFBQUEsTUFBTSxDQUFDTSxTQUFQLEdBQW1CLENBQUNWLElBQUksQ0FBQ1csV0FBTixDQUFuQjtBQUNBWCxrQkFBQUEsSUFBSSxDQUFDVyxXQUFMLEdBQW1CUCxNQUFuQjtBQUNBLHlCQUFPSixJQUFQO0FBQ0Q7O0FBRUQsb0JBQ0VBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLHNCQUFkLElBQ0FsQixDQUFDLENBQUM2QixPQUFGLENBQVVaLElBQUksQ0FBQ2EsSUFBZixFQUFxQkwsZ0JBQWdCLENBQUNELFVBQXRDLENBRkYsRUFHRTtBQUNBSCxrQkFBQUEsTUFBTSxDQUFDTSxTQUFQLEdBQW1CLENBQUNWLElBQUksQ0FBQ2MsS0FBTixDQUFuQjtBQUNBZCxrQkFBQUEsSUFBSSxDQUFDYyxLQUFMLEdBQWFWLE1BQWI7QUFDQSx5QkFBT0osSUFBUDtBQUNEOztBQUVELG9CQUNFQSxJQUFJLENBQUNDLElBQUwsS0FBYyxzQkFBZCxJQUNBbEIsQ0FBQyxDQUFDNkIsT0FBRixDQUFVWixJQUFJLENBQUNhLElBQWYsRUFBcUJKLFVBQVUsQ0FBQ0YsVUFBaEMsQ0FGRixFQUdFO0FBQ0FILGtCQUFBQSxNQUFNLENBQUNNLFNBQVAsR0FBbUIsQ0FBQ1YsSUFBSSxDQUFDYyxLQUFOLENBQW5CO0FBQ0FkLGtCQUFBQSxJQUFJLENBQUNjLEtBQUwsR0FBYVYsTUFBYjtBQUNBLHlCQUFPSixJQUFQO0FBQ0Q7QUFDRjtBQXZDMkIsYUFBeEIsQ0FBTixDQUxGLENBK0NFOztBQUNBYixZQUFBQSxNQUFNLEdBQUdILFNBQVMsQ0FBQytCLFFBQVYsQ0FBbUJuQixHQUFuQixDQUFUO0FBaERGLDZDQWtEUyxDQUFDVCxNQUFELEVBQVNDLGNBQVQsQ0FsRFQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVzcHJpbWEgPSByZXF1aXJlKCdlc3ByaW1hJyk7XG5jb25zdCBlc3RyYXZlcnNlID0gcmVxdWlyZSgnZXN0cmF2ZXJzZScpO1xuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuY29uc3QgZXNjb2RlZ2VuID0gcmVxdWlyZSgnZXNjb2RlZ2VuJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xuICAvLyBNYWtlIHRoZSBsb2FkZXIgYXN5bmNcbiAgLy8gZm9yayBmcm9tIGJhYmVsLWxvYWRlckA4XG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5hc3luYygpO1xuICBsb2FkZXJcbiAgICAuY2FsbCh0aGlzLCBzb3VyY2UsIGlucHV0U291cmNlTWFwKVxuICAgIC50aGVuKGFyZ3MgPT4gY2FsbGJhY2sobnVsbCwgLi4uYXJncyksIGVyciA9PiBjYWxsYmFjayhlcnIpKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIC8vIHBhcnNlXG4gIGxldCBhc3QgPSBlc3ByaW1hLnBhcnNlTW9kdWxlKHNvdXJjZSk7XG5cbiAgLy8gdHJhbnNmb3JtXG4gIGFzdCA9IGVzdHJhdmVyc2UucmVwbGFjZShhc3QsIHtcbiAgICBlbnRlcihub2RlKSB7XG4gICAgICAvLyBza2lwIGFsbCBCbG9ja1N0YXRlbWVudCB0byBtYWtlIHRyYXZlcnNpbmdcbiAgICAgIC8vIG9ubHkgb24gdGhlIHRvcCBzY29wZVxuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xuICAgICAgICB0aGlzLnNraXAoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGVhdmUobm9kZSkge1xuICAgICAgY29uc3QgaG90QVNUID0gZXNwcmltYS5wYXJzZVNjcmlwdChcbiAgICAgICAgYHJlcXVpcmUoJ3JlYWN0LWhvdC1sb2FkZXIvcm9vdCcpLmhvdChtb2R1bGUpYCxcbiAgICAgICkuYm9keVswXS5leHByZXNzaW9uO1xuICAgICAgY29uc3QgbW9kdWxlRXhwb3J0c0FTVCA9IGVzcHJpbWEucGFyc2VTY3JpcHQoYG1vZHVsZS5leHBvcnRzYCkuYm9keVswXTtcbiAgICAgIGNvbnN0IGV4cG9ydHNBU1QgPSBlc3ByaW1hLnBhcnNlU2NyaXB0KGBleHBvcnRzYCkuYm9keVswXTtcblxuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcbiAgICAgICAgaG90QVNULmFyZ3VtZW50cyA9IFtub2RlLmRlY2xhcmF0aW9uXTtcbiAgICAgICAgbm9kZS5kZWNsYXJhdGlvbiA9IGhvdEFTVDtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgbm9kZS50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nICYmXG4gICAgICAgIF8uaXNFcXVhbChub2RlLmxlZnQsIG1vZHVsZUV4cG9ydHNBU1QuZXhwcmVzc2lvbilcbiAgICAgICkge1xuICAgICAgICBob3RBU1QuYXJndW1lbnRzID0gW25vZGUucmlnaHRdO1xuICAgICAgICBub2RlLnJpZ2h0ID0gaG90QVNUO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcbiAgICAgICAgXy5pc0VxdWFsKG5vZGUubGVmdCwgZXhwb3J0c0FTVC5leHByZXNzaW9uKVxuICAgICAgKSB7XG4gICAgICAgIGhvdEFTVC5hcmd1bWVudHMgPSBbbm9kZS5yaWdodF07XG4gICAgICAgIG5vZGUucmlnaHQgPSBob3RBU1Q7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIGdlbmVyYXRlXG4gIHNvdXJjZSA9IGVzY29kZWdlbi5nZW5lcmF0ZShhc3QpO1xuXG4gIHJldHVybiBbc291cmNlLCBpbnB1dFNvdXJjZU1hcF07XG59XG4iXX0=