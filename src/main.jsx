import { createRoot } from 'react-dom/client'
import './index.css'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/dist/modal";
import {BrowserRouter  as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './ReduxManager/Store'


createRoot(document.getElementById('root')).render(
  <Router>
        <Provider store={store}>
            <App />
        </Provider>
      
    </Router>
)
