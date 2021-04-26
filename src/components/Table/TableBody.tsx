import React, { FC, ReactElement } from 'react'
import { TableBody as TableData, Button } from '@material-ui/core';
import { EditIcons } from '../../components/ui'
import { StyledTableCell, StyledTableRow } from '../../_thems'

interface Props {
   data: Array<any>
}

function createData(name: number, calories: string, fat: string, carbs: number, protein: number) {
   return { name, calories, fat, carbs, protein };
}
const rows = [
   createData(383262435, 'Thakur Kushal', "kumarthakur@gmail.com", 24, 4.0),
   createData(321074060, 'Ashwin', "ashwin@gmail.com", 37, 4.3),
   createData(927018000, 'Umesh', "umesh@gmail.com", 24, 6.0),
   createData(781134836, 'Stones', "stones@gmail.com", 67, 4.3),
   createData(999549805, 'Haus', "haus@gmail.com", 49, 3.9),
   createData(276446902, 'Janes', "james@gmail.com", 49, 3.9),
];

const TableBody: FC<Props> = (props: Props): ReactElement => {
   return (
      <TableData>
         {rows.map((row) => (
            <StyledTableRow key={row.name}>
               <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
               <StyledTableCell>{row.calories}</StyledTableCell>
               <StyledTableCell>{row.calories}</StyledTableCell>
               <StyledTableCell>{row.fat}</StyledTableCell>
               <StyledTableCell>{row.carbs}</StyledTableCell>
               <StyledTableCell>{row.protein}</StyledTableCell>
               <StyledTableCell><Button color="secondary">Active</Button></StyledTableCell>
               <StyledTableCell><EditIcons fontSize="small" color="primary" /></StyledTableCell>
            </StyledTableRow>
         ))}
      </TableData>
   )
}

export default TableBody