import React from "react";
import Provider from 'react-redux/es/components/Provider';
import store from './redux';
import { connect } from 'react-redux';
import { Router as DomRouter, Route, Switch, Redirect } from "react-router-dom";
import reducer from 'redux/reducers';
import Admin from "layouts/Admin.js";
import { withRouter } from "react-router";
import withReducer from "redux/withReducer"
import * as Actions from 'redux/actions';

class Router extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props)
    this.tryAutoLogin()
  }

  tryAutoLogin = () => {
    if (this.props.user) return
    this.props.dispatch(Actions.autoLogin()).then(logged => {
      if (logged) {
        this.props.history.push("/home/dashboard")
      } else {
        this.props.history.push("/home/login")
      }
    })
  }

  render() {
    return <Switch>
      <Route path="/home" component={Admin} />
      <Redirect from="/" to="/home/dashboard" />
    </Switch>
  }
}

const mapStateToProps = (state) => ({ user: state.reducer.user })
export default withRouter((withReducer("reducer", reducer)(connect(mapStateToProps)(Router))))