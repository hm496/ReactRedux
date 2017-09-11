import 'babel-polyfill';
import 'whatwg-fetch';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app.prod');
} else {
  module.exports = require('./app.dev');
}