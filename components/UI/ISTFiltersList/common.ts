import React, {ReactNode} from "react";

export type mobileOpenType_dropdown = "dropdown"
export type mobileOpenType_transfer = "transfer"
type mobileTrigger_size = "XXL_1400" | "XL_1200" | "LG_992" | "MD_768" | "SM_576"

export type ICheckBoxItem = {
    isActive: boolean;
    isCheckBox: boolean;
    fieldName: string;

    idx?: number;
    switchActiveState?: (...props)=>any
};

export type IST_IFilterItem = Pick<ICheckBoxItem, "fieldName" | "isActive" | "isCheckBox">

export interface IST_Filter
{
    fields: Array<IST_IFilterItem>;
    hookedData?: IST_HookedData
    // hasActivesSetter?: React.Dispatch<boolean>;
}

type mobileSettings = {
    type: mobileOpenType_dropdown | mobileOpenType_transfer,
    mobileSizeTrigger?: mobileTrigger_size,
    onTransfer?: (...props) => any,
}

export interface IST_IFiltersWrapper{
    children: ReactNode,
    title: string
    isOpened: boolean;
    mobileSettings?: mobileSettings,

    hasActives?: boolean
}

export interface IST_HookedData{
    fields: Array<ICheckBoxItem>
    fieldsSetter: React.Dispatch<Array<ICheckBoxItem>>
}
