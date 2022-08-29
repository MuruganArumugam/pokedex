import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//redux thunk
import { Provider } from 'react-redux';
import store from './store';



const theme = createMuiTheme({
  typography: {
    h5: {
      fontFamily: 'Bangers',
    },
    h3: {
      fontFamily: 'Bangers',

    },
    h6: {
      fontFamily: 'Sanchez',
    },
    h1: {
      fontFamily: 'Bangers',
    },

  }

});
const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>

  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
