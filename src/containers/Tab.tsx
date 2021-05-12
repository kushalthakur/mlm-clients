
/**
 *
 * This component not used anywhere
 *
*/

import React, { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme, Tabs, Tab, Typography, Box, Paper } from '@material-ui/core';
import D3Tree from './tree/D3Tree'
import Member from './member/Member'
import { ApplicationState, ITreeState } from '../reducers';
import { getTree } from '../actions';

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

interface treeState {
   treeState: ITreeState
}
interface DispatchProps {
   getTree: Function
}
interface OwnProps {

}

type Props = DispatchProps & treeState & OwnProps

const SimpleTabs: FC<any> = (props: Props): ReactElement => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
   const { getTree } = props;
   useEffect(() => {
      getTree()
   }, [getTree])
   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };
   // const tree = treeState && treeState.data && treeState.data.data !== undefined ? treeState.data.data : [{}]
   return (
      <div className={classes.root}>
         <Paper square>
            <Tabs value={value} indicatorColor="secondary" textColor="primary" onChange={handleChange} centered>
               <Tab label="Tree" />
               <Tab label="Member" />
            </Tabs>
         </Paper>
         <TabPanel value={value} index={0}>
            {/* <D3Tree tree={tree} /> */}
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Member />
         </TabPanel>
      </div>
   );
}

const mapStateToProps = (state: ApplicationState): treeState => {
   return {
      treeState: state.tree
   }
}
const mapDispatchToProps: DispatchProps = {
   getTree: getTree
}

export default connect<treeState, DispatchProps, OwnProps, ApplicationState>(mapStateToProps, mapDispatchToProps)(SimpleTabs)