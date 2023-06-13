import { useCallback, useState } from 'react';
import {
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






export const AddProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobtitle: ''
  });
  console.log("values ==",values.firstName)

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
  const [error,setError] = useState()
  // const validateEmail = () => {
  //   const re = /\S+@\S+\.\S+/;
  //   if (!re.test(email)) {
  //     setError('Please enter a valid email address');
  //     return false;
  //   }
  //   setError('');
  //   return true;
  // };
  const handleSubmit = useCallback(
    (event) => {
     event.preventDefault()
    },
    []
  );
   
  const valueCheck = () => {
     if (!values.firstName && !values.lastName && !values.email  && !values.phone && values.jobtitle)
      {
        alert("Some fields are required")
      }
      else if(values.email)
      {
         if(!/\S+@\S+\.\S+/.test(values.email ))
         {
           alert("email is not formatted")
         }
         else{
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

  
  const handleInsert = async () => {
    console.log("values", values)
    const newdata = await insertDB({ values });
    console.log("db", newdata)
    try {
      alert("Saved successfully")
      router.push('/customers')
    } catch (e) {
      alert("Some fields are required")
    }


  }
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Add new employee details"
        //title="Profile"
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
                  error={!values.firstName? true:false}
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
                  error={!values.lastName? true:false}
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
                  error={!values.email || (!/\S+@\S+\.\S+/.test(values.email))? true:false}
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
                  error={!values.phone? true:false}
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
                  error = {!values.jobtitle?true:false}
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
