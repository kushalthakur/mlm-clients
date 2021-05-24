import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from '../../_thems'

interface Props {
   handlePage: Function
   count: number
}

const PaginationRounded: React.FC<Props> = (props: Props): React.ReactElement => {
   const classes = useStyles();
   const { handlePage, count } = props
   const page: number = Math.ceil(count / 10)
   const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
      handlePage(value - 1)
   }
   return (
      <div className={classes.root}>
         <Pagination
            onChange={handleChange}
            count={page}
            variant="outlined"
            shape="rounded"
         />
      </div>
   );
}
export default PaginationRounded