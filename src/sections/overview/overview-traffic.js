import PropTypes from 'prop-types';
// import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
// import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
// import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';
import { useState,useEffect ,useContext} from 'react';
import * as Realm from "realm-web";
import { getAggregate } from 'src/dbservices/db';
import {Fav} from 'src/Context.js';
const app = new Realm.App({ id: 'application-0-vhypf' });
let uniqueNames = [];


 const useChartOptions = () => {
  const {favAdded, setFavAdded} = useContext(Fav);
  const [graph,setGraph] = useState(['']);
  const [flag,setFlag] = useState(false);

  useEffect(()=>{
    dbconnect();
   setFavAdded(true);
  },[flag,favAdded]);
 

const dbconnect = async () => {
  try {
    const graphdata = await getAggregate();
    console.log("db",graphdata)
    setFlag(true);
    const emotions = graphdata.map(entry => entry._id);
    setGraph(emotions);
    //console.log("piedata",graph[0])
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
 }
export const OverviewTraffic = (props) => {
  
  const { chartSeries, labels, sx,keys } = props;
  
     useChartOptions(labels)
  
  
  
  
  return (
    <Card sx={sx}  width={400} height={200}>
      <CardHeader title="Emotion Details" />
      <CardContent>
        <Chart
          height={300}
          type="donut"
          width="100%"
          series={chartSeries}
          options={
            {
              labels :keys,
              dataLabels : {
                enabled :true
              }
            } 
          }
         
          
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
           {keys?.map((item, index) => {
            // console.log("keys ==",item)
            const label = labels[index]; 

             return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width:50,
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* {iconMap[label]} */}
                <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                >
                 {item}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  {label}
                </Typography>
              </Box>
             ); 
          })} 
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};
