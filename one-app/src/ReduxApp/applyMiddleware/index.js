// import applyMiddleware from "./applyMiddleware.js";
import compose from './compose';

var a = 1;
const logger = store => next => action => {
  debugger;
  console.log(next, action);
  //next(action) 传递个下一个中间件action
  //原始数据从store获得
  next(a++);
};

const logger2 = store => next => action => {
  debugger;
  console.log(next, action);
  next(a++);
};
// debugger;
// var w1 = applyMiddleware(logger, logger, logger, logger);
// var w2 = w1(function createStore() {
//   console.log("createStore");
//   return {
//     dispatch: "dispatch",
//     getState: "getState",
//   }
// });
// var w3 = w2();


function MidLite(...middlewares) {
  const middlewareAPI = {
    getState: "getState",
    dispatch: "dispatch"
  }
  let store = {
    dispatch: "dispatch"
  }

  let chain = middlewares.map(middleware => middleware(middlewareAPI))
  let dispatch = compose(...chain)(store.dispatch);
  dispatch("action");
}

MidLite(logger, logger, logger, logger2);

//chain数组中都是  middleware(middlewareAPI)执行一次之后的函数
/*
还剩
next => action => {
  console.log(next, action);
};
* */