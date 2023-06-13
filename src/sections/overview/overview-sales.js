import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import { useState,useEffect } from 'react';
import { getAggregate, getData } from 'src/dbservices/db';
import * as Realm from "realm-web";

const app = new Realm.App({ id: 'application-0-vhypf' });
let uniqueNames = [];

// const dbconnect =async () => {
//   const graphdata = await getData();
//   setFlag(true);
// }





const useChartOptions = (keys) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: 
      keys
      
      ,labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx, keys } = props;
  
  const chartOptions = useChartOptions(keys);
  console.log("props", chartSeries)


  return (
    <Card sx={sx}>
      <CardHeader
        action={(
      <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic">
        Emotion Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Organization based</Dropdown.Item>
             <Dropdown.Divider />
             {/* <Dropdown.Item eventKey="4">Individual */}
              <Dropdown drop='end' >
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Individual emotions
              </Dropdown.Toggle>

              <Dropdown.Menu align= '"start" | "end"' >
                <Dropdown.Item href="#/action-1">sad</Dropdown.Item>
                <Dropdown.Item href="#/action-2">happy</Dropdown.Item>
                <Dropdown.Item href="#/action-3">neutral</Dropdown.Item>
                <Dropdown.Item href="#/action-4">fear</Dropdown.Item>
                <Dropdown.Item href="#/action-5">angry</Dropdown.Item>
                <Dropdown.Item href="#/action-6">disgust</Dropdown.Item>
                <Dropdown.Item href="#/action-3">surprise</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
    </Dropdown.Menu>
    </Dropdown>
    
        )}
        title="Overview of emotions "
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button> */}
      </CardActions>
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};