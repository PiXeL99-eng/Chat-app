import React, {useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {

  const {user} = useContext(AuthContext)

  return (
    <>

      <div className='profile-img-div'>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"   sx={{ width: 150, height: 150 }}/>
      </div>

      <div>
        <div className="profile-name">
            {user.username}
        </div>
      </div>

      <div>
        <div className="profile-email">
            {user.email}
        </div>
      </div>
    </>
  )
}
