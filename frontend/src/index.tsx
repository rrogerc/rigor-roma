import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import {Provider} from 'react-redux';
import store from './store';

// Router (for navigation)
import {BrowserRouter as Router} from 'react-router-dom';

// App
import App from './App';
import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
