import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import TableSecondary from '../components/TableSecondary'
import Grid from '@mui/material/Grid';
import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home : NextPage = () => {

  const context = useContext(AuthContext);
  const { user } = context;
  const Router = useRouter();
  useEffect(() => {
    if (!user) {
      Router.push('/signup')
    }
  }, [user])
  return (
    <div className={styles.container}>
      <Head>
        <title>Assignment</title>
      </Head>
      <Grid container direction = 'row' margin = '2%'>
        <Grid item sm = {4}  marginLeft = '5%' marginRight = '3%'>
          <Typography variant="h5"  margin = '3%'>Inventory Home Page</Typography>
        </Grid>
        <Grid item sm = {4}>
          <Button size="large" onClick={()=>{context.logout()}}>Log-Out</Button>
        </Grid>
      </Grid>
      {/* <Table columns = {col} rows = {row} /> */}
      <TableSecondary/>
    </div>
  )
}

export default Home
