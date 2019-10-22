import React from 'react';
import app from '@pickjunk/min';
import routes from './config/routes';

export default app({
  routes,
  render(Router) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Min Example</title>
        </head>
        <body>
          <div id="app">
            <Router />
          </div>
        </body>
      </html>
    );
  },
  notFound() {
    alert('not found should be redirect');
  },
});
