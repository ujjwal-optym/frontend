import { NextPage } from "next"
import axios from "axios"
import Link from "next/link"
import Head from "next/head"
import { useReducer } from "react";
import { useMutation, useQueryClient } from 'react-query'

import * as React from 'react';
import ReactDOM from 'react-dom';

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import  Paper  from "@mui/material/Paper"

const SignIn : NextPage = () => {
    const queryClient = useQueryClient();
    type Data = {
        email: string,
        password: string
    }
    const addUser = async (data: Data) => {
        const { data: response } = await axios.post('/api/signup', data);
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

    const { mutate, isLoading } = useMutation(addUser, {
        onSuccess: (data) => {
          console.log("mutation -> : ", data);
        },
        onError: (err: string) => {
          throw new Error(err)
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
    });

    const handleSubmit = () : void => {
        mutate(state)
    }

    return (
        <div style={{ textAlign: "center", margin: "auto"}}>
            <Head>
                <title>Assignment - SignIn</title>
            </Head>           
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
                            <Link href = "/" > Back Home </Link>
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
                
                </Grid>
            </Paper>  
        </div>
    )
}

export default SignIn