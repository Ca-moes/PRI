const axios = require('axios');

const core = axios.create({
  baseURL: 'http://localhost:8983/solr/amazon',
  timeout: 1000
});

module.exports = core;
