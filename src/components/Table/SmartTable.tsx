import React, { FC, ReactElement } from 'react'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { ITableHeader } from '../TableHeader/models'
import { memberStyles } from '../../_thems'
import SmartRow from './SmartRow'
import SmartHeader from './SmartHeader'
import { StyledTableRow } from '../../_thems'

interface OwnProps {
   data: any
   headers: Array<ITableHeader>
}

type Props = OwnProps

const SmartTable: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles()
   const { data, headers } = props
   return (
      <React.Fragment>
         <Table className={classes.table} aria-label="customized table">
            <TableHead>
               <TableRow>
                  {headers && headers.map((header: ITableHeader, index: number) => (
                     <SmartHeader header={header} key={index} />
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {data && data.map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                     <SmartRow row={row} headers={headers} />
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </React.Fragment>
   )
}

export default SmartTable