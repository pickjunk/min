import React from 'react';
import app from '@pickjunk/min';
import routes from './routes';
// @ts-ignore
import logo from './assets/logo.png';
import StyleContext from 'isomorphic-style-loader/StyleContext';

export default app({
  routes,
  render(Router) {
    const css = new Set();
    const insertCss = (...styles) =>
      styles.forEach((style) => css.add(style._getCss()));

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
            <title>Min Example</title>
            <link rel="shortcut icon" href={logo} />
            <style id="jss-server-side" suppressHydrationWarning={true}>
              __jss-server-side__
            </style>
          </head>
          <body>
            <div id="app">
              <StyleContext.Provider value={{ insertCss }}>
                <Router />
              </StyleContext.Provider>
            </div>
          </body>
        </html>
      ),
      afterSSR(html) {
        return html.replace('__jss-server-side__', [...css].join(''));
      },
      afterHydrate() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles);
        }
      },
    };
  },
  notFound() {
    window.alert('404');
  },
});
