/*eslint-disable*/
import { Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import classNames from "classnames";
import Footer from "components/Footer/Footer";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { siteName } from "variables/config.json"
import { matchPath } from "react-router";


const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const user = useSelector(({ reducer: { user } }) => user);
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(prop) {
    return matchPath(window.location.pathname, {
      path: (prop.layout || "") + prop.path + (prop.params || ""),
      exact: !prop.children
    });
  }

  function handleRoutesLinks(routes, parentKey = "", mobile) {
    return <List className={classes.list} style={{ width: parentKey.length ? "90%" : "100%", marginLeft: "auto" }}>
      {routes.map((prop, key) => {
        key = parentKey + "_" + key
        if (prop.path && activeRoute(prop))
          window.document.title = siteName + " " + (prop.tabTitle || prop.name)
        if (prop.hidden) return null
        if (prop.role === null && user) return null
        if (prop.role && !user) return null
        if (prop.role && prop.role.length && !prop.role.includes(user.role)) return null
        if (prop.type === "separator") return <div key={key} className={classes.separator} />
        if (prop.type === "title") return <Typography key={key} className={classes.title}>{prop.text}</Typography>
        var listItemClasses;
        listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop)
        });
        return (<div key={key}>
          <NavLink
            to={(prop.layout || "") + prop.path + (prop.defaultParams || "")}
            className={classes.item}
            onClick={mobile ? props.handleDrawerToggle : undefined}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive
                    })}
                  />
                )}
              <ListItemText
                primary={prop.sideName || prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
          {activeRoute(prop) && prop.children && handleRoutesLinks(prop.children, key)}
        </div>)
      })}
    </List>
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (mobile) => (
    <>
      {handleRoutesLinks(routes, "", mobile)}
      < Footer />
    </>
  );
  var brand = (
    <div className={classes.logo}>
      <div
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links(true)}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links(false)}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
