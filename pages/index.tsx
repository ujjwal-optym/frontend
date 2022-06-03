import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Table from '../components/Table';


const col = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'age', label: 'Age' },
  { accessor: 'is_manager', label: 'Manager', format: (value: any) => (value ? '✔️' : '✖️') },
  { accessor: 'start_date', label: 'Start Date' },
]

const row = [
  { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
  { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
  { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
  { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
  { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
  { id: 6, name: 'Pete Hornberger', age: 42, is_manager: true, start_date: '04-01-2000' },
  { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: '06-09-2004' },
  { id: 8, name: null, age: null, is_manager: null, start_date: null },
]



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
      <Table columns = {col} rows = {row} />
    </div>
  )
}

export default Home
