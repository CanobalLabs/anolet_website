import Head from 'next/head'
import Metas from '../../components/Metas'
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image'
import * as React from 'react';
import Scaffold from '../../components/Scaffold';

import { useRouter } from 'next/router'

import Typography from '@mui/material/Typography';

export default function Home() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <Metas />
      </Head>
      
      <Scaffold>
        <Toolbar>
            <Typography variant="h3">
                Guild Name
            </Typography>
        </Toolbar>
        <Typography paragraph>
          You are now querying ID {id}!
        </Typography>
      </Scaffold>
    </>
  )
}
