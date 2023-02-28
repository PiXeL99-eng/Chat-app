import React, {useEffect, useState, useContext} from 'react'
import TimeAgo from 'timeago-react';
import { fetchText } from '../../pages/apiCalls';
import { AuthContext } from '../../contexts/AuthContext';

export default function Chat_Area(props) {

  const {user} = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage ] = useState(null)

  useEffect(() => {

    const func_fetch_text = async () => {

        // const data = await fetchText(props.conversationId)
        const data = await fetchText('63fc5dd9eec9dcf6ded271ac')
        setMessages(data)
    }

    func_fetch_text()

  }, [])

  useEffect(() => {

    props.socket.current?.on("getMessage", data => {

      console.log(data)
        setNewMessage({
            sender: data.sender,
            text: data.text,
            time: Date.now(),
            conversationId: data.conversationId
        })
    })

  }, [])

  useEffect(() => {

    //receive current convid from props

    newMessage && '63fc5dd9eec9dcf6ded271ac' === newMessage.conversationId && 
    setMessages((prev) => [...prev, {
        text: newMessage.text,
        sender: newMessage.sender,
        time: newMessage.time
    }])

  }, [newMessage, '63fc5dd9eec9dcf6ded271ac'])
  // }, [ newMessage/* may add convId here*/])

  return (
    <div className='chat-area'>

        {messages.map(message => 

            // <div className={message.sender !== 'sayan@gmail.com'? 'bubble-space' : 'bubble-space-rev'}>
            <div className={message.sender !== user.email? 'bubble-space' : 'bubble-space-rev'}>
                <div className='bubble'>
                    <div className='bubble-text'>{message.text}</div>
                    <div className='time-ago'>
                        <TimeAgo
                            datetime={message.time}
                            locale='en_IN'
                        />
                    </div>
                </div>
            </div>

        )}
        
    </div>
  )
}
