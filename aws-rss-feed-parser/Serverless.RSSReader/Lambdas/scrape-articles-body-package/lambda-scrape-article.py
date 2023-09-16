from datetime import datetime
from bs4 import BeautifulSoup
import requests
import json
import re


def lambda_handler(event, context):
    link = "https://cointelegraph.com/news/defi-economic-activity-drops-august-vaneck"

    # initialize bs4
    res = requests.get(link)
    soup = BeautifulSoup(res.content, 'html.parser')

    # find the div that contains article text
    article_body = soup.find('div',{'class':'post-page__content-col'})

    # empty list to store the text from <p>
    paragraph_texts = []

    # loop thru all <p> tags and extract text from them
    for paragraph in article_body.find_all('p'):
        paragraph_texts.append(paragraph.get_text())

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "response": paragraph_texts
        })
    }
    
    return response

