import {
  defaultFont,
  container,
  darkComponents,
} from "assets/jss/material-dashboard-react.js";
import { whiteColor } from "assets/jss/material-dashboard-react";
import { blackColor } from "assets/jss/material-dashboard-react";
import Values from 'values.js'
console.log(new Values("#ff9f00").shade(50))
const footerStyle = {
  block: {
    color: "inherit",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    fontSize: "14px",
    color: darkComponents.sideBar ? blackColor : whiteColor,
    float: "right!important"
  },
  footer: {
    bottom: "0",
    padding: "15px 0",
    position: "absolute",
    right: 0,
    ...defaultFont
  },
  container,
  a: {
    color: "#" + new Values("#ff9f00").shade(darkComponents.sideBar ? 50 : 0).hex,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  }
};
export default footerStyle;
