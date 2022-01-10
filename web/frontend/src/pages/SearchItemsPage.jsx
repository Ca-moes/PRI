import React from "react"
import axios from "axios";
import Container from "@mui/material/Container";
import {
  FormControl,
  Grid,
  InputLabel,
  Pagination,
  Select,
  Slider,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import CustomAccordion from "../components/CustomAccordion";
import FacetCheckboxList from "../components/FacetCheckboxList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import SearchInput from "../components/SearchInput";
import ItemCard from "../components/ItemCard";

const SearchItemsPage = () => {
  const [sort, setSort] = React.useState("rating_item desc, totalRatings desc");
  const [data, setData] = React.useState({
    numFound: 0,
    numPages: 1,
    query: {q: '*', page: 1, sort},
    items: [],
    facets: {}
  });

  const searchItems = (params) => {
    window.scroll({top: 0, behavior: 'smooth'});

    axios.get('http://localhost:3001/api/items/search', {params: params})
      .then(({data}) => {
        setData(data)
      });
  }

  React.useEffect(() => {
    searchItems(data.query)
  }, [])

  const handleQuery = (query) => {
    if (query === "") query = "*"
    searchItems({q: query, page: 1})
  }

  const handlePriceChange = (event, newValue) => {
    searchItems({...data.query, page: 1, price: newValue})
  };

  const handleRatingChange = (event, newValue) => {
    searchItems({...data.query, page: 1, rating: newValue})
  };

  const handleFilter = (filter, newValue) => {
    let newParams = {...data.query, page: 1, filter: filter, [filter]: newValue}
    searchItems(newParams)
  };

  const handleSort = (event) => {
    const sort = event.target.value
    setSort(sort)
    searchItems({...data.query, page: 1, sort})
  };

  const handlePage = (event, value) => {
    searchItems({...data.query, page: value})
  };

  return (
    <Container maxWidth="lg" sx={{my: 5}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{backgroundColor: 'secondary.main', padding: '2rem'}}>
            <SearchInput handleQuery={handleQuery}/>
          </Box>
        </Grid>
        <Grid item sm={12} md={3}>
          <Box sx={{backgroundColor: 'white', paddingX: '1rem', paddingY: '2rem'}}>
            <Stack spacing={2}>
              <CustomAccordion title='Price'>
                <Slider
                  defaultValue={[0, 1000]}
                  onChangeCommitted={handlePriceChange}
                  valueLabelDisplay="auto"
                  step={50}
                  min={0}
                  max={1000}
                />
              </CustomAccordion>
              <CustomAccordion title='Rating'>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  defaultValue={[0, 5]}
                  onChangeCommitted={handleRatingChange}
                  valueLabelDisplay="auto"
                  step={0.1}
                  min={0}
                  max={5}
                  disableSwap
                />
              </CustomAccordion>
              <CustomAccordion title='Brand'>
                {data.facets.brand &&
                  <FacetCheckboxList filter='brand' facet={data.facets.brand} handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Carrier'>
                {data.facets.wireless_carrier &&
                  <FacetCheckboxList filter='wireless_carrier' facet={data.facets.wireless_carrier}
                                     handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Operating System'>
                {data.facets.operating_system &&
                  <FacetCheckboxList filter='operating_system' facet={data.facets.operating_system}
                                     handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Color'>
                {data.facets.color &&
                  <FacetCheckboxList filter='color' facet={data.facets.color} handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Screen Size'>
                {data.facets.screen_size && <FacetCheckboxList filter='screen_size' facet={data.facets.screen_size}
                                                               handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Storage Capacity'>
                {data.facets.memory_storage_capacity &&
                  <FacetCheckboxList filter='memory_storage_capacity' facet={data.facets.memory_storage_capacity}
                                     handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Cellular Connectivity'>
                {data.facets.cellular_technology &&
                  <FacetCheckboxList filter='cellular_technology' facet={data.facets.cellular_technology}
                                     handleFilters={handleFilter}/>}
              </CustomAccordion>
            </Stack>
          </Box>
        </Grid>
        <Grid item sm={12} md={9}>
          <Box sx={{backgroundColor: 'white', paddingX: '1rem', paddingY: '2rem'}}>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
              <FormControl variant="standard" sx={{minWidth: 180}}>
                <InputLabel id="select-sort-label">Sort</InputLabel>
                <Select
                  labelId="select-sort-label"
                  id="select-sort"
                  value={sort}
                  onChange={handleSort}
                  label="Sort"
                >
                  <MenuItem value="rating_item desc, totalRatings desc">Rating (Descending)</MenuItem>
                  <MenuItem value="rating_item asc, totalRatings desc">Rating (Ascending)</MenuItem>
                  <MenuItem value="price desc">Price (Descending)</MenuItem>
                  <MenuItem value="price asc">Price (Ascending)</MenuItem>
                  <MenuItem value="div(price, originalPrice) asc">Best discount (%)</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2">
                {data.items.length > 0 && <>{(data.query.page-1) * 12 + 1}-{(data.query.page-1)*12+data.items.length} of </>}
                {data.numFound} Results
              </Typography>
            </Stack>
            <Grid container spacing={3} sx={{mt: 2, mb: 3}}>
              {data.items.map((item, index) => (<Grid item key={index} xs={4}><ItemCard item={item}/></Grid>))}
            </Grid>
            {data.numPages > 1 &&
              <Grid container justifyContent="center">
                <Pagination page={parseInt(data.query.page)} count={data.numPages} shape="rounded" color="secondary"
                            onChange={handlePage}/>
              </Grid>
            }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchItemsPage;