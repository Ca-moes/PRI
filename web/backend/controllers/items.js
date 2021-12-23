const core = require('../config');
const Item = require("../models/item");

function getItemByAsin(req, res) {
  const asin = req.params.asin;

  const params = {
    'q': 'asin:' + asin,
    'fq': 'content_type:item'
  }

  core.get('/select', {params: params})
    .then((response) => {
      console.log(response.data);

      const num = response.data.response.numFound;

      if(num === 0) {
        return res.status(404).send('Not found');
      }

      const docs = response.data.response.docs[0];
      const item = new Item(
        docs.asin,
        docs.brand,
        docs.title,
        docs.url,
        docs.image,
        docs.rating,
        docs.reviewUrl,
        docs.totalReviews,
        docs.price,
        docs.originalPrice
      )

      return res.send(item);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports =  {
  getItemByAsin,
}