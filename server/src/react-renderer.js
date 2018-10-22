import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchPath, StaticRouter } from 'react-router';

import { BUILD_DIR } from './paths';
import App from '../../client/lib/App';
import configureStore from '../../client/lib/modules/store';
import { addTodo } from '../../client/lib/logic/todos';
import Lodable from '../../client/node_modules/react-loadable';

const routes = [
  '/',

  '/para/:number_regex(\\d+)',
  '/para/:text_regex([a-zA-Z]+)',

  '/para/:any',
  '/para/:any_regex(.*)',
  '/para/(.*)',
  '/para/*',
  '/para/:any_optional?',

  '/para',

  '/dyna',
];

function reactRenderer(req, res, next) {
  const match = routes.find(route => matchPath(req.path, {
    path: route,
    exact: true,
  }));

  // bail
  if (!match) {
    next();

    return;
  }

  const location = req.url;
  const context = {};

  const state = {
    todos: [
      {
        id: 0,
        task: 'task from server',
      },
    ],
  }

  const store = configureStore({
    state,
  });

  store.dispatch(addTodo('also from server'));

  Lodable.preloadAll().then(() => {
    const app = renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const html = fs
      .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
      .replace('__ROOT__', app)
      .replace(
        '__REDUX__',
        JSON.stringify(store.getState())
      );

    res.send(html);
  });
}

export default reactRenderer;
