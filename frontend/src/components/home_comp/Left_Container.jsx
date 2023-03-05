import React, {useState} from 'react'
import MyDrawer from './MyDrawer'
import ConvBox from './ConvBox'
import Profile from './Profile'
import Ping from './Ping'

export default function LeftContainer(props) {

  const [mode, setMode] = useState('Chats')

  return (
    <div className='left-container'>
        <MyDrawer setMode={setMode} mode={mode}/>

        {
          mode === 'Chats' &&
            <ConvBox conversationId={props.conversationId} setConversationId={props.setConversationId}/>
        }
        {
          mode === 'Profile' &&

            <Profile/>
        }
        {
          mode === 'New Ping' &&

            <Ping conversationId={props.conversationId} setConversationId={props.setConversationId} mode setMode/>
        }
    </div>
  )
}