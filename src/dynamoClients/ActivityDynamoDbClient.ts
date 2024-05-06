import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { SupportedValueType } from '../models/supportedValueType';
import { SupportedActivity } from '../models/supportedActivity';
import { v4 as uuidv4 } from 'uuid';


export class ActivityDynamoDBClient {
    private dynamoDb: DynamoDB.DocumentClient;
    private tableName: string;

    constructor(tableName: string, dynamoDb: DocumentClient) {
        this.dynamoDb = dynamoDb;
        this.tableName = tableName;
    }

    // Method to add a new activity
    public async addActivity(activityName: string, valueType: SupportedValueType): Promise<void> {
        const activity: SupportedActivity = {
            activityId: uuidv4(),
            activityName: activityName,
            valueType: valueType
        };

        const params = {
            TableName: this.tableName,
            Item: activity
        };

        try {
            await this.dynamoDb.put(params).promise();
            console.log('Activity added successfully:', activity);
        } catch (error) {
            console.error('Error adding activity:', error);
            throw error;  // Re-throw to handle it in higher-level code
        }
    }
}
