import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() { }
  componentWillUnmount() { }

  render() {
    const c = this.props.classes
    return (<div className={c.container}>

    </div>)
  }
}

const styles = theme => ({
  container: {
  }
})

export default withStyles(styles)(withReducer(Login))