import { FC, ReactElement } from 'react'
import { Table, TableContainer, Paper, Button } from '@material-ui/core';
import { memberStyles } from '../../_thems'
import TableHeader from '../../components/Table/TableHeader'
import TableBody from '../../components/Table/TableBody'

interface Props {

}

const Deal: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" color="secondary">Default</Button>
            <Button variant="outlined" color="primary">Add Deal</Button>
         </div>
         <Table className={classes.table} aria-label="customized table" size="small">
            <TableHeader data={[]} />
            <TableBody data={[]} />
         </Table>
      </TableContainer>
   )
}

export default Deal