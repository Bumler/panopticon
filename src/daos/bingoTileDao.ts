export interface BingoTileDao {
    bingoTileId: string,
    completedTrackables: string[],
    completionTarget: number
    tileName: string
}