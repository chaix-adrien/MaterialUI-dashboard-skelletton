import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"
import { default as React } from "react"
import { withTheme } from "react-jsonschema-form"
import { Theme as MuiTheme } from "rjsf-material-ui"

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
})

const ObjectFieldTemplate = ({ DescriptionField, description, TitleField, title, properties, required, uiSchema, idSchema }) => {
  const classes = useStyles()

  return (
    <>
      {(uiSchema["ui:title"] || title) && <TitleField id={`${idSchema.$id}-title`} title={title} required={required} />}
      {description && <DescriptionField id={`${idSchema.$id}-description`} description={description} />}
      <Grid container={true} spacing={2} className={classes.root}>
        {properties.map((element, index) => {
          console.log(element)
          if (element.content.props.schema.fullWidth) console.log("IS FULL WIDTF")
          return (
            <Grid
              item={true}
              xs={12}
              key={index}
              style={{ marginBottom: "10px" }}
              className={element.content.props.schema.fullWidth ? "Mui-fullWidth" : ""}>
              {element.content}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const Form = withTheme({ ...MuiTheme, ObjectFieldTemplate })

export default Form
