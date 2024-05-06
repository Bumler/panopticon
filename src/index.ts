import { DynamoDB } from "aws-sdk";
import { ActivityDynamoDBClient } from "./dynamoClients/ActivityDynamoDbClient";
import * as dotenv from 'dotenv';

// todo remove this when running in lambda.
dotenv.config();  // This will load the environment variables from the .env file

async function main() {
    const tableName = 'SupportedActivities';
    const dynamoClient = new DynamoDB.DocumentClient();
    const activityClient = new ActivityDynamoDBClient(tableName, dynamoClient);

    try {
        await activityClient.addActivity('Weekday Activities', "string");
        console.log('Activity recorded successfully.');
    } catch (error) {
        console.error('Failed to record activity:', error);
    }
}

main();