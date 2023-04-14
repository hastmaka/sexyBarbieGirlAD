import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme";
import store from './store';
import EzConfirmDialog from "./components/ezComponents/EzConfirmDialog/EzConfirmDialog";
import EzNotification from "./components/ezComponents/EzNotification/EzNotification";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
                  <ThemeProvider>
                      <App/>
                      <EzNotification/>
                      <EzConfirmDialog/>
                  </ThemeProvider>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
