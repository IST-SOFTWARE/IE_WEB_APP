import {IST_HookedData, ISwitcherOptions} from "../hooks/ISTFiltersHook/common";

export interface ICategoryHints {
    hintsLimit: number;
    hintsList:Array<ICategoryCollection>;
    hintsCategoryCollection: Array<ICategory>;
}

export type ICategory = {
    collectionName: string;
    listedHintsId: number;
    switcherOptions: ISwitcherOptions;
};

type ICategoryCollection = ICategoryItem[];

type ICategoryItem = {
    fieldName: string;
};

/**
 *  -=UI Type=-
 */

export interface ISTHint extends Omit<ICategory, "collectionName"> {
    hintsList: Array<ICategoryCollection>;
    hintsLimit: number;
}
