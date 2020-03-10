// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "assets/img/sidebar-2.jpg";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "routes.js";
import View404 from "views/View404.js";
import { siteName } from "variables/config.json"




let ps;

const switchRoutes = (classes) => (
  <Switch>
    {routes.map((prop, key) => {

      if (prop.path)
        return (
          <Route
            exact
            path={(prop.layout || "") + prop.path}
            render={(props) => {
              if (prop.hideHeader)
                return <prop.component {...props} />
              else
                return <><div className={classes.headerFill} />
                  <prop.component {...props} />
                </>
            }}
            key={key}
          />
        )
      else return null
    })}
    <Route component={View404} />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={siteName}
        logo={window.siteLogo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>

          <div className={classes.container}>{switchRoutes(classes)}</div>
        </div>
      </div>
    </div>
  );
}
