const core = require('../config');
const Item = require("../models/item");

function parseItem(doc) {
  return new Item(
    doc.asin,
    doc.brand,
    doc.title_item,
    doc.url,
    doc.image,
    doc.rating_item,
    doc.reviewUrl,
    doc.totalRatings,
    doc.price,
    doc.originalPrice
  )
}

function searchItem(req, res) {
  const query = req.params.query;

  const params = {
    'q': query,
    'q.op': 'OR',
    'fq': 'content_type:item',
    'start': 0,
    'rows': 10,
    'wt': 'json',
    'defType': 'edismax',
    'qf': 'brand title_item^1.5',
  }

  core.get('/select', {params: params})
    .then((response) => {
      const num = response.data.response.numFound;

      if(num === 0) {
        return res.status(404).send('Not found');
      }

      const items = [];

      response.data.response.docs.forEach((doc) => {
        items.push(doc);
      })

      return res.send(items);
    })
    .catch((error) => {
      console.log(error);
    });
}

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

      const item = parseItem(response.data.response.docs[0])

      return res.send(item);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports =  {
  searchItem,
  getItemByAsin,
}