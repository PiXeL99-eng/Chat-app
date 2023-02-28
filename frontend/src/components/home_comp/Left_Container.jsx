import React, {useState} from 'react'
import MyDrawer from './MyDrawer'
import ConvBox from './ConvBox'

export default function RightContainer(props) {

  return (
    <div className='left-container'>
        <MyDrawer />
        <ConvBox conversationId={props.conversationId} setConversationId={props.setConversationId}/>
    </div>
  )
}