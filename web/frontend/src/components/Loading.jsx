import {CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const Loading = () => {
  return (
    <Grid
      direction="column"
      justifyContent="center"
      alignItems="center"
      container
      style={{height: "80vh", width: "100%"}}
    >
      <Grid item>
        <CircularProgress/>
      </Grid>
      <Grid item>
        <Typography variant="h5">Loading</Typography>
      </Grid>
    </Grid>
  );
}

export default Loading;
