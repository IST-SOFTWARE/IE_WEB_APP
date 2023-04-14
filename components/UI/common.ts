import {CSSProperties} from "react";

export type commonStyles =
    Pick<CSSProperties, "borderRadius" | "height">

export type cstmStyles = {
    [key: string] : string,
}

export const maxLengthText = (text: string, length: number): string => {
   return text.length >= length ? `${text.slice(0, length)}...` : text;
}