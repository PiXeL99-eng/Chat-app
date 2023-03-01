import React, {useState, useContext} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { sendText } from '../../pages/apiCalls';
import {fetchReceiver} from "../../pages/apiCalls"
import { AuthContext } from '../../contexts/AuthContext';

export default function NewText(props) {

    const [newText, setNewText] = useState('')

    const {user} = useContext(AuthContext)
    
    async function handleSubmit(event){
      event.preventDefault();
      // console.log(newText);
      setNewText('')

      props.setMessages((prev) => [...prev, {
        text: newText,
        sender: user.email,
        time: `${Date.now()}`
      }])

      const data = await fetchReceiver(props.conversationId, user.email)        //get all members of this conversation
      const receiverEmail = data[0].email       //get all members of this conversation

      props.socket?.current.emit("sendMessage", {
        senderEmail: user.email,
        receiverEmail: receiverEmail,
        text: newText,
        conversationId: props.conversationId,
        name: user.username
        // conversationId: '63fc5dd9eec9dcf6ded271ac'
      })

      await sendText({text: newText, sender: user.email, name: user.username, conversationId: props.conversationId, time: `${Date.now()}`})
      // await sendText({text: newText, sender: 'sayan@gmail.com', conversationId: '63fc5dd9eec9dcf6ded271ac', time: `${Date.now()}`})


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
          '& .MuiTextField-root': { m: 1, width: 850, maxWidth: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
          <TextField
            id="outlined-multiline-static"
            label="Type your text"
            multiline
            fullWidth
            rows={1}
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
          <IconButton color="primary" aria-label="upload picture" component="label" 
          sx={{
            mr: 1
          }}>
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
          <Button size='24px' variant="contained" endIcon={<SendIcon/>} type="submit">
            Send
          </Button>
      </Box>
    );
}
