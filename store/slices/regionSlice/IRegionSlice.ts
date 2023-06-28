export interface IRegionSlice{
    region: "RU" | "EN";
    currency: "USD" | "RUB"
    currencyMultiplier: number
    currencySymbol?: string
}