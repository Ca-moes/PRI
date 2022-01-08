import {useParams} from "react-router-dom";
import React from "react";

const axios = require('axios');

const ItemPage = () => {
  const {asin} = useParams();
  const [itemInfo, setItemInfo] = React.useState(null);

  React.useEffect(() => {
    axios.get('/api/items/' + asin)
      .then((res) => setItemInfo(res))
  }, []);

  return (
    <>
      <p>{asin}</p>
    </>
  );
}

export default ItemPage;