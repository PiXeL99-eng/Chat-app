import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function New_Text() {

    const [newText, setNewText] = useState('')
    
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: 850, maxWidth: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Type your text"
            multiline
            fullWidth
            rows={1.2}
            value={newText}
            onChange={(event) => {
              setNewText(event.target.value);
            }}
          />
        </div>
      </Box>
    );
}
