import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Card,InputAdornment, OutlinedInput } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
//import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useRouter } from 'next/navigation';
import { getNewData, getEmotion } from 'src/dbservices/db';
import { useAuth } from 'src/hooks/use-auth';
import * as Realm from "realm-web";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';




const app = new Realm.App({ id: 'application-0-vhypf' });


const now = new Date();


const data = [
  {
    name: '',
    time: '',
    AverageEmotion: ''
  },
]


const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};


const Page = () => {
  const [page, setPage] = useState(0);
  const [tabledata, setTableData] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const router = useRouter();
  const [query, setQuery] = useState("");
  // const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (query.length > 0) {
      const result = tabledata.filter((item) => item.Name.toLowerCase().includes(value));
      setFilteredData(result);
    }
    // else {
          
    //  }
  };

  useEffect(() => {
    //console.log("curent", app.currentUser)
    
    dbconnect()
  }, [])
  const dbconnect = async () => {
     //await getEmotion()
    const response = await getNewData()
    setTableData(response)
    setFilteredData(response);

   // console.log("res==", response)
  }
  //console.log("data", tabledata)
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const reloadData = () => {
    dbconnect()
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const addEmp = () => {
    //auth.skip();
    router.push('/temp/add');
  }

  return (
    <>
      <Head>
        <title>
          Employee
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                 Employee
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  
                </Stack>
              </Stack>
              <div>
                <Button onClick={addEmp}
                  
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
    
            </Stack>
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder="Search employee"
                startAdornment={(
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  </InputAdornment>
                )}
                sx={{ maxWidth: 500 }}
                value={query}
                onChange={handleSearch}


              />
            </Card>
            <CustomersTable
              count={data.length}
              items={filteredData}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              reloadData={reloadData}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
