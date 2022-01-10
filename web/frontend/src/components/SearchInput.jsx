import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import {Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';

const StyledInputElement = styled('input')(
  () => `
  width: 100%;
  font-size: 1rem;
  color: black;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px 12px;
  transition: all 150ms ease;

  &:hover {
    border-color: grey;
  }

  &:focus {
    outline: 2px solid #b37ee7;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function SearchInput({handleQuery}) {
  const [query, setQuery] = React.useState("*");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleQuery(query)
    }
  }

  return (
      <Stack direction="row">
        <CustomInput style={{ flexGrow: 1 }} aria-label="Search input" placeholder="What are you looking for?" onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
        <IconButton aria-label="search" variant="contained" onClick={() => handleQuery(query)}>
          <SearchIcon />
        </IconButton>
      </Stack>
  );

}