import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import { useState,useEffect } from 'react';
  import axios from 'axios'

 

  

  
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
   
  };
  export const AddProfile = () => {
    
    

    const [file,setFile] = useState(''); 
    useEffect(()=>{
      handleSubmit();
    },[] )    
   const options =  {
          method: 'POST',
          headers: {
            "content-type": "application/json"
              }
          };
    const handleSubmit = async() => {
        const responses =   await fetch('http://localhost:5000/upload_image',options)
         .then(response => {
          console.log(response);
          setFile(response);
         })
         .catch(err =>{
          console.log("error",err);
         })
        }
        const handleOnChange = e => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        };
    
        
    
    
    
  
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80
              }}
            />
            <Typography
              gutterBottom
              variant="h5"
            >
              {user.name}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.city} {user.country}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.timezone}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            fullWidth
            variant="text"
            // onChange={handleFileInputChange} 
            onChange={handleOnChange}
            onClick={handleSubmit}
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  