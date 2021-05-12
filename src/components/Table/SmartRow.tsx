import React, { FC, ReactElement } from 'react'
import { ITableHeader } from '../TableHeader/models'
import { StyledTableCell } from '../../_thems'

interface OwnProps {
   row: any
   headers: Array<ITableHeader>
}

type Props = OwnProps

const SmartRow: FC<Props> = (props: Props): ReactElement => {
   const { headers, row } = props
   return (
      <React.Fragment>
         {row && headers.map((header: any, index: number) => (
            <StyledTableCell key={index}>{row[header.label]}</StyledTableCell>
         ))}
      </React.Fragment>
   )
}

export default SmartRow