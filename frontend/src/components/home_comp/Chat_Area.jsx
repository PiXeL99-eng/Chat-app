import React from 'react'
import TimeAgo from 'timeago-react';

export default function Chat_Area() {

  const own = true

  return (
    <div className='chat-area'>
        <div className={true? 'bubble-space' : 'bubble-space-rev'}>
            <div className='bubble'>
                <div className='bubble-text'>Hey</div>
                <div className='time-ago'>
                    <TimeAgo
                        datetime={'2023-02-24T05:39:07.541+00:00'}
                        locale='en_IN'
                    />
                </div>
            </div>
        </div>
        <div className={false? 'bubble-space' : 'bubble-space-rev'}>
            <div className='bubble'>
                <div className='bubble-text'>Hey</div>
                <div className='time-ago'>
                    <TimeAgo
                        datetime={'2023-02-24T05:39:07.541+00:00'}
                        locale='en_IN'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
