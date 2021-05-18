import React, { FC, ReactElement } from 'react'
import { ITableHeader } from '../TableHeader/models'
import { StyledTableCell } from '../../_thems'

interface OwnProps {
   row: any
   headers: Array<ITableHeader>
   onRowClick?: Function
}

type Props = OwnProps

const SmartRow: FC<Props> = (props: Props): ReactElement => {
   const { headers, row } = props
   const onRowClick = (row: any) => {
      if (props.onRowClick) {
         props.onRowClick(row)
      }
   }
   return (
      <React.Fragment>
         {row && headers.map((header: any, index: number) => (
            <StyledTableCell key={index} onClick={e => onRowClick(row)}>
               {row[header.label]}
            </StyledTableCell>
         ))}
      </React.Fragment>
   )
}

export default SmartRow