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
    return callback.apply(void 0, [null].concat((0, _toConsumableArray2.default)(args)));
  }, function (err) {
    return callback(err);
  });
};

function loader(_x, _x2) {
  return _loader.apply(this, arguments);
}

function _loader() {
  _loader = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(source, inputSourceMap) {
    var ast;
    return _regenerator.default.wrap(function _callee$(_context) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob3QtbG9hZGVyLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJyZXF1aXJlIiwiZXN0cmF2ZXJzZSIsIl8iLCJlc2NvZGVnZW4iLCJtb2R1bGUiLCJleHBvcnRzIiwic291cmNlIiwiaW5wdXRTb3VyY2VNYXAiLCJjYWxsYmFjayIsImFzeW5jIiwibG9hZGVyIiwiY2FsbCIsInRoZW4iLCJhcmdzIiwiZXJyIiwiYXN0IiwicGFyc2VNb2R1bGUiLCJyZXBsYWNlIiwiZW50ZXIiLCJub2RlIiwidHlwZSIsInNraXAiLCJsZWF2ZSIsImhvdEFTVCIsInBhcnNlU2NyaXB0IiwiYm9keSIsImV4cHJlc3Npb24iLCJtb2R1bGVFeHBvcnRzQVNUIiwiZXhwb3J0c0FTVCIsImFyZ3VtZW50cyIsImRlY2xhcmF0aW9uIiwiaXNFcXVhbCIsImxlZnQiLCJyaWdodCIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFDQSxJQUFNQyxVQUFVLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQTFCOztBQUNBLElBQU1FLENBQUMsR0FBR0YsT0FBTyxDQUFDLFFBQUQsQ0FBakI7O0FBQ0EsSUFBTUcsU0FBUyxHQUFHSCxPQUFPLENBQUMsV0FBRCxDQUF6Qjs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUJDLGNBQWpCLEVBQWlDO0FBQ2hEO0FBQ0E7QUFDQSxNQUFNQyxRQUFRLEdBQUcsS0FBS0MsS0FBTCxFQUFqQjtBQUNBQyxFQUFBQSxNQUFNLENBQ0hDLElBREgsQ0FDUSxJQURSLEVBQ2NMLE1BRGQsRUFDc0JDLGNBRHRCLEVBRUdLLElBRkgsQ0FFUSxVQUFBQyxJQUFJO0FBQUEsV0FBSUwsUUFBUSxNQUFSLFVBQVMsSUFBVCwwQ0FBa0JLLElBQWxCLEdBQUo7QUFBQSxHQUZaLEVBRXlDLFVBQUFDLEdBQUc7QUFBQSxXQUFJTixRQUFRLENBQUNNLEdBQUQsQ0FBWjtBQUFBLEdBRjVDO0FBR0QsQ0FQRDs7U0FTZUosTTs7Ozs7Ozs0QkFBZixpQkFBc0JKLE1BQXRCLEVBQThCQyxjQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRTtBQUNJUSxZQUFBQSxHQUZOLEdBRVloQixPQUFPLENBQUNpQixXQUFSLENBQW9CVixNQUFwQixDQUZaLEVBSUU7O0FBQ0FTLFlBQUFBLEdBQUcsR0FBR2QsVUFBVSxDQUFDZ0IsT0FBWCxDQUFtQkYsR0FBbkIsRUFBd0I7QUFDNUJHLGNBQUFBLEtBRDRCLGlCQUN0QkMsSUFEc0IsRUFDaEI7QUFDVjtBQUNBO0FBQ0Esb0JBQUlBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLGdCQUFsQixFQUFvQztBQUNsQyx1QkFBS0MsSUFBTDtBQUNBO0FBQ0Q7QUFDRixlQVIyQjtBQVM1QkMsY0FBQUEsS0FUNEIsaUJBU3RCSCxJQVRzQixFQVNoQjtBQUNWLG9CQUFNSSxNQUFNLEdBQUd4QixPQUFPLENBQUN5QixXQUFSLGlEQUViQyxJQUZhLENBRVIsQ0FGUSxFQUVMQyxVQUZWO0FBR0Esb0JBQU1DLGdCQUFnQixHQUFHNUIsT0FBTyxDQUFDeUIsV0FBUixtQkFBc0NDLElBQXRDLENBQTJDLENBQTNDLENBQXpCO0FBQ0Esb0JBQU1HLFVBQVUsR0FBRzdCLE9BQU8sQ0FBQ3lCLFdBQVIsWUFBK0JDLElBQS9CLENBQW9DLENBQXBDLENBQW5COztBQUVBLG9CQUFJTixJQUFJLENBQUNDLElBQUwsS0FBYywwQkFBbEIsRUFBOEM7QUFDNUNHLGtCQUFBQSxNQUFNLENBQUNNLFNBQVAsR0FBbUIsQ0FBQ1YsSUFBSSxDQUFDVyxXQUFOLENBQW5CO0FBQ0FYLGtCQUFBQSxJQUFJLENBQUNXLFdBQUwsR0FBbUJQLE1BQW5CO0FBQ0EseUJBQU9KLElBQVA7QUFDRDs7QUFFRCxvQkFDRUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMsc0JBQWQsSUFDQWxCLENBQUMsQ0FBQzZCLE9BQUYsQ0FBVVosSUFBSSxDQUFDYSxJQUFmLEVBQXFCTCxnQkFBZ0IsQ0FBQ0QsVUFBdEMsQ0FGRixFQUdFO0FBQ0FILGtCQUFBQSxNQUFNLENBQUNNLFNBQVAsR0FBbUIsQ0FBQ1YsSUFBSSxDQUFDYyxLQUFOLENBQW5CO0FBQ0FkLGtCQUFBQSxJQUFJLENBQUNjLEtBQUwsR0FBYVYsTUFBYjtBQUNBLHlCQUFPSixJQUFQO0FBQ0Q7O0FBRUQsb0JBQ0VBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLHNCQUFkLElBQ0FsQixDQUFDLENBQUM2QixPQUFGLENBQVVaLElBQUksQ0FBQ2EsSUFBZixFQUFxQkosVUFBVSxDQUFDRixVQUFoQyxDQUZGLEVBR0U7QUFDQUgsa0JBQUFBLE1BQU0sQ0FBQ00sU0FBUCxHQUFtQixDQUFDVixJQUFJLENBQUNjLEtBQU4sQ0FBbkI7QUFDQWQsa0JBQUFBLElBQUksQ0FBQ2MsS0FBTCxHQUFhVixNQUFiO0FBQ0EseUJBQU9KLElBQVA7QUFDRDtBQUNGO0FBdkMyQixhQUF4QixDQUFOLENBTEYsQ0ErQ0U7O0FBQ0FiLFlBQUFBLE1BQU0sR0FBR0gsU0FBUyxDQUFDK0IsUUFBVixDQUFtQm5CLEdBQW5CLENBQVQ7QUFoREYsNkNBa0RTLENBQUNULE1BQUQsRUFBU0MsY0FBVCxDQWxEVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXNwcmltYSA9IHJlcXVpcmUoJ2VzcHJpbWEnKTtcbmNvbnN0IGVzdHJhdmVyc2UgPSByZXF1aXJlKCdlc3RyYXZlcnNlJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBlc2NvZGVnZW4gPSByZXF1aXJlKCdlc2NvZGVnZW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XG4gIC8vIE1ha2UgdGhlIGxvYWRlciBhc3luY1xuICAvLyBmb3JrIGZyb20gYmFiZWwtbG9hZGVyQDhcbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmFzeW5jKCk7XG4gIGxvYWRlclxuICAgIC5jYWxsKHRoaXMsIHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApXG4gICAgLnRoZW4oYXJncyA9PiBjYWxsYmFjayhudWxsLCAuLi5hcmdzKSwgZXJyID0+IGNhbGxiYWNrKGVycikpO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gbG9hZGVyKHNvdXJjZSwgaW5wdXRTb3VyY2VNYXApIHtcbiAgLy8gcGFyc2VcbiAgbGV0IGFzdCA9IGVzcHJpbWEucGFyc2VNb2R1bGUoc291cmNlKTtcblxuICAvLyB0cmFuc2Zvcm1cbiAgYXN0ID0gZXN0cmF2ZXJzZS5yZXBsYWNlKGFzdCwge1xuICAgIGVudGVyKG5vZGUpIHtcbiAgICAgIC8vIHNraXAgYWxsIEJsb2NrU3RhdGVtZW50IHRvIG1ha2UgdHJhdmVyc2luZ1xuICAgICAgLy8gb25seSBvbiB0aGUgdG9wIHNjb3BlXG4gICAgICBpZiAobm9kZS50eXBlID09PSAnQmxvY2tTdGF0ZW1lbnQnKSB7XG4gICAgICAgIHRoaXMuc2tpcCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWF2ZShub2RlKSB7XG4gICAgICBjb25zdCBob3RBU1QgPSBlc3ByaW1hLnBhcnNlU2NyaXB0KFxuICAgICAgICBgcmVxdWlyZSgncmVhY3QtaG90LWxvYWRlci9yb290JykuaG90KG1vZHVsZSlgLFxuICAgICAgKS5ib2R5WzBdLmV4cHJlc3Npb247XG4gICAgICBjb25zdCBtb2R1bGVFeHBvcnRzQVNUID0gZXNwcmltYS5wYXJzZVNjcmlwdChgbW9kdWxlLmV4cG9ydHNgKS5ib2R5WzBdO1xuICAgICAgY29uc3QgZXhwb3J0c0FTVCA9IGVzcHJpbWEucGFyc2VTY3JpcHQoYGV4cG9ydHNgKS5ib2R5WzBdO1xuXG4gICAgICBpZiAobm9kZS50eXBlID09PSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJykge1xuICAgICAgICBob3RBU1QuYXJndW1lbnRzID0gW25vZGUuZGVjbGFyYXRpb25dO1xuICAgICAgICBub2RlLmRlY2xhcmF0aW9uID0gaG90QVNUO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcbiAgICAgICAgXy5pc0VxdWFsKG5vZGUubGVmdCwgbW9kdWxlRXhwb3J0c0FTVC5leHByZXNzaW9uKVxuICAgICAgKSB7XG4gICAgICAgIGhvdEFTVC5hcmd1bWVudHMgPSBbbm9kZS5yaWdodF07XG4gICAgICAgIG5vZGUucmlnaHQgPSBob3RBU1Q7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJyAmJlxuICAgICAgICBfLmlzRXF1YWwobm9kZS5sZWZ0LCBleHBvcnRzQVNULmV4cHJlc3Npb24pXG4gICAgICApIHtcbiAgICAgICAgaG90QVNULmFyZ3VtZW50cyA9IFtub2RlLnJpZ2h0XTtcbiAgICAgICAgbm9kZS5yaWdodCA9IGhvdEFTVDtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gZ2VuZXJhdGVcbiAgc291cmNlID0gZXNjb2RlZ2VuLmdlbmVyYXRlKGFzdCk7XG5cbiAgcmV0dXJuIFtzb3VyY2UsIGlucHV0U291cmNlTWFwXTtcbn1cbiJdfQ==