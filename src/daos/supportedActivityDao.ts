import { SupportedValueType } from "./supportedValueType";

export interface SupportedActivityDao{
    activityId: string,
    activityName: string,
    valueType: SupportedValueType
}