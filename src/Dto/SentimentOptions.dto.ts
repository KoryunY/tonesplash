import { ConvertingType, SaveAndReturnOption, Sentiment } from "./AioOptions.dto";

export interface SentimentOptionsDto {
    name: string,
    type: ConvertingType,
    saveAndReturnOption: SaveAndReturnOption,
    intervalCount: number,
    sentiment?: Sentiment,
    familyCount?: number,
    config?: string,
    user: string,
    useCustomFft?: boolean
}