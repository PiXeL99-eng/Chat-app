import React, {useEffect, useState, useContext, useRef} from 'react'
import TimeAgo from 'timeago-react';
import { fetchText } from '../../pages/apiCalls';
import { AuthContext } from '../../contexts/AuthContext';

export default function ChatArea(props) {

  const {user} = useContext(AuthContext)
  const [newMessage, setNewMessage ] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {

    const func_fetch_text = async () => {

        const data = await fetchText(props.conversationId)
        // const data = await fetchText('63fc5dd9eec9dcf6ded271ac')
        props.setMessages(data)
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

    newMessage && props.conversationId === newMessage.conversationId && 
    props.setMessages((prev) => [...prev, {
        text: newMessage.text,
        sender: newMessage.sender,
        time: newMessage.time
    }])

  }, [newMessage, props.conversationId])
  // }, [ newMessage/* may add convId here*/])

  useEffect(() => {

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    scrollToBottom()
  }, [props.messages]);
  

  return (
    <div className='chat-area'>

        {props.messages.map(message => 

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

        <div ref={messagesEndRef} ></div>
        
    </div>
  )
}
