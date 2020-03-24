import { CircularProgress } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import CssBaseline from "@material-ui/core/CssBaseline"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import {} from "assets/jss/material-dashboard-react.js"
import PubSub from "pubsub-js"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Actions from "redux/actions"
import reducer from "redux/reducers"
import withReducer from "redux/withReducer"
import { GoogleLogin } from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { googleClientId, facebookClientId, googleLogin, facebookLogin } from "variables/config.json"
var dispatch

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      remember: true,
      login: false,
    }
    dispatch = this.props.dispatch
  }

  login = loginData => {
    this.setState({ login: true })
    loginData.remember = this.state.remember
    dispatch(Actions.login(loginData)).then(logged => {
      this.setState({ login: false })
      if (logged) {
        this.props.history.push("/")
      } else {
        PubSub.notif({ txt: "Impossible de vous connecter. Verrifiez vos identidiants", color: "danger" })
      }
    })
  }

  render() {
    const c = this.props.classes
    const { email, password, remember, login } = this.state
    return (
      <Grid container component='main' className={c.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={c.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={c.paper}>
            <Avatar className={c.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Connexion
            </Typography>
            <form className={c.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                label='Adresse mail'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Mot de passe'
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' checked={remember} onChange={_ => this.setState({ remember: !remember })} color='primary' />}
                label='Se souvenir de moi'
              />
              <div style={{ margin: 5, display: "flex", justifyContent: "center" }}>
                {login ? (
                  <CircularProgress />
                ) : (
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={_ => this.login({ type: "legacy", email, password })}
                    className={c.submit}>
                    SE CONNECTER
                  </Button>
                )}
              </div>
              <h3 style={{ textAlign: "center", marginTop: 0 }}>OU</h3>
              {googleLogin && (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: 30 }}>
                  <GoogleLogin
                    clientId={googleClientId}
                    buttonText='Se connecter avec Google'
                    onSuccess={rep => this.login({ type: "google", token: rep.tokenObj.access_token })}
                    onFailure={_ =>
                      PubSub.notif({
                        txt: "Une erreur est survenue pendant votre connexion avec Google. Veuillez réessayer plus tard.",
                        color: "danger",
                      })
                    }
                    style={{ width: "100%" }}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              )}
              {facebookLogin && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: 30,
                  }}>
                  <FacebookLogin
                    appId={facebookClientId}
                    autoLoad={true}
                    textButton='Se connecter avec Facebook'
                    fields='name,email,picture'
                    callback={console.log}
                  />
                </div>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Mot de passe oublié ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Pas encore de compte? Créez en un !"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  root: {
    height: "98%",
    marginTop: "1%",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "dark" ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

const mapStateToProps = state => ({ fiches: state.reducer.fiches })
export default withRouter(withStyles(styles)(withReducer("reducer", reducer)(connect(mapStateToProps)(Login))))
