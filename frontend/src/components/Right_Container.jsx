import React, {useState} from 'react'
import { ActiveBar, ChatArea, NewText } from './Right_Container_Components'
import { background } from '../assets'

export default function RightContainer(props) {

  const [messages, setMessages] = useState([])

  return (
    <div className='right-container'>
      <img src={background} className="chat-background"></img>
        {props.conversationId &&
        
          <>
            <ActiveBar socket={props.socket} conversationId={props.conversationId} setConversationId={props.setConversationId}/> 
            <ChatArea socket={props.socket} messages={messages} setMessages={setMessages} conversationId={props.conversationId} setConversationId={props.setConversationId}/>
            <NewText socket={props.socket} messages={messages} setMessages={setMessages} conversationId={props.conversationId} setConversationId={props.setConversationId}/>
          </>
        }
    </div>
  )
}
