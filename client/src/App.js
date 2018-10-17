import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Home from './Home';
import ParaPage from './ParaPage';

const NoMatch = () => (
  <div>
    <h1>404</h1>
    Page Not Found
  </div>
);

const DynaPageAsync = Loadable({
  loading: () => <h1>Loading...</h1>,
  loader: () => import(/* webpackChunkName: "DynaPage" */  './DynaPage'),
});

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/para/:number_regex(\d+)" component={ParaPage} />
        <Route path="/para/:text_regex([a-zA-Z]+)" component={ParaPage} />
        <Route path="/para/:any" component={ParaPage} />
        <Route path="/para/:any_regex(.*)" component={ParaPage} />
        <Route path="/para/(.*)" component={ParaPage} />
        <Route path="/para/*" component={ParaPage} />
        <Route path="/para/:any_optional?" component={ParaPage} />
        <Route path="/para" exact component={ParaPage} />

        <Route path="/dyna" component={DynaPageAsync} />

        <Route render={NoMatch} />
      </Switch>
    )
  }
}

export default App;
