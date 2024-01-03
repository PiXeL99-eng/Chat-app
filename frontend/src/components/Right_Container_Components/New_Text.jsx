import React, {useState, useContext} from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { sendText } from '../../pages_and_api/apiCalls';
import {fetchReceiver} from "../../pages_and_api/apiCalls"
import { AuthContext } from '../../contexts/AuthContext';
import { v4 as uuid } from 'uuid';

export default function NewText(props) {

  // parameters (needed for client-side upload)
  
    const [newText, setNewText] = useState('')
    const unique_id = uuid();
    const {user} = useContext(AuthContext)

    const urlEndpoint = `${process.env.REACT_APP_URL_ENDPOINT}`;
    const publicKey = `${process.env.REACT_APP_PUBLIC_KEY}`; 
    const authenticationEndpoint = `${process.env.REACT_APP_API_URL}/conversations/img_auth`;

    const onError = err => {
      console.log("Error", err);
    };
    
    const onSuccess = async (res) => {
      console.log("Success", res);

      const fileUrl = res.url

      props.setMessages((prev) => [...prev, {
        isImage: true,
        text: newText,
        fileUrl: fileUrl,
        sender: user.email,
        time: `${Date.now()}`
      }])

      const data = await fetchReceiver(props.conversationId)        //get all members of this conversation

      props.socket?.current.emit("sendMessage", {
        senderEmail: user.email,
        receivers: data.members,
        isImage: true,
        text: newText,
        fileUrl: fileUrl,
        conversationId: props.conversationId,
        name: user.username
      })

      await sendText({isImage: true, fileUrl: fileUrl, text: newText, sender: user.email, name: user.username, conversationId: props.conversationId, time: `${Date.now()}`})
      setNewText('')
    };

    
    async function handleSubmit(event){
      event.preventDefault();
      // console.log(newText);

      props.setMessages((prev) => [...prev, {
        isImage: false,
        text: newText,
        fileUrl: '',
        sender: user.email,
        time: `${Date.now()}`
      }])

      const data = await fetchReceiver(props.conversationId)        //get all members of this conversation

      props.socket?.current.emit("sendMessage", {
        senderEmail: user.email,
        receivers: data.members,
        isImage: false,
        text: newText,
        fileUrl: '',
        conversationId: props.conversationId,
        name: user.username
      })

      await sendText({isImage: false, fileUrl: '', text: newText, sender: user.email, name: user.username, conversationId: props.conversationId, time: `${Date.now()}`})

      setNewText('')
    }

    function handleKeyDown(event) {

      if(event.key === 'Enter'){
        event.preventDefault();
        handleSubmit(event)
      }
      
    }

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown} 
        sx={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'center',
          '& .MuiTextField-root': { m: 1, width: 850, maxWidth: '100%'},
          backgroundColor: "#202c33"
        }}
        noValidate
        autoComplete="off"
      >
          <TextField
            id="outlined-multiline-static"
            label="Type your message"
            multiline
            inputProps={{ style: { color: "#ffffffc4" } }}
            fullWidth
            rows={1}
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
            sx={{backgroundColor: "#2a3942"}}
            InputLabelProps={{
              style: { color: '#ffffffc4' },
            }}
            color="warning"
          />
{/* rgb(255 255 255 / 80%); */}
          <IKContext 
            publicKey={publicKey} 
            urlEndpoint={urlEndpoint} 
            authenticationEndpoint={authenticationEndpoint} 
          >
            <IconButton aria-label="upload picture" component="label" 
            sx={{
              mr: 1
            }}>
              <IKUpload
                fileName={`${props.conversationId}_${unique_id}`}
                onError={onError}
                onSuccess={onSuccess}
                hidden
              />
              <PhotoCamera className='photo-icon'/>
            </IconButton>
          </IKContext>

          <Button size='24px' variant="contained" endIcon={<SendIcon/>} type="submit" className='send-button'>
            Send
          </Button>
      </Box>
    );
}
