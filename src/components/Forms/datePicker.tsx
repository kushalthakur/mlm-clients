import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export const FormDatePicker = ({ input, name, dateFormat, isEditable, disabled, label, defaultValue = '-', meta, ...props }: any) => {
   const { error, touched } = meta
   return (
      <React.Fragment>
         {isEditable &&
            <React.Fragment>
               <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <DatePicker
                     {...input}
                     {...props}
                     selected={input.value ? new Date(input.value) : undefined}
                     onChange={(date: any) => input.onChange(date)}
                     placeholderText={label}
                     peekNextMonth
                     showMonthDropdown
                     showYearDropdown
                     dropdownMode="select"
                     name={name}
                     className="form-control"
                     dateFormat={dateFormat}
                     disabled={disabled}
                     autoComplete="off"
                  />
                  {!disabled && error && touched && <div className="error-message">{error}</div>}
               </div>
            </React.Fragment>
         }
         {!isEditable && <div>{input.value || defaultValue}</div>}
      </React.Fragment>
   )
}