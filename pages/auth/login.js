import Head from 'next/head'
import Metas from '../../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Scaffold from '../../components/Scaffold';
import save from '../../utils/tokenmanager';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isErrored, setError] = React.useState(false)
  const [passIsErrored, setPassError] = React.useState(false)
  const [errText, setErrText] = React.useState('')
  const [passErrText, setPassErrText] = React.useState('')

  function preemptiveValidationUsername(text) {
    setUsername(text)

    if (text.length < 3) {
      setError(true)
      setErrText("Your username cannot be shorter than 3 characters.")
    } else if (text.length > 20) {
      setError(true)
      setErrText("Your username cannot be longer than 20 characters.")
    } else {
      setError(false)
      setErrText('')
    }
  }

  function preemptiveValidationPassword(text) {
    setPassword(text)
    
    if (text.length < 8) {
      setPassError(true)
      setPassErrText("Your password needs to be greater than 8 characters.")
    } else {
      setPassError(false)
      setPassErrText('')
    }
  }

  function validate(response) {
    if (response.token != null) {
      setError(false)
      setErrText('')
      save(response.token)
      // TODO: redir to homepage after finishing auth
    } else if (response.error != false) {
      setError(true)
      setErrText(response.error)
    }
  }

  async function tryLogin() {
    const request = JSON.stringify({ username: username, password: password })
    const response = await (await fetch('https://api.anolet.com/login/', { method: "POST", body: request, headers: {
      'Content-Type': 'application/json'
    }, })).json()

    validate(response)
  }

  async function trySignup() {
    const request = JSON.stringify({ username: username, password: password })
    const response = await (await fetch('https://api.anolet.com/login/signup', { method: "POST", body: request, headers: {
      'Content-Type': 'application/json'
    },  })).json()
    
    validate(response)

  }

  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Scaffold isLoggedIn={false} hideBanner={true} sx={{ display: 'flex' }}>
        <Typography variant="h2"><b>Login</b></Typography>
        <br></br>
        <TextField fullWidth id="username" label="Username" error={isErrored} helperText={errText} variant="standard" onChange={(e) => {preemptiveValidationUsername(e.target.value)}} />
        <br></br>
        <TextField fullWidth id="pass" label="Password" variant="standard" type="password" onChange={(e) => { preemptiveValidationPassword(e.target.value) }} />
        <br></br>
        <Button variant="contained" sx={{ marginTop: 4 }} onClick={() => { tryLogin() }} >Login</Button>
        <Button variant="outlined" sx={{ marginLeft: 2, marginTop: 4 }} onClick={() => { trySignup() }}>Sign up</Button>
      </Scaffold>
    </>
  )
}
