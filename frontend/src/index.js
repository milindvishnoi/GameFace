import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme'
import Navbar from './components/global/header/Navbar';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/global/footer/Footer';

let theme = darkTheme

const toggleTheme = () => {
  theme = theme === darkTheme ? lightTheme : darkTheme
  return theme
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Navbar currentTheme={theme} />
          <App />
          <Footer />
        </CssBaseline>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
