var fs = require('fs');
var path = require('path');

var React = require('react');
var { renderToString } = require('react-dom/server');
var { Provider } = require('react-redux');
var { matchPath, StaticRouter } = require('react-router');

var { BUILD_DIR } = require('./paths');
var App = require('../../client/lib/App').default;
var configureStore = require('../../client/lib/modules/store').default;
var { addTodo } = require('../../client/lib/logic/todos');
var Lodable = require('../../client/node_modules/react-loadable');

var routes = [
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
  var match = routes.find(route => matchPath(req.path, {
    path: route,
    exact: true,
  }));

  // bail
  if (!match) {
    next();

    return;
  }

  var location = req.url;
  var context = {};

  var state = {
    todos: [
      {
        id: 0,
        task: 'task from server',
      },
    ],
  }

  var store = configureStore({
    state,
  });

  store.dispatch(addTodo('also from server'));

  Lodable.preloadAll().then(() => {
    var app = renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    var html = fs
      .readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
      .replace('__ROOT__', app)
      .replace(
        '__REDUX__',
        JSON.stringify(store.getState())
      );

    res.send(html);
  });
}

module.exports = reactRenderer;
