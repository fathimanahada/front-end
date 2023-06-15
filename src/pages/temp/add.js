import Head from 'next/head';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { AddProfile } from '../../sections/addemp/add-profile';
import { AddProfileDetails } from '../../sections/addemp/add-profile-details';

const Add = () => (
  <>
  <Head>
      <title>
        New Employee
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Add New Employee
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              {/* <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AddProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              > */}
                <AddProfileDetails />
              </Grid>
             {/* </Grid>  */}
          </div>
        </Stack>
      </Container>
    </Box>
  </>

   );

export default Add;
