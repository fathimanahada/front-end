// import {
//     Avatar,
//     Box,
//     Button,
//     Card,
//     CardActions,
//     CardContent,
//     Divider,
//     Typography
//   } from '@mui/material';
//   import { useState,useEffect } from 'react';
//   import axios from 'axios'

 

  

  
//   const user = {
//     avatar: '/assets/avatars/avatar-anika-visser.png',
   
//   };
//   export const AddProfile = () => {
    
    

//     const [file,setFile] = useState(''); 
//     useEffect(()=>{
//       handleSubmit();
//     },[] )    
//    const options =  {
//           method: 'POST',
//           headers: {
//             "content-type": "application/json"
//               }
//           };
//     const handleSubmit = async() => {
//         const responses =   await fetch('http://localhost:5000/upload_image',options)
//          .then(response => {
//           console.log(response);
//           setFile(response);
//          })
//          .catch(err =>{
//           console.log("error",err);
//          })
//         }
//         const handleOnChange = e => {
//           console.log(e.target.files[0]);
//           setFile(e.target.files[0]);
//         };
    
        
    
    
    
  
//     return (
//       <Card>
//         <CardContent>
//           <Box
//             sx={{
//               alignItems: 'center',
//               display: 'flex',
//               flexDirection: 'column'
//             }}
//           >
//             <Avatar
//               src={user.avatar}
//               sx={{
//                 height: 80,
//                 mb: 2,
//                 width: 80
//               }}
//             />
//             <Typography
//               gutterBottom
//               variant="h5"
//             >
//               {user.name}
//             </Typography>
//             <Typography
//               color="text.secondary"
//               variant="body2"
//             >
//               {user.city} {user.country}
//             </Typography>
//             <Typography
//               color="text.secondary"
//               variant="body2"
//             >
//               {user.timezone}
//             </Typography>
//           </Box>
//         </CardContent>
//         <Divider />
//         <CardActions>
//           <Button
//             fullWidth
//             variant="text"
//             // onChange={handleFileInputChange} 
//             onChange={handleOnChange}
//             onClick={handleSubmit}
//           >
//             Upload picture
//           </Button>
//         </CardActions>
//       </Card>
//     );
//   };
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
import { useState } from 'react';
import axios from 'axios';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
};

export const AddProfile = () => {
  const [file, setFile] = useState(null);
  const [imgpath,setImgpath] = useState();

  const handleSubmit = async () => {
 
    if (file) {
 
      const formData = new FormData();
      formData.append('file', file);
console.log('formDta',formData)
      try {
  
        const response = await axios.post(
          'http://localhost:8086/upload_image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      //  if(response && response.data && response.data.image_path){
        setImgpath(response.data.image_path);
        //  console.log(image_path)
        console.log('Response:', response);
       
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };
  const handleOnChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setFile(e.target.files[0]);
    
  };

  // console.log('File:', file);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            // src={} 
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.city} {user.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" component="label">
          Upload picture
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleOnChange}
          />
        </Button>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
