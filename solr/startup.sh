#!/bin/bash

echo "--- precreate-core amazon"
precreate-core amazon
echo "--- precreate-core amazon-subset"
precreate-core amazon-subset


# Start Solr in background mode so we can use the API to upload the schema
echo -e "\n--- solr start"
solr start -Dsolr.ltr.enabled=true

echo "--- sleep 5"
sleep 5


# Append LTR config to solrconfig
echo -e "\n--- LTR plugin config"
sed -i $'/<\/config>/{e cat /data/ltr_config.xml\n}' /var/solr/data/amazon/conf/solrconfig.xml
sed -i $'/<\/config>/{e cat /data/ltr_config.xml\n}' /var/solr/data/amazon-subset/conf/solrconfig.xml


# Copy synonyms file to Solr
echo -e "\n--- cp synonyms"
cp /data/synonyms.txt /var/solr/data/amazon/conf
cp /data/synonyms.txt /var/solr/data/amazon-subset/conf


# Schema definition via API
echo -e "\n--- curl schema"
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/amazon/schema

echo -e "\n--- curl schema to subset"
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/schema.json \
    http://localhost:8983/solr/amazon-subset/schema


# Populate collection
echo -e "\n--- curl data"
curl -X POST -H 'Content-type:application/json' \
    --data-binary @/data/data.json \
    'http://localhost:8983/solr/amazon/update/json/docs?split=/|/reviews'

echo -e "\n--- curl data to subset"
curl -X POST -H 'Content-type:application/json' \
   --data-binary @/data/data_subset.json \
   'http://localhost:8983/solr/amazon-subset/update/json/docs?split=/|/reviews'


# LTR Features
echo -e "\n--- curl ltr features"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_features.json" \
    'http://localhost:8983/solr/amazon/schema/feature-store'


# LTR Models
echo -e "\n--- curl ltr items linear model"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_linear_items.json" \
    'http://localhost:8983/solr/amazon/schema/model-store'

echo -e "\n--- curl ltr reviews linear model"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_linear_reviews.json" \
    'http://localhost:8983/solr/amazon/schema/model-store'


# LTR Features
echo -e "\n--- curl ltr features amazon-subset"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_features.json" \
    'http://localhost:8983/solr/amazon-subset/schema/feature-store'


# LTR Models
echo -e "\n--- curl ltr items linear model amazon-subset"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_linear_items.json" \
    'http://localhost:8983/solr/amazon-subset/schema/model-store'

echo -e "\n--- curl ltr reviews linear model amazon-subset"
curl -XPUT -H 'Content-type:application/json' \
    --data-binary "@/data/ltr_linear_reviews.json" \
    'http://localhost:8983/solr/amazon-subset/schema/model-store'


# Restart in foreground mode so we can access the interface
echo -e "\n--- solr restart"
solr restart -f -Dsolr.ltr.enabled=true
