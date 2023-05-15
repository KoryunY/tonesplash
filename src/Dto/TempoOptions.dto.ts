import { ConvertingType, SaveAndReturnOption, Tempo } from "./AioOptions.dto"

export interface TempoOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    intervalCount: number,
    tempo?: Tempo,
    config?: string
    user: string,
    useCustomFft?: boolean
}