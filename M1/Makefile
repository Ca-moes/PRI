SHELL := bash

default: refine

stats: refine
	python3 script/stats.py

refine: merge
	python3 scripts/refine_items.py
	python3 scripts/refine_reviews.py

merge:
	python3 scripts/merge.py

clean:
	rm -rf data/items_*.csv data/reviews_*.csv stats/*.png