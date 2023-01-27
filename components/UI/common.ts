import {CSSProperties} from "react";

export type commonStyles =
    Pick<CSSProperties, "borderRadius" | "height">

export type cstmStyles = {
    [key: string] : string,
}