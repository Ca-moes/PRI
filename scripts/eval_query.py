"""
Run this file from this folder (python3 eval_query.py) and not from root or
  other folder (python3 scripts/eval_query.py)
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

queries = [
    (1, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&indent=true&q.op=OR&q=Mexico&qf=title_review%20country%20body'),
    (2, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Areview&fq=date%3A%5B2020-11-01T00%3A00%3A00Z%20TO%202021-01-31T00%3A00%3A00Z%5D&indent=true&q.op=OR&q=Gift&qf=body%20title_review&rows=30'),
    (3, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&fq=helpfulVotes%3A%5B10%20TO%20*%5D&fq=rating_review%3A5&fq=verified%3Atrue&indent=true&q.op=OR&q=Great%20Good&qf=title_review%20body'),
    (4, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&indent=true&q.op=OR&q=(Google%20AND%204g)%20OR%20(iphone%20AND%20refurbished)&qf=brand%20title_item&rows=30'),
    (5, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=-originalPrice%3A%200.0&fq=content_type%3Aitem&indent=true&q.op=OR&q=Samsung&qf=brand%20title_item&sort=dist(2%2C%20originalPrice%2C%200%2C%20price%2C%200)%20desc')
    ]

queries_boosted = [
    (1, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&indent=true&q.op=OR&q=Mexico&qf=title_review%5E1.7%20country%5E1.3%20body'),
    (2, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Areview&fq=date%3A%5B2020-11-01T00%3A00%3A00Z%20TO%202021-01-31T00%3A00%3A00Z%5D&indent=true&q.op=OR&q=Gift&qf=body%20title_review%5E1.7&rows=30'),
    (3, 'http://localhost:8983/solr/amazon-subset/select?defType=edismax&fq=content_type%3Areview&fq=helpfulVotes%3A%5B10%20TO%20*%5D&fq=rating_review%3A5&fq=verified%3Atrue&indent=true&q.op=OR&q=Great%20Good&qf=title_review%5E1.7%20body'),
    (4, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=content_type%3Aitem&indent=true&q.op=OR&q=(Google%20AND%204g)%20OR%20(iphone%20AND%20refurbished)&qf=brand%20title_item%5E1.5&rows=30'),
    (5, 'http://localhost:8983/solr/amazon/select?defType=edismax&fq=-originalPrice%3A%200.0&fq=content_type%3Aitem&indent=true&q.op=OR&q=Samsung&qf=brand%20title_item%5E1.5&sort=dist(2%2C%20originalPrice%2C%200%2C%20price%2C%200)%20desc')
    ]

SCHEMA = -1  # 1 if using schema, 0 if filterless, -1 if creating graphs

# Guardar vars de schema e schema_boost numa só run
# correr sem schema (necessário reboot de docker) e guardar vars
# fazer gráficos


def process_query(index: int, q_type: str, query_file: str, query_url: str):
    # Read qrels to extract relevant documents
    relevant = list(map(lambda el: el.strip(), open(query_file).readlines()))
    # Get query results from Solr instance
    results = requests.get(query_url).json()['response']['docs']

    # METRICS TABLE
    # Define custom decorator to automatically calculate metric based on key
    metrics = {}
    def metric(f): metrics.setdefault(f.__name__, f)
    # metric = lambda f: metrics.setdefault(f.__name__, f)

    @metric
    def ap(results, relevant):
        """Average Precision"""
        precision_values = [
            len([
                doc
                for doc in results[:idx]
                if doc['id'] in relevant
            ]) / idx
            for idx in range(1, len(results))
        ]
        return sum(precision_values)/len(precision_values) if len(precision_values) != 0 else 0

    @metric
    def p10(results, relevant, n=10):
        """Precision at N"""
        return len([doc for doc in results[:n] if doc['id'] in relevant])/n

    def calculate_metric(key, results, relevant):
        return metrics[key](results, relevant)

    # Define metrics to be calculated
    evaluation_metrics = {
        'ap': 'Average Precision',
        'p10': 'Precision at 10 (P@10)'
    }

    # Calculate all metrics and export results as LaTeX table
    df = pd.DataFrame([['Metric', 'Value']] + [
            [evaluation_metrics[m], calculate_metric(m, results, relevant)]
            for m in evaluation_metrics
        ]
    )

    with open(f'results/{q_type}_results_{index}.tex', 'w') as tf:
        tf.write(df.to_latex())

    # PRECISION-RECALL CURVE
    # Calculate precision and recall values as we move down the ranked list
    precision_values = [
        len([
            doc
            for doc in results[:idx]
            if doc['id'] in relevant
        ]) / idx
        for idx, _ in enumerate(results, start=1)
    ]

    recall_values = [
        len([
            doc for doc in results[:idx]
            if doc['id'] in relevant
        ]) / len(relevant)
        for idx, _ in enumerate(results, start=1)
    ]

    # If could not find any value
    if not precision_values and not recall_values:
        precision_values = [0]
        recall_values = [0]

    precision_recall_match = {k: v for k, v in zip(recall_values, precision_values)}

    # Extend recall_values to include traditional steps for a better curve (0.1, 0.2 ...)
    recall_values.extend([step for step in np.arange(0.1, 1.1, 0.1) if step not in recall_values])
    recall_values = sorted(set(recall_values))

    # Extend matching dict to include these new intermediate steps
    for idx, step in enumerate(recall_values):
        if step not in precision_recall_match:
            if recall_values[idx-1] in precision_recall_match:
                precision_recall_match[step] = precision_recall_match[recall_values[idx-1]]
            else:
                precision_recall_match[step] = precision_recall_match[recall_values[idx+1]]

    disp = PrecisionRecallDisplay(precision=[precision_recall_match.get(r) for r in recall_values], recall=recall_values)
    disp.plot()
    plt.savefig(f'results/{q_type}_precision_recall_{index}.png')

    return disp


try:
    with open('data.pickle', 'rb') as file:
        values_dict = pickle.load(file)
except FileNotFoundError:
    print("Didn't find saved plots, creating new dict")
    values_dict = {
        "filterless": {1: None, 2: None, 3: None, 4: None, 5: None},
        "schema": {1: None, 2: None, 3: None, 4: None, 5: None},
        "schema_boost": {1: None, 2: None, 3: None, 4: None, 5: None},
    }

if SCHEMA == 1:
    for index in range(0, len(queries)):
        i, link = queries[index]
        print(f"Handling query nº{i} with schema without boosts")
        query_file = f'../solr/query{i}.txt'
        disp = process_query(i, 'schema', query_file, link)
        values_dict['schema'][i] = disp

        i, link = queries_boosted[index]
        print(f"Handling query nº{i} with schema with boosts")
        query_file = f'../solr/query{i}.txt'
        disp = process_query(i, 'schema_boost', query_file, link)
        values_dict['schema_boost'][i] = disp

        with open('data.pickle', 'wb') as file:
            pickle.dump(values_dict, file)
elif SCHEMA == 0:
    for index in range(0, len(queries)):
        i, link = queries[index]
        print(f"Handling query nº{i} without schema ")
        query_file = f'../solr/query{i}.txt'
        disp = process_query(i, 'filterless', query_file, link)
        values_dict['filterless'][i] = disp

        with open('data.pickle', 'wb') as file:
            pickle.dump(values_dict, file)
elif SCHEMA == -1:
    colors = cycle(["navy", "turquoise", "darkorange"])
    _, ax = plt.subplots(figsize=(7, 8))
    for i in range(1, len(queries)+1):
        values_dict['filterless'][i].plot(ax=ax, name=f"Precision-recall for filterless query {i}", color=next(colors))
        values_dict['schema'][i].plot(ax=ax, name=f"Precision-recall for schema query {i}", color=next(colors))
        values_dict['schema_boost'][i].plot(ax=ax, name=f"Precision-recall for schema_boost query {i}", color=next(colors))
        plt.savefig(f'results_merged/all_precision_recall_{i}.png')
        plt.cla()


# for i, d in enumerate(disps):
#     d.plot(ax=ax, name=f"Precision-recall for query {i}", color=next(colors))

# plt.show()
