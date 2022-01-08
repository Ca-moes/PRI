import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline, ThemeProvider} from "@mui/material";
import AppRouter from "./AppRouter";
import AppTheme from "./AppTheme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <CssBaseline/>
      <AppRouter/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
