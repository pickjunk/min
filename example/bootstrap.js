import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import router from '@pickjunk/min/Router';
import MinScript from '@pickjunk/min/Script';
import routes from './config/routes';

async function render(path) {
  const Router = await router(routes, path, () => {
    alert('404 should be redirect');
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
      </head>
      <body>
        <div id="app">
          <Router />
        </div>

        <MinScript />
      </body>
    </html>
  );
}

/* Server render */
export default async function(req, res) {
  try {
    const page = await render(req.originalUrl);
    return ReactDOMServer.renderToString(page);
  } catch (_) {
    res.status(404).end('Not Found');
  }
}

/* Client render */
if (typeof document !== 'undefined') {
  render().then(function(page) {
    ReactDOM.hydrate(page, document);
  });
}
