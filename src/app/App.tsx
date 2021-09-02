import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'data/store';

import GlobalStyles from "../presentation/styles/GlobalStyles";
import DefaultTheme from "../presentation/styles/themes/defaultTheme";

import Routes from "../infra/routes";
import ToastProvider from "../data/hooks/toast";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    {/* <Router> */}
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    {/* </Router> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
