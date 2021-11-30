import pandas as pd
import json

if __name__ == '__main__':
    items_df = pd.read_csv('data/items_clean.csv')
    reviews_df = pd.read_csv('data/reviews_clean.csv')

    items_df.rename(columns={'asin':'id', 'title':'title_item', 'rating':'rating_item'} ,inplace=True)
    reviews_df.rename(columns={'title':'title_review', 'rating':'rating_review'} ,inplace=True)
    reviews_df.insert(0, 'id', '')

    items_df['content_type'] = 'item'
    reviews_df['content_type'] = 'review'

    print(items_df)
    print(reviews_df)
    
    items = items_df.to_dict(orient='records')
    reviews = reviews_df.to_dict(orient='records')

    print("Merging data...")

    # Create unique id for reviews
    id_set = set()
    id = 0
    for review in reviews:
        if review['asin'] not in id_set:
            id = 0
            id_set.add(review['asin'])
        review['id'] = review['asin'] + '-r' + str(id)
        id += 1

    print(len(reviews))

    # Save merged data
    with open("solr/data/data.json", "w") as f:
        f.write(json.dumps(items, indent=4))
        f.close()
    with open("solr/data/data.json", "a") as f:
        f.write(json.dumps(reviews, indent=4))
        f.close()

    print("-> Successfully merged items and reviews, saved to solr/data.json\n")