/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "assets/css/material-dashboard-react.css?v=1.8.0"
import { siteName } from "variables/config.json"
import logo from "assets/img/Logo.png"
import Notifier from "components/Snackbar/Notifier"
import Confirm from "components/Confirm"
import { createBrowserHistory } from "history"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import React from "react"
import ReactDOM from "react-dom"
import Provider from "react-redux/es/components/Provider"
import { Router as DomRouter } from "react-router-dom"
import store from "./redux"
import Router from "./Router.js"
import { primaryColor, secondaryColor } from "assets/jss/material-dashboard-react.js"
import "assets/css/flex.css"

const hist = createBrowserHistory()

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primaryColor[0],
      main: primaryColor[2],
      dark: primaryColor[3],
      contrastText: "#fff",
    },
    secondary: {
      light: secondaryColor[0],
      main: secondaryColor[2],
      dark: secondaryColor[3],
      contrastText: "#fff",
    },
  },
})

const setState = React.Component.prototype.setState
React.Component.prototype.setState = function(newState, cb) {
  return new Promise(resolve =>
    setState.call(this, newState, _ => {
      if (cb) cb()
      resolve()
    })
  )
}
window.siteLogo = logo
window.document.title = siteName
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Notifier />
      <Confirm />
      <DomRouter history={hist}>
        <Router />
      </DomRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
)

/**
 * TODO:
 * add https://github.com/cybertec-postgresql/rjsf-material-ui
 */
