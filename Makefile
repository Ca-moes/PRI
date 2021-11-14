# Makefile

default: seed

stats: clean_up
	python3 scripts/stats.py

seed: clean_up
	python3 scripts/seed.py

clean_up: concat
	python3 scripts/clean_items.py
	python3 scripts/clean_reviews.py

concat:
	python3 scripts/concat.py

clean:
	rm -rf data/items_*.csv data/reviews_*.csv db/seed.sql stats/*.png