import { Trackable } from "./trackable"

export interface BingoTile {
    id: string,
    completedTrackables: Trackable[],
    completionTarget: number
    tileName: string
}