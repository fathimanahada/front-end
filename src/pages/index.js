import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useState, useEffect } from 'react';
import { getAggregate } from 'src/dbservices/db';
import { useContext } from 'react';
import {Fav} from 'src/Context.js';
const now = new Date();


const Page = () => {
  const {favAdded, setFavAdded} = useContext(Fav);

  const [group, setGroup] = useState([]);
  useEffect(() => {


    salesdata('');
    setFavAdded(false);
  }, [favAdded])

//let nameList=['N']

  const salesdata = async (id) => {
    const groupdata = await getAggregate('Nahada.JPG'); //id
    setGroup(groupdata);
    console.log("count", groupdata)
  };
  
  return (
    <>
      <Head>
        <title>
          Overview 
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            
            <Grid
              xs={12}
              lg={8}
            >
            <OverviewSales
                chartSeries={[
                  {
                    name : 'count',
                    data: group?.map((item) => {
                      
                      return item?.count
                    }),
                  }
                 
                ]}
              

                sx={{ height: '100%' }}
                keys={group?.map(v => v._id)}
              />
            </Grid>
            <Grid
              xs={16}
              md={8}
              lg={6}
            >
              <OverviewTraffic
                chartSeries={ 
                  group?.map((item) => {
                  return item.count
                })
              }
                labels={
                  group?.map((item) => {
                  return item.count
                })
              }
                sx={{ height: '100%', width: '400' }}
                keys={
                  group?.map(v => v._id)
                }
              />
            </Grid>
            
          </Grid> *
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
