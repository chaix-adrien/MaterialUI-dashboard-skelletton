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
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import DashboardPage from "views/Dashboard/Dashboard.js";
// core components/views for Admin layout
import LogOutPage from "views/Logout.js";
import Login from "views/Login.js";
import Welcome from "views/Welcome.js";
// core components/views for RTL layout

//ROLE: null = not loged, [1, 2, 3...] = only for 1 OR 2 OR 3, [] = logged

const dashboardRoutes = [
  {
    path: "/",
    name: "Home",
    tabTitle: "Acceuil",
    hidden: true,
    hideHeader: true,
    component: Welcome,
  },
  {
    path: "/login",
    name: "Se connecter",
    icon: DashboardIcon,
    component: Login,
    role: null,
  },
  {
    type: "title",
    text: "Administrateur",
    role: [1]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: DashboardPage,
    layout: "/admin",
    role: [1, 2]
  },
  {
    type: "separator",
    role: []
  },
  {
    path: "/logout",
    name: "Déconnexion",
    icon: LogOutIcon,
    component: LogOutPage,
    role: []
  },
];

export default dashboardRoutes;
