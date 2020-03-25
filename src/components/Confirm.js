import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import PubSub from "pubsub-js"

PubSub.confirm = confirm => PubSub.publish("CONFIRM", confirm)

export default class Confirm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { confirm: false }
  }

  componentDidMount() {
    this.sub = PubSub.subscribe("CONFIRM", (_, confirm) => this.setState({ confirm }))
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.sub)
  }

  onBtnClicked = cb => {
    this.setState({ confirm: null })
    if (cb) cb()
  }

  render() {
    const { confirm } = this.state
    if (!confirm) return null
    return (
      <div>
        <Dialog
          open={confirm ? true : false}
          onClose={_ => this.setState({ confirm: null })}
          aria-labelledby='alert-dialog-title'
          PaperProps={{ style: { minWidth: 400, minHeight: 200, justifyContent: "space-between" } }}
          aria-describedby='alert-dialog-description'>
          {confirm.title && <DialogTitle id='alert-dialog-title'>{confirm.title}</DialogTitle>}
          {confirm.subtitle && (
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>{confirm.subtitle}</DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            {!confirm.buttons && (
              <>
                <Button onClick={_ => this.onBtnClicked(confirm.onDisagree)} color='primary'>
                  Annuler
                </Button>
                <Button onClick={_ => this.onBtnClicked(confirm.onAgree)} color='primary' autoFocus>
                  Valider
                </Button>
              </>
            )}
            {confirm.buttons &&
              confirm.buttons.map((btn, id) => (
                <Button key={id} onClick={_ => this.onBtnClicked(btn.onClick)} color='primary'>
                  {btn.txt}
                </Button>
              ))}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
