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
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Home } from '@mui/icons-material';
import Alert from '@mui/material/Alert';


import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

import { useRouter } from 'next/router'


const drawerWidth = 240;

export default function Scaffold({ children, isLoggedIn, hideBanner, sx }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <Metas />
      </Head>
      <ThemeProvider theme={darkTheme}>
      <Box sx={sx}>
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
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src="/AnoletLogoSmall.png" alt="Anolet logo" width="100" height="100"></Image>
        </Toolbar>
        <Divider />
        {/* main pages will be put here, e.g. home, games, etc. */}
        <List>
          <ListItem button key="Home" component="a" onClick={(e) => {
            router.push("/");
          }}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <List>
          <ListItem button key="Avatar" component="a" onClick={(e) => {
            router.push("/");
          }}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button key={ isLoggedIn ? "Settings" : "Log in/Sign up"} component="a" onClick={(e) => {
            isLoggedIn ? console.log("implement settings") : router.push("/auth/login")
          }}>
          <ListItemIcon>
            { isLoggedIn ? <SettingsIcon /> : <AccountCircleIcon /> }
          </ListItemIcon>
          <ListItemText primary={ isLoggedIn ? "Settings" : "Log in/Sign up"} />
        </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        { isLoggedIn || hideBanner ? <></> : <Alert severity="warning">Some site features require logging in. You will be able to explore content on this page, but stuff like playing games and creating content will not work. Register an account to join the fun!</Alert> }
        <br></br>
        { children }
      </Box>
    </Box>
    </ThemeProvider>
    </>
  )
}
