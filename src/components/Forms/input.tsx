import React from 'react'
import { TextField } from '@material-ui/core';

export const FormInput = (props: any) => {
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
                  // autoComplete="off"
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