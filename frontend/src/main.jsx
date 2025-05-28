import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/dist/modal";
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './ReduxManager/Store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
    <Router>

        <GoogleOAuthProvider clientId="26290190977-toqhf206o4i5egca82v76r4jnocjcto7.apps.googleusercontent.com">
            <Provider store={store}>
                <App />
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Provider>
        </GoogleOAuthProvider>
    </Router>
)
