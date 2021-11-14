import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS

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

if __name__ == '__main__':
    items = pd.read_csv('data/items_clean.csv')
    reviews = pd.read_csv('data/reviews_clean.csv')

    items['brand'].value_counts().plot(kind='bar',color='#8c2d19', title='Number of cellphones per brand')
    plt.savefig('stats/items_brand_bargraph.png', bbox_inches='tight')

    reviews['country'].value_counts().plot(kind='bar',color='#8c2d19', title='Number of reviews per country')
    plt.savefig('stats/reviews_country_bargraph.png', bbox_inches='tight')

    generate_wordcloud(items, 'items', 'title')
    generate_wordcloud(reviews, 'reviews', 'title')
    generate_wordcloud(reviews, 'reviews', 'body')
