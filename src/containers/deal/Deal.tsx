import { FC, ReactElement } from 'react'
import { TableContainer, Paper, Button } from '@material-ui/core';
import { memberStyles } from '../../_thems'

interface Props {

}

const Deal: FC<Props> = (props: Props): ReactElement => {
   const classes = memberStyles();
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" color="primary">Add Deal</Button>
         </div>
      </TableContainer>
   )
}

export default Deal