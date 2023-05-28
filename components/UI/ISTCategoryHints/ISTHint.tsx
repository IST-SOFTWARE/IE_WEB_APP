import React, {FC, useCallback, useEffect, useState} from "react";
import {ICategoryCollection} from "./ICategoryHints";
import styles from "./categoryHints.module.scss";
import {IFilterType, onFilterSwitchDefault_t} from "../hooks/ISTFiltersHook/common";
import {ICheckBoxItem} from "../ISTFiltersList/common";

interface ISTHint extends Omit<ICategoryCollection, "collectionName">{};

export const ISTHintCategory: FC<ISTHint> = ({
    collectionOfItems,
    hookedData,
    switcherOptions
}) => {

    const [filtersFields, setFiltersFields] = useState<IFilterType[]>([]);

    useEffect(()=>{
        if(!collectionOfItems || !hookedData)
            return

        const fieldsArr: IFilterType[] = []

        collectionOfItems.map((el, i) => {
            const newEl = {
                idx: i,
                fieldName: el.fieldName,
                isActive: false,

            } as IFilterType;

            fieldsArr.push(newEl)
        })

        setFiltersFields(fieldsArr);
    },[])

    useEffect(()=>{
        if(hookedData)
            hookedData.fieldsSetter(filtersFields);
    },[filtersFields])

    const switchFilterState: onFilterSwitchDefault_t = useCallback((idx)=>{

        let filters: IFilterType[] = [];

        let editingFilter =
            switcherOptions ?
                {} as Parameters<typeof switcherOptions.onSwitch> :
                null

        filters = [...filtersFields]


        filters.map(el => {
            if(el.idx === idx) {
                editingFilter ?
                    editingFilter = [
                        idx,
                        undefined,
                        el.fieldName,
                        switcherOptions.filterDesignation
                    ] :
                    null;
            }
        });

        if(editingFilter)
            switcherOptions.onSwitch(...editingFilter);

        setFiltersFields(filters);

    },[switcherOptions, filtersFields])


    return(
        <>
            <div className={styles.possible_results}>
                {filtersFields.map(item => {
                    return (
                        <span
                            key={`item_${item.idx}_${item.fieldName}`}
                            className={styles.result}
                            onClick={()=>{
                                switchFilterState(item.idx);
                            }}
                        >
                            {item.fieldName}
                        </span>
                    );
                })}
            </div>
        </>
    )
}