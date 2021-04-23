import React, { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme, Tabs, Tab, Typography, Box, Paper } from '@material-ui/core';
import D3Tree from './D3Tree'
import Member from './member/Member'
import { ApplicationState, IMemberState } from '../reducers';
import { getMembers } from '../actions';

interface TabPanelProps {
   children?: React.ReactNode;
   index: any;
   value: any;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography component={'span'} variant={'body2'}>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
   },
   indicator: {
      maxWidth: 10
   }
}));

interface MemberState {
   memberState: IMemberState
}
interface DispatchProps {
   getMembers: Function
}
interface OwnProps {

}

type Props = DispatchProps & MemberState & OwnProps

const SimpleTabs: FC<any> = (props: Props): ReactElement => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
   const { getMembers, memberState } = props;
   useEffect(() => {
      getMembers()
   }, [getMembers])
   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };
   const tree = memberState && memberState.data && memberState.data.data !== undefined ? memberState.data.data : [{}]
   return (
      <div className={classes.root}>
         <Paper square>
            <Tabs value={value} indicatorColor="secondary" textColor="primary" onChange={handleChange} centered>
               <Tab label="Tree" />
               <Tab label="Member" />
            </Tabs>
         </Paper>
         <TabPanel value={value} index={0}>
            <D3Tree tree={tree} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Member />
         </TabPanel>
      </div>
   );
}

const mapStateToProps = (state: ApplicationState): any => {
   return {
      memberState: state.members
   }
}
const mapDispatchToProps: DispatchProps = {
   getMembers: getMembers
}

export default connect<MemberState, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(SimpleTabs)