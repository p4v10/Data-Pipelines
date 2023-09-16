from datetime import datetime
import json
import feedparser
import re
import boto3
import uuid
import logging

# Initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

# DynamoDB Client
dynamoDB = boto3.client('dynamodb')

# Define the DynamoDB table name
table_name = 'rss-ai-dev-source'

def lambda_handler(event, context):
    # Parse the RSS feed from 'https://cointelegraph.com/rss'
    parsed = feedparser.parse('https://cointelegraph.com/rss')
    
    # Extract feed information and articles from the parsed feed
    articles = get_feed_info_and_articles(parsed)
    
    # Write each article to DynamoDB
    for article in articles:
        # check if article already was written to the DynamoDB
        if not article_exists(article['feed_article_id']):
            article['unique_id'] = str(uuid.uuid4())  # Generate a unique ID
            article['date_added'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Current date and time
            write_article_to_dynamoDB(article)
    
    # Create a response dictionary with a 200 status code and JSON body
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "articles": articles
        })
    }
    
    return response

def article_exists(article_id):
    # Check if the article with the given ID exists in the DynamoDB table
    response = dynamoDB.query(
        TableName=table_name,
        KeyConditionExpression='feed_article_id = :id',
        ExpressionAttributeValues={
            ':id': {'S': article_id}
        }
    )
    return len(response.get('Items', [])) > 0

def write_article_to_dynamoDB(article):
    # Write the article to the DynamoDB table
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

# Function that gets the Feed Information and Single article
# It extracts all the necessary information needed to write the data into DynamoDB
def get_feed_info_and_articles(parsed):
    # Extract information from the feed header
    feed = parsed['feed']
    feed_info = {
        'rss_feed_title': feed['title'],
        'rss_feed_subtitle': feed['subtitle'],
        'rss_feed_link': feed['link']
    }

    logger.info(f'Example feed info: {feed_info}')
    
    articles = []  # Initialize an empty list to store article data
    entries = parsed['entries']  # Get the list of entries from the feed
    
    for entry in entries:
        # Convert published_parsed to a valid date format
        date_list = entry['published_parsed'][:6]  # Extract the first 6 elements
        date_obj = datetime(*date_list)  # Convert to datetime
        formatted_date = date_obj.strftime("%Y-%m-%d %H:%M:%S")  # Format the date

        # Create a dictionary for each article with relevant information
        article = {
            'feed_article_id': entry['id'],
            'feed_article_link': entry['link'],
            'feed_article_published_date': formatted_date,
            'feed_article_title': entry['title'],
            'feed_article_author': entry['author_detail']['name'],
            'feed_article_summary': remove_html_tags(entry['summary'])
        }
        
        # Merge the feed_info and article dictionaries
        article.update(feed_info)
        
        # Add the article dictionary to the list of articles
        articles.append(article)
        
    logger.info(f'Example record: {articles[0]}')

    return articles

# Function to remove HTML tags from a given text
def remove_html_tags(text):
    clean = re.compile('<.*?>')  # Define a regular expression pattern for HTML tags
    return re.sub(clean, '', text)  # Use re.sub to replace HTML tags with an empty string
