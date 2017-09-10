import ReactDOM from 'react-dom'
import React from 'react'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import routes from './routes/index'

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <div>
      {routes}
    </div>
  </Provider>
), document.getElementById('root'));