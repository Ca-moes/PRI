#!/bin/bash

precreate-core amazon

# Start Solr in background mode so we can use the API to upload the schema
solr start

sleep 3

# Populate collection
bin/post -c amazon /data/data.json

# Restart in foreground mode so we can access the interface
solr restart -f
