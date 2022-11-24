import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme";
import store from './store';
import EzNotification from "./components/ezComponents/EzNotification/EzNotification";
import EzConfirmDialog from "./components/ezComponents/EzConfirmDialog/EzConfirmDialog";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
                  <ThemeProvider>
                      <App/>
                      <EzNotification/>
                      <EzConfirmDialog/>
                      {/*<EzModalWithTransition/>*/}
                  </ThemeProvider>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
