import json
import feedparser

def parse_feed(event, context):
    url = 'https://cointelegraph.com/rss'
    parsed = feedparser.parse(url)
    feed_info = get_feed_info(parsed)
    articles = get_articles(parsed)
    
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "feed_info": feed_info,
            "articles": articles
        })
    }
    
    return response

def get_feed_info(parsed):
    feed = parsed['feed']
    feed_info = {
        'title': feed['title'],
        'subtitle': feed['subtitle'],
        'link': feed['link']
    }
    return feed_info

def get_articles(parsed):
    articles = []
    entries = parsed['entries']
    
    for entry in entries:
        articles.append({
            'id': entry['id'],
            'link': entry['link'],
            'published': entry['published_parsed'],
            'title': entry['title'],
            'author': entry['author_detail']['name'],
            'summary': entry['summary']
        })
        
    return articles

def lambda_handler(event, context):
    parsed = feedparser.parse('https://cointelegraph.com/rss')
    feed_info = get_feed_info(parsed)
    articles = get_articles(parsed)
    
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "feed_info": feed_info,
            "articles": articles
        })
    }
    
    return response
