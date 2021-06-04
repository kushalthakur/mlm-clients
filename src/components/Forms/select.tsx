import React from 'react'
import Select from 'react-select'
import _ from 'lodash'

interface Props {
   input: any
   options: any
   isClearable: boolean,
   label: string
   disabled: any
   isEditable: boolean
   meta: any
}
export const FormSelect = (props: Props) => {
   const { input, options, isClearable, label, disabled, isEditable, meta } = props
   let error = meta.error && meta.touched
   return (
      <React.Fragment>
         {isEditable &&
            <React.Fragment>
               <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <Select
                     {...input}
                     {...props}
                     menuPosition={'fixed'}
                     options={options}
                     placeholder={label}
                     label={label}
                     isDisabled={disabled}
                     isClearable={isClearable}
                     onBlur={() => input.onBlur(input.value)}
                  />
                  {error && <span style={{ color: "#f44336", marginLeft: "14px", marginRight: "14px", fontSize: "0.75rem", fontWeight: 600 }}>{meta.error}</span>}
               </div>
            </React.Fragment>
         }
         {!isEditable && <>
            <label className="bold">{label}</label> <div>
               {input && input.value && !Array.isArray(input.value) ? input.value.label : _.join(_.map(input.value, "label"), ", ")}
            </div>
         </>}
      </React.Fragment>
   )
}