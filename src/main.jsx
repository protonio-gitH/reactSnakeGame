import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import { Provider} from 'react-redux';
import { thunk } from 'redux-thunk';
import reducer from './store/reducer.js';


const store = createStore(reducer,applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
)
