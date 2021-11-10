import pandas as pd
from utils import delete_file

def status(row):
    if (row['price'] == 0) & (row['originalPrice'] == 0):
        return 'unavailable'
    if (row['price'] != 0) & (row['originalPrice'] == 0):
        return 'normal'
    if (row['price'] < row['originalPrice']):
        return 'discount'
    return 'ERROR'


if __name__ == '__main__':
    delete_file('../data/items_refined.csv')

    items = pd.read_csv('../data/items_merged.csv')

    print("<==== Initial Info =====>")
    print(items.head())
    print(items.info())

    # Drop items that have both no ratings and no price
    indexDrop = items[(items['totalRatings'] == 0) & (items['price'] == 0)].index
    items.drop(indexDrop, inplace=True)

    # 2019 dataset didn't process Thousands in prices (only 2 items)
    items.loc[items['price'] == 1, ['price']] = 1000
    items.loc[items['originalPrice'] == 1, ['originalPrice']] = 1000

    # Create a new column with the item status (redundant info, maybe not worth creating)
    items['status'] = items.apply(lambda row: status(row), axis=1)


    print("\n<==== Refined Info =====>")
    print(items.head())
    print(items.info())

    items.to_csv('../data/items_refined.csv', index=False)