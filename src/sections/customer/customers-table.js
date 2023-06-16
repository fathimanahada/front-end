import PropTypes from 'prop-types';
//import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Scrollbar } from 'src/components/scrollbar';
import { useRouter } from 'next/router';
import Image from 'next/image';


import { getInitials } from 'src/utils/get-initials';
import { deletDB } from 'src/dbservices/db';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    reloadData,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;


  const router = useRouter()
  const deletid = router.query._id;
  console.log("id == ", deletid);

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const handleDelet = async (deletid) => {
    console.log("id from mongodb", deletid)
    try {

      const deletdata = await deletDB({ deletid });
      console.log("db", deletdata);
      // console.log("db id",id)
      if (deletdata) {
        // router.reload()
        reloadData()
      }

    }
    catch (e) {
      console.log("Error =", e)
    }
  }


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Profile
                </TableCell>
                <TableCell>
                  FirstName
                </TableCell>
                <TableCell>
                  LastName
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  PhoneNumber
                </TableCell>
                <TableCell>
                  JobTitle
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                let url = `http://127.0.0.1:8086/get_image/${customer.Image}`
                const isSelected = selected.includes(customer.id);

                return (
                  <TableRow
                    hover
                    key={customer._id}

                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">

                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar
                    src={customer.Image} 
                    style={{ width: '50px', height: '50px' }} >
                    
                        </Avatar>
                      
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        
                        <Typography variant="subtitle2">
                          {customer.firstname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.lastname}
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.phoneNumber}
                    </TableCell>
                    <TableCell>
                      {customer.jobTitle}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => router.push({
                          pathname: `/update/${customer._id}`,
                        })}


                        >
                          <EditIcon />
                        </IconButton>
                        {<IconButton onClick={() => handleDelet(customer._id)}>
                          <DeleteIcon fontSize="small" /></IconButton>}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
      // rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
