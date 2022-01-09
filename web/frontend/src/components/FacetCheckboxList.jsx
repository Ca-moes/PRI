import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { FixedSizeList } from 'react-window';
import {Checkbox, FormControlLabel, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function FacetCheckboxList({filter, facet, handleFilters}) {
  const [selected, setSelected] = React.useState([]);

  const handleChange = async (event) => {
    let newSelected;

    if (event.target.checked)
      newSelected = [...selected, event.target.value]
    else
      newSelected = [...selected].filter(e => e !== event.target.value)

    handleFilters(filter, newSelected)
    setSelected(newSelected)
  };

  function FacetCheckbox(props) {
    const { index, style } = props;

    const value = facet[index].val
    const count = facet[index].count

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <FormControlLabel
          control={<Checkbox value={value} checked={selected.indexOf(value) !== -1} onChange={handleChange}/>}
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" component="span">{value}</Typography>
              <Typography variant="body2" component="span" color="primary">{count}</Typography>
            </Stack>
          }
        />
      </ListItem>
    );
  }

  return (
    <Box
      sx={{ width: '100%', maxHeight: 40*Math.min(5, facet.length), bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={40*Math.min(5, facet.length)}
        width='100%'
        itemSize={40}
        itemCount={facet.length}
        overscanCount={5}
      >
        {FacetCheckbox}
      </FixedSizeList>
    </Box>
  );
}