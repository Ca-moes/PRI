# Makefile

all: stats seed

# Create .pngs with some graphic visualiztion of the clean data
stats: clean_up
	python3 scripts/stats.py

# Create seed.sql from the clean files, to seed the database with brands, items and reviews
seed: clean_up
	python3 scripts/seed.py

# Refine the previous csv files, generating items_clean.csv and reviews_clean.csv
clean_up: concat
	python3 scripts/clean_items.py
	python3 scripts/clean_reviews.py

# Concatenates items and reviews from 2019 and 2021
# to create a single file for items (items_all.csv) and reviews (reviews_all.csv)
concat:
	python3 scripts/concat.py

# Delete all created files
clean:
	rm -rf data/items_*.csv data/reviews_*.csv db/seed.sql stats/*.png