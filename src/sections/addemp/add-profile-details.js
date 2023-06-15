import { useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { insertDB, deletDB } from 'src/dbservices/db';
import { onSpaceOrEnter } from '@mui/x-date-pickers/internals';
import { useRouter } from 'next/router';
import axios from 'axios'
import { setFips } from 'crypto';







export const AddProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobtitle: '',
    Imgurl: ''
  });
  // console.log("values ==", values.Imgurl)

  const router = useRouter()

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value

      }));
    },
    []
  );

  // console.log("values ==",typeof values.phoneNumber)
  const [file, setFile] = useState(null);
  const [imgpath, setImgpath] = useState();
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
    },
    []
  );

  const valueCheck = (event) => {
    
    
    if (!values.firstName && !values.lastName && !values.email && !values.phone && values.jobtitle) {
      alert("Some fields are required")
    }
    else if (values.email) {
      if (!/\S+@\S+\.\S+/.test(values.email)) {
        alert("email is not formatted")
      }
      else {
        handleInsert()
      }
    }

  }
  // if (!values.firstName) {
  //   setErrors(true)
  // }
  // if (!values.lastName) {
  //   setErrors(true)
  // }
  // else if (!values.email && !/\S+@\S+\.\S+/.test(values.email)) {
  //   setErrors('email is ')
  //   setErrors(true)
  // }
  // else if (!values.phone) {
  //   setErrors(true)
  // }
  // else {
  //   console.log("else part worked??")
  //   setErrors(false)
  //    handleInsert()
  // }
  // const handleImgSubmit = async () => {


  // };
  const handleInsert = async () => {
    console.log('handleInsert==', imgpath);
    const newdata = await insertDB({ values, url: imgpath });
    const newValues = {
      ...values,
      Imgurl: imgpath
    };
    console.log("db", newdata)
    try {
      alert("Saved successfully")
      router.push('/customers')
    } catch (e) {
      alert("Some fields are required")
    }
  }
 

  const handleOnChange = async (e) => {
    console.log('File selected:', e.target.files[0]);
    setFile(e.target.files[0]);


    if (e.target.files && e.target.files[0]) {

      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      console.log('formDta', formData)
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

        //  console.log(image_path)
        console.log("res", response)
        if (response) {
          const url = response.data
          setImgpath(url);
        }

        // console.log('Response==',url);

      } catch (error) {
        console.log('Error:', error);
      }
    }

  };
  //  console.log("setfile ==",)
  // console.log('Response==', imgpath);

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
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
            src={imgpath} 
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
          <Button fullWidth variant="text" component="label" type='button'>
            Upload picture
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleOnChange}
              value={values.Imgurl}
            />
          </Button>
          {/* <Button fullWidth variant="contained" onClick={handleImgSubmit}>
          Submit
        </Button> */}
        </CardActions>
        <CardHeader
          subheader="Add new employee details"
          title="Profile"
        />
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  error={!values.firstName ? true : false}
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField

                  fullWidth
                  label="Last name"
                  name="lastName"
                  error={!values.lastName ? true : false}
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type='email'
                  error={!values.email || (!/\S+@\S+\.\S+/.test(values.email)) ? true : false}
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  error={!values.phone ? true : false}
                  required
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="JobTitle"
                  name="jobtitle"
                  required
                  error={!values.jobtitle ? true : false}
                  onChange={handleChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={values.jobtitle}
                />

              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={valueCheck}
          >
            Save details
          </Button>
          <Button variant="contained" onClick={() => router.push('/customers')}
          >
            Cancel
          </Button>
        </CardActions>

      </Card>
    </form >
  );
};
