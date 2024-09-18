import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { SupportedValueType } from '../models/supportedValueType';
import { SupportedActivityDao } from '../daos/supportedActivityDao';
import { v4 as uuidv4 } from 'uuid';
import { AbstractDynamoDbClient } from './AbstractDynamoDbClient';


export class ActivityDynamoDBClient extends AbstractDynamoDbClient<SupportedActivityDao> {
    protected tableName: string;
    protected dynamoDb: DynamoDB.DocumentClient;

    constructor(tableName: string, dynamoDb: DocumentClient) {
        super();
        this.dynamoDb = dynamoDb;
        this.tableName = tableName;
    }

    public async getActivity(id: string): Promise<SupportedActivityDao | null> {
        return this.getRecord(id);
    }
}
