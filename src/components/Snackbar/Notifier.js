import React from 'react';
import PubSub from 'pubsub-js'
import Snackbar from "components/Snackbar/Snackbar.js";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

PubSub.notif = (notif) => PubSub.publish('NOTIF', notif)
class Notifier extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notif: null }
  }

  componentDidMount() {
    this.sub = PubSub.subscribe('NOTIF', (_, notif) => this.setState({ notif }));
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
      icon={notif.icon || (notif.color === "danger" ? ErrorIcon : undefined)}
      message={notif.txt}
      open={this.state.notif ? true : false}
      closeNotification={() => this.setState({ notif: null })}
      close
    />)
  }
}

export default Notifier