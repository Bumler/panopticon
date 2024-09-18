import DynamoDB from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from 'uuid';

export abstract class AbstractDynamoDbClient<T> {
    protected abstract tableName: string;
    protected abstract dynamoDb: DynamoDB.DocumentClient;

    public async addRecord(record: T): Promise<string> {
        const id = uuidv4()

        const params = {
            TableName: this.tableName,
            Item: {
                ...record,
                id
            }
        };

        try {
            await this.dynamoDb.put(params).promise();
            console.log('Activity added successfully:', id);
            return id;

        } catch (error) {
            console.error('Error adding activity:', error);
            return "";
        }
    }

    protected async getRecord(id: string): Promise<T | null> {
        const params = {
            TableName: this.tableName,
            Key: {
                id
            }
        };

        try {
            const result = await this.dynamoDb.get(params).promise();
            if (result.Item) {
                console.log('Record retrieved successfully:', result.Item);
                return result.Item as T;
            } else {
                console.log('No record found for ID:', id);
                return null;
            }
        } catch (error) {
            console.error('Error retrieving record:', error);
            return null;
        }
    }

    // TODO max batch of 100 - needs to add pagination.
    public async batchGetRecords(ids: string[]): Promise<T[]> {
        const params = {
            RequestItems: {
                [this.tableName]: {
                    Keys: ids.map(id => ({ id }))
                }
            }
        };

        try {
            const result = await this.dynamoDb.batchGet(params).promise();
            const items = result.Responses?.[this.tableName] || [];
            console.log('Records retrieved successfully:', items);
            return items as T[];
        } catch (error) {
            console.error('Error retrieving records:', error);
            return [];
        }
    }
}