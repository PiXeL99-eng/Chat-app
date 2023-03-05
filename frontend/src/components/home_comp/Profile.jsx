import React, {useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../../contexts/AuthContext';
import stringAvatar from './avatar_generator';

export default function Profile() {

  const {user} = useContext(AuthContext)

  return (
    <>

      <div className='profile-img-div'>
        <Avatar {...stringAvatar(`${user.username}`)} className="profile-avatar"/>
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
