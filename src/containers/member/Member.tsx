import {
   withStyles, Theme, createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@material-ui/core';
import { Icon } from '../../components/ui'

const StyledTableCell = withStyles((theme: Theme) =>
   createStyles({
      head: {
         backgroundColor: theme.palette.common.black,
         color: theme.palette.common.white,
      },
      body: {
         fontSize: 12,
      },
   }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
   createStyles({
      root: {
         '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
         },
      },
   }),
)(TableRow);

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

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      table: {
         minWidth: 500
      },
      root: {
         '& > *': {
            margin: theme.spacing(1)
         },
         textAlign: 'right'
      }
   }))


export default function Member() {
   const classes = useStyles();
   return (
      <TableContainer component={Paper}>
         <div className={classes.root}>
            <Button variant="outlined" className="pull-right">Default</Button>
            <Button variant="outlined" color="primary">Add Member</Button>
         </div>
         <Table className={classes.table} aria-label="customized table">
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
            <TableBody>
               {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                     <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                     <StyledTableCell>{row.calories}</StyledTableCell>
                     <StyledTableCell>{row.calories}</StyledTableCell>
                     <StyledTableCell>{row.fat}</StyledTableCell>
                     <StyledTableCell>{row.carbs}</StyledTableCell>
                     <StyledTableCell>{row.protein}</StyledTableCell>
                     <StyledTableCell><Button color="secondary">Active</Button></StyledTableCell>
                     <StyledTableCell><Icon fontSize="small" color="primary" /></StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
