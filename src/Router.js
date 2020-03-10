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
    this.props.dispatch(Actions.autoLogin()).then(state => {
      if (state.logged) {
      } else if (state.wasLogged) {
        this.props.dispatch(Actions.logout())
        this.props.history.push("/login")
      }
    })
  }

  render() {
    return <Switch>
      <Route component={Admin} />
    </Switch>
  }
}

const mapStateToProps = (state) => ({ user: state.reducer.user })
export default withRouter((withReducer("reducer", reducer)(connect(mapStateToProps)(Router))))