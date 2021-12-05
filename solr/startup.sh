#!/bin/bash

precreate-core amazon

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 3

# Schema definition via API
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/amazon/schema

# Populate collection
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/data.json \
    'http://localhost:8983/solr/amazon/update/json/docs?split=/|/reviews'

# Restart in foreground mode so we can access the interface
solr restart -f
