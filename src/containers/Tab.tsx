import React from 'react';
import { makeStyles, Theme, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import D3Tree from './D3Tree'
import Member from './member/Member'

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

function a11yProps(index: any) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
   },
}));

export default function SimpleTabs() {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
               <Tab label="Tree" {...a11yProps(0)} />
               <Tab label="Member" {...a11yProps(1)} />
               <Tab label="Item" {...a11yProps(2)} />
            </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <D3Tree />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <Member />
         </TabPanel>
         <TabPanel value={value} index={2}>
            Item Three
         </TabPanel>
      </div>
   );
}