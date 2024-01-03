import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userCredential);

        if ('error' in res.data){
            dispatch({type: "LOGIN_FAILURE", payload: res.data})
            return res.data.error
        }
        else{
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            return null
        }

    } catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err})
    }
}

export const signUpCall = async (userCredential, dispatch) => {
    dispatch({type: "SIGNUP_START"});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, userCredential);

        if ('error' in res.data){
            dispatch({type: "SIGNUP_FAILURE", payload: res.data})
            return res.data.error
        }
        else{
            dispatch({type: "SIGNUP_SUCCESS", payload: res.data})
            return null
        }
    } catch(err){
        dispatch({type: "SIGNUP_FAILURE", payload: err})
        return err
    }
}

export const logoutCall = (dispatch) => {

    dispatch({type: "LOGOUT_SUCCESS", payload: null})
}

export const newconvo = async (details) => {

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/conversations/create`, details);
        return res.data.conversationId

    } catch(err){
        console.log(err)
    }
}

export const newGroup = async (peers, selected, groupName, user) => {

    try{
        const members = [{email: user.email, username: user.username}]

        for(let i=0; i<peers.length; i++){
            if(selected[i]){
                members.push({email: peers[i].email, username: peers[i].username})
            }
        }

        if(members.length === 1){
            return null
        }
        else{
            const details = {
                isGroup: true,
                groupName: groupName, 
                members: members
            }

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/conversations/create`, details);
            return res.data.conversationId
        }

    } catch(err){
        console.log(err)
    }
}

export const sendText = async (message) => {

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/conversations/message`, message);
    } catch(err){
        console.log(err)
    }
}


export const fetchText = async (conversationId) => {

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/conversations/conversation`, { params: { conversationId: conversationId } });
        return res.data.messages
    } catch(err){
        console.log(err)
        return err
    }
}

export const fetchReceiver = async (conversationId) => {

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/conversations/receiver`, { params: { conversationId: conversationId } });
        return res.data

    } catch(err){
        console.log(err)
        return err
    }
}

export const fetchAllConvs = async (email) => {

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/conversations/allConvs`, { params: { email: email } });
        return res.data.convs

    } catch(err){
        console.log(err)
        return err
    }
}

export const fetchPeers = async (email) => {

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/peers`, { params: { email: email } });
        return res.data.peers

    } catch(err){
        console.log(err)
        return err
    }
}