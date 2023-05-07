import React, {FC, useCallback, useEffect, useState} from "react";
import Filter from "./Filter";
import {IST_FilterList, ICheckBoxItem} from "../common"

const ISTFiltersList:FC<IST_FilterList> = ({
  fields,
  hookedData,
  onFilterSwitch
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

  // useEffect(()=>{
  //   if(hookedData && hookedData.fields){
  //     console.log("RENDER")
  //     setFiltersFields(hookedData.fields);
  //   }
  // },[hookedData])
  // //
  // useEffect(()=>{
  //   console.log("filtersFields: ",);
  // },[filtersFields])

  // const Switcher = useCallback((idx: number)=>{
  //
  //   console.log(filtersFields[idx], filtersFields);
  //   console.log(idx);
  //
  //   setFiltersFields(prevState => {
  //     const state = [...prevState]
  //     state.map(el => {
  //       if(el.idx === idx)
  //         el.isActive = !el.isActive
  //     })
  //
  //     return state
  //   });
  // },[filtersFields])
  //
  // const checkBox_Switcher_out = useCallback((idx: number) => {
  //   Switcher(idx);
  // },[Switcher]);

  return (
      <>
        {filtersFields?.map((filter, i) => (
            <Filter
                idx={filter.idx}

                hookedData={{
                  fields: filtersFields,
                  fieldsSetter: setFiltersFields
                }}

                fieldName={filter.fieldName}
                isCheckBox={true}
                isActive={filter.isActive}
                key={`filterItem_${i}_key`}

                onFilterSwitch={
                  onFilterSwitch ?
                  onFilterSwitch : null
                }

            />
        ))}
      </>
  );
};

export default ISTFiltersList;
