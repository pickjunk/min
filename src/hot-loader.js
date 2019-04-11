const esprima = require('esprima');
const estraverse = require('estraverse');
const _ = require('lodash');
const escodegen = require('escodegen');

module.exports = function(source, inputSourceMap) {
  // Make the loader async
  // fork from babel-loader@8
  const callback = this.async();
  loader
    .call(this, source, inputSourceMap)
    .then(args => callback(null, ...args), err => callback(err));
};

async function loader(source, inputSourceMap) {
  // parse
  let ast = esprima.parseModule(source);

  // transform
  ast = estraverse.replace(ast, {
    enter(node) {
      // skip all BlockStatement to make traversing
      // only on the top scope
      if (node.type === 'BlockStatement') {
        this.skip();
        return;
      }
    },
    leave(node) {
      const hotAST = esprima.parseScript(
        `require('react-hot-loader/root').hot(module)`,
      ).body[0].expression;
      const moduleExportsAST = esprima.parseScript(`module.exports`).body[0];
      const exportsAST = esprima.parseScript(`exports`).body[0];

      if (node.type === 'ExportDefaultDeclaration') {
        hotAST.arguments = [node.declaration];
        node.declaration = hotAST;
        return node;
      }

      if (
        node.type === 'AssignmentExpression' &&
        _.isEqual(node.left, moduleExportsAST.expression)
      ) {
        hotAST.arguments = [node.right];
        node.right = hotAST;
        return node;
      }

      if (
        node.type === 'AssignmentExpression' &&
        _.isEqual(node.left, exportsAST.expression)
      ) {
        hotAST.arguments = [node.right];
        node.right = hotAST;
        return node;
      }
    },
  });

  // generate
  source = escodegen.generate(ast);

  return [source, inputSourceMap];
}
