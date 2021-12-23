const core = require('../config');
const Review = require("../models/review");

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
  const query = req.params.query;

  const params = {
    'q': query,
    'q.op': 'OR',
    'fq': 'content_type:review',
    'start': 0,
    'rows': 10,
    'wt': 'json',
    'defType': 'edismax',
    'qf': 'title_review^1.7 body^1.3 country',
  }

  core.get('/select', {params: params})
    .then((response) => {
      const num = response.data.response.numFound;

      if(num === 0) {
        return res.status(404).send('Not found');
      }

      const reviews = [];

      response.data.response.docs.forEach((doc) => {
        reviews.push(parseReview(doc));
      })

      return res.send(reviews);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports =  {
  searchReview,
}