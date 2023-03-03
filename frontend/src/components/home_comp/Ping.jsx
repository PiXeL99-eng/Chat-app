import React, {useState, useEffect, useContext} from 'react'
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../contexts/AuthContext';
import {fetchPeers} from "../../pages/apiCalls"
import {newconvo} from "../../pages/apiCalls"

export default function Ping(props) {

  const [isGroup, setIsGroup] = useState(false);
  const [peers, setPeers] = useState([])

  const {user} = useContext(AuthContext)

  async function handleClick(email, username) {

    const convId = await newconvo({
        isGroup: isGroup,
        groupName: '', 
        members: [{email: user.email, username: user.username}, {email: email, username: username}]
    })

    props.setConversationId(convId)
    props.setMode('Chats')
  }

  useEffect(() => {

    const func_fetch_users = async() => {
        
        const data = await fetchPeers(user.email)
        setPeers(data)
    }

    func_fetch_users()
  }, [])

  return (
    <>
        <div>
            <Switch
            checked={isGroup}
            onChange={(event) => setIsGroup(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>Make group</span>    
        </div>

        <div>
            <div>Available Users</div>
            <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'scroll', height: '77vh'}}>
                {peers.map(peer => 
                    <>
                    <ListItem alignItems="flex-start" sx={{cursor: 'pointer'}} onClick={() => handleClick(peer.email, peer.username)}>
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                        primary={`${peer.username}`}
                        secondary={
                            <span className='short-info'>
                            <Typography
                                sx={{ display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {
                                `${peer.email}`
                                }
                            </Typography>
                            </span>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>
                )}

                {

                    peers.length === 0 &&

                    <div>
                        No peers found!
                    </div>
                }
            </List>
        </div>
    </>
  )
}
