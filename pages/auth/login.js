import Head from 'next/head'
import Metas from '../../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Scaffold from '../../components/Scaffold';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login() {
  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Scaffold isLoggedIn={false} hideBanner={true} sx={{ display: 'flex' }}>
        <Typography variant="h2"><b>Login</b></Typography>
        <br></br>
        <TextField fullWidth id="username" label="Identifier (email/username)" variant="standard" />
        <br></br>
        <TextField fullWidth id="pass" label="Password" variant="standard" type="password" />
        <br></br>
        <Button variant="contained" sx={{ marginTop: 4 }}>Login</Button>
        <Button variant="outlined" sx={{ marginLeft: 2, marginTop: 4 }}>Sign up</Button>
      </Scaffold>
    </>
  )
}
