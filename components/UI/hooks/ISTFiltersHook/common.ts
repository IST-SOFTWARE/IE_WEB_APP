import React from "react";

/**
 *  -= FILTERS TYPES =-
 */

export interface IFilterType{
    isActive: boolean;
    fieldName: string;
    idx: number;
}

export interface IST_HookedData {
    fields: Array<IFilterType>
    fieldsSetter: React.Dispatch<Array<IFilterType>>
}

export type onFilterSwitchDefault_t =
    (idx: number) => void

export type onFilterSwitchCustom_t<T = any> = (
    idx: number,
    nState: boolean,
    name: string,
    options?: T,
) => void

export interface ISwitcherOptions {
    onSwitch: onFilterSwitchCustom_t
    filterDesignation: string;
}