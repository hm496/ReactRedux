// routes/index.js
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Frame from '../views/Frame'
import Home from '../views/Home'
import Detail from '../views/Detail'

const routes = (
  <Router>
    <Route path="/">
      <Frame>
        <Route exact path="/" component={Home}/>
        <Route path="/detail/:id" component={Detail}/>
      </Frame>
    </Route>
  </Router>
);

export default routes;