import re
import os
import time
import boto3
import logging


from tempfile import mkdtemp
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, WebDriverException

MAX_RETRIES = 3

# initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

# dynamoDB Client
dynamoDB = boto3.client('dynamodb')

# define the DynamoDB table name
table_name = os.environ.get('DYNAMODB_TABLE_NAME')

# today's date for reporting
date_time = datetime.now()

# get the news article from the RSS records in DynamoDB
def get_dynamoDB_article_links():

    links = []
    # defining scan parameters to filter where article is not scraped yet
    scan_kwargs = {
        'FilterExpression': "article_scraped <> :one",
        'ProjectionExpression': "feed_article_id, unique_id",
        'ExpressionAttributeValues': {":one": {"N": "1"}}
    }

    done = False # indicates if all items were scraped
    start_key = None # last scanned item, for pagination

    while not done:
        if start_key:
            scan_kwargs['ExclusiveStartKey'] = start_key
        # scna dynamodb with parameters
        response = dynamoDB.scan(TableName = table_name, **scan_kwargs)
        # append links and IDs to the list
        links += [(item['feed_article_id']['S'], item['unique_id']['S']) 
            for item in response.get('Items', []) 
            if 'feed_article_id' in item and 'unique_id' in item]
        start_key = response.get('LastEvaluatedKey', None)
        done = start_key is None
    logging.info(f'Links: {links}')
    return links

# scrape the full article text from the news website
def get_full_article_text(url):
    # this block initialize chrome agent and sets the configurations
    options = webdriver.ChromeOptions()
    service = webdriver.ChromeService("/opt/chromedriver")

    options.binary_location = '/opt/chrome/chrome'
    options.add_argument("--headless=new")
    options.add_argument('--no-sandbox')
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1280x1696")
    options.add_argument("--single-process")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-dev-tools")
    options.add_argument("--no-zygote")
    options.add_argument(f"--user-data-dir={mkdtemp()}")
    options.add_argument(f"--data-path={mkdtemp()}")
    options.add_argument(f"--disk-cache-dir={mkdtemp()}")
    options.add_argument("--remote-debugging-port=9222")

    with webdriver.Chrome(options=options, service=service) as chrome:
        chrome.get(url)

        # scroll to the bottom of page, wait 3 seconds and repeat 3 times to mimic user
        for _ in range(3):
            chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
        
        # get full text from the article block
        article_element = chrome.find_element(By.CSS_SELECTOR, "article.post__article")
        article_text = article_element.text

        # CSS selectors o the elements to be removed
        elements_to_remove = [
            ".post-meta", 
            ".post-actions", 
            ".post__socials-block", 
            ".text-banner", 
            ".post__block_nft"
        ]

        # remove the text if matched by selector
        for selector in elements_to_remove:
            try:
                element = article_element.find_element(By.CSS_SELECTOR, selector)
                article_text = article_text.replace(element.text, '').strip()
            except NoSuchElementException:  # catch the error if the element is not found
                logging.warning(f"Element with selector {selector}, for article: {url} not found. Skipping...")
                continue  # Move to the next selector

        # string cleaning
        article_text = re.sub(r'Magazine.*', '', article_text, flags=re.DOTALL)
        article_text = re.sub(r'Related.*?\.', '', article_text, flags=re.DOTALL)
        article_text = re.sub(r'(?<!\.)\n', '. ', article_text)
        article_text = article_text.replace('NEWS.', '').replace('Ad.', '').replace('\n', ' ')
        logging.info(f'Article Text: {article_text}')
        return article_text

# update the dynamoDB table with the scraped data
def update_dynamoDB(feed_article_id, unique_id, article_text):
    try:
        dynamoDB.update_item(
            TableName = table_name,
            Key = {
                'feed_article_id': {'S': feed_article_id},
                'unique_id': {'S': unique_id}
                },
            UpdateExpression = "SET raw_full_article = :val1, article_scraped = :val2",
            ExpressionAttributeValues = {
                ':val1': {'S': article_text},
                ':val2': {'N': '1'}
            }
        )
        logging.info('DynamoDB updated')
    except Exception as e:
        logging.error(str(e))

def lambda_handler(event, context):

    # get links from dynamodb rss records
    links = get_dynamoDB_article_links()
    processed_count = 0

    for link, unique_id in links:
        # gets the article text using function from
        article_text = get_full_article_text(link)
        # stores scraped article back into dynamodb
        update_dynamoDB(link, unique_id, article_text)
        processed_count += 1
        logging.info(f'Processed already: {processed_count}')

    logging.info(f'Total Processed: {processed_count}')
    return {
        'statusCode': 200,
        'body': f'Total scraped and processed articles: {processed_count}. Date: {date_time}'
    }
    