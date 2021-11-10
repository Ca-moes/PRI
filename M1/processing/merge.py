import pandas as pd
from utils import delete_file

# Tries to delete existing files before creating new ones
delete_file('../data/items_merged.csv')
delete_file('../data/reviews_merged.csv')

# Read items files
items2019 = pd.read_csv("../data/20191226-items.csv", sep=",")
items2019.rename(columns={"totalReviews":"totalRatings"}, inplace=True)
items2021 = pd.read_csv("../data/20211108-items.csv", sep=",")

# Drop duplicates
all_items = pd.concat([items2021, items2019]).drop_duplicates(subset=['asin']).reset_index(drop=True)

# Write merged items to file
all_items.to_csv('../data/items_merged.csv', index=False)


# Same for reviews...
reviews2019 = pd.read_csv("../data/20191226-reviews.csv", sep=",")
reviews2021= pd.read_csv("../data/20211108-reviews.csv", sep=",")

all_reviews = pd.concat([reviews2021, reviews2019]).drop_duplicates(subset=['asin', 'name', 'title']).reset_index(drop=True)

all_reviews.to_csv('../data/reviews_merged.csv', index=False)