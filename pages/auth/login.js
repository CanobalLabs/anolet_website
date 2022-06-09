import Head from 'next/head'
import Metas from '../../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Scaffold from '../../components/Scaffold';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function tryLogin() {
    try {
      const request = JSON.stringify({ username: username, password: password })
      const response = await (await fetch('https://api.anolet.com/login/', { method: "POST", body: request, headers: {
        'Content-Type': 'application/json'
      }, })).json()
      console.log(response)
    } catch (e) {
      console.log(e)
    }

  }

  async function trySignup() {
    try {
      const request = JSON.stringify({ username: username, password: password })
      const response = await (await fetch('https://api.anolet.com/login/signup', { method: "POST", body: request, headers: {
        'Content-Type': 'application/json'
      },  })).json()
      console.log(response)
    } catch (e) {
      console.log(e)
    }

  }

  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Scaffold isLoggedIn={false} hideBanner={true} sx={{ display: 'flex' }}>
        <Typography variant="h2"><b>Login</b></Typography>
        <br></br>
        <TextField fullWidth id="username" label="Username" variant="standard" onChange={(e) => {setUsername(e.target.value)}} />
        <br></br>
        <TextField fullWidth id="pass" label="Password" variant="standard" type="password" onChange={(e) => {setPassword(e.target.value)}} />
        <br></br>
        <Button variant="contained" sx={{ marginTop: 4 }} onClick={() => { tryLogin() }} >Login</Button>
        <Button variant="outlined" sx={{ marginLeft: 2, marginTop: 4 }} onClick={() => { trySignup() }}>Sign up</Button>
      </Scaffold>
    </>
  )
}
