import pandas as pd
import json

if __name__ == '__main__':
    items_df = pd.read_csv('data/items_clean.csv')
    reviews_df = pd.read_csv('data/reviews_clean.csv')

    items_df.rename(columns={'asin':'id', 'title':'title_item', 'rating':'rating_item'} ,inplace=True)
    reviews_df.rename(columns={'asin':'id', 'title':'title_review', 'rating':'rating_review'} ,inplace=True)
    
    items = items_df.to_dict(orient='records')
    reviews = reviews_df.to_dict(orient='records')

    print("Merging data...")

    # Merge respective reviews to items
    for item in items:
        asin = item['id']
        #item['content_type'] = 'parentDocument'
        item['_childDocuments_'] = []
        
        i=0
        for review in reviews:
            if review['id'] == asin:
                review['id'] = asin + '-r' + str(i)
                #review['content_type'] = 'childDocument'
                item['_childDocuments_'].append(review)
                reviews.remove(review)
                i+=1

    # Save merged data
    with open("solr/data.json", "w") as f:
        f.write(json.dumps(items, indent=4))
        f.close()

    print("-> Successfully merged items and reviews, saved to solr/data.json\n")