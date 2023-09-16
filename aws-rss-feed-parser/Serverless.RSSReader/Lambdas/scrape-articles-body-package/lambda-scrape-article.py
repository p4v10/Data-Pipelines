from datetime import datetime
from bs4 import BeautifulSoup
import requests
import json
import re

def lambda_handler(event, context):
    
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "response": "Works"
        })
    }
    
    return response

