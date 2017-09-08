import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { history } from '../routes/history'

import ThunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

//react-router-redux相关
const HistoryMiddleware = routerMiddleware(history);
//store
const finalCreateStore = compose(
  applyMiddleware(HistoryMiddleware, ThunkMiddleware)
)(createStore);
const reducer = combineReducers(Object.assign({}, rootReducer, {
  router: routerReducer,
}));
//react-router-redux相关END


export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}