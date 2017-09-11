import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { history } from '../routes/history'

import createFetchMiddleware from 'redux-composable-fetch';
import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from '../containers/DevTools';

const FetchMiddleware = createFetchMiddleware({
  afterFetch({ action, result }) {
    return result.json().then(data => {
      return Promise.resolve({
        action: action,
        result: data,
      });
    });
  },
});

//react-router-redux相关
const HistoryMiddleware = routerMiddleware(history);
//store
const finalCreateStore = compose(
  applyMiddleware(ThunkMiddleware, FetchMiddleware, HistoryMiddleware),
  DevTools.instrument()
)(createStore);
const reducer = combineReducers(Object.assign({}, rootReducer, {
  router: routerReducer,
}));
//react-router-redux相关END


export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}