import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});

    try{
        const res = await axios.post("http://localhost:8800/auth/login", userCredential);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err})
    }
}

export const signUpCall = async (userCredential, dispatch) => {
    dispatch({type: "SIGNUP_START"});

    try{
        const res = await axios.post("http://localhost:8800/auth/signup", userCredential);
        dispatch({type: "SIGNUP_SUCCESS", payload: res.data})
    } catch(err){
        dispatch({type: "SIGNUP_FAILURE", payload: err})
    }
}

export const logoutCall = (dispatch) => {

    dispatch({type: "LOGOUT_SUCCESS", payload: null})
}

export const sendText = async (message) => {

    try{
        const res = await axios.post("http://localhost:8800/conversations/message", message);
    } catch(err){
        console.log(err)
    }
}

export const fetchText = async (conversationId) => {

    try{
        const res = await axios.get("http://localhost:8800/conversations/conversation", { params: { conversationId: conversationId } });
        return res.data.messages
    } catch(err){
        console.log(err)
        return err
    }
}

export const fetchReceiver = async (conversationId, user_email) => {

    try{
        const res = await axios.get("http://localhost:8800/conversations/receiver", { params: { conversationId: conversationId } });
        const arr = res.data.members
        const final = []
        for(let i=0; i<arr.length; i++){

            if(arr[i].email!==user_email){

                final.push({name: arr[i].username, email: arr[i].email})
            }
        }
        return final

    } catch(err){
        console.log(err)
        return err
    }
}

export const fetchAllConvs = async (email) => {

    try{
        const res = await axios.get("http://localhost:8800/conversations/allConvs", { params: { email: email } });
        return res.data.convs

    } catch(err){
        console.log(err)
        return err
    }
}