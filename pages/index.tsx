import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'


const Home : NextPage = () => {
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
