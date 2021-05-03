import { FC, ReactElement } from 'react'
import moment from 'moment'
import { TableBody as TableData, Button } from '@material-ui/core';
import { EditIcons } from '../../components/ui'
import { StyledTableCell, StyledTableRow } from '../../_thems'

interface Props {
   data: Array<any>
}

const TableBody: FC<Props> = (props: Props): ReactElement => {
   return (
      <TableData>
         {props.data && props.data.map((row, index) => (
            <StyledTableRow key={index}>
               <StyledTableCell component="th" scope="row">{row.firstName}</StyledTableCell>
               <StyledTableCell>{row.lastName}</StyledTableCell>
               <StyledTableCell>{row.email}</StyledTableCell>
               <StyledTableCell>{row.sponsorId}</StyledTableCell>
               <StyledTableCell>{row.phone}</StyledTableCell>
               <StyledTableCell>{row.level}</StyledTableCell>
               <StyledTableCell>{moment(row.createdAt).fromNow()}</StyledTableCell>
               <StyledTableCell><Button color="secondary">Active</Button></StyledTableCell>
               <StyledTableCell><EditIcons fontSize="small" color="primary" /></StyledTableCell>
            </StyledTableRow>
         ))}
      </TableData>
   )
}

export default TableBody