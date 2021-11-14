import pandas as pd

if __name__ == '__main__':
    reviews = pd.read_csv('data/reviews_all.csv')

    print("<==== Initial Info =====>")
    print(reviews.head())
    print(reviews.info())

    # Drop rows that have both title and body empty (they also have no helpfulVotes)
    null_titles = reviews.loc[reviews['title'].isna()] # rows with empty title
    indexDrop = null_titles.loc[null_titles['body'].isna()].index # rows' index with both empty title and body
    reviews.drop(indexDrop, inplace=True)

    # Fill NULL cells with default values
    reviews['name'] = reviews['name'].fillna('Amazon Customer') # only 2
    # reviews['title'] = reviews['title'].fillna('') # 26
    # reviews['body'] = reviews['body'].fillna('') # 40
    reviews['helpfulVotes'] = reviews['helpfulVotes'].fillna(0)

    # Split 'date' column into 'country' and 'date' since 2021 reviews contain the review's country
    reviews[['country', 'date']] = reviews['date'].str.extract('(?:Reviewed in (?:the )?(?P<country>[\s\S]+) on )?(?P<date>[\s\S]+)')

    # U.S. is the great majority in 2021 countries, fill the NULL values from 2019 with 'United States'
    reviews['country'] = reviews['country'].fillna('United States')

    # Convert date in <Month Day, Year> to <yyyy-mm-dd> format
    reviews['date'] = pd.to_datetime(reviews['date']) # it takes sometime, improve it

    print("\n<==== Clean Info =====>")
    print(reviews.head())
    print(reviews.info())

    reviews.to_csv('data/reviews_clean.csv', index=False)

    print("\n-> Cleaned reviews and saved to data/reviews_clean.csv\n")