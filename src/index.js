
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

//Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import ChartForce from './components/ChartForce';


//Redux
const middleware = [ thunk ];
middleware.push(createLogger());
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

require('./images/favicon.ico');
let element = document.getElementById('app');
ReactDom.render(
  <Provider store={store}>
    <ChartForce />
  </Provider>, element);
  
document.body.classList.remove('loading');

