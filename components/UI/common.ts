import {CSSProperties} from "react";

export type commonStyles =
    Pick<CSSProperties, "borderRadius" | "height">

export type cstmStyles = {
    [key: string] : string,
}

export const maxLengthText = (text: string, lenght: number): string => {
   return text.length >= lenght ? `${text.slice(0, lenght)}...` : text;
}