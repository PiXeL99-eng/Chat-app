import React from 'react'
import Active_Bar from './Active_Bar'
import Chat_Area from './Chat_Area'
import New_Text from './New_Text'

export default function Right_Container() {
  return (
    <div className='right-container'>
        <Active_Bar />
        <Chat_Area />
        <New_Text />
    </div>
  )
}
