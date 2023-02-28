import React, { useEffect, useContext, useState, useRef} from "react";
import {LeftContainer, RightContainer} from "../components/home_comp";

import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

import Grid from '@mui/material/Grid';
import {io} from "socket.io-client"

import "../css/home.css"

export default function Home() {

    const navigate = useNavigate();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const [conversationId, setConversationId] = useState('63fe2f70abe85ccff93d50ce')        //set null initially
    const socket = useRef(null)

    useEffect(() => {

        if(!user){
            return navigate("/login");
        }

        socket.current = io("ws://localhost:8900")

    }, [])

    useEffect(() => {
        socket.current?.emit("addUser", user.email)
        socket.current?.on("getUsers", users => {
            console.log(users)
        })
    }, [user])
    
    return (

        <>
            {
            !isFetching && user &&

                <>
                    <div className="home-page">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                    <LeftContainer conversationId={conversationId} setConversationId={setConversationId} />
                            </Grid>
                            <Grid item xs={8}>
                                    <RightContainer socket={socket} conversationId={conversationId} setConversationId={setConversationId}/>
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