const core = require('../config');
const Review = require("../models/review");

function removeFromArray(array, list) {
  list.forEach((el) => {
    const index = array.indexOf(el);
    if (index > -1) {
      array.splice(index, 1);
    }
  })

  return array;
}

function parseReview(doc) {
  return new Review(
    doc.asin,
    doc.name,
    doc.rating_review,
    doc.date,
    doc.verified,
    doc.title_review,
    doc.body,
    doc.helpfulVotes,
    doc.country
  )
}

function searchReview(req, res) {
  const q = req.query.q;
  const rows = 10;
  const start = (req.query.page - 1) * rows;
  const sort = req.query.sort;
  const asin = req.query.asin;
  const votes = req.query.votes;
  const rating = req.query.rating;
  const filter = req.query.filter;
  const fromDate = req.query.fromDate ? req.query.fromDate.replace(/T.*/,'T00:00:00Z') : null;
  const toDate = req.query.toDate ? req.query.toDate.replace(/T.*/,'T00:00:00Z') : null;

  let fq = ['content_type:review'];

  if (asin) fq.push(`asin:${asin}`);
  if (votes) fq.push(`helpfulVotes:[${votes[0]} TO ${votes[1]}]`);
  if (rating) fq.push(`rating_review:[${rating[0]} TO ${rating[1]}]`);
  if (fromDate && toDate) fq.push(`date:[${fromDate} TO ${toDate}]`);

  let filters = Object.keys(req.query)
  removeFromArray(filters, ['q', 'page', 'asin', 'votes', 'rating', 'fromDate', 'toDate', 'filter', 'sort'])
  filters.forEach((el) => {
    if (filter && filter === el && req.query[el]) {
      fq.push(`{!tag=${el}}${el}:(` + req.query[el].map(e => "\"" + e + "\"").join(' ') + ')')
    } else {
      fq.push(`${el}:(` + req.query[el].map(e => "\"" + e + "\"").join(' ') + ')')
    }
  })

  const facets = {
    'country': {
      'type': 'terms',
      'field': 'country',
      'limit': -1,
      'domain': {'excludeTags': 'country'}
    },
    'verified': {
      'type': 'terms',
      'field': 'verified',
      'limit': 2,
      'domain': {'excludeTags': 'verified'}
    }
  }

  const params = {
    'q': q,
    'q.op': 'OR',
    'fq': fq,
    'start': start,
    'rows': rows,
    'wt': 'json',
    'defType': 'edismax',
    'qf': 'title_review^1.7 body^1.3',
    'json.facet': JSON.stringify(facets)
  }

  if (sort && (sort !== "relevancy")) params["sort"] = sort;
  else params["rq"] = "{!ltr model=ltr_linear_reviews reRankDocs=200}"

  core.get('/select', {params: params})
    .then((response) => {
      const reviews = [];

      response.data.response.docs.forEach((doc) => {
        reviews.push(parseReview(doc));
      })

      let parsedFacets = response.data.facets;
      delete parsedFacets["count"];
      parsedFacets = Object.fromEntries(Object.entries(parsedFacets).map(([key, {buckets}]) => [key, buckets]));

      const numFound = response.data.response.numFound;
      const numPages = Math.ceil(numFound / rows);

      return res.send({
        'numFound': numFound,
        'numPages': numPages,
        'query': req.query,
        'reviews': reviews,
        'facets': parsedFacets
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports =  {
  searchReview,
}