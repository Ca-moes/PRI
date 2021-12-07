#!/bin/bash

echo "--- precreate-core amazon"
precreate-core amazon

# Start Solr in background mode so we can use the API to upload the schema
echo "--- solr start"
solr start

echo "--- sleep 5"
sleep 5

# Schema definition via API
echo "--- curl schema"
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/amazon/schema

# Populate collection
echo -e "\n--- curl data"
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/data.json \
    'http://localhost:8983/solr/amazon/update/json/docs?split=/|/reviews'

# Restart in foreground mode so we can access the interface
echo -e "\n--- solr restart -f"
solr restart -f
