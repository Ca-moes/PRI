const axios = require('axios');
const Qs = require("qs");

const core = axios.create({
  baseURL: 'http://localhost:8983/solr/amazon',
  timeout: 1000,
  paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
});

module.exports = core;
