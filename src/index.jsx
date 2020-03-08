import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store/index';
import saveCoors from './actions/index';

window.store = store;
window.saveCoors = saveCoors;
store.subscribe(() => console.log('Look ma, Redux!!'));
store.dispatch(
  saveCoors({
    date: new Date(),
    address: { city: 'city0', country: 'country0' },
    coors: [50, 50],
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
