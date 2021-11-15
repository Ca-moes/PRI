import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS

import seaborn as sns
sns.set()

def generate_wordcloud(df, name, column):
    text = ''
    stopwords = set(STOPWORDS)

    # Iterate through the column
    for val in df[column]:
        # typecaste each val to string
        val = str(val)
    
        # split the value
        tokens = val.split()
        
        # Converts each token into lowercase
        for i in range(len(tokens)):
            tokens[i] = tokens[i].lower()
        
        text += " ".join(tokens)+" "
    
    wordcloud = WordCloud(width = 1920, height = 1080,
                    background_color ='white',
                    stopwords = stopwords,
                    min_font_size = 10).generate(text)
    
    # Plot the WordCloud image                      
    plt.figure(figsize = (16, 9), facecolor = None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad = 0)
    
    # Save image
    plt.savefig('stats/' + name + '_' + column + '_wordcloud.png', bbox_inches='tight')


def generate_dist_ratings_by_brand(items, brand):
    # items_by_brand = items.groupby(items["brand"])["rating"].count()
   # print(items.groupby(items["brand"])["rating"])
   # pd.set_option('display.max_columns', None)
   # print("Hey")
    brand_items = items[items["brand"] == brand]
    # print(items["brand"])
    #print(brand_items["brand"])
    #print(brand_items)
    if brand_items.size > 0:
        # we want the ratings from the reviews -> rating_y
        brand_items["rating_y"].value_counts().sort_index().plot(kind='bar',color='#8c2d19', title=brand + ' reviews distribution')
        plt.savefig('stats/' + brand + '_reviews_dist_bargraph.png', bbox_inches='tight')




if __name__ == '__main__':
    items = pd.read_csv('data/items_clean.csv')
    reviews = pd.read_csv('data/reviews_clean.csv')

    merged_data = pd.merge(items, reviews, on='asin', how='inner')

    items['brand'].value_counts().plot(kind='bar',color='#8c2d19', title='Number of cellphones per brand')
    plt.savefig('stats/items_brand_bargraph.png', bbox_inches='tight')

    reviews['country'].value_counts().plot(kind='bar',color='#8c2d19', title='Number of reviews per country')
    plt.savefig('stats/reviews_country_bargraph.png', bbox_inches='tight')

    reviews['rating'].value_counts().sort_index().plot(kind='bar',color='#8c2d19', title='Review distribution globally')
    plt.savefig('stats/review_dist_globally_bargraph.png', bbox_inches='tight')

    generate_dist_ratings_by_brand(merged_data, 'ASUS')
    generate_dist_ratings_by_brand(merged_data, 'Apple')
    generate_dist_ratings_by_brand(merged_data, 'Google')
    generate_dist_ratings_by_brand(merged_data, 'HUAWEI')
    generate_dist_ratings_by_brand(merged_data, 'Motorola')
    generate_dist_ratings_by_brand(merged_data, 'Nokia')
    generate_dist_ratings_by_brand(merged_data, 'OnePlus')
    generate_dist_ratings_by_brand(merged_data, 'Samsung')
    generate_dist_ratings_by_brand(merged_data, 'Sony')
    generate_dist_ratings_by_brand(merged_data, 'Xiaomi')

    # generate_wordcloud(items, 'items', 'title')
    # generate_wordcloud(reviews, 'reviews', 'title')
    # generate_wordcloud(reviews, 'reviews', 'body')



