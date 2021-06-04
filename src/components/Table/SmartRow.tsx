import React, { FC, ReactElement } from 'react'
import { Link } from '@material-ui/core'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ITableHeader } from '../TableHeader/models'
import { StyledTableCell } from '../../_thems'

interface Props {
   row: any
   headers: Array<ITableHeader>
   onRowClick?: Function
   handleStatus?: any
}

const SmartRow: FC<Props> = (props: Props): ReactElement => {
   const { headers, row } = props
   const onRowClick = (row: any) => {
      if (props.onRowClick) {
         props.onRowClick(row)
      }
   }
   const handleClickOnStatus = (e: React.SyntheticEvent, memberId: number) => {
      e.preventDefault();
      e.stopPropagation();
      confirmAlert({
         message: 'Are you sure you want to change status?',
         buttons: [
            {
               label: 'Yes',
               onClick: () => {
                  if (memberId) {
                     props.handleStatus(memberId)
                  }
               }
            },
            {
               label: 'No',
               onClick: () => { }
            }
         ],
         closeOnClickOutside: false
      })
   }
   return (
      <React.Fragment>
         {row && headers.map((header: any, index: number) => (
            (header.label) === "status" ?
               <StyledTableCell key={index}>
                  {row.status === 'ACTIVE' ?
                     <Link href="#" onClick={(e: React.SyntheticEvent) => handleClickOnStatus(e, row.id)} style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}>
                        {row[header.label]}
                     </Link> : row[header.label]}
               </StyledTableCell> :
               <StyledTableCell key={index} onClick={e => onRowClick(row)} style={{ cursor: 'pointer' }}>
                  {row[header.label]}
               </StyledTableCell>
         ))}
      </React.Fragment >
   )
}

export default SmartRow