import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'


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
      <h1>Home page</h1>
      <h2> 
        <Link href = "/signin" > SignIn page</Link>
      </h2>
      <h2> 
        <Link href = "/signup"> SingUp page </Link>
      </h2>
    </div>
  )
}

export default Home
