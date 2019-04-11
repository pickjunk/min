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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob3QtbG9hZGVyLmpzIl0sIm5hbWVzIjpbImVzcHJpbWEiLCJyZXF1aXJlIiwiZXN0cmF2ZXJzZSIsIl8iLCJlc2NvZGVnZW4iLCJtb2R1bGUiLCJleHBvcnRzIiwic291cmNlIiwiaW5wdXRTb3VyY2VNYXAiLCJjYWxsYmFjayIsImFzeW5jIiwibG9hZGVyIiwiY2FsbCIsInRoZW4iLCJhcmdzIiwiZXJyIiwiYXN0IiwicGFyc2VNb2R1bGUiLCJyZXBsYWNlIiwiZW50ZXIiLCJub2RlIiwidHlwZSIsInNraXAiLCJsZWF2ZSIsImhvdEFTVCIsInBhcnNlU2NyaXB0IiwiYm9keSIsImV4cHJlc3Npb24iLCJtb2R1bGVFeHBvcnRzQVNUIiwiZXhwb3J0c0FTVCIsImFyZ3VtZW50cyIsImRlY2xhcmF0aW9uIiwiaXNFcXVhbCIsImxlZnQiLCJyaWdodCIsImdlbmVyYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFDQSxJQUFNQyxVQUFVLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQTFCOztBQUNBLElBQU1FLENBQUMsR0FBR0YsT0FBTyxDQUFDLFFBQUQsQ0FBakI7O0FBQ0EsSUFBTUcsU0FBUyxHQUFHSCxPQUFPLENBQUMsV0FBRCxDQUF6Qjs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVNDLE1BQVQsRUFBaUJDLGNBQWpCLEVBQWlDO0FBQ2hEO0FBQ0E7QUFDQSxNQUFNQyxRQUFRLEdBQUcsS0FBS0MsS0FBTCxFQUFqQjtBQUNBQyxFQUFBQSxNQUFNLENBQ0hDLElBREgsQ0FDUSxJQURSLEVBQ2NMLE1BRGQsRUFDc0JDLGNBRHRCLEVBRUdLLElBRkgsQ0FFUSxVQUFBQyxJQUFJO0FBQUEsV0FBSUwsUUFBUSxNQUFSLFVBQVMsSUFBVCwwQ0FBa0JLLElBQWxCLEdBQUo7QUFBQSxHQUZaLEVBRXlDLFVBQUFDLEdBQUc7QUFBQSxXQUFJTixRQUFRLENBQUNNLEdBQUQsQ0FBWjtBQUFBLEdBRjVDO0FBR0QsQ0FQRDs7U0FTZUosTTs7Ozs7Ozs0QkFBZixpQkFBc0JKLE1BQXRCLEVBQThCQyxjQUE5QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRTtBQUNJUSxZQUFBQSxHQUZOLEdBRVloQixPQUFPLENBQUNpQixXQUFSLENBQW9CVixNQUFwQixDQUZaLEVBSUU7O0FBQ0FTLFlBQUFBLEdBQUcsR0FBR2QsVUFBVSxDQUFDZ0IsT0FBWCxDQUFtQkYsR0FBbkIsRUFBd0I7QUFDNUJHLGNBQUFBLEtBRDRCLGlCQUN0QkMsSUFEc0IsRUFDaEI7QUFDVjtBQUNBO0FBQ0Esb0JBQUlBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLGdCQUFsQixFQUFvQztBQUNsQyx1QkFBS0MsSUFBTDtBQUNBO0FBQ0Q7QUFDRixlQVIyQjtBQVM1QkMsY0FBQUEsS0FUNEIsaUJBU3RCSCxJQVRzQixFQVNoQjtBQUNWLG9CQUFNSSxNQUFNLEdBQUd4QixPQUFPLENBQUN5QixXQUFSLGlEQUViQyxJQUZhLENBRVIsQ0FGUSxFQUVMQyxVQUZWO0FBR0Esb0JBQU1DLGdCQUFnQixHQUFHNUIsT0FBTyxDQUFDeUIsV0FBUixtQkFBc0NDLElBQXRDLENBQTJDLENBQTNDLENBQXpCO0FBQ0Esb0JBQU1HLFVBQVUsR0FBRzdCLE9BQU8sQ0FBQ3lCLFdBQVIsWUFBK0JDLElBQS9CLENBQW9DLENBQXBDLENBQW5COztBQUVBLG9CQUFJTixJQUFJLENBQUNDLElBQUwsS0FBYywwQkFBbEIsRUFBOEM7QUFDNUNHLGtCQUFBQSxNQUFNLENBQUNNLFNBQVAsR0FBbUIsQ0FBQ1YsSUFBSSxDQUFDVyxXQUFOLENBQW5CO0FBQ0FYLGtCQUFBQSxJQUFJLENBQUNXLFdBQUwsR0FBbUJQLE1BQW5CO0FBQ0EseUJBQU9KLElBQVA7QUFDRDs7QUFFRCxvQkFDRUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMsc0JBQWQsSUFDQWxCLENBQUMsQ0FBQzZCLE9BQUYsQ0FBVVosSUFBSSxDQUFDYSxJQUFmLEVBQXFCTCxnQkFBZ0IsQ0FBQ0QsVUFBdEMsQ0FGRixFQUdFO0FBQ0FILGtCQUFBQSxNQUFNLENBQUNNLFNBQVAsR0FBbUIsQ0FBQ1YsSUFBSSxDQUFDYyxLQUFOLENBQW5CO0FBQ0FkLGtCQUFBQSxJQUFJLENBQUNjLEtBQUwsR0FBYVYsTUFBYjtBQUNBLHlCQUFPSixJQUFQO0FBQ0Q7O0FBRUQsb0JBQ0VBLElBQUksQ0FBQ0MsSUFBTCxLQUFjLHNCQUFkLElBQ0FsQixDQUFDLENBQUM2QixPQUFGLENBQVVaLElBQUksQ0FBQ2EsSUFBZixFQUFxQkosVUFBVSxDQUFDRixVQUFoQyxDQUZGLEVBR0U7QUFDQUgsa0JBQUFBLE1BQU0sQ0FBQ00sU0FBUCxHQUFtQixDQUFDVixJQUFJLENBQUNjLEtBQU4sQ0FBbkI7QUFDQWQsa0JBQUFBLElBQUksQ0FBQ2MsS0FBTCxHQUFhVixNQUFiO0FBQ0EseUJBQU9KLElBQVA7QUFDRDtBQUNGO0FBdkMyQixhQUF4QixDQUFOLENBTEYsQ0ErQ0U7O0FBQ0FiLFlBQUFBLE1BQU0sR0FBR0gsU0FBUyxDQUFDK0IsUUFBVixDQUFtQm5CLEdBQW5CLENBQVQ7QUFoREYsNkNBa0RTLENBQUNULE1BQUQsRUFBU0MsY0FBVCxDQWxEVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXNwcmltYSA9IHJlcXVpcmUoJ2VzcHJpbWEnKTtcclxuY29uc3QgZXN0cmF2ZXJzZSA9IHJlcXVpcmUoJ2VzdHJhdmVyc2UnKTtcclxuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5jb25zdCBlc2NvZGVnZW4gPSByZXF1aXJlKCdlc2NvZGVnZW4nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc291cmNlLCBpbnB1dFNvdXJjZU1hcCkge1xyXG4gIC8vIE1ha2UgdGhlIGxvYWRlciBhc3luY1xyXG4gIC8vIGZvcmsgZnJvbSBiYWJlbC1sb2FkZXJAOFxyXG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5hc3luYygpO1xyXG4gIGxvYWRlclxyXG4gICAgLmNhbGwodGhpcywgc291cmNlLCBpbnB1dFNvdXJjZU1hcClcclxuICAgIC50aGVuKGFyZ3MgPT4gY2FsbGJhY2sobnVsbCwgLi4uYXJncyksIGVyciA9PiBjYWxsYmFjayhlcnIpKTtcclxufTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRlcihzb3VyY2UsIGlucHV0U291cmNlTWFwKSB7XHJcbiAgLy8gcGFyc2VcclxuICBsZXQgYXN0ID0gZXNwcmltYS5wYXJzZU1vZHVsZShzb3VyY2UpO1xyXG5cclxuICAvLyB0cmFuc2Zvcm1cclxuICBhc3QgPSBlc3RyYXZlcnNlLnJlcGxhY2UoYXN0LCB7XHJcbiAgICBlbnRlcihub2RlKSB7XHJcbiAgICAgIC8vIHNraXAgYWxsIEJsb2NrU3RhdGVtZW50IHRvIG1ha2UgdHJhdmVyc2luZ1xyXG4gICAgICAvLyBvbmx5IG9uIHRoZSB0b3Agc2NvcGVcclxuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0Jsb2NrU3RhdGVtZW50Jykge1xyXG4gICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxlYXZlKG5vZGUpIHtcclxuICAgICAgY29uc3QgaG90QVNUID0gZXNwcmltYS5wYXJzZVNjcmlwdChcclxuICAgICAgICBgcmVxdWlyZSgncmVhY3QtaG90LWxvYWRlci9yb290JykuaG90KG1vZHVsZSlgLFxyXG4gICAgICApLmJvZHlbMF0uZXhwcmVzc2lvbjtcclxuICAgICAgY29uc3QgbW9kdWxlRXhwb3J0c0FTVCA9IGVzcHJpbWEucGFyc2VTY3JpcHQoYG1vZHVsZS5leHBvcnRzYCkuYm9keVswXTtcclxuICAgICAgY29uc3QgZXhwb3J0c0FTVCA9IGVzcHJpbWEucGFyc2VTY3JpcHQoYGV4cG9ydHNgKS5ib2R5WzBdO1xyXG5cclxuICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcclxuICAgICAgICBob3RBU1QuYXJndW1lbnRzID0gW25vZGUuZGVjbGFyYXRpb25dO1xyXG4gICAgICAgIG5vZGUuZGVjbGFyYXRpb24gPSBob3RBU1Q7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBub2RlLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcclxuICAgICAgICBfLmlzRXF1YWwobm9kZS5sZWZ0LCBtb2R1bGVFeHBvcnRzQVNULmV4cHJlc3Npb24pXHJcbiAgICAgICkge1xyXG4gICAgICAgIGhvdEFTVC5hcmd1bWVudHMgPSBbbm9kZS5yaWdodF07XHJcbiAgICAgICAgbm9kZS5yaWdodCA9IGhvdEFTVDtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIG5vZGUudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJyAmJlxyXG4gICAgICAgIF8uaXNFcXVhbChub2RlLmxlZnQsIGV4cG9ydHNBU1QuZXhwcmVzc2lvbilcclxuICAgICAgKSB7XHJcbiAgICAgICAgaG90QVNULmFyZ3VtZW50cyA9IFtub2RlLnJpZ2h0XTtcclxuICAgICAgICBub2RlLnJpZ2h0ID0gaG90QVNUO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyBnZW5lcmF0ZVxyXG4gIHNvdXJjZSA9IGVzY29kZWdlbi5nZW5lcmF0ZShhc3QpO1xyXG5cclxuICByZXR1cm4gW3NvdXJjZSwgaW5wdXRTb3VyY2VNYXBdO1xyXG59XHJcbiJdfQ==