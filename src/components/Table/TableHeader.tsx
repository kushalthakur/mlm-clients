import React, { FC, ReactElement } from 'react'
import { TableHead, TableRow } from '@material-ui/core';
import { StyledTableCell } from '../../_thems'

interface Props {
   data: Array<any>
}

const TableHeader: FC<Props> = (props: Props): ReactElement => {
   return (
      <TableHead>
         <TableRow>
            <StyledTableCell>Sponsor Id</StyledTableCell>
            <StyledTableCell>Member Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email Address</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action (s)</StyledTableCell>
         </TableRow>
      </TableHead>
   )
}

export default TableHeader