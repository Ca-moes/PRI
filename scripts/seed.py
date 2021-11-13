import pandas as pd

items = pd.read_csv('data/items_refined.csv')
reviews = pd.read_csv('data/reviews_refined.csv')

with open("db/seed.sql", "w") as f:
    f.write("--BRANDS--\n")
    index = 0
    brand_dict = {}
    for brand in items['brand'].unique():
        index += 1
        brand_dict[brand] = index
        f.write(f"INSERT INTO Brand VALUES ({index}, '{brand}');\n")

    f.write("\n--CELLPHONES--\n")
    for index, row in items.iterrows():
        brand_id = brand_dict[row['brand']]
        title = str(row['title']).replace("'", "''")
        f.write(f"INSERT INTO Cellphone VALUES ({index+1}, '{row['asin']}', {brand_id}, '{title}', '{row['url']}', '{row['image']}', {row['rating']}, '{row['reviewUrl']}', {row['totalRatings']}, {row['price']}, {row['originalPrice']});\n")

    f.write("\n--REVIEWS--\n")
    for index, row in reviews.iterrows():
        name = str(row['name']).replace("'", "''")
        title = str(row['title']).replace("'", "''")
        body = str(row['body']).replace("'", "''")
        cellphone_id = items['asin'].eq(row['asin']).idxmax() + 1
        f.write(f"INSERT INTO Review VALUES ({index+1}, {cellphone_id}, '{name}', {row['rating']}, '{row['date']}', {row['verified']}, '{title}', '{body}', {row['helpfulVotes']}, '{row['country']}');\n")

    f.close()

print("\n-> Successfully created db/seed.sql file\n")