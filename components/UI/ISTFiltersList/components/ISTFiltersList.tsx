import React, {FC, useCallback, useEffect, useState} from "react";
import Filter from "./Filter";
import {IST_FilterList, ICheckBoxItem, onFilterSwitchDefault_t} from "../common"

const ISTFiltersList:FC<IST_FilterList> = ({
  fields,
  hookedData,
  switcherOptions
}) => {

  const [filtersFields, setFiltersFields] = useState<ICheckBoxItem[]>([]);

  useEffect(()=>{
    if(fields){
      const fieldsArr: ICheckBoxItem[] = []

      fields.map((el, i) => {
        const newEl = {
          idx: i,
          ...el
        } as ICheckBoxItem;

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
    let filters: ICheckBoxItem[] = [];

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

  const getFiltersView = (data: ICheckBoxItem[]) => {
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
