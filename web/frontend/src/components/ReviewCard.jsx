import React from "react";
import Rating from "@mui/material/Rating";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {Link} from "@mui/material";

export default function ReviewCard({review}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  let button;
  if (expanded) {
    button = (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        endIcon={<ExpandLessIcon/>}
        onClick={handleChange}
      >
        Read less
      </Button>
    );
  } else {
    button = (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        endIcon={<ExpandMoreIcon/>}
        onClick={handleChange}
      >
        Read more
      </Button>
    );
  }

  return (
    <>
      <Paper elevation={2} sx={{py: 3}}>
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <Link href={`/item/${review.asin}`} underline="none" style={{color: 'grey'}}>on: {review.asin}</Link>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Rating name="read-only" value={review.rating} precision={0.1} readOnly/>
                <Typography variant="h6">{review.title}</Typography>
              </Stack>
            </Grid>
            <Grid zeroMinWidth item>
              <Collapse in={expanded} collapsedSize={50}>
                <Typography>{review.body}</Typography>
              </Collapse>
              {review.body && review.body.length > 205 && button}
            </Grid>
            <Grid item container direction="row" justifyContent="space-between" alignItems="center" sx={{mt: 1}}>
              <Grid item>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">By {review.name}</Typography>
                  {review.verified && <VerifiedIcon fontSize="small"/>}
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="body2">In {review.country} | {review.date.split('T')[0]}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <ThumbUpIcon fontSize="small"/>
                <Typography variant="body2">{review.helpfulVotes}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
