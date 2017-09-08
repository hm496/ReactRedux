// routes/index.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './history'

import Frame from '../views/Frame'
import Home from '../views/Home'
import Detail from '../views/Detail'
import { ConnectedRouter } from 'react-router-redux';


const routes = (history) => (
  <ConnectedRouter history={history}>
    <Route path="/">
      <Frame>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/detail/:id" component={Detail}/>
        </Switch>
      </Frame>
    </Route>
  </ConnectedRouter>
);

export default routes;