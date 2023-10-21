import re
import os
import time
import boto3
import logging

from tempfile import mkdtemp
from selenium import webdriver
from selenium.webdriver.common.by import By

# initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

# dynamoDB Client
dynamoDB = boto3.client('dynamodb')

# define the DynamoDB table name
table_name = os.environ.get('DYNAMODB_TABLE_NAME')

def lambda_handler(event=None, context=None):
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
        chrome.get("https://cointelegraph.com/news/singapore-court-authorizes-freeze-order-attached-wallets-soulbound-nft")

        # scroll the page to mimic user
        for _ in range(5):
            chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
        
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
            element = article_element.find_element(By.CSS_SELECTOR, selector)
            article_text = article_text.replace(element.text, '').strip()

        # string cleaning
        article_text = re.sub(r'Magazine.*', '', article_text, flags=re.DOTALL)
        article_text = re.sub(r'Related.*?\.', '', article_text, flags=re.DOTALL)
        article_text = re.sub(r'(?<!\.)\n', '. ', article_text)
        article_text = article_text.replace('NEWS.', '').replace('Ad.', '').replace('\n', ' ')

        return article_text