SHELL := bash

default: refine

refine: merge
	python3 processing/refine_items.py
	python3 processing/refine_reviews.py

merge:
	python3 processing/merge.py

clean:
	rm -rf data/items_*.csv data/reviews_*.csv