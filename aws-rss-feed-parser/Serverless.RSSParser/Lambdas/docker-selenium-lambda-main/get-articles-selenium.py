from selenium import webdriver
from tempfile import mkdtemp
from selenium.webdriver.common.by import By

import re
import time
import logging

# initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

def lambda_handler(event=None, context=None):
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

    chrome = webdriver.Chrome(options=options, service=service)
    chrome.get("https://cointelegraph.com/news/crypto-regulation-g20-adopts-imf-fsb-synthesis-paper")

    # scroll the page and wait for content
    for _ in range(5):
        chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(4)
    
    # find article elements
    article_text = chrome.find_element(By.CSS_SELECTOR, "article.post__article").text

    return article_text

logger.info("-----End Loggining-----")