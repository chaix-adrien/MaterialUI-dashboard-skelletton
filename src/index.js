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
import React from "react"
import ReactDOM from "react-dom"
import Provider from "react-redux/es/components/Provider"
import { Router as DomRouter } from "react-router-dom"
import store from "./redux"
import Router from "./Router.js"
const hist = createBrowserHistory()

const setState = React.Component.prototype.setState
React.Component.prototype.setState = function(newState) {
  return new Promise(resolve => setState.call(this, newState, resolve))
}

window.siteLogo = logo
window.document.title = siteName
ReactDOM.render(
  <Provider store={store}>
    <Notifier />
    <Confirm />
    <DomRouter history={hist}>
      <Router />
    </DomRouter>
  </Provider>,
  document.getElementById("root")
)
