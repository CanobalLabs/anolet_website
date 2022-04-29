import Head from 'next/head'
import Metas from '../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

export default function Home() {
  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {/* main pages will be put here, e.g. home, games, etc. */}
        </List>
        <Divider />
        <List>
        <ListItem button key="Log in/Sign up">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Log in/Sign up" />
        </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae quod, vitae debitis ex excepturi fugit consequuntur ab voluptatibus totam non? Ipsam recusandae, repellendus blanditiis eligendi quaerat hic minus iste aut!
        </Typography>
      </Box>
    </Box>
    </>
  )
}
