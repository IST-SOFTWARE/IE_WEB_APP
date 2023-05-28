import {IST_HookedData, ISwitcherOptions} from "../hooks/ISTFiltersHook/common";

export interface ICategoryHints {
    hintsLimit: number;
    hints: Array<ICategoryCollection>;
}

export type ICategoryCollection = {
    collectionName: string;
    collectionOfItems: Array<ICategoryItem>;
    switcherOptions: ISwitcherOptions;
    hookedData: IST_HookedData;
};

type ICategoryItem = {
    fieldName: string;
};


// actiionName: [
//     {
//         name: "Manufacturer",
//         idx: 0 =>
//                     collectionOfItems[]
//     },
//
//     {
//         name: "Unit",
//         idx: 1
//     },
//
//     {
//         name: "type",
//         idx: 2
//     }
// ]