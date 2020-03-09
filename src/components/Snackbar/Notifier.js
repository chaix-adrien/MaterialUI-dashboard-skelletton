import { } from "assets/jss/material-dashboard-react.js";
import React from 'react';
import PubSub from 'pubsub-js'
import Snackbar from "components/Snackbar/Snackbar.js";
PubSub.notif = (notif) => PubSub.publish('NOTIF', notif)
class Notifier extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notif: null }
  }

  componentDidMount() {
    this.sub = PubSub.subscribe('NOTIF', (_, notif) => this.setState({ notif }));
    //dispatch(Actions.getFiches())
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.sub)

  }

  render() {
    const { notif } = this.state
    if (!notif) return null
    return (<Snackbar
      place="bc"
      color={notif.color || "info"}
      icon={notif.icon}
      message={notif.txt}
      open={this.state.notif ? true : false}
      closeNotification={() => this.setState({ notif: null })}
      close
    />)
  }
}

export default Notifier