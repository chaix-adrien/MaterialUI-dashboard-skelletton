import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.js";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    padding: "0px 10px",
    minHeight: "calc(100vh - 123px)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  container: { ...container, height: "100%", marginRight: 0, marginLeft: 0 },
  map: {
    marginTop: "70px"
  },
  headerFill: {
    minHeight: 85,
    height: 85,
  }
});

export default appStyle;
