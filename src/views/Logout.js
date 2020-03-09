import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";
import { connect } from 'react-redux';
import reducer from 'redux/reducers';
import * as Actions from 'redux/actions';
import { withRouter } from "react-router";
var dispatch

class Logout extends React.Component {
  constructor(props) {
    super(props)
    dispatch = this.props.dispatch
  }

  componentDidMount() {
    dispatch(Actions.logout())
    this.props.history.push("/home/login")
  }

  componentWillUnmount() { }

  render() {
    const c = this.props.classes
    const { fiches } = this.props
    return (<div className={c.container}>
    </div>)
  }
}

const styles = theme => ({
  container: {
  }
})


const mapStateToProps = (state) => ({ fiches: state.reducer.fiches })
export default withRouter(withStyles(styles)(withReducer("reducer", reducer)(connect(mapStateToProps)(Logout))))