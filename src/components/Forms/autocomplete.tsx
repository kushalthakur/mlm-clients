import React from 'react'
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'

interface Props {
   input: any
   label: string
   type: string
   name: string
   variant: string
   options: Array<any>
   autoFocus: string
   isEditable: boolean
   disabled: string | boolean
   defaultValue: string
   meta: any
}

export const AutoComplete = (props: Props) => {
   const { input, label, name, variant, options, isEditable, defaultValue = '-', meta } = props
   let error = meta.touched && meta.error ? true : false
   return (
      <React.Fragment>
         {isEditable &&
            <Autocomplete
               options={options}
               getOptionLabel={(option: any) => option.label}
               getOptionSelected={(option: any, value: any) => option.value === value.value}
               style={{ marginTop: 15 }}
               size="small"
               renderInput={(params) =>
                  <TextField
                     {...params}
                     {...input}
                     name={name}
                     label={label}
                     variant={variant}
                     helperText={meta.touched && meta.error && meta.error}
                     error={error}
                  />
               }
            />
         }
         {!isEditable && <div>{input.value || defaultValue}</div>}
      </React.Fragment>
   )
}