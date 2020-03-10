import React from 'react'
import withReducer from "redux/withReducer"
import { withStyles } from "@material-ui/core/styles"
import { } from "assets/jss/material-dashboard-react.js";
import { connect } from 'react-redux';
import reducer from 'redux/reducers';
import * as Actions from 'redux/actions';
import { withRouter } from "react-router";
import MaterialTable from "material-table";

var dispatch

class FormList extends React.Component {
  constructor(props) {
    super(props)
    dispatch = this.props.dispatch
  }

  componentDidMount() {
    dispatch(Actions.getUsers())
  }

  render() {
    const c = this.props.classes
    const { users } = this.props
    return (<div className={c.container}>
      <MaterialTable
        title=""
        isLoading={!users}
        columns={[
          { title: 'Nom', field: 'nom' },
          { title: 'Prénom', field: 'prenom' },
        ]}
        actions={[
          {
            icon: "edit",
            tooltip: "Modifier le formulaire",
            onClick: (event, rowData) => this.props.history.push(`/form/view/${rowData.id}/edit`)
          },
          {
            icon: "remove_red_eye",
            tooltip: "Voir le formulaire complet",
            onClick: (event, rowData) => this.props.history.push(`/form/view/${rowData.id}`)
          },
          {
            icon: 'delete',
            tooltip: "Supprimer le formulaire",
            onClick: (event, rowData) => console.log(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Ajouter un formulaire',
            isFreeAction: true,
            onClick: (event) => this.props.history.push(`/form/view/new`)
          }
        ]}
        data={users}
        options={{
          filtering: true,
          actionsColumnIndex: -1
        }}
      />
    </div>)
  }
}

const styles = theme => ({
  container: {
  }
})


const mapStateToProps = (state) => ({ users: state.reducer.users })
export default withRouter(withStyles(styles)(withReducer("reducer", reducer)(connect(mapStateToProps)(FormList))))