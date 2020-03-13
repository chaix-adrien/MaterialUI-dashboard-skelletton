import React from "react"
import PubSub from "pubsub-js"
import Snackbar from "components/Snackbar/Snackbar.js"
import ErrorIcon from "@material-ui/icons/ErrorOutline"

PubSub.notif = notif => PubSub.publish("NOTIF", notif)
class Notifier extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notif: null, open: false }
  }

  componentDidMount() {
    this.sub = PubSub.subscribe("NOTIF", (_, notif) => this.setState({ notif, open: true }))
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.sub)
  }

  render() {
    const { notif, open } = this.state
    return (
      <Snackbar
        place='bc'
        color={notif ? notif.color || "info" : ""}
        icon={notif ? notif.icon || (notif.color === "danger" ? ErrorIcon : undefined) : undefined}
        message={notif ? notif.txt : ""}
        open={open}
        closeNotification={() => this.setState({ open: false })}
        close
      />
    )
  }
}

export default Notifier
