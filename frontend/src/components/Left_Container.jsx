import React, {useState} from 'react'
import { MyDrawer, NewPing, ConvsList, Profile } from './Left_Container_Components'

export default function LeftContainer(props) {

  const [mode, setMode] = useState('Chats')

  return (
    <div className='left-container'>
        <MyDrawer setMode={setMode} mode={mode}/>

        {
          mode === 'Chats' &&
            <ConvsList conversationId={props.conversationId} setConversationId={props.setConversationId}/>
        }
        {
          mode === 'Profile' &&

            <Profile/>
        }
        {
          mode === 'New Ping' &&

            <NewPing conversationId={props.conversationId} setConversationId={props.setConversationId} mode setMode/>
        }
    </div>
  )
}