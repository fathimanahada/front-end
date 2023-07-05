import PropTypes from 'prop-types';
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
import { useState,useEffect, useContext } from 'react';
import { getAggregate, getData ,getNewData} from 'src/dbservices/db';
import * as Realm from "realm-web";
import {Fav} from 'src/Context.js';

const app = new Realm.App({ id: 'application-0-vhypf' });






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
  const {favAdded, setFavAdded} = useContext(Fav);
  const { chartSeries, sx, keys } = props;
  const [tabledata, setTableData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    
    dbconnect();
    setFavAdded(false);
  },[favAdded])
  const dbconnect = async () => {
    const response = await getNewData()
    setTableData(response)
    setFilteredData(response);
  
    console.log("tabledata", response)
  }
  // useEffect(() => {
  //   const dbconnect = async () => {
  //     const response = await getNewData();
  //     setTableData(response);
  //     setFilteredData(response);
  //     console.log("tabledata", response);
  //   };
  
  //   if (refresh) {
  //     dbconnect();
  //     setRefresh(false);
  //   }
  // }, [refresh]);
  
  
  const chartOptions = useChartOptions(keys);
  console.log("props", chartSeries)
  let name='Nimitha.JPG';
    //const [selectedEmployee, setSelectedEmployee] = useState(null);
    const handleEmployeeChange = (name) => {
     // setSelectedEmployee(name);
      getAggregate(name); // Call the getAggregate function with the selected name
      setRefresh(true);
    }

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
              <Dropdown drop='end' >
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Individual emotions
              </Dropdown.Toggle>
                <Dropdown.Menu align= '"start" | "end"' >



              {tabledata.map((empName,index)=>{
                console.log("empname",empName.firstname)
                return (<Dropdown.Item onClick={()=>{getAggregate('Nimitha.JPG').then(setFavAdded(true))}}>{empName.firstname}</Dropdown.Item>)
              })}
                
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
       
      </CardActions>
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};