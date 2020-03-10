import { withStyles } from "@material-ui/core/styles";
import { } from "assets/jss/material-dashboard-react.js";
import React from 'react';

class Welcome extends React.PureComponent {
  render() {
    const c = this.props.classes
    return (<div className={c.container}>
      <img src={window.siteLogo} alt="logo" className={c.logo} />
      <h1>{window.siteName}</h1>
    </div>)
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%"
  },
  logo: {
    objectFit: "contain",
    maxHeight: "50%",
    width: "50%"
  }
})


export default withStyles(styles)(Welcome)