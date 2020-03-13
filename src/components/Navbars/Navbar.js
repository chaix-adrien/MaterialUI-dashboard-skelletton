import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Hidden from "@material-ui/core/Hidden"
// @material-ui/icons
import Menu from "@material-ui/icons/Menu"
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js"
import Button from "components/CustomButtons/Button.js"
import { matchPath } from "react-router"
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js"
import { Icon } from "@material-ui/core"
import { withRouter } from "react-router"

const useStyles = makeStyles(styles)

const header = function Header(props) {
  const classes = useStyles()
  function getRoute(routes) {
    for (let id = 0; id < routes.length; id++) {
      const prop = routes[id]
      if (!(prop.path === "/" && !prop.layout)) {
        const himself = matchPath(window.location.pathname, {
          path: (prop.layout || "") + prop.path + (prop.params || ""),
          exact: true,
        })
        if (himself) return prop
        if (prop.children) {
          const child = getRoute(prop.children)
          if (child) return { ...child, isChild: prop }
        }
      }
    }
  }
  const { color } = props
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  })
  const currentRoute = getRoute(props.routes)
  if (!currentRoute || currentRoute.hideHeader)
    return (
      <Hidden mdUp implementation='css'>
        <AppBar
          className={classes.appBar + appBarClasses}
          style={{ position: "fixed", top: 0, right: 0, width: 50, height: 50, display: "flex", justifyContent: "center" }}>
          <IconButton style={{ padding: 0 }} color='inherit' aria-label='open drawer' onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </AppBar>
      </Hidden>
    )
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {currentRoute.isChild && (
            <IconButton onClick={_ => props.history.push((currentRoute.isChild.layout || "") + currentRoute.isChild.path)}>
              <Icon style={{ color: "white" }}>arrow_back</Icon>
            </IconButton>
          )}
          <Button color='transparent' href='#' className={classes.title}>
            {currentRoute.name}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <IconButton color='inherit' aria-label='open drawer' onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
}

export default withRouter(header)
