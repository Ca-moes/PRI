import Button from "@mui/material/Button";
import { AxiosResponse } from "axios";
const axios = require('axios');


const HomePage = () => {
  // Make a request for a user with a given ID
  axios.get('http://localhost:3001/test')
  .then(function (response: AxiosResponse) {
    // handle success
    console.log(response);
  })
  .catch(function (error: any) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  return (
    <>
      <div>HomePage</div>
      <Button variant="contained"> Hello </Button>
    </>
  );
};

export default HomePage;
