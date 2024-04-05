import os
import csv
import json
import boto3
import logging
import requests

from io import StringIO

from requests import Request, Session
from requests.exceptions import ConnectionError

# clients
s3_client = boto3.client('s3')

# logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.info('Beging Loggining')

# variables for the S3 outputs
BUCKET_NAME = 'rss-feed-parser-dev-btc-data-source'
FILE_PATH = 'crypto/bitcoin_data.csv'

# env variables
API_KEY = os.environ['COINMARKETCAP_API_KEY'] 

def lambda_handler(event, context):
    
    try:
        # call the fetch price function
        btc_data = fetch_btc_data()
        
        # save results to S3
        save_to_s3(btc_data, BUCKET_NAME, FILE_PATH)
            
        return {
            'statusCode': 200,
            'body': json.dumps('To the MOOOON!')
        }
        
    except Exception as e:
        logging.info(f'Error: {e}')
        
    return 'Something went wrong! :c'

# Fetch BTC price using CoinMarketCap API
def fetch_btc_data():
    
    try:
        # CoinMarketCap API Endpoint
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
        
        parameters = {
            'slug': 'bitcoin',
            'convert': 'USD'
        } 
        
        headers = {
          'Accepts': 'application/json',
          'X-CMC_PRO_API_KEY': API_KEY
        }
        
        session = Session()
        session.headers.update(headers)
        
        response = session.get(url, params=parameters)
        info = json.loads(response.text)
        
        data = info['data']['1']
        
        ticker = data['symbol']
        timestamp = info['status']['timestamp']
        price_usd = data['quote']['USD']['price']
        market_cap = data['quote']['USD']['market_cap']
        volume_24h = data['quote']['USD']['volume_24h']
        volume_change_24h = data['quote']['USD']['volume_change_24h']
        percent_change_24h = data['quote']['USD']['percent_change_24h']
        percent_change_7d = data['quote']['USD']['percent_change_7d']
        percent_change_30d = data['quote']['USD']['percent_change_30d']
        percent_change_60d = data['quote']['USD']['percent_change_60d']
        percent_change_90d = data['quote']['USD']['percent_change_90d']
        market_cap_dominance = data['quote']['USD']['market_cap_dominance']
        
        logging.info(f'Timestamp: {timestamp}, Ticker: {ticker}, Price(USD): {price_usd}, Market CAP: {market_cap}, Volume(24h): {volume_24h}, Volume Chagne(24h): {volume_change_24h}, Percent Change(24h): {percent_change_24h}, Market Cap Dominance: {market_cap_dominance}')

        api_data = {
            'timestamp': timestamp,
            'ticker': ticker,
            'price': price_usd,
            'market_cap': market_cap,
            'volume_24h': volume_24h,
            'volume_change_24h': volume_change_24h,
            'percent_change_24h': percent_change_24h,
            'percent_change_7d': percent_change_7d,
            'percent_change_30d': percent_change_30d,
            'percent_change_60d': percent_change_60d,
            'percent_change_90d': percent_change_90d,
            'market_cap_dominance': market_cap_dominance
        }
        
        return api_data
        
    # a lot of error handling
    except ConnectionError:
        logging.error('Error: Network problem.')

    return 'Something went wrong when fetching the data :c'
    
# This functions saves the data to S3 as the .csv file
def save_to_s3(data, bucket_name, file_name):
    
    # create a csv file in memory
    csvfile = StringIO()
    headers = [
        'timestamp',
        'ticker',
        'price',
        'market_cap',
        'volume_24h',
        'volume_change_24h',
        'percent_change_24h',
        'percent_change_7d',
        'percent_change_30d',
        'percent_change_60d',
        'percent_change_90d',
        'market_cap_dominance'
    ]
    
    # csv writer
    writer = csv.DictWriter(csvfile, fieldnames=headers)

    # write the header and API data to .csv
    writer.writeheader()
    writer.writerow({
        'timestamp': data['timestamp'],
        'ticker': data['ticker'],
        'price': data['price'],
        'market_cap': data['market_cap'],
        'volume_24h': data['volume_24h'],
        'volume_change_24h': data['volume_change_24h'],
        'percent_change_24h': data['percent_change_24h'],
        'percent_change_7d': data['percent_change_7d'],
        'percent_change_30d': data['percent_change_30d'],
        'percent_change_60d': data['percent_change_60d'],
        'percent_change_90d': data['percent_change_90d'],
        'market_cap_dominance': data['market_cap_dominance']
    })

    # Move the pointer of StringIO object to the beginning of the file
    csvfile.seek(0)

    s3_client.put_object(
        Bucket=BUCKET_NAME,
        Key=FILE_PATH,
        Body=csvfile.getvalue()
    )
    
    logger.info(f'Saved the data into bucket: {BUCKET_NAME}, with filepath: {FILE_PATH}!')
