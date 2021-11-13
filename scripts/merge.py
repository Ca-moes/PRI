import pandas as pd

# Read items files
items2019 = pd.read_csv("data/20191226-items.csv", sep=",")
items2019.rename(columns={"totalReviews":"totalRatings"}, inplace=True) # rename column for merging
items2021 = pd.read_csv("data/20211108-items.csv", sep=",")

# Concat files and drop duplicates
all_items = pd.concat([items2021, items2019])
duplicated_items = all_items.loc[all_items.duplicated(subset=['asin']), :]
all_items = all_items.drop_duplicates(subset=['asin']).reset_index(drop=True)
print(f"Dropped {len(duplicated_items.index)} duplicated items")

# Write merged items to file
all_items.to_csv('data/items_merged.csv', index=False)
print("Successfully merged items and saved to data/items_merged.csv")


# Same for reviews...
reviews2019 = pd.read_csv("data/20191226-reviews.csv", sep=",")
reviews2021= pd.read_csv("data/20211108-reviews.csv", sep=",")

all_reviews = pd.concat([reviews2021, reviews2019])
duplicated_reviews = all_reviews.loc[all_reviews.duplicated(subset=['asin', 'name', 'title']), :]
all_reviews = all_reviews.drop_duplicates(subset=['asin', 'name', 'title']).reset_index(drop=True)
print(f"Dropped {len(duplicated_reviews.index)} duplicated reviews")

all_reviews.to_csv('data/reviews_merged.csv', index=False)
print("\n-> Successfully merged reviews and saved to data/items_merged.csv\n")