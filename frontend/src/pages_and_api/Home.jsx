import React, { useEffect, useContext, useState, useRef} from "react";
import {LeftContainer, RightContainer} from "../components";

import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';

import Grid from '@mui/material/Grid';
import {io} from "socket.io-client"

import "../css/home.css"

export default function Home() {

    const navigate = useNavigate();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const [conversationId, setConversationId] = useState(null)        //set null initially
    const socket = useRef(io(`${process.env.REACT_APP_SOCKET_URL}`))

    useEffect(() => {

        if(!user){
            return navigate("/login");
        }

    }, [])

    useEffect(() => {

        if(user){

            socket.current?.emit("addUser", user.email)
            socket.current?.on("getUsers", users => {
                console.log(users)
            })

        }
    }, [user])
    
    return (

        <>
            {
            !isFetching && user &&

                <>
                    <div className="home-page">
                        <Grid container spacing={0}>
                            <Grid item xs={4} sx={{backgroundColor: "#111b21"}}>
                                    <LeftContainer conversationId={conversationId} setConversationId={setConversationId} />
                            </Grid>
                            <Grid item xs={8}>
                                    <RightContainer socket={socket} conversationId={conversationId} setConversationId={setConversationId}/>
                            </Grid>
                        </Grid>
                    </div>
                
                </>
            }
        
        </>

    )
}