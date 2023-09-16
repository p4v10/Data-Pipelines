import boto3
import json

def lambda_handler(event, context):
    # Initialize the Step Functions client
    stepfunctions = boto3.client('stepfunctions', region_name='us-east-1')

    # Define your input dictionary
    input_dict = {'key': 'value'}

    try:
        # Trigger the Step Function execution
        response = stepfunctions.start_execution(
            stateMachineArn='arn:aws:states:us-east-1:xxxxxxx:iam_role',
            input=json.dumps(input_dict)
        )

        # Log the response for tracking
        print(f'Started Step Function execution: {response["executionArn"]}')

        # You can return any response you want here
        return {
            'statusCode': 200,
            'body': 'Step Function execution started successfully.'
        }
    except Exception as e:
        print(f'Error starting Step Function execution: {str(e)}')
        return {
            'statusCode': 500,
            'body': 'Error starting Step Function execution.'
        }
