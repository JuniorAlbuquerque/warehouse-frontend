import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../presentation/styles/GlobalStyles";
import DefaultTheme from "../presentation/styles/themes/defaultTheme";

import Routes from "../infra/routes";
import ToastProvider from "../data/hooks/toast";

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
