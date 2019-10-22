import React from 'react';
import app from '@pickjunk/min';
import routes from './config/routes';
import log from '@pickjunk/min/logger';

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
          <style id="css-server-side" suppressHydrationWarning={true}>
            __css-server-side__
          </style>
        </head>
        <body>
          <div id="app">
            <Router />
          </div>
        </body>
      </html>
    );
  },
  afterSSR(html) {
    html = html.replace('__css-server-side__', '#app {color: red;}');
    return html;
  },
  afterHydrate() {
    // Remove the server-side injected CSS.
    const cssStyles = document.querySelector('#css-server-side');
    if (cssStyles && cssStyles.parentNode) {
      cssStyles.parentNode.removeChild(cssStyles);
    }
  },
  notFound() {
    alert('not found should be redirect');
  },
});
