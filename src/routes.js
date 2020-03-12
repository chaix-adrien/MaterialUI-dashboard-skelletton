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
import DashboardPage from "views/Dashboard/Dashboard.js"
import Login from "views/Login.js"
// core components/views for Admin layout
import LogOutPage from "views/Logout.js"
import FormEditor from "views/Form/FormEditor.js"
import FormList from "views/Form/FormList.js"
import Welcome from "views/Welcome.js"
// core components/views for RTL layout

//ROLE: null = not loged, [1, 2, 3...] = only for 1 OR 2 OR 3, [] = logged, undefined = for all

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
    icon: "lock",
    component: Login,
    hideHeader: true,
    role: null,
  },
  {
    type: "title",
    text: "Administrateur",
    role: [1],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard",
    component: DashboardPage,
    layout: "/admin",
    role: [1, 2],
  },
  {
    path: "/form/",
    name: "Form List",
    icon: "list_alt",
    component: FormList,
    children: [
      {
        path: "/view/",
        layout: "/form",
        params: ":id/:edit?",
        defaultParams: "new",
        sideName: "New Form",
        icon: "post_add",
        name: "Form Editor",
        hidden: true,
        component: FormEditor,
      },
      {
        path: "/view/new",
        layout: "/form",
        sideName: "New Form",
        icon: "post_add",
        name: "Form Editor",
        hidden: false,
        component: FormEditor,
      },
    ],
  },
  {
    type: "separator",
    role: [],
  },
  {
    path: "/logout",
    name: "Déconnexion",
    icon: "exit_to_app",
    component: LogOutPage,
    bottom: 10,
    role: [],
  },
]

export default dashboardRoutes
