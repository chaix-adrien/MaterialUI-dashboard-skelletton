import { CircularProgress, IconButton, TextField, Typography } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import Grid from "@material-ui/core/Grid"
import CreateIcon from "@material-ui/icons/Create"
import { makeStyles } from "@material-ui/styles"
import Button from "components/CustomButtons/Button.js"
import DialogSelector from "components/DialogSelector"
import { default as React, useState } from "react"
import { withTheme } from "react-jsonschema-form"
import { Theme as MuiTheme } from "rjsf-material-ui"

const SelectorWidget = ({ id, required, readonly, disabled, label, value, onChange, onBlur, onFocus, autofocus, options, schema }) => {
  const [open, setOpen] = useState(false)
  const displayValue = value ? (schema.displayValue ? schema.displayValue(value) : value) : schema.noTxt
  return (
    <FormControl
      //error={!!rawErrors}
      className='selector'
      required={required}>
      <TextField
        id={id}
        required={required}
        disabled={disabled || readonly}
        style={{ width: 0, height: 0 }}
        value={value ? (schema.displayValue ? schema.displayValue(value) : value) : ""}
      />
      <Typography style={{ marginRight: 10 }}>{displayValue}</Typography>
      {!readonly && (
        <IconButton style={{ padding: 0 }} onClick={_ => setOpen(true)}>
          <CreateIcon />
        </IconButton>
      )}
      <DialogSelector
        data={schema.choices}
        open={open}
        onClose={_ => setOpen(false)}
        columns={schema.columns}
        disabled={disabled || readonly}
        selectTxt={schema.selectTxt}
        onSelect={selected => onChange(selected)}
        title={schema.selectorTitle}
      />
    </FormControl>
  )
}

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
          // console.log(element)
          return (
            <Grid
              item={true}
              xs={12}
              key={index}
              style={{ marginBottom: "10px" }}
              className={element.content.props.schema.fullWidth ? "Mui-fullWidth" : ""}>
              {(element.content.props.schema.format === "date" ||
                element.content.props.schema.type === "null" ||
                element.content.props.schema.format === "selector") && (
                <label className={"customLabel" + (element.content.props.schema.type === "null" ? "" : "Left")}>
                  {element.content.props.schema.title + (element.content.props.required ? "*" : "")}
                </label>
              )}
              {element.content}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const FormMUI = withTheme({ ...MuiTheme, ObjectFieldTemplate })
const Form = function FormWithLoading(props) {
  const { readOnly, initLoad, loading, children, ...formProps } = props
  return (
    <div className={"formauto " + (readOnly ? " formReadOnly" : "")}>
      {!initLoad ? (
        <FormMUI {...formProps} widgets={{ selector: SelectorWidget }}>
          {!loading ? (
            <Button
              color='primary'
              type='submit'
              variant='contained'
              style={{
                visibility: readOnly ? "hidden" : "visible",
                margin: "auto",
                display: "flex",
                marginBottom: 15,
              }}
              className={readOnly ? "hidden" : ""}>
              Valider
            </Button>
          ) : (
            <CircularProgress style={{ width: 40 }} />
          )}
        </FormMUI>
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}

const OneOfGenerator = (title, noDesc, selector, selectorTitle, condition, isReadOnly, content, required, isBugged) => {
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
