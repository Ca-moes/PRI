FROM solr:latest

#COPY data/data.json /data/data.json

#COPY data/schema.json /data/schema.json

COPY startup.sh /scripts/startup.sh

ENTRYPOINT ["/scripts/startup.sh"]
