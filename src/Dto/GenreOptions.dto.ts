import { ConvertingType, Genre, SaveAndReturnOption } from "./AioOptions.dto"

export interface GenreOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    useIntervals: boolean,
    intervalCount?: number,
    genre?: Genre,
    config?: string
    user: string,
    useCustomFft?: boolean
}