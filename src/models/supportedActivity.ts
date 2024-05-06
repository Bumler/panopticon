import { SupportedValueType } from "./supportedValueType";

export interface SupportedActivity{
    activityId: string,
    activityName: string,
    valueType: SupportedValueType
}