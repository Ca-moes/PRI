docker build . -t amazon_solr

docker run --name amazon_reviews -p 8983:8983 amazon_solr