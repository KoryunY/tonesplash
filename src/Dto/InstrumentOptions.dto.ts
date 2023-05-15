import { ConvertingType, SaveAndReturnOption, Instrument } from "./AioOptions.dto"

export interface InstrumentOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    intervalCount?: number,
    instrument?: Instrument,
    config?: string
    user: string,
    useCustomFft?: boolean
}