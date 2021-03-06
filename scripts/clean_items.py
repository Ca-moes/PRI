import pandas as pd

pd.set_option("display.max_colwidth", 10000)

if __name__ == '__main__':
    items = pd.read_pickle('data/items_all.pkl')

    print("<==== Initial Info =====>")
    print(items.head())
    print(items.info())

    # Drop rows that have both no ratings and no price
    indexDrop = items[(items['totalRatings'] == 0) & (items['price'] == 0)].index
    items.drop(indexDrop, inplace=True)

    # 2021 dataset has 'Samsung Electronics' brand instead of just 'Samsung'
    items.loc[items['brand'] == 'Samsung Electronics', ['brand']] = 'Samsung'

    # Capitalize Asus
    items.loc[items['brand'] == 'ASUS', ['brand']] = 'Asus'

    # 2019 dataset didn't process Thousands in prices (only 2 items)
    items.loc[items['price'] == 1, ['price']] = 1000
    items.loc[items['originalPrice'] == 1, ['originalPrice']] = 1000

    # 9 Apple iPhone items had Asus as their Brand
    items.loc[items['title'].str.contains("iPhone"), ['brand']] = 'Apple'

    details = pd.read_pickle('data/details_clean.pkl')

    items = items.merge(details, on='asin')

    print("\n<==== Clean Info =====>")
    print(items.head())
    print(items.info())

    items.to_pickle('data/items_clean.pkl')

    print("\n-> Cleaned items and saved to data/items_clean.pkl\n")