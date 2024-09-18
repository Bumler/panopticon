import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { TrackableDao } from "../daos/trackableDao";
import { AbstractDynamoDbClient } from "./AbstractDynamoDbClient";
import { ActivityDynamoDBClient } from "./ActivityDynamoDbClient";
import { Trackable } from "../models/trackable";

export class TrackableDynamoDBClient extends AbstractDynamoDbClient<TrackableDao> {
    protected tableName: string;
    protected dynamoDb: DocumentClient;

    
    protected activityDynamoDb: ActivityDynamoDBClient;

    constructor(tableName: string, dynamoDb: DocumentClient, activityDynamoDb: ActivityDynamoDBClient) {
        super();
        this.dynamoDb = dynamoDb;
        this.tableName = tableName;
        this.activityDynamoDb = activityDynamoDb;
    }

    public async getTrackableDao(id: string): Promise<TrackableDao | null> {
        return this.getRecord(id);
    }

    public async getTrackables(ids: string[]): Promise<Trackable[]> {
        const trackableDaos = await this.batchGetRecords(ids);

        const uniqueActivityIds = new Set(trackableDaos.map(t => t.activityId));
        const activityDaos = await this.activityDynamoDb.batchGetRecords(Array.from(uniqueActivityIds))
        const activityMap = new Map(activityDaos.map(activity => [activity.id, activity]));

        return trackableDaos.map(t => { 
            const activity = activityMap.get(t.activityId)

            return {
                id: t.id, 
                userId: t.userId, 
                activityName: activity?.activityName ?? "",
                value: t.value,
                valueType: activity?.valueType ?? "string",
                notes: t.notes,
                recordedOn: t.recordedOn
            };
        });
    }
}