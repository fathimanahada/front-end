import { useCallback, useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { getupdateData, updateDB } from 'src/dbservices/db';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


export const AccountProfileDetails = () => {
  // to get unique id from mongodb
  const router = useRouter();
  const mongoid = router.query.id;

  console.log("id == ",router.query.id);
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    // _id :id,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobtitle:''
   
  });
useEffect(()=>{
  getEmployeeData();
},[] )
 const getEmployeeData = async() =>{
  const results= await getupdateData(mongoid)
  console.log("resul",results) 
  setValues({
    // _id :id,
    firstName: results.firstname,
    lastName: results.lastname,
    email: results.email,
    phone: results.phoneNumber,
    jobtitle:results.jobTitle
   
  })
 }
 
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );
    const handleUpdate =  async () => {
      console.log("values",values)
      setOpen(true)
    try {
      
      const newdata = await updateDB({values,mongoid});
      console.log("db",newdata),
      console.log("db id",id)
      if(newdata){
        setOpen(true)
      }
    }
    catch (e){
      console.log("Error =",e)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
     
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
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
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  
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
                  onChange={handleChange}
                  required
                  value={values.jobtitle}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
             </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button  variant="contained" onClick={handleUpdate}>
            Update details
          </Button>
          <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Updated Successfully"
        action={action}
      />
          <Button variant="contained"  onClick={() => router.push('/customers')}>
            Cancel
          </Button>
        </CardActions>
        
      </Card>
    </form>
  );
};
