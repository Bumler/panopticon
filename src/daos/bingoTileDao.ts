export interface BingoTileDao {
    id: string,
    completedTrackables: string[],
    completionTarget: number
    tileName: string
}