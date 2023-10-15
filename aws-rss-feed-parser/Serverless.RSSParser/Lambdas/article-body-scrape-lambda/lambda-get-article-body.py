import boto3
import json
import logging

from goose3 import Goose

# Initiate logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

# dynamoDB Client
dynamoDB = boto3.client('dynamodb')

# Goose article extractor
g = Goose()

def lambda_handler(event, context)

    some_v = 'hello'

    return some_v