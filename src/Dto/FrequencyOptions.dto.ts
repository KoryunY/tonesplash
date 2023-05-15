import { ConvertingType, SaveAndReturnOption } from "./AioOptions.dto";

export interface FrequencyOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    useIntervals: boolean,
    intervalCount?: number,
    user: string,
    gradientSplitCount?: number,
    useCustomFft?: boolean
}