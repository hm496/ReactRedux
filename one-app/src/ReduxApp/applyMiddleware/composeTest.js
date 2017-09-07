function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function proFn(num) {
  let fnArr = [];
  for (let i = 0; i < num; i++) {
    let a = function () {
      console.log(i);
    }
    a.name = "a" + i;
    fnArr.push(a);
  }
  return fnArr;
}

let funcs = proFn(5);

// let composeFns = funcs.reduce(function (a, b) {
//   return function ab(...args) {
//     a(b(...args))
//   }
// });

var fn1 = _ => {
  console.log(_);
  return 1
};
var fn2 = _ => {
  console.log(_);
  return 2
};
var fn3 = _ => {
  console.log(_);
  return 3
};
var fn4 = _ => {
  console.log(_);
  return 4
};

function fn1_2(...args) {
  fn1(fn2(...args))
}

function fn1_2_3(...args) {
  fn1_2(fn3(...args))
}

function fn1_2_3_4(...args) {
  fn1_2_3(fn4(...args))
}

fn1_2_3_4(1234);