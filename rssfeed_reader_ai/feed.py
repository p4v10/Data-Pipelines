import feedparser

# Functio to Parse URLs
def parse_feed(url):
    global parsed

    #url = 'https://cointelegraph.com/rss'

    # parse the url
    parsed = feedparser.parse(url)
    
    return parsed

# Function to get Feed Infomation
def get_feed_info(parsed):
    global feed_info

    # get the data about the feed
    feed = parsed['feed']

    # get the needed elements in the object
    feed_info = {
        'title': feed['title'],
        'subtitle': feed['subtitle'],
        'link': feed['link']
    }

    return feed_info

# Function to get Article details
def get_articles(parsed):
    
    # create a list that will hold a dictionary with each article information
    articles = []
    
    # entries of articles from feed
    entries = parsed['entries']
    
    # itterate and get info about each article
    for entry in entries:
        # append each article info as object to the list
        articles.append(
            {
                'id': entry['id'],
                'link': entry['link'],
                'published': entry['published_parsed'],
                'title': entry['title'],
                'author': entry['author_detail']['name'],
                'summary': entry['summary']
            }
        )
        
    return articles