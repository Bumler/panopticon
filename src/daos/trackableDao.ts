export interface TrackableDao {
    id: string,
    activityId: string,
    userId: string,
    value: string,
    notes: string | "",
    recordedOn: Date
} 