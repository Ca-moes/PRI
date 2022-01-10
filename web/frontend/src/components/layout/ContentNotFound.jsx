import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const ContentNotFound = () => {
  return (
    <Grid
      direction="column"
      justifyContent="center"
      alignItems="center"
      container
      style={{height: "80vh", width: "100%"}}
    >
        <Typography color="primary" variant="h4">Content not found</Typography>
    </Grid>
  );
}

export default ContentNotFound;
