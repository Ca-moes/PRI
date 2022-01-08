import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Loading from "../Loading"
import Rating from '@mui/material/Rating';
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"


export default function Item(props) {
  const discountFlat = (price, original) => {
    return (original - price).toFixed(2);
  }

  const discountPerc = (price, original) => {
    return Math.round((1 - (price / original)) * 100);
  }

  /*
  if (!itemInfo) {
    return (<Loading/>);
  }
  */

  return (
    <Card sx={{ maxWidth: 345, m:2 }}>
      <CardActionArea  sx={{pb: 1}}>
        <CardMedia
          component="img"
          height="350"
          image={props.image}
          alt={"Photo of " + props.title}
          sx={{py: 1, px: 1}}
        />
        <Box sx={{px: 1}}>
          <Typography variant="h5" component="span"><b>{props.title}</b></Typography>
        </Box>
        <Rating name="read-only" size="small" value={props.rating} precision={1} readOnly sx={{px: 1, mb: 1}}/>
        <Grid item>
          {props.originalPrice === 0 ?
            <>
              {props.price === 0 ?
                <Typography component="span" sx={{px: 1}}>Item currently unavailable</Typography>
                :
                <Typography component="span" variant="h5" sx={{px: 1}}><b>{props.price}</b>$</Typography>
              }
            </>
            :
            <>
            {<Stack direction="row" spacing={1} alignItems="center" sx={{px: 1}}>
                <Typography component="span" variant="h5"><b>{props.price}</b>$</Typography>
                <Typography variant="body2" component="span"
                            className="grey-strikethrough">{props.originalPrice}$</Typography>
                <Typography color="primary"  variant="body1" component="span">
                  Save {discountFlat(props.price, props.originalPrice)}$
                  ({discountPerc(props.price, props.originalPrice)}%)
                </Typography>
              </Stack>
            }
            </>
          }
        </Grid>
      </CardActionArea>
    </Card>
  );
}