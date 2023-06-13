import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
//import { MagnifyingGlassIcon } from '@heroicons/react/solid';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const CustomersSearch = (props) => {
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (query.length > 0) {
      const result = allData.filter((item) => item.Name.toLowerCase().includes(value));
      setFilteredData(result);
    // } else {
    //   setFilteredData(allData);
     }
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search customer"
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
  );
};
