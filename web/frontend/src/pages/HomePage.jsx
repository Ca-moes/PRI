import Button from "@mui/material/Button";
import Review from '../components/Review'

const axios = require('axios');

const HomePage = () => {
  // Make a request for a user with a given ID
  axios.get('http://localhost:3001/test')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  return (
    <>
      <div>HomePage</div>
      <Review></Review>
      <Button variant="contained"> Hello </Button>
    </>
  );
};

export default HomePage;
