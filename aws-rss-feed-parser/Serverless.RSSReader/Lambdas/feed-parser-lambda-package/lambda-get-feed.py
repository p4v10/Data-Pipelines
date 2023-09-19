from datetime import datetime
import json
import feedparser
import re
import os
import boto3
import uuid
import logging

# initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

# dynamoDB Client
dynamoDB = boto3.client('dynamodb')

# define the DynamoDB table name
table_name = os.environ.get('DYNAMODB_TABLE_NAME')

def lambda_handler(event, context):
    # parse the RSS feed from the list below
    #links = ['https://cointelegraph.com/rss', 'https://www.coindesk.com/arc/outboundfeeds/rss']
    links = ['https://cointelegraph.com/rss']
    
    all_articles = []
    
    for link in links:
        parsed = feedparser.parse(link)
        
        # extract feed information and articles from the parsed feed
        articles = get_feed_info_and_articles(parsed)
        all_articles.extend(articles)
    
    # write each article to DynamoDB
    for article in all_articles:
        # check if article already was written to the DynamoDB
        if not article_exists(article['feed_article_id']):
            article['unique_id'] = str(uuid.uuid4())  # Generate a unique ID
            article['date_added'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Current date and time
            write_article_to_dynamoDB(article)
    
    # create a response dictionary with a 200 status code and JSON body
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "articles": all_articles
        })
    }
    
    return response

def article_exists(article_id):
    # check if the article with the given ID exists in the DynamoDB table
    response = dynamoDB.query(
        TableName=table_name,
        KeyConditionExpression='feed_article_id = :id',
        ExpressionAttributeValues={
            ':id': {'S': article_id}
        }
    )
    return len(response.get('Items', [])) > 0

def write_article_to_dynamoDB(article):
    try:
        # write the article to the DynamoDB table
        dynamoDB.put_item(
            TableName=table_name,
            Item={
                'feed_article_id': {'S': article['feed_article_id']},
                'feed_article_link': {'S': article['feed_article_link']},
                'feed_article_published_date': {'S': article['feed_article_published_date']},
                'feed_article_title': {'S': article['feed_article_title']},
                'feed_article_author': {'S': article['feed_article_author']},
                'feed_article_summary': {'S': article['feed_article_summary']},
                'rss_feed_title': {'S': article['rss_feed_title']},
                'rss_feed_subtitle': {'S': article['rss_feed_subtitle']},
                'rss_feed_link': {'S': article['rss_feed_link']},
                'date_added': {'S': article['date_added']},
                'unique_id': {'S': article['unique_id']} 
            }
        )
    except Exception as e:
        logger.info(f"Error writing article to DynamoDB: {str(e)}")

# Function that gets the Feed Information and Single article
# It extracts all the necessary information needed to write the data into DynamoDB
def get_feed_info_and_articles(parsed):
    # extract information from the feed header
    feed = parsed['feed']
    feed_info = {
        'rss_feed_title': feed['title'],
        'rss_feed_subtitle': feed['subtitle'],
        'rss_feed_link': feed['link']
    }

    logger.info(f'Example feed info: {feed_info}')
    
    articles = []
    # get the list of entries from the feed
    entries = parsed['entries']
    
    for entry in entries:
        # convert published_parsed to a valid date format
        date_list = entry['published_parsed'][:6]
        date_obj = datetime(*date_list)
        formatted_date = date_obj.strftime("%Y-%m-%d %H:%M:%S")

        # create a dictionary for each article with relevant information
        article = {
            'feed_article_id': entry['id'],
            'feed_article_link': entry['link'],
            'feed_article_published_date': formatted_date,
            'feed_article_title': entry['title'],
            'feed_article_author': entry['author_detail']['name'],
            'feed_article_summary': remove_html_tags(entry['summary'])
        }
        
        # merge the feed_info and article dictionaries
        article.update(feed_info)
        
        # add the article dictionary to the list of articles
        articles.append(article)
        
    logger.info(f'Example record: {articles[0]}')

    return articles

# Function to remove HTML tags from a given text
def remove_html_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)
