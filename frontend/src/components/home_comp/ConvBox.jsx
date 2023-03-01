import React, {useEffect, useState, useContext} from 'react';
import TimeAgo from 'timeago-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {fetchAllConvs} from "../../pages/apiCalls"
import { AuthContext } from '../../contexts/AuthContext';

export default function ConvBox(props) {

  const [allConvs, setAllConvs] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(() => {

    const func_fetch_convs = async () => {

      const data = await fetchAllConvs(user.email)
      setAllConvs(data)
    }

    func_fetch_convs()

  }, [])

  function handleClick(convId) {
    props.setConversationId(convId)
  }

  console.log(allConvs)
  
  //on click a particular conv, setActive Conv Id as required
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'scroll', height: '77vh'}}>
      {allConvs.map(conv => 
        <>
          <ListItem alignItems="flex-start" sx={{cursor: 'pointer'}} onClick={() => handleClick(conv.conversationId)}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`${conv.name}`}
              secondary={
                <span className='short-info'>
                  <Typography
                    sx={{ display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${conv.message}`.substring(0, 24) + ' ...'}
                  </Typography>
                  <TimeAgo
                      datetime={`${conv.time}`}
                      locale='en_IN'
                  />
                </span>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      )}

      {

        allConvs.length === 0 &&

          <div>
            No conversations found. Open a new one!
          </div>
      }
    </List>
  );
}
