SHELL := bash

default: refine

refine: merge
	python3 scripts/refine_items.py
	python3 scripts/refine_reviews.py

merge:
	python3 scripts/merge.py

clean:
	rm -rf data/items_*.csv data/reviews_*.csv