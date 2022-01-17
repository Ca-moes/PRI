"""
Run this file from root folder PRI
The query file path is relative to the scripts source
The queries that are made in a subset of the data are made in a different core
"""
import matplotlib.pyplot as plt
from sklearn.metrics import PrecisionRecallDisplay
import numpy as np
# import json
import requests
import pandas as pd
import pickle
from itertools import cycle
import json


queries = [
    (1, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&indent=true&q.op=OR&q=Mexico&qf=title_review%20country%20body'),
    (2, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Areview&fq=date%3A%5B2020-11-01T00%3A00%3A00Z%20TO%202021-01-31T00%3A00%3A00Z%5D&indent=true&q.op=OR&q=Gift&qf=body%20title_review'),
    (3, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&fq=helpfulVotes%3A%5B10%20TO%20*%5D&fq=rating_review%3A5&fq=verified%3Atrue&indent=true&q.op=OR&q=Great%20Good&qf=title_review%20body'),
    (4, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&indent=true&q.op=OR&q=(Google%20AND%204g)%20OR%20(iphone%20AND%20refurbished)&qf=title_item%20description'),
    (5, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&fq=originalPrice%3A%200.0&indent=true&q.op=OR&q=samsung&qf=title_item%20description&sort=dist(2%2C%20originalPrice%2C%200%2C%20price%2C%200)%20desc')
    ]

queries_boosted = [
    (1, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&indent=true&q.op=OR&q=Mexico&qf=title_review%5E1.7%20country%20body%5E1.3&rq=%7B!ltr%20model%3Dltr_linear_reviews%20reRankDocs%3D500%7D'),
    (2, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Areview&fq=date%3A%5B2020-11-01T00%3A00%3A00Z%20TO%202021-01-31T00%3A00%3A00Z%5D&indent=true&q.op=OR&q=Gift&qf=body%20title_review%5E1.7&rq=%7B!ltr%20model%3Dltr_linear_reviews%20reRankDocs%3D500%7D'),
    (3, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&fq=helpfulVotes%3A%5B10%20TO%20*%5D&fq=rating_review%3A%205&fq=verified%3Atrue&indent=true&q.op=OR&q=Great%20Good&qf=title_review%5E1.7%20country%20body%5E1.3&rq=%7B!ltr%20model%3Dltr_linear_reviews%20reRankDocs%3D500%7D'),
    (4, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&indent=true&q.op=OR&q=(Google%20AND%204g)%20OR%20(iphone%20AND%20refurbished)&qf=title_item%5E2%20description%5E1.5&rq=%7B!ltr%20model%3Dltr_linear_items%20reRankDocs%3D500%7D'),
    (5, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&fq=originalPrice%3A%200.0&indent=true&q.op=OR&q=samsung&qf=title_item%5E2%20description%5E1.5&sort=dist(2%2C%20originalPrice%2C%200%2C%20price%2C%200)%20desc')
    ]

SCHEMA = True  # True if using schema, False if filterless

# response = requests.get(queries[0][1]).json()['response']['docs']
# for item in response:
#   print(item["id"])

if SCHEMA:
  # for q in queries:
  #   response = requests.get(q[1]).json()['response']['docs']
  #   with open(f"scripts/analysis/2_{q[0]}.json", "w") as f:   # Opens file and casts as f 
  #     json.dump(response, f)       # Writing
  #   with open(f"scripts/analysis_ids/2_{q[0]}.txt", "w") as f:   # Opens file and casts as f 
  #     for item in response:
  #       f.write(item["id"]+ '\n')

  q = queries_boosted[4]
  # for q in queries_boosted:
  response = requests.get(q[1]).json()['response']['docs']
  with open(f"scripts/analysis/3_{q[0]}.json", "w") as f:   # Opens file and casts as f 
    json.dump(response, f)       # Writing
  with open(f"scripts/analysis_ids/3_{q[0]}.txt", "w") as f:   # Opens file and casts as f 
    for item in response:
      f.write(item["id"]+ '\n')
else:
  pass
  # for q in queries:
  #   response = requests.get(q[1]).json()['response']['docs']
  #   with open(f"scripts/analysis/1_{q[0]}.json", "w") as f:   # Opens file and casts as f 
  #     json.dump(response, f)       # Writing
  #   with open(f"scripts/analysis_ids/1_{q[0]}.txt", "w") as f:   # Opens file and casts as f 
  #     for item in response:
  #       f.write(item["id"]+ '\n')
