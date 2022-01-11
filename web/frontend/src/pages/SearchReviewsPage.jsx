import axios from "axios";
import React from "react";
import {FormControl, Grid, InputLabel, Pagination, Select, Slider, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import SearchInput from "../components/SearchInput";
import CustomAccordion from "../components/CustomAccordion";
import FacetCheckboxList from "../components/FacetCheckboxList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import ReviewCard from "../components/ReviewCard";

const SearchReviewsPage = () => {
  const minDate = new Date('2003-11-24');
  const maxDate = new Date();
  const [fromDate, setFromDate] = React.useState(minDate);
  const [toDate, setToDate] = React.useState(maxDate);
  const [sort, setSort] = React.useState("rating_review desc, helpfulVotes desc");
  const [data, setData] = React.useState({
    numFound: 0,
    numPages: 0,
    query: {q: '*', page: 1, sort},
    reviews: [],
    facets: {}
  });

  const searchReviews = (params) => {
    window.scroll({top: 0, behavior: 'smooth'});

    axios.get('http://localhost:3001/api/reviews/search', {params: params})
      .then(({data}) => {
        setData(data)
      });
  }

  React.useEffect(() => {
    searchReviews(data.query)
  }, [])

  const handleQuery = (query) => {
    if (query === "") query = "*"
    searchReviews({q: query, page: 1})
  }

  const handleRatingChange = (event, newValue) => {
    searchReviews({...data.query, page: 1, rating: newValue})
  };

  const handleVotesChange = (event, newValue) => {
    searchReviews({...data.query, page: 1, votes: newValue})
  };

  const handleFromDate = (newValue) => {
    setFromDate(newValue)
    searchReviews({...data.query, page: 1, fromDate: newValue, toDate: toDate})
  }

  const handleToDate = (newValue) => {
    setToDate(newValue)
    searchReviews({...data.query, page: 1, fromDate: fromDate, toDate: newValue})

  }

  const handleFilter = (filter, newValue) => {
    let newParams = {...data.query, page: 1, filter: filter, [filter]: newValue}
    searchReviews(newParams)
  };

  const handleSort = (event) => {
    const sort = event.target.value
    setSort(sort)
    searchReviews({...data.query, page: 1, sort})
  };

  const handlePage = (event, value) => {
    searchReviews({...data.query, page: value})
  };

  return (
    <Container maxWidth="lg" sx={{my: 5}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{backgroundColor: 'secondary.main', padding: '2rem'}}>
            <SearchInput handleQuery={handleQuery}/>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{backgroundColor: 'white', padding: '1rem'}}>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{m: 1}}><b>Filters</b></Typography>
              <CustomAccordion title='Rating'>
                <Slider
                  defaultValue={[1, 5]}
                  onChangeCommitted={handleRatingChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={5}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">1</Typography>
                  <Typography variant="body2">5</Typography>
                </Stack>
              </CustomAccordion>
              <CustomAccordion title='Helpful Votes'>
                <Slider
                  defaultValue={[0, 889]}
                  onChangeCommitted={handleVotesChange}
                  valueLabelDisplay="auto"
                  step={10}
                  min={0}
                  max={889}
                />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">0</Typography>
                  <Typography variant="body2">889</Typography>
                </Stack>
              </CustomAccordion>
              <CustomAccordion title='Date'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2}>
                    <DesktopDatePicker
                      label="From"
                      inputFormat="dd/MM/yyyy"
                      value={fromDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      onChange={handleFromDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                      label="To"
                      inputFormat="dd/MM/yyyy"
                      value={toDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      onChange={handleToDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </CustomAccordion>
              <CustomAccordion title='Country'>
                {data.facets.country &&
                  <FacetCheckboxList filter='country' facet={data.facets.country} handleFilters={handleFilter}/>}
              </CustomAccordion>
              <CustomAccordion title='Verified'>
                {data.facets.verified &&
                  <FacetCheckboxList filter='verified' facet={data.facets.verified}
                                     handleFilters={handleFilter}/>}
              </CustomAccordion>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{backgroundColor: 'white', padding: '1.5rem'}}>
            <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={3}>
              <FormControl variant="standard" sx={{minWidth: 180}}>
                <InputLabel id="select-sort-label">Sort</InputLabel>
                <Select
                  labelId="select-sort-label"
                  id="select-sort"
                  value={sort}
                  onChange={handleSort}
                  label="Sort"
                >
                  <MenuItem value="rating_review desc, helpfulVotes desc">Rating (Descending)</MenuItem>
                  <MenuItem value="rating_review asc, helpfulVotes desc">Rating (Ascending)</MenuItem>
                  <MenuItem value="helpfulVotes desc, rating_review desc">Helpful Votes (Descending)</MenuItem>
                  <MenuItem value="helpfulVotes asc, rating_review desc">Helpful Votes (Ascending)</MenuItem>
                  <MenuItem value="date desc, rating_review desc">Date (Descending)</MenuItem>
                  <MenuItem value="date asc, rating_review desc">Date (Ascending)</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2">
                {data.reviews.length > 0 && <>{(data.query.page - 1) * 12 + 1}-{(data.query.page - 1) * 12 + data.reviews.length} of </>}
                {data.numFound} Results
              </Typography>
            </Stack>
            <Stack spacing={3} sx={{my: 3}}>
              {data.reviews.map((review, index) => (<ReviewCard key={index} review={review}/>))}
            </Stack>
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

export default SearchReviewsPage;