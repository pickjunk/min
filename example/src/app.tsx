import React from 'react';
import app from '@pickjunk/min';
import routes from './routes';
// @ts-ignore
import logo from './assets/logo.png';

export default app({
  routes,
  render(Router) {
    return {
      jsx: (
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>MIN Example</title>
            <link rel="shortcut icon" href={logo} />
          </head>
          <body>
            <div id="app">
              <Router />
            </div>
          </body>
        </html>
      ),
    };
  },
  notFound() {
    window.alert('404');
  },
});
