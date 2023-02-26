import React, { useEffect, useContext } from "react";
import {Left_Container, Right_Container} from "../components/home_comp";

import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

import Grid from '@mui/material/Grid';

import "../css/home.css"

export default function Home() {

    const navigate = useNavigate();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    useEffect(() => {

        console.log("inside home", user)
        if(!user){
            // return navigate("/login");
        }

    }, [])
    
    return (

        <>
            {
            // !isFetching && user &&

                <>
                    <div className="home-page">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                    <Left_Container/>
                            </Grid>
                            <Grid item xs={8}>
                                    <Right_Container/>
                            </Grid>
                        </Grid>
                    </div>

                    {/* <Link to="/login">click to login</Link> */}
                    {/* <Link to="/signup">click to signup</Link> */}
                
                </>
            }
        
        </>

    )
}