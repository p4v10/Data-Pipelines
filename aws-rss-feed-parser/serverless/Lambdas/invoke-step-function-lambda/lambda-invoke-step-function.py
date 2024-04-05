import os
import json
import boto3
import logging

# initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("-----Start Loggining-----")

def lambda_handler(event, context):

    # get step function arn
    step_function_arn = os.environ.get('STEP_FUNCTION_ARN')

    # initialize the Step Functions client
    stepfunctions = boto3.client('stepfunctions', region_name='us-east-1')

    # define your input dictionary
    input_dict = {'key': 'value'}

    try:
        # trigger the Step Function execution
        response = stepfunctions.start_execution(
            stateMachineArn = step_function_arn,
            input=json.dumps(input_dict)
        )

        # log the response for tracking
        logger.info(f'Started Step Function execution: {response["executionArn"]}')

        # you can return any response you want here
        return {
            'statusCode': 200,
            'body': 'Step Function execution started successfully.'
        }
    except Exception as e:
        logger.info(f'Error starting Step Function execution: {str(e)}')
        return {
            'statusCode': 500,
            'body': 'Error starting Step Function execution.'
        }
