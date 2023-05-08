import React, {Dispatch, ReactNode} from "react";

export type mobileOpenType_dropdown = "dropdown"
export type mobileOpenType_transfer = "transfer"
type mobileTrigger_size = "XXL_1400" | "XL_1200" | "LG_992" | "MD_768" | "SM_576"

// BASE FILTER_ITEM TYPE


export type ICheckBoxItem = {
    isActive: boolean;
    isCheckBox: boolean;
    fieldName: string;
    idx: number;

};

// HOOK'S TYPE
export interface IST_HookedData{
    fields: Array<ICheckBoxItem>
    fieldsSetter: React.Dispatch<Array<ICheckBoxItem>>
}

//UI FILTERS LIST TYPES
export type onFilterSwitch_t =
    (idx: number, nState: boolean, name?: string) => void | {idx: number, name: string};

export type IST_IFilterListItem = Omit<ICheckBoxItem, "idx">
export interface IST_FilterList
{
    fields?: Array<IST_IFilterListItem>;
    hookedData?: IST_HookedData;
    onFilterSwitch?: onFilterSwitch_t;
}

//UI FILTER ITEM TYPES
export interface IST_FilterItem extends ICheckBoxItem{
    hookedData: IST_HookedData,
    onFilterSwitch?: onFilterSwitch_t;
}

//MOBILE UI TYPES
type mobileSettings = mobileSettings_transfer | mobileSettings_dropdown

export interface mobileSettings_transfer{
    type: mobileOpenType_transfer,
    mobileSizeTrigger: mobileTrigger_size,
    onTransfer: (...props) => any,
}

export interface mobileSettings_dropdown{
    type: mobileOpenType_dropdown,
    mobileSizeTrigger: mobileTrigger_size,
}


export interface IST_IFiltersWrapper{
    children: ReactNode,
    title: string
    mobileSettings?: mobileSettings,

    hasActives?: boolean,

    isOpened: boolean
}



//Actions

export const getMobileSettings_triggerSize = (mobileSettings: mobileSettings):mobileTrigger_size => {
    if(mobileSettings && mobileSettings.mobileSizeTrigger)
        return mobileSettings.mobileSizeTrigger
    else
        return "SM_576"
}

export const getMobileSettings_isTransfer = (mobileSettings: mobileSettings):boolean => {
    if(mobileSettings && mobileSettings.type && mobileSettings.type === "transfer")
        return true
    else
        return false
}

