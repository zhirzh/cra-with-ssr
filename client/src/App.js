import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';

const NoMatch = () => (
  <div>
    <h1>404</h1>
    Page Not Found
  </div>
);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route render={NoMatch} />
      </Switch>
    )
  }
}

export default App;
