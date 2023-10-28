# RSS Feed Parser Service

This service fetches and processes RSS feeds, storing parsed feed data in a DynamoDB table and scraping the article content using Selenium.

## Project Overview

1. **Runtime & Provider**: This project uses the Serverless Framework version 3, targeting AWS with a runtime of Python 3.11 in the `us-east-1` region.
2. **ECR**: The project leverages AWS Elastic Container Registry (ECR) to store Docker images required for Lambda functions.
3. **DynamoDB**: The service uses a DynamoDB table to store the parsed RSS feed data.
4. **Step Functions**: Implements a step function to streamline the RSS data extraction and article scraping process.
5. **Lambdas**: The project consists of three Lambda functions:
   - Invoker Lambda: Initiates the step function.
   - RSS Data Fetcher: Fetches the RSS feed data.
   - Selenium Scrapper: Uses Selenium to scrape article content.

## Setup and Deployment

To deploy the service, ensure you have the required Serverless plugins installed:

```bash
npm install --save serverless-python-requirements serverless-step-functions
```

Then deploy using:

```bash
sls deploy
```

## Service Structure

- **Provider Configuration**:
  - AWS configuration settings including region, stage, and runtime.
  - ECR image setup.
- **DynamoDB Configuration**:
  - Table structure, attributes, and indices.
- **IAM Role for Lambdas**:
  - Permissions for Lambdas to interact with DynamoDB, CloudWatch, and Step Functions.
- **Step Function Configuration**:
  - A pipeline to fetch RSS feed data and then scrape articles.
- **Lambdas**:
  - Three Lambdas as described above.
- **Plugins**:
  - `serverless-python-requirements` to handle Python dependencies.
  - `serverless-step-functions` to support AWS Step Functions.

## DynamoDB Schema

The DynamoDB table captures various attributes of an RSS feed article including its title, summary, link, author, etc. Several Global Secondary Indexes (GSI) are set up for different query use-cases.

## Contribute

Contributions are welcome! Please submit pull requests or open issues with suggestions, improvements, or bug fixes.
