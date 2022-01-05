# Makefile

help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "Commands:"
	@echo "  clean		Deletes all created files"
	@echo "  concat		Concatenates items and reviews from 2019 and 2021 to create a single file for items (data/items_all.csv) and reviews (data/reviews_all.csv)"
	@echo "  clean_up	Refine the previous CSV files, generating data/items_clean.csv and data/reviews_clean.csv"
	@echo "  seed		Create seed.sql from the clean files, to seed the database with brands, items and reviews"
	@echo "  stats		Create PNGs with some graphic visualiztion of the clean data"
	@echo "  json		Merge items and reviews CSVs to a single nested JSON file"

all: stats seed json

json: clean_up
	python3 scripts/merge_json.py

stats: clean_up
	python3 scripts/stats.py

seed: clean_up
	python3 scripts/seed.py

clean_up: concat
	python3 scripts/clean_details.py
	python3 scripts/clean_items.py
	python3 scripts/clean_reviews.py

concat:
	python3 scripts/concat.py

clean:
	rm -rf data/items_*.* data/reviews_*.* data/details_*.* db/seed.sql stats/*.png