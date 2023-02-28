import React, {useState} from 'react'
import ActiveBar from './Active_Bar'
import ChatArea from './Chat_Area'
import NewText from './New_Text'

export default function RightContainer(props) {

  const [messages, setMessages] = useState([])

  return (
    <div className='right-container'>
        {props.conversationId && 
          <ActiveBar socket={props.socket} conversationId={props.conversationId} setConversationId={props.setConversationId}/> 
        }
        <ChatArea socket={props.socket} messages={messages} setMessages={setMessages} conversationId={props.conversationId} setConversationId={props.setConversationId}/>
        <NewText socket={props.socket} messages={messages} setMessages={setMessages} conversationId={props.conversationId} setConversationId={props.setConversationId}/>
    </div>
  )
}
