import React from "react";
import App from './App';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  );
}
