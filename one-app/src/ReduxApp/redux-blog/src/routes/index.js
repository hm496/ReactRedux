// routes/index.js
import React from 'react';
import { Router, Route, HashRouter } from 'react-router-dom';
import Home from '../views/Home';
import Detail from '../views/Detail'

const routes = (
  <HashRouter
    basename="/"
  >
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/detail/:id" component={Detail}/>
    </div>
  </HashRouter>
);

export default routes;