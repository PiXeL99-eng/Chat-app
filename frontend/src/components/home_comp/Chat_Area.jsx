import React, {useEffect, useState, useContext, useRef} from 'react'
import TimeAgo from 'timeago-react';
import { fetchText } from '../../pages/apiCalls';
import { AuthContext } from '../../contexts/AuthContext';
import { IKImage } from 'imagekitio-react';

export default function ChatArea(props) {

  const {user} = useContext(AuthContext)
  const [newMessage, setNewMessage ] = useState(null)
  const messagesEndRef = useRef(null)
  const urlEndpoint = 'https://ik.imagekit.io/jvig43v5se/chat-app';

  useEffect(() => {

    const func_fetch_text = async () => {

        const data = await fetchText(props.conversationId)
        // const data = await fetchText('63fc5dd9eec9dcf6ded271ac')
        props.setMessages(data)
    }

    func_fetch_text()

  }, [props.conversationId])

  console.log(props.socket.current)
  useEffect(() => {

    props.socket.current?.on("getMessage", data => {

      // console.log("received")

      data.conversationId === props.conversationId &&

        setNewMessage({
            name: data.name,
            isImage: data.isImage,
            fileUrl: data.fileUrl,
            text: data.text,
            time: Date.now(),
            conversationId: data.conversationId
        })
    })

  }, [props.socket.current])

  useEffect(() => {

    //receive current convid from props

    newMessage && props.conversationId === newMessage.conversationId && 
    props.setMessages((prev) => [...prev, {
        isImage: newMessage.isImage,
        fileUrl: newMessage.fileUrl,
        text: newMessage.text,
        name: newMessage.name,
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
            
            //display sender name also, if group message
            <div className={message.sender !== user.email? 'bubble-space' : 'bubble-space-rev'}>
                <div className='bubble'>

                    {
                      message.sender !== user.email &&

                        <div className='message-sender'> 
                          { message.name }
                        </div>
                    }

                    {!message.isImage && 
                    
                      <div className='bubble-text'>{message.text}</div>
                    }

                    {
                      message.isImage &&

                      <IKImage
                        urlEndpoint={urlEndpoint}
                        src={message.fileUrl} //here the src comes from backend which knows the url
                        loading="lazy"
                        width="400"
                        height="300"
                      />

                    }


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
