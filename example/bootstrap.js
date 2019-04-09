import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import router from '@pickjunk/min/Router';
import MinScript from '@pickjunk/min/Script';
import routes from './config/routes';

function renderRouter(path) {
  return router(routes, path, () => {
    alert('404 should be redirect');
  });
}

/* Server render */
export default async function(req, res) {
  let Router = null;
  try {
    Router = await renderRouter(req.path);
  } catch (_) {
    res.status(404).end('Not Found');
    return;
  }

  const routerHTML = ReactDOMServer.renderToString(<Router />);

  return ReactDOMServer.renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: routerHTML }} />

        <MinScript />
      </body>
    </html>,
  );
}

/* Client render */
if (typeof document !== 'undefined') {
  renderRouter().then(function(Router) {
    ReactDOM.hydrate(<Router />, document.getElementById('app'));
  });
}
