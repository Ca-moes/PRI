import pandas as pd
import json

if __name__ == '__main__':
    items_df = pd.read_csv('data/items_clean.csv')
    reviews_df = pd.read_csv('data/reviews_clean.csv')

    # Rename duplicate columns
    items_df.rename(columns={'title':'title_item', 'rating':'rating_item'} ,inplace=True)
    reviews_df.rename(columns={'title':'title_review', 'rating':'rating_review'} ,inplace=True)

    # Col to distinguish content
    items_df['content_type'] = 'item'
    reviews_df['content_type'] = 'review'

    # Add item id
    items_df['id'] = items_df['asin']
    reviews_df['date'] = reviews_df['date'].apply(lambda x: x + 'T00:00:00Z')
    
    items = items_df.to_dict(orient='records')
    reviews = reviews_df.to_dict(orient='records')

    print("Merging data...")

    # Merge respective reviews to items
    for item in items:
        asin = item['asin']
        item['reviews'] = []

        i=0
        for review in reviews:
            if review['asin'] == asin:
                review['id'] = asin + '-r' + str(i)
                item['reviews'].append(review)
                i+=1

    # Save merged data
    with open("solr/data/data.json", "w") as f:
        f.write(json.dumps(items, indent=4))
        f.close()

    print("-> Successfully merged items and reviews, saved to solr/data.json\n")