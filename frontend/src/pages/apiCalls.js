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