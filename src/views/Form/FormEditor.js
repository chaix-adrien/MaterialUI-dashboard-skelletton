import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";
import { connect } from 'react-redux';
import reducer from 'redux/reducers';
import Form from "react-jsonschema-form";
import * as Actions from 'redux/actions';
import { withRouter } from "react-router";
import "assets/css/form-auto.css";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
var dispatch

class FormEditor extends React.Component {
  constructor(props) {
    super(props)
    dispatch = this.props.dispatch
    this.isNew = props.match.params.id === "new"
    this.edit = props.match.params.edit ? true : false
    this.readOnly = !this.isNew && !this.edit
  }

  componentDidMount() {
    if (!this.isNew)
      dispatch(Actions.getUser(this.props.match.params.id))
    else
      dispatch(Actions.getUser())
  }

  componentDidUpdate(prevProps, prevState) {
    this.isNew = this.props.match.params.id === "new"
    this.edit = this.props.match.params.edit ? true : false
    this.readOnly = !this.isNew && !this.edit
    if (this.props.match.params !== prevProps.match.params) {
      this.componentDidMount()
    }
  }


  onSubmit = (form) => {
    console.log("VALIDATE", form)
  }

  getFormSchema = () => {
    const { editUser } = this.props
    const { readOnly, isNew } = this
    function getDefault(key) {
      if (isNew || !editUser)
        return { default: undefined }
      return { default: editUser[key] }
    }
    return {
      type: "object",
      required: ["nom", "prenom", "email", "role"],
      properties: {
        nom: { ...getDefault("nom"), type: "string", title: "Nom", readOnly },
        prenom: { ...getDefault("prenom"), type: "string", title: "Prénom", readOnly },
        email: { ...getDefault("email"), type: "string", title: "Mail", format: 'email', readOnly },
        adresse: { ...getDefault("adresse"), type: "string", title: "Adresse", readOnly },
        cp: { ...getDefault("cp"), type: "integer", title: "Code Postal", readOnly },
        ville: { ...getDefault("ville"), type: "string", title: "Ville", readOnly },
        telephone: { ...getDefault("telephone"), type: "integer", title: "Téléphone", readOnly },
        ...(!this.readOnly ? { password: { ...getDefault("password"), type: "string", format: "email", title: "Mot de passe", readOnly } } : {}),
        role: { ...getDefault("role"), default: 2, title: "Role", readOnly, enum: [1, 2, 3], enumNames: ["Formateur", "Administrateur", "Responsable"] },
      }
    }
  }

  render() {
    console.log("new", this.isNew, "edit", this.edit)
    const c = this.props.classes
    const { editUser } = this.props
    return (<div className={c.container}>
      <Card className={c.formCard + " formauto " + (this.readOnly ? " formReadOnly" : "")} >
        <CardHeader color="info">
          <h4 style={{ textAlign: "center" }}>{editUser ? (editUser.prenom + " " + editUser.nom) : "Nouveau Formulaire"}</h4>
        </CardHeader>
        <CardBody>
          <Form schema={this.getFormSchema()}
            ref={e => this.form = e}
            noValidate={true}
            onSubmit={this.onSubmit}
            onError={console.log} >
            <Button color="primary" type="submit" variant="contained" style={{ visibility: this.readOnly ? "hidden" : "visible", margin: "auto", display: "flex", marginBottom: 15 }} className={this.readOnly ? "hidden" : ""}>Valider</Button>
          </Form>
        </CardBody>
      </Card>
    </div>)
  }
}

const styles = theme => ({
  container: {
    margin: 50
  },
  formCard: {
    maxWidth: 600,
    margin: "auto"
  }
})


const mapStateToProps = (state) => ({ editUser: state.reducer.editUser })
export default withRouter(withStyles(styles)(withReducer("reducer", reducer)(connect(mapStateToProps)(FormEditor))))