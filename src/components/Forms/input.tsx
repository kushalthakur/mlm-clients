import React from 'react'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
interface Props {
   input: any
   label: string
   type: string
   name: string
   variant: string
   autoFocus: string
   isEditable: boolean
   color: string
   disabled: string | boolean
   defaultValue: string
   meta: any
}

export const FormInput = (props: Props) => {
   const { input, type, label, name, autoFocus, variant, disabled, isEditable, defaultValue = '-', meta } = props
   let error = meta.touched && meta.error ? true : false
   return (
      <React.Fragment>
         {isEditable &&
            <React.Fragment>
               <TextField
                  {...input}
                  margin="normal"
                  variant={variant}
                  type={type}
                  label={label}
                  name={name}
                  autoFocus={autoFocus}
                  fullWidth
                  disabled={disabled}
                  autoComplete="off"
                  size="small"
                  helperText={meta.touched && meta.error && meta.error}
                  error={error}
               />
            </React.Fragment>
         }
         {!isEditable && <div>{input.value || defaultValue}</div>}
      </React.Fragment>
   )
}

export const CheckBox = (props: Props) => {
   const { input, name, label, disabled, isEditable, color, defaultValue = "-" } = props
   return (
      <React.Fragment>
         {isEditable &&
            <React.Fragment>
               <FormControlLabel
                  control={
                     <Checkbox
                        {...input}
                        name={name}
                        color={color}
                        disabled={disabled}
                        style={{ margin: "15px 0px 15px 0px" }}
                     />
                  }
                  label={label}
               />
            </React.Fragment>
         }
         {!isEditable && <div>{input.value || defaultValue}</div>}
      </React.Fragment>
   )
}