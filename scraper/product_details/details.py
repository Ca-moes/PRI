import requests
from bs4 import BeautifulSoup
from random import randint
from time import sleep
import csv

#! https://www.amazon.com/Motorola-Moto-Factory-Unlocked-Phone/dp/B074VFRKZG

def scrape(url):
    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }

    # Download the page using requests
    print("Downloading %s"%url)
    r = requests.get(url, headers=headers)
    # Simple check to check if page was blocked (Usually 503)
    if r.status_code > 500:
        if "To discuss automated access to Amazon data please contact" in r.text:
            print("Page %s was blocked by Amazon. Please try using better proxies\n"%url)
        else:
            print("Page %s must have been blocked by Amazon as the status code was %d"%(url,r.status_code))
        return None
    # Return the HTML of the page
    return r.content

with open('urls.txt', 'r') as urllist, open('items_details.csv', 'w', newline='', encoding='utf-8') as outfile:
    csv_columns = ['asin', 'description', 'about', 'overview']

    writer = csv.DictWriter(outfile, fieldnames=csv_columns)
    writer.writeheader()

    for url in urllist.read().splitlines():
        sleep(randint(1,5))
        soup = BeautifulSoup(scrape(url), "html.parser")
        if soup:
            details = {}
            details['asin'] = url.rsplit('/', 1)[-1]

            try:
                details['description'] = soup.find(id="productDescription").p.span.find(text=True, recursive=True).strip()
            except:
                print('error in description')

            about = soup.find(id="feature-bullets").find_all("li")
            details['about'] = []
            for feature in about:
                details['about'].append(feature.find("span", class_="a-list-item").getText().strip())

            overview = soup.find(id="productOverview_feature_div").find_all("tr")
            details['overview'] = []
            for tr in overview:
                data = tr.find_all("span")
                details['overview'].append(data[0].find(text=True, recursive=False).strip() + ": " + data[1].find(text=True, recursive=True).strip())
            
            writer.writerow(details)