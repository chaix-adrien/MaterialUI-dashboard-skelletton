import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"
import { default as React } from "react"
import { withTheme } from "react-jsonschema-form"
import { Theme as MuiTheme } from "rjsf-material-ui"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
})

const ObjectFieldTemplate = ({ DescriptionField, description, TitleField, title, properties, required, uiSchema, idSchema }) => {
  const classes = useStyles()
  return (
    <>
      {(uiSchema["ui:title"] || title) && !(uiSchema.hideTitle || []).includes(title) && (
        <TitleField id={`${idSchema.$id}-title`} title={title} required={required} />
      )}
      {description && <DescriptionField id={`${idSchema.$id}-description`} description={description} />}
      <Grid container={true} spacing={2} className={classes.root}>
        {properties.map((element, index) => {
          //console.log(element)
          return (
            <Grid
              item={true}
              xs={12}
              key={index}
              style={{ marginBottom: "10px" }}
              className={element.content.props.schema.fullWidth ? "Mui-fullWidth" : ""}>
              {(element.content.props.schema.format === "date" || element.content.props.schema.type === "null") && (
                <label className={"customLabel" + element.content.props.schema.format}>{element.content.props.schema.title}</label>
              )}
              {element.content}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const Form = withTheme({ ...MuiTheme, ObjectFieldTemplate })

const OneOfGenerator = (title, noDesc, selector, selectorTitle, condition, isReadOnly, content, required, isBugged) => {
  console.log("title", title, condition)
  return {
    type: "object",
    title,
    description: isReadOnly && !condition ? noDesc : "",
    ...(isReadOnly
      ? {
          properties: condition ? content : {},
        }
      : {
          properties: {
            [selector]: {
              type: "boolean",
              title: selectorTitle,
              enum: [true, false],
              default: condition,
            },
          },
          dependencies: {
            [selector]: {
              oneOf: [
                {
                  properties: {
                    [selector]: {
                      enum: [false],
                    },
                  },
                },
                {
                  properties: {
                    [selector]: {
                      enum: [true],
                    },
                    ...content,
                  },
                  required: required,
                },
              ],
            },
          },
        }),
  }
}
/**
 *   oneOf: [
            {
              title: noTitle,
              ...(isBugged ? { properties: {} } : {}),
            },
            {
              title: yesTitle,
              properties: content,
              required,
            },
          ].sort(() => (condition ? 1 : -1)),
 */

export { OneOfGenerator }

export default Form
