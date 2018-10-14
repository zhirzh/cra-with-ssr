var fs = require('fs');
var path = require('path');

var React = require('react');
var { renderToString } = require('react-dom/server');
var { Provider } = require('react-redux');

var { BUILD_DIR } = require('./paths');
var App = require('../../client/lib/App').default;
var configureStore = require('../../client/lib/modules/store').default;
var { addTodo } = require('../../client/lib/logic/todos');

function reactRenderer(req, res) {
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

  var app = renderToString(
    <Provider store={store}>
      <App />
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
}

module.exports = reactRenderer;
