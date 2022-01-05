import requests
from bs4 import BeautifulSoup
from random import randint, choice
from time import sleep
import csv

user_agent_list = [
#'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15',
#'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0',
#'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
#'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0',
#'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'
]

def scrape(url):
    user_agent = choice(user_agent_list)

    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': user_agent,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
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

    for asin_url in urllist.read().splitlines():
        asin, url = asin_url.split(",")

        sleep(randint(1,5))

        soup = BeautifulSoup(scrape(url), "html.parser")
        if soup:
            details = {}
            details['asin'] = asin

            try:
                details['description'] = soup.find(id="productDescription").p.span.find(text=True, recursive=True).strip()
            except:
                print('error in description')

            about = soup.find(id="feature-bullets").find_all("li")
            details['about'] = []
            for feature in about:
                details['about'].append(feature.find("span", class_="a-list-item").getText().strip())

            overview = soup.find(id="productOverview_feature_div").find_all("tr")
            details['more'] = []
            for tr in overview:
                data = tr.find_all("span")
                details['more'].append(data[0].find(text=True, recursive=False).strip() + ": " + data[1].find(text=True, recursive=True).strip())
            
            writer.writerow(details)