import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="776234119744-shvinuoi1c0bm5ks4dis7hgpft48knfi.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);