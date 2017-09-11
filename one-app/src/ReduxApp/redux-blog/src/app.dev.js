import ReactDOM from 'react-dom'
import React from 'react'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import DevTools from './containers/DevTools';

import routes from './routes/index'

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <div>
      {routes}
      <DevTools/>
    </div>
  </Provider>
), document.getElementById('root'));