const core = require('../config');
const Item = require("../models/item");

function removeFromArray(array, list) {
  list.forEach((el) => {
    const index = array.indexOf(el);
    if (index > -1) {
      array.splice(index, 1);
    }
  })

  return array;
}

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
    doc.originalPrice,
    doc.description,
    doc.about,
    doc.more,
    doc.wireless_carrier,
    doc.operating_system,
    doc.color,
    doc.screen_size,
    doc.memory_storage_capacity,
    doc.cellular_technology
  )
}

function searchItem(req, res) {
  console.log(req.query)
  const q = req.query.q;
  const start = (req.query.page - 1) * 10;
  const price = req.query.price;
  const rating = req.query.rating;
  const filter = req.query.filter;

  let fq = ['content_type:item']

  if (price) fq.push(`price:[${price[0]} TO ${price[1]}]`);
  if (rating) fq.push(`rating_item:[${rating[0]} TO ${rating[1]}]`);

  let filters = Object.keys(req.query)
  removeFromArray(filters, ['q', 'page', 'price', 'rating', 'filter'])
  filters.forEach((el) => {
    if (filter && filter === el && req.query[el]) {
      fq.push(`{!tag=${el}}${el}:(` + req.query[el].map(e => "\"" + e + "\"").join(' ') + ')')
    } else {
      fq.push(`${el}:(` + req.query[el].map(e => "\"" + e + "\"").join(' ') + ')')
    }
  })

  console.log(fq)

  const facets = {
    'brand': {
      'type': 'terms',
      'field': 'brand',
      'limit': 10,
      'domain': {'excludeTags': 'brand'}
    },
    'wireless_carrier': {
      'type': 'terms',
      'field': 'wireless_carrier',
      'limit': 100,
      'domain': {'excludeTags': 'wireless_carrier'}
    },
    'operating_system': {
      'type': 'terms',
      'field': 'operating_system',
      'limit': 100,
      'domain': {'excludeTags': 'operating_system'}
    },
    'color': {
      'type': 'terms',
      'field': 'color',
      'limit': 100,
      'domain': {'excludeTags': 'color'}
    },
    'screen_size': {
      'type': 'terms',
      'field': 'screen_size',
      'limit': 100,
      'domain': {'excludeTags': 'screen_size'}
    },
    'memory_storage_capacity': {
      'type': 'terms',
      'field': 'memory_storage_capacity',
      'limit': 100,
      'domain': {'excludeTags': 'memory_storage_capacity'}
    },
    'cellular_technology': {
      'type': 'terms',
      'field': 'cellular_technology',
      'limit': 100,
      'domain': {'excludeTags': 'cellular_technology'}
    }
  }

  const params = {
    'q': q,
    'q.op': 'OR',
    'fq': fq,
    'start': start,
    'rows': 10,
    'wt': 'json',
    'defType': 'edismax',
    'qf': 'title_item description about more',
    'json.facet': JSON.stringify(facets)
  }

  core.get('/select', {params: params})
    .then((response) => {
      const num = response.data.response.numFound;

      if (num === 0) {
        return res.status(404).send('Not found');
      }

      const items = [];

      response.data.response.docs.forEach((doc) => {
        items.push(doc);
      })

      let parsedFacets = response.data.facets;
      delete parsedFacets["count"];
      parsedFacets = Object.fromEntries(Object.entries(parsedFacets).map(([key, {buckets}]) => [key, buckets]));

      const numFound = response.data.response.numFound;
      const numPages = Math.ceil(numFound / 10);

      return res.send({
        'numFound': numFound,
        'numPages': numPages,
        'query': req.query,
        'items': items,
        'facets': parsedFacets
      });
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

      if (num === 0) {
        return res.status(404).send('Not found');
      }

      const item = parseItem(response.data.response.docs[0])

      return res.send(item);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  searchItem,
  getItemByAsin,
}