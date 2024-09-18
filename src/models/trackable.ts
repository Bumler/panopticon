import { SupportedValueType } from "./supportedValueType";

export interface Trackable {
    id: string,
    userId: string,
    activityName: string,
    value: string, // need to think through making this strongly typed. Probably means different implementations of Trackable.
    valueType: SupportedValueType,
    notes: string | "",
    recordedOn: Date
}