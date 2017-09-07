//异步串联


function getCurrCity(ip) {
  return {
    url: '/api/getCurrCity.json',
    params: { ip },
    types: [null, 'GET_CITY_SUCCESS', null],
  }
}

function getWeather(cityId) {
  debugger;
  return {
    url: '/api/getWeatherInfo.json',
    params: { cityId },
    types: [null, 'GET_WEATHER_SUCCESS', null],
  };
}

function loadInitData(ip) {
  return [
    getCurrCity(ip),
    (dispatch, state) => {
      debugger;
      dispatch(getWeather(getCityIdWithState(state)));
    },
  ];
}

var actionArr = loadInitData(110);

dispatch = (currAction) => {
  debugger;
  currAction();
  return Promise.resolve("dispatch");
};

actionArr.reduce((result, currAction) => {
  return result.then(() => {
    debugger;
    return Array.isArray(currAction) ?
      Promise.all(currAction.map(item => dispatch(item))) :
      dispatch(currAction);
  });
}, Promise.resolve());