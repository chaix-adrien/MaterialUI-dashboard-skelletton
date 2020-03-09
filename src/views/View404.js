import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";
import { connect } from 'react-redux';
import reducer from 'redux/reducers';
import * as Actions from 'redux/actions';
import { withRouter } from "react-router";
import { Typography } from '@material-ui/core';
import Primary from 'components/Typography/Primary';
var dispatch

class View404 extends React.PureComponent {
  render() {
    const c = this.props.classes
    return (<div className={c.container}>
      <h1>Cette page n'existe pas...</h1>
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


export default withStyles(styles)(View404)