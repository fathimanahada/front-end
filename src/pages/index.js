import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useState, useEffect } from 'react';
import { getAggregate } from 'src/dbservices/db';


const now = new Date();


const Page = () => {

  const [group, setGroup] = useState([]);
  useEffect(() => {


    salesdata('');
  }, [])

  const salesdata = async (id) => {
    const groupdata = await getAggregate(id);
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
            {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>*/}
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    // name: 'Count',
                    // name: group.map((item) => {
                    //   return item._id 
                    //   }),
                    data: group?.map((item) => {
                      
                      return item?.count
                    }),
                  }
                  // {
                  //   name: 'Last year',
                  //   data: [55,65,75,85,95]
                  // }
                ]}
                //labels={['1:happy',]}

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
