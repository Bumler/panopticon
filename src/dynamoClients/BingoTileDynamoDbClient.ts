import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractDynamoDbClient } from "./AbstractDynamoDbClient";
import { BingoTileDao } from "../daos/bingoTileDao";
import { TrackableDynamoDBClient } from "./TrackableDynamoDbClient";
import { BingoTile } from "../models/bingoTile";

export class BingoTileDynamoDbClient extends AbstractDynamoDbClient<BingoTileDao> {
    protected tableName: string;
    protected dynamoDb: DocumentClient;

    protected trackableDb: TrackableDynamoDBClient;

    constructor(tableName: string, dynamoDb: DocumentClient, trackableDb: TrackableDynamoDBClient) {
        super();
        this.dynamoDb = dynamoDb;
        this.tableName = tableName;

        this.trackableDb = trackableDb;
    }

    public async getBingoTile(id: string): Promise<BingoTile | null> {
        const bingoDao = await this.getRecord(id);

        if (!bingoDao)
            return null;

        const completedTrackables = await this.trackableDb.getTrackables(bingoDao.completedTrackables);

        return {
            id: bingoDao.id,
            completedTrackables,
            completionTarget: bingoDao.completionTarget,
            tileName: bingoDao.tileName
        }
    }

    public async getBingoTiles(ids: string[]): Promise<BingoTile[]> {
        const bingoTiles = await Promise.all(ids.map(id => this.getBingoTile(id)));
        return bingoTiles.filter(tile => tile !== null) as BingoTile[];
    }
}