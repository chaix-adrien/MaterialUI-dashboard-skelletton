import Admin from "layouts/Admin.js"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Route, Switch } from "react-router-dom"
import Actions from "redux/actions"
import reducer from "redux/reducers"
import withReducer from "redux/withReducer"

class Router extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
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
    return (
      <Switch>
        <Route component={Admin} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({ user: state.reducer.user })
export default withRouter(withReducer("reducer", reducer)(connect(mapStateToProps)(Router)))
