const React = require('react');
const ReactDOMServer = require('react-dom/server');
const traverse = require('react-traverse').default;
const log = require('../lib/logger').default;

module.exports = async function (req, res, render, bootstrap) {
  try {
    let { jsx, afterSSR } = await render(req.originalUrl);

    jsx = traverse(jsx, {
      DOMElement(path) {
        // inject browser bootstrap script
        if (path.node.type === 'body') {
          return React.cloneElement(
            path.node,
            path.node.props,
            ...path.traverseChildren(),
            React.createElement('script', { src: bootstrap }),
          );
        }

        return React.cloneElement(
          path.node,
          path.node.props,
          ...path.traverseChildren(),
        );
      },
    });

    let html = ReactDOMServer.renderToString(jsx);
    if (afterSSR) {
      html = afterSSR(html);
    }

    log.info({ path: req.path, status: '200' });
    res.end(html);
  } catch (e) {
    if (/not found/.test(e.message)) {
      log.warn({ path: req.path, status: '404' });
      res.status(404).end('Not Found');
    } else {
      log.error({ path: req.path, status: '500', msg: e.message });
      res.status(500).end('Internal Server Error');
    }
  }
};
