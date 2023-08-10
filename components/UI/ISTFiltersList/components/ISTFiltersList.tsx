import React, {FC, useCallback, useEffect, useState} from "react";
import Filter from "./Filter";
import {IST_FilterList, ICheckBoxItem} from "../common"
import {IFilterType, onFilterSwitchDefault_t} from "../../hooks/ISTFiltersHook/common";

const ISTFiltersList:FC<IST_FilterList> = ({
  fields,
  hookedData,
  switcherOptions
}) => {

  const [filtersFields, setFiltersFields] = useState<IFilterType[]>([]);

  useEffect(()=>{
    if(fields){
      const fieldsArr: IFilterType[] = []

      fields.map((el, i) => {
        const newEl = {
          idx: i,
          ...el
        } as IFilterType;

        fieldsArr.push(newEl)
      })

      setFiltersFields(fieldsArr);
    }
  },[])


  useEffect(()=>{
    if(hookedData)
      hookedData.fieldsSetter(filtersFields);
  },[filtersFields])


  const switchFilterState: onFilterSwitchDefault_t = useCallback((idx) => {
    let filters: IFilterType[] = [];

    let editingFilter =
        switcherOptions ?
            {} as Parameters<typeof switcherOptions.onSwitch> :
            null

    filters = hookedData ?
        [...hookedData.fields]:
        [...filtersFields]


    filters.map(el => {
      if(el.idx === idx){
        const nState = !el.isActive;

        filters[idx] = {
          ...el,
          isActive: nState
        }

          editingFilter ?
              editingFilter = [
                idx,
                nState,
                el.fieldName ?
                    el.fieldName : "",
                switcherOptions.filterDesignation
              ] :
              null;
      }
    })

    if(editingFilter)
      switcherOptions.onSwitch(...editingFilter);


      hookedData ?
          hookedData.fieldsSetter(filters) :
          setFiltersFields(filters);

  },[hookedData, filtersFields, switcherOptions])

  const getFiltersView = (data: IFilterType[]) => {
    return(
        <>
          {data?.map((filter, i) => (
              <Filter
                  idx={filter.idx}
                  fieldName={filter.fieldName}
                  isCheckBox={true}
                  isActive={filter.isActive}
                  key={`filterItem_${i}_key`}
                  onFilterSwitch={switchFilterState}

              />
          ))}
        </>
    )
  }

  return getFiltersView(
      hookedData ?
          hookedData.fields :
          filtersFields
  )

};

export default ISTFiltersList;
