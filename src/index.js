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
import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router.js";
import Provider from 'react-redux/es/components/Provider';
import store from './redux';
import { Router as DomRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
// core components

import "assets/css/material-dashboard-react.css?v=1.8.0";


const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <DomRouter history={hist} >
      <Router />
    </DomRouter>
  </Provider>
  ,
  document.getElementById("root")
);
