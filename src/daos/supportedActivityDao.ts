import { SupportedValueType } from "../models/supportedValueType";

export interface SupportedActivityDao{
    id: string,
    activityName: string,
    valueType: SupportedValueType
}