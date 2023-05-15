import { ConvertingType, SaveAndReturnOption } from "./AioOptions.dto";

export interface EnergyOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    intervalCount?: number,
    config?: string,
    user: string,
    useCustomFft?: boolean
}