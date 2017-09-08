import ReactDOM from 'react-dom'
import React from 'react'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'


import history from './routes/history'
import routes from './routes/index'

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    {routes(history)}
  </Provider>
), document.getElementById('root'));

// import ReactDOM from 'react-dom';
// import routes from './routes/';
//
// ReactDOM.render(routes, document.getElementById("root"));