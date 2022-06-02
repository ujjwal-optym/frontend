import { NextPage } from "next"
import axios from "axios"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"

import { useEffect, useReducer, useContext } from "react";
import { useMutation } from 'react-query'

import * as React from 'react';
import ReactDOM from 'react-dom';

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import  Paper  from "@mui/material/Paper"

import { AuthContext } from '../context/auth';


const SignIn : NextPage = () => {

    const context = useContext(AuthContext);
    const { user } = context;
    const Router = useRouter()

    type Data = {
        email: string,
        password: string
    }
    const signInUser = async (data: Data) => {
        const { data: response } = await axios.post('/api/signin', data);
        return response;
    };
    
    const initialValue = {
        email: '',
        password: '',
    };

    type Action =
    | { type: 'email'; payload: string }
    | { type: 'password'; payload: string }
    | { type: 'reset' };

    const reducer = (state: typeof initialValue, action: Action) => {
        switch (action.type) {
            case 'email':
            return { ...state, email: action.payload };
            case 'password':
            return { ...state, password: action.payload };
            case 'reset':
            return initialValue;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialValue);

    const { mutate, isLoading } = useMutation(signInUser, {
        onSuccess(data) {
            context.login(data)
            console.log("mutation -> : ", data);
            if(data.token != null) {
                localStorage.setItem("jwtToken", data.token);
                Router.push('/');
            }
            // Navigate to Home page
        },
        onError(err: string) {
          throw new Error(err)
        }
    });

    const handleSubmit = () : void => {
        mutate(state)
    }

    if( user ) {
        typeof window !== 'undefined' && Router.push('/');
    }
    // useEffect(() => {
    //     // redirect to home if already logged in
    //     if (user) {
    //         Router.push('/');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ user ]);

    // if( user ) {
    //     return <div>Please wait. Redirecting......</div>;
    // }
    // else
    return (
        <div style={{ textAlign: "center", margin: "auto"}}>
            <Head>
                <title>Assignment - SignIn</title>
            </Head>        
            { isLoading ? <h1>loading</h1> : (   
            <Paper style={{width: "30%", margin: "auto", marginTop: "5%", paddingBottom: "4%"}}>
                <Grid 
                    container 
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    
                >
                    <Grid item xs={8}>
                        <h3>   
                           Sign - In
                        </h3> 
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={state.email}
                            onChange={(event) =>
                                dispatch({ type: 'email', payload: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={state.password}
                            onChange={(event) =>
                                dispatch({ type: 'password', payload: event.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            color = "primary" 
                            variant = "contained" 
                            onClick={handleSubmit}
                        > 
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={8}>    
                        <Link href = "/signup" color="blue"> Dont have an account? Sign-Up  </Link>
                    </Grid>
                </Grid>
            </Paper>  
            ) }
        </div>
    )
}

export default SignIn