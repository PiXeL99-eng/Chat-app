import React, {useState, useEffect, useContext} from 'react'
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../contexts/AuthContext';
import {fetchPeers, newconvo, newGroup} from "../../pages/apiCalls"

import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function Ping(props) {

  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [peers, setPeers] = useState([])
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false);
  const {user} = useContext(AuthContext)

  useEffect(() => {

    const func_fetch_users = async() => {
        
        const data = await fetchPeers(user.email)
        setPeers(data)
        setSelected(new Array(data.length).fill(false))
    }

    func_fetch_users()
    
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const createGroup = async () => {

    setOpen(false)

    const convId = await newGroup(peers, selected, groupName, user)

    props.setConversationId(convId)
    // props.setMode('Chats')
  };

  async function createConvo(email, username) {

    const convId = await newconvo({
        isGroup: isGroup,
        groupName: '', 
        members: [{email: user.email, username: user.username}, {email: email, username: username}]
    })

    props.setConversationId(convId)
    // props.setMode('Chats')
  }

  function handleSelect(ind) {
    let data = selected
    data[ind] = !data[ind]
    console.log(selected)
    setSelected(data)
  }

  const ColorButton = styled(Button)(() => ({
    color: "black",
    backgroundColor: "rgb(1,248,153)",
    '&:hover': {
      backgroundColor: "rgb(12 224 142)",
    },
  }));

  return (
    <>
        <div className='container-convtype'>
            <Switch
            checked={isGroup}
            onChange={(event) => setIsGroup(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>Make group</span>    
        </div>

        {
            !isGroup &&
                <div className='available-users'>
                    <div>Available Users</div>
                    <List sx={{ width: '100%', overflowY: 'auto', height: '77vh'}}>
                        {peers.map(peer => 
                            <>
                            <ListItem alignItems="flex-start" sx={{cursor: 'pointer'}} onClick={() => createConvo(peer.email, peer.username)}>
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary={`${peer.username}`}
                                secondary={
                                    <span className='short-info'>
                                    <Typography
                                        sx={{ display: 'inline', color: 'white'}}
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
                            <Divider variant="inset" component="li" sx={{borderColor: "rgb(255 255 255 / 32%)"}}/>
                            </>
                        )}

                </List>
            </div>

        }

        {
            isGroup &&
                <div className='available-users'>
                    <div>Available Users</div>
                    <List sx={{ width: '100%', overflowY: 'auto', height: '77vh'}}>
                        {peers.map((peer, ind) => 
                            <>
                            <ListItem alignItems="flex-start">
                            <input type="checkbox" id="coding" name="interest" value={selected[ind]} onChange={() => handleSelect(ind)}/>
                            {/* <Checkbox
                            checked={selected[ind]}
                            onChange={handleSelect(ind)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            /> */}
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                primary={`${peer.username}`}
                                secondary={
                                    <span className='short-info'>
                                    <Typography
                                        sx={{ display: 'inline', color: 'white'}}
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
                            <Divider variant="inset" component="li" sx={{borderColor: "rgb(255 255 255 / 32%)"}}/>
                            </>
                        )}

                    <Fab variant="extended" sx={{position: "absolute", bottom: 15, right: 33, background: "rgb(1,248,153)"}} onClick={handleClickOpen}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Create
                    </Fab>

                    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                        <DialogTitle>Set Group Name</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                type="text"
                                fullWidth
                                label="Group name"
                                variant="standard"
                                value={groupName}
                                onChange={(event) => {setGroupName(event.target.value);}}
                            />
                        </DialogContent>
                        <DialogActions>
                        <ColorButton variant="contained" onClick={createGroup}>Create</ColorButton>
                        </DialogActions>
                    </Dialog>

                </List>
            </div>

        }

        {

            peers.length === 0 &&

            <div>
                No peers found!
            </div>
        }
    </>
  )
}
