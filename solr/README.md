- Fazer o ficheiro executavel com `chmod +x startup.sh`

docker build . -t amazon_solr

docker run --name amazon_reviews -p 8983:8983 -v ${PWD}/data:/data --rm amazon_solr

http://localhost:8983/

docker build . -t amazon_solr && docker run --name amazon_reviews -p 8983:8983 -v ${PWD}/data:/data --rm amazon_solr
