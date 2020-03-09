import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";
import { connect } from 'react-redux';
import reducer from 'redux/reducers';
import * as Actions from 'redux/actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import PubSub from 'pubsub-js'
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import { CircularProgress } from '@material-ui/core';

var dispatch

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      remember: true,
      login: false
    }
    dispatch = this.props.dispatch
  }

  componentDidMount() {
    console.log(this.props)
  }

  login = () => {
    this.setState({ login: true })
    dispatch(Actions.login(this.state.email, this.state.password, this.state.remember)).then(logged => {
      this.setState({ login: false })
      if (logged) {
        this.props.history.push("/home")
      } else {
        PubSub.notif({ txt: "Impossible de vous connecter. Verrifiez vos identidiants", icon: ErrorIcon, color: "danger" })
      }
    })

  }

  render() {
    const c = this.props.classes
    const { email, password, remember, login } = this.state
    return (<Grid container component="main" className={c.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={c.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={c.paper}>
          <Avatar className={c.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form className={c.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              label="Adresse mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" checked={remember} onChange={_ => this.setState({ remember: !remember })} color="primary" />}
              label="Se souvenir de moi"
            />
            <div style={{ margin: 5, display: "flex", justifyContent: "center" }}>

              {login ? <CircularProgress /> : <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.login}
                className={c.submit}
              >
                SE CONNECTER
            </Button>}
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Pas encore de compte? Créez en un !"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>)
  }
}

const styles = theme => ({
  root: {
    height: "99%"
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})


const mapStateToProps = (state) => ({ fiches: state.reducer.fiches })
export default withRouter(withStyles(styles)(withReducer("reducer", reducer)(connect(mapStateToProps)(Login))))