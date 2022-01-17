Requirements:

- Python3
- Docker
- NodeJS v16.13.0

Inside /sources:

- To run the pipeline type `make help`. It will display the list of available commands to refine the data and prepare it for Solr
- Inside /solr:
  - run `docker build . -t amazon_solr` to build the Solr's image
  - run `docker run --name amazon_reviews -p 8983:8983 -v ${PWD}/data:/data --rm amazon_solr` to start the container
- Inside /web, on both /frontend and /backend (make sure Solr is running):
  - run `npm install` on the first time, to install all the dependencies needed
  - run `npm start` to initiate the backend server and frontend app