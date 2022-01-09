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
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

export default function ReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  // this.asin = asin;
  // this.name = name;
  // this.rating = rating;
  // this.date = date;
  // this.verified = verified;
  // this.title = title;
  // this.body = body;
  // this.helpfulVotes = helpfulVotes;
  // this.country = country;
  let props = {};
  props.asin = 'B19824381374'
  props.name = "Chris Smith";
  props.rating = 3.4;
  props.date = "08/08/2000"
  props.verified = true
  props.title = "Hard to get, but is it worth it?"
  props.body = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
  posuere quam. Maecenas sit amet sagittis orci, varius dictum
  risus. Mauris viverra purus id velit sollicitudin, non pretium
  sapien cursus. Quisque id hendrerit diam. Suspendisse molestie vel
  urna nec elementum. Proin ac auctor velit. Sed pellentesque ex et
  odio tincidunt egestas. Aenean facilisis, mauris in finibus
  fermentum, mi arcu fringilla metus, ut maximus lorem enim a nunc.
  Curabitur mollis vel felis vitae sagittis. Morbi ac risus sit amet
  ante iaculis elementum. Phasellus at enim ut justo ultricies
  dignissim ac vel diam. Suspendisse auctor nibh eu nulla venenatis
  gravida. Vestibulum gravida volutpat aliquet. Nulla in eros ac est
  tincidunt tincidunt id ac erat. In hac habitasse platea dictumst.
  Aliquam sapien lorem, porta id turpis eget, aliquet faucibus
  massa. Praesent volutpat felis est, quis posuere lorem suscipit
  et. Mauris dapibus ante nec orci pharetra, et aliquet nunc
  suscipit. Sed congue vel odio et malesuada. Integer sodales dolor
  est, id accumsan tortor faucibus in. Proin ac risus non nunc
  congue ultrices. Nullam vitae tempor neque, vel dapibus ligula.
  Maecenas ullamcorper arcu sit amet velit pellentesque porta. Proin
  tincidunt condimentum sagittis. Morbi luctus diam sapien, ut
  ornare erat condimentum eu. Nunc a tellus vitae sapien volutpat
  pulvinar at in enim. Vivamus dictum mi dignissim massa ultricies
  rhoncus. Nulla cursus vehicula gravida. Proin ac porttitor nisi.
  Duis eu hendrerit metus. Nulla facilisi. Mauris tempor tristique
  vestibulum. Integer sed commodo mauris. Phasellus blandit nec eros
  quis rhoncus. Aliquam urna dui, accumsan a lectus quis, sagittis
  lacinia sapien. In sed lacus accumsan, sollicitudin urna eu,
  scelerisque ligula. Aliquam tincidunt consectetur tortor non
  imperdiet. Nunc vel nunc pellentesque, imperdiet turpis non,
  interdum ante. Etiam vitae lacus purus. Nulla facilisi. Mauris ac
  ultricies quam. Nulla facilisi. Sed vel odio ante. Praesent
  imperdiet dolor vel massa varius, id fermentum ante maximus. Nunc
  leo sem, pellentesque non elit sed, scelerisque ornare orci. Nam
  commodo, nibh et tincidunt faucibus, augue ligula posuere risus,
  eget mattis ipsum felis commodo quam. Maecenas luctus pellentesque
  lectus sit amet sollicitudin. Cras nec neque est.`;
  props.helpfulVotes = 15
  props.country = "United States"

  let button;
  if (expanded) {
    button = (
      <Button
        variant="contained"
        endIcon={<ExpandLessIcon />}
        onClick={handleChange}
      >
        Read less
      </Button>
    );
  } else {
    button = (
      <Button
        variant="contained"
        endIcon={<ExpandMoreIcon />}
        onClick={handleChange}
      >
        Read more
      </Button>
    );
  }

  return (
    <>
      <Paper elevation={2} sx={{ py: 3 }}>
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h5">On: {props.asin}</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Rating name="read-only" value={5} precision={0.1} readOnly />
                <Typography variant="body1">{props.title}</Typography>
              </Stack>
            </Grid>
            <Grid zeroMinWidth item>
              <Collapse in={expanded} collapsedSize={50}>
                <Typography variant="body2">{props.body}</Typography>
              </Collapse>
              {button}
            </Grid>
            <Grid item container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1">By {props.name}</Typography>
                  <VerifiedIcon fontSize="small"/>
                </Stack>
              </Grid>
              <Grid item >
                In {props.country} | {props.date}
              </Grid>
            </Grid>
            <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ThumbsUpDownIcon fontSize="small"/>
                  <Typography variant="body1">{props.helpfulVotes}</Typography>
                </Stack>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
