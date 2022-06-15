import Head from 'next/head'
import Metas from '../../components/Metas'
import Image from 'next/image'
import * as React from 'react';
import Scaffold from '../../components/Scaffold';
import save from '../../utils/tokenmanager';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/router'


export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isErrored, setError] = React.useState(false)
  const [passIsErrored, setPassError] = React.useState(false)
  const [errText, setErrText] = React.useState('')
  const [passErrText, setPassErrText] = React.useState('')

  const router = useRouter()

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
    
    if (text.length < 7) {
      setPassError(true)
      setPassErrText("Your password needs to be greater than 7 characters.")
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

      router.push('/')
    } else if (response.error != false) {
      setError(true)
      setErrText(response.error)
    }
  }

  async function tryLogin() {
    const request = JSON.stringify({ username: username, password: password })
    const response = await (await fetch('https://staging-api-infra.anolet.com/login/', { method: "POST", body: request, headers: {
      'Content-Type': 'application/json'
    }, })).json()

    validate(response)
  }

  async function trySignup() {
    const request = JSON.stringify({ username: username, password: password })
    const response = await (await fetch('https://staging-api-infra.anolet.com/login/signup', { method: "POST", body: request, headers: {
      'Content-Type': 'application/json'
    },  })).json()
    
    validate(response)

  }

  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Scaffold hideBanner={true} sx={{ display: 'flex' }}>
        <Typography variant="h2"><b>Login</b></Typography>
        <br></br>
        <TextField fullWidth id="username" label="Username" error={isErrored} helperText={errText} variant="standard" onChange={(e) => {preemptiveValidationUsername(e.target.value)}} />
        <br></br>
        <TextField fullWidth id="pass" label="Password" error={passIsErrored} helperText={passErrText} variant="standard" type="password" onChange={(e) => { preemptiveValidationPassword(e.target.value) }} />
        <br></br>
        <Button variant="contained" sx={{ marginTop: 4 }} disabled={isErrored || passIsErrored} onClick={() => { tryLogin() }} >Login</Button>
        <Button variant="outlined" sx={{ marginLeft: 2, marginTop: 4 }} disabled={isErrored || passIsErrored} onClick={() => { trySignup() }}>Sign up</Button>
      </Scaffold>
    </>
  )
}
