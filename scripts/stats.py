import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS
from collections import Counter 

def count_words_fast(text):
    text = text.lower()
    skips = [".", ", ", ":", ";", "'", '"']
    for ch in skips:
        text = text.replace(ch, "")
    word_counts = Counter(text.split(" "))
    return word_counts

def word_stats(word_counts):
    counts = sum(word_counts.values())
    num_unique = len(word_counts)
    return (counts, num_unique)

def bar_graph(df, column, sort, title, xlabel, ylabel, file_name):
    freq = df[column].value_counts()
    if sort:
        freq = freq.sort_index()

    graph = freq.plot(kind='bar',color='#8c2d19')

    # Add number to the top of the bar
    bars = graph.patches
    for bar, num in zip(bars, freq):
        graph.text(bar.get_x() + bar.get_width()/2, bar.get_height()+5, num, ha='center')

    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.savefig('stats/'+file_name, bbox_inches='tight')
    plt.clf()
    print('Saved ' + file_name)


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
    print('Saved ' + name + '_' + column + '_wordcloud.png')

def generate_average_ratings(items):
    freq = items.groupby('brand')['rating'].agg('mean').round(2)

    graph = freq.plot(kind='bar',color='#8c2d19')

    # Add number to the top of the bar
    bars = graph.patches
    for bar, num in zip(bars, freq):
        graph.text(bar.get_x() + bar.get_width()/2, bar.get_height()+0.05, num, ha='center')

    plt.title('Average item\'s rating by brand')
    plt.xlabel('Brand')
    plt.ylabel('Rating')
    plt.savefig('stats/average_rating_items_brand.png', bbox_inches='tight')
    plt.clf()
    print('Saved average_rating_items_brand.png')



if __name__ == '__main__':
    print("<== STATS ==>")

    items = pd.read_csv('data/items_clean.pkl')
    reviews = pd.read_csv('data/reviews_clean.pkl')
    merged_data = pd.merge(items, reviews, on='asin', how='inner')

    print("\n> Words stats")

    title_items = ' '. join(items['title'])
    title_reviews = ' '.join(reviews['title'].dropna())
    body_reviews = ' '.join(reviews['body'].dropna())

    (count_ti, unique_ti) = word_stats(count_words_fast(title_items))
    (count_tr, unique_tr) = word_stats(count_words_fast(title_reviews))
    (count_br, unique_br) = word_stats(count_words_fast(body_reviews))

    print("                | Total   | Unique")
    print(f"Items' Titles   | {count_ti}   | {unique_ti}")
    print(f"Reviews' Titles | {count_tr}  | {unique_tr}")
    print(f"Reviews' Body   | {count_br} | {unique_br}")

    print("\n> Generating graphs into /stats")

    bar_graph(items, 'brand', False, 'Number of cell phones per brand', 'Brand', 'Num. cell phones','items_brand_bargraph.png')
    bar_graph(reviews, 'country', False, 'Number of reviews per country', 'Country', 'Num. reviews', 'reviews_country_bargraph.png')
    bar_graph(reviews, 'rating', True, 'Review\'s rating distribution globally', 'Rating', 'Num. reviews', 'reviews_rating_dist_globally_bargraph.png')
    bar_graph(merged_data, 'brand', False, 'Number of reviews per brand', 'Brand', 'Num. reviews', 'reviews_brand_bargraph.png')

    for brand in items['brand'].unique():
        bar_graph(merged_data.loc[merged_data['brand'] == brand], 'rating_y', True, brand+' reviews\' rating distribution', 'Rating', 'Num. reviews', brand+'_reviews_dist_bargraph.png')

    generate_average_ratings(items)

    generate_wordcloud(items, 'items', 'title')
    generate_wordcloud(reviews, 'reviews', 'title')
    generate_wordcloud(reviews, 'reviews', 'body')
