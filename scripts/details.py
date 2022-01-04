import pandas as pd
import ast

#TODO Change `create_new` to return Series with only keep_indexes
# apply again on details['overview'] to remove strings with keep_indexes from the list



keep_indexes = ['Wireless Carrier', 'Operating System', 'Color', 'Memory Storage Capacity', 'Cellular Technology']

def create_new(list):
    indexes = []
    values = []

    for string in list:
        index, value = string.split(': ', 1)
        indexes.append(index)
        values.append(value)

    series = pd.Series(values, index=indexes)

    return series

details = pd.read_csv('../data/items_details.csv')

# Parse columns with lists
details['about'] = details['about'].map(ast.literal_eval)
details['overview'] = details['overview'].map(ast.literal_eval)

df = details['overview'].apply(lambda x: create_new(x))

print(df)
print(df['Color'].value_counts())
