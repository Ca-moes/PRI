import {useParams} from "react-router-dom";
import React from "react";
import Loading from "../components/Loading";
import Container from "@mui/material/Container";
import {Grid, Link, Rating, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

import '../style/item.css';
import ContentNotFound from "../components/layout/ContentNotFound";
import Box from "@mui/material/Box";

const axios = require('axios');

const ItemPage = () => {
  const {asin} = useParams();
  const [notFound, setNotFound] = React.useState(false);
  const [itemInfo, setItemInfo] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3001/api/items/' + asin)
      .then((res) => {
        setItemInfo(res.data)
      })
      .catch((error) => {
        if (error.response.status === 404)
          setNotFound(true)
        else {
          console.log(error)
        }
      })
  }, []);

  const discountFlat = (price, original) => {
    return (original - price).toFixed(2);
  }

  const discountPerc = (price, original) => {
    return Math.round((1 - (price / original)) * 100);
  }

  const returnDetail = (detail, add = '') => {
    return detail ? detail + add : 'No information'
  }

  const checkUndefined = (detail) => {
    return detail === undefined ? [] : detail
  }

  if (!itemInfo) {
    if (notFound) {
      return (<ContentNotFound/>);
    }

    return (<Loading/>);
  }


  return (
    <Container maxWidth="md" sx={{my: 5}}>
      <Box sx={{backgroundColor: 'white', p: 4}}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item sm={12} md={4}>
            <img src={itemInfo.image} alt="ItemCard Image" style={{width: '100%'}}/>
          </Grid>
          <Grid item sm={12} md={8} container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h5">{itemInfo.title}</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Rating name="read-only" value={itemInfo.rating} precision={0.1} readOnly/>
                <Typography variant="body2" component="span">{itemInfo.totalRatings} ratings</Typography>
              </Stack>
            </Grid>
            <Grid item>
              {itemInfo.originalPrice == 0 ?
                <>
                  {itemInfo.price == 0 ?
                    <Typography component="span">ItemCard currently unavailable</Typography>
                    :
                    <Typography variant="h6" component="span"><b>{itemInfo.price}</b>$</Typography>
                  }
                </>
                :
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" component="span"><b>{itemInfo.price}</b>$</Typography>
                  <Typography variant="body2" component="span"
                              className="grey-strikethrough">{itemInfo.originalPrice}$</Typography>
                  <Typography color="primary" variant="body2" component="span">
                    Save {discountFlat(itemInfo.price, itemInfo.originalPrice)}$
                    ({discountPerc(itemInfo.price, itemInfo.originalPrice)}%)
                  </Typography>
                </Stack>
              }
            </Grid>
            <Grid item container spacing={3}>
              <Grid item>
                <Stack>
                  <Typography><b>Carrier</b></Typography>
                  <Typography><b>Operating System</b></Typography>
                  <Typography><b>Color</b></Typography>
                  <Typography><b>Screen Size</b></Typography>
                  <Typography><b>Storage Capacity</b></Typography>
                  <Typography><b>Cellular Connectivity</b></Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack>
                  <Typography>{returnDetail(checkUndefined(itemInfo.wireless_carrier).join(', '))}</Typography>
                  <Typography>{returnDetail(itemInfo.operating_system)}</Typography>
                  <Typography>{returnDetail(itemInfo.color)}</Typography>
                  <Typography>{returnDetail(itemInfo.screen_size, '"')}</Typography>
                  <Typography>{returnDetail(itemInfo.memory_storage_capacity, ' GB')}</Typography>
                  <Typography>{returnDetail(checkUndefined(itemInfo.cellular_technology).join(', '))}</Typography>
                </Stack>
              </Grid>
            </Grid>
            {itemInfo.about &&
              <Grid item>
                <Typography variant="h6"><b>About this product</b></Typography>
                <ul style={{paddingLeft: '1rem'}}>
                  {itemInfo.about.map((el, index) => (<li key={index}>{el}</li>))
                  }
                </ul>
              </Grid>
            }
          </Grid>
        </Grid>
        <Stack mt={2} spacing={2}>
          {itemInfo.description &&
            <>
              <Typography variant="h6" color="primary"><b>Product details</b></Typography>
              <Typography>{itemInfo.description}</Typography>
            </>
          }
          <Link variant="h6" color="primary"><b>Check out this product's reviews</b></Link>
        </Stack>
      </Box>
    </Container>
  );
}

export default ItemPage;