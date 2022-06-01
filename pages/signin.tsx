import { NextPage } from "next"
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Head from "next/head"

const SignIn : NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Assignment - SignIn</title>
            </Head>
            <h1> Sign-In page </h1>
            <h3>   
                <Link href = "/" > Back Home </Link>
            </h3>
        </div>
    )
}

export default SignIn