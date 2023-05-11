import {CSSProperties} from "react";

export type mobileTrigger_size = "XXL_1400" | "XL_1200" | "LG_992" | "MD_768" | "SM_576"

export type commonStyles =
    Pick<CSSProperties, "borderRadius" | "height">

export type cstmStyles = {
    [key: string] : string,
}

export const maxLengthText = (text: string, length: number): string => {
   return text.length >= length ? `${text.slice(0, length)}...` : text;
}
