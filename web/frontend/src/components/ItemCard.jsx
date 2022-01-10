import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from "@mui/material/Stack";
import {Link} from "react-router-dom";


export default function ItemCard({item}) {
  const discountFlat = (price, original) => {
    return (original - price).toFixed(2);
  }

  const discountPerc = (price, original) => {
    return Math.round((1 - (price / original)) * 100);
  }

  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea sx={{pb: 1}} component={Link} to={"/item/" + item.asin}>
        <CardMedia
          component="img"
          height="300"
          image={item.image}
          alt={"Photo of " + item.title}
          sx={{py: 1, px: 1}}
        />
        <Stack spacing={1} sx={{m: 2, minHeight: '12rem'}} justifyContent="center">
          <Typography component="span">
            <b>{item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}</b>
          </Typography>
          <Rating name="read-only" size="small" value={item.rating} precision={1} readOnly sx={{mt: 1, mx: 2}}/>
          <>
            {item.originalPrice == 0 ?
              <>
                {item.price == 0 ?
                  <Typography component="span">Item currently unavailable</Typography>
                  :
                  <Typography component="span" variant="h6"><b>{item.price}</b>$</Typography>
                }
              </>
              :
              <>
                {
                  <>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography component="span" variant="h5"><b>{item.price}</b>$</Typography>
                      <Typography variant="body2" component="span"
                                  className="grey-strikethrough">{item.originalPrice}$</Typography>
                    </Stack>
                    <Typography color="primary"  variant="body1" component="span">
                      Save {discountFlat(item.price, item.originalPrice)}$
                      ({discountPerc(item.price, item.originalPrice)}%)
                    </Typography>
                  </>
                }
              </>
            }
          </>
        </Stack>
      </CardActionArea>
    </Card>
  );
}