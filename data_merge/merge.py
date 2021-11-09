import pandas as pd

items2019 = pd.read_csv("../data/20191226-items.csv", sep=",")
items2019.rename(columns={"totalReviews":"totalRatings"}, inplace=True)
items2021 = pd.read_csv("../data/20211108-items.csv", sep=",")

all_items = pd.concat([items2021, items2019]).drop_duplicates(subset=['asin']).reset_index(drop=True)
all_items.to_csv('../data/items.csv', index=False)

reviews2019 = pd.read_csv("../data/20191226-reviews.csv", sep=",")
reviews2021= pd.read_csv("../data/20211108-reviews.csv", sep=",")

all_reviews = pd.concat([reviews2021, reviews2019]).drop_duplicates(subset=['asin', 'name', 'title']).reset_index(drop=True)
all_reviews.to_csv('../data/reviews.csv', index=False)