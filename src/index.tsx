import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import './index.css';
import store, { history } from './store'
import reportWebVitals from './reportWebVitals';
import { currentUser } from './actions';
import { getToken } from './store/selectors';

// import AppInitialize from './AppInitialize'
const AppInitialize = Loadable({
  loader: () => import('./AppInitialize'),
  loading: () => <div className="loading" />
})

if (getToken()) {
  store.dispatch(currentUser(getToken()))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppInitialize history={history} />
    </Provider>
  </React.StrictMode>,
  // <Provider store={store}>
  //   <AppInitialize history={history} />
  // </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
