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
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Email Address</StyledTableCell>
            <StyledTableCell>Sponsor Id</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Level</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action (s)</StyledTableCell>
         </TableRow>
      </TableHead>
   )
}

export default TableHeader