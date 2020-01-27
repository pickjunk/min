const nodeEval = require('node-eval');
const _ = require('lodash');
const { name } = require('../package');
const babel = require('@babel/core');

const importComponent = `
function () {
  return import('__component__').then(function (m) {
    return m.default || m;
  });
}
`;

module.exports = function(source, inputSourceMap) {
  // Make the loader async
  // fork from babel-loader@8
  const callback = this.async();
  loader.call(this, source, inputSourceMap).then(
    args => callback(null, ...args),
    err => callback(err),
  );
};

// support es6 with babel-loader
// fork from babel-loader@8
async function babelLoader(source, inputSourceMap) {
  const filename = this.resourcePath;

  let options = {
    filename,
    inputSourceMap: inputSourceMap || undefined,
    // Set the default sourcemap behavior based on Webpack's mapping flag
    sourceMaps: this.sourceMap,
    // Ensure that Webpack will get a full absolute path in the sourcemap
    // so that it can properly map the module back to its internal cached
    // modules.
    sourceFileName: filename,
    caller: {
      name: `${name}/loader`,
      // node-eval can only eval commonjs module
      supportsStaticESM: false,
      supportsDynamicImport: false,
    },
  };

  const config = babel.loadPartialConfig(options);
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

  const { code, map } = await babel.transformAsync(source, options);

  if (typeof config.babelrc === 'string') {
    this.addDependency(config.babelrc);
  }

  return [code, map || undefined];
}

async function loader(source, inputSourceMap) {
  const filename = this.resourcePath;

  [source, inputSourceMap] = await babelLoader.call(
    this,
    source,
    inputSourceMap,
  );

  // eval routes.js so we can traverse routeTree
  let routeTree = nodeEval(source, filename);
  routeTree = routeTree.default || routeTree;

  if (_.isArray(routeTree)) {
    routeTree = {
      children: routeTree,
    };
  }

  // for named routes
  let namedRoutes = {};

  (function traverse(node, context) {
    if (node.component && !_.isString(node.component)) {
      throw new Error(`component must be string: ${node.component}`);
    }

    if (node.name && !_.isEmpty(node.children)) {
      throw new Error(
        `named route is a leaf that can not has children: ${node.name}`,
      );
    }

    // create current context to avoid children's contexts
    // affect each other
    let pathTemplate = context.pathTemplate;
    let paramsRegex = Object.assign({}, context.paramsRegex);
    let paramsOptional = Object.assign({}, context.paramsOptional);

    // compile path to support regex and params
    if (node.path) {
      // two ways to declare route arg:
      // 1. (name:regex) or (name?:regex)
      // 2. :name
      let regexMatch = /\(([a-zA-Z_][a-zA-Z_0-9]*\??)\:(.*?)\)|\:([a-zA-Z_][a-zA-Z_0-9]*)/g;
      let lastIndex = 0;
      let compiled = '';
      let params = [];

      let match = null;
      while ((match = regexMatch.exec(node.path))) {
        let notRegex = node.path.substr(lastIndex, match.index - lastIndex);
        lastIndex = regexMatch.lastIndex;
        compiled += _.escapeRegExp(notRegex);

        let name = match[1];
        let regex = match[2];

        // :name implicitly ends with '/' or the end of string
        if (!name) {
          name = match[3];
          regex = '[^/]+';
        }

        if (paramsRegex[name]) {
          throw new Error(`param name conflicts: ${name}`);
        }

        if (name.slice(-1) === '?') {
          name = name.slice(0, -1);

          compiled += `(${regex})?`;
          params.push(name);

          paramsRegex[name] = regex;
          paramsOptional[name] = true;
        } else {
          compiled += `(${regex})`;
          params.push(name);

          paramsRegex[name] = regex;
          paramsOptional[name] = false;
        }

        pathTemplate += notRegex;
        pathTemplate += `(${name})`;
      }

      // deal with tail
      if (lastIndex < node.path.length) {
        let notRegex = node.path.substr(
          lastIndex,
          node.path.length - lastIndex,
        );
        compiled += _.escapeRegExp(notRegex);

        pathTemplate += notRegex;
      }

      node._path = compiled;
      node._params = params;
    }

    // for named routes
    if (node.name && _.isEmpty(node.children)) {
      namedRoutes[node.name] = {
        pathTemplate,
        paramsRegex,
        paramsOptional,
      };
    }

    // add importComponent as placeholder, prepare for hack
    if (node.component) {
      node.importComponent = node.component;
    }

    // recursive traverse to children
    if (!_.isEmpty(node.children)) {
      _.forEach(node.children, function(n) {
        traverse(n, {
          pathTemplate,
          paramsRegex,
          paramsOptional,
        });
      });
    }
  })(routeTree, {
    // for named routes
    pathTemplate: '',
    paramsRegex: {},
    paramsOptional: {},
  });

  // convert to source so we can hack it as string
  let routeSource = JSON.stringify(routeTree);

  // hack importComponent to be a require.ensure promise
  routeSource = routeSource.replace(
    /(["'])importComponent\1\s*?:\s*?(["'])(.*?)\2/g,
    function() {
      return `"importComponent": ${importComponent.replace(
        /__component__/g,
        (process.env.NODE_ENV === 'development' ? `${name}/hot-loader!` : '') +
          arguments[3],
      )}`;
    },
  );

  // convert names map to source
  const namesMap = JSON.stringify(namedRoutes);

  return [
    `
    var data = ${routeSource};
    var names = ${namesMap};

    var routes = require('${name}/routes');
    routes = routes.default || routes;
    module.exports = routes(data, names);
    `,
    inputSourceMap,
  ];
}
