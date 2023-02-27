import React from 'react'
import Active_Bar from './Active_Bar'
import Chat_Area from './Chat_Area'
import New_Text from './New_Text'

export default function Right_Container(props) {
  return (
    <div className='right-container'>
        <Active_Bar socket={props.socket}/>
        <Chat_Area socket={props.socket}/>
        <New_Text socket={props.socket}/>
    </div>
  )
}
