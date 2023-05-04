import React, {FC, useCallback, useEffect, useState} from "react";
import Filter from "./Filter";
import {IST_Filter, ICheckBoxItem} from "../common"

const ISTFiltersList:FC<IST_Filter> = ({
  fields,
  hookedData
}) => {

  const [filtersFields, setFiltersFields] = useState<ICheckBoxItem[]>([]);

  useEffect(()=>{
    if(fields){
      const fieldsArr: ICheckBoxItem[] = []

      fields.map((el, i) => {
        const newEl = {
          idx: i,
          ...el
        };
        fieldsArr.push(newEl)
      })

      if(hookedData)
        hookedData.fieldsSetter(fieldsArr);
      else
        setFiltersFields(fieldsArr);
    }
  },[])


  const checkBox_Switcher= useCallback((idx: number) => {
    let fields: ICheckBoxItem[];

    if(hookedData)
      fields = [...hookedData.fields];
    else
      fields = [...filtersFields];

    fields.map((el) => {
      if(el.idx === idx)
        el.isActive = !el.isActive;
    })

    if(hookedData)
      hookedData.fieldsSetter(fields);
    else
      setFiltersFields(fields);

  }, [filtersFields, hookedData])

  const outFilters = useCallback((data: ICheckBoxItem[]): React.ReactNode => (
      <>
        {data?.map((filter, i) => (
            <Filter
                idx={filter.idx}
                fieldName={filter.fieldName}
                isCheckBox={true}

                switchActiveState={()=>{
                  // checkBox_Switcher(i)
                  console.log(filter.switchActiveState);
                }}

                isActive={filter.isActive}
                key={`filterItem_${i}_key`}
            />
        ))}
      </>
  ),[checkBox_Switcher])

  return (
    <>
      {
        outFilters(
    hookedData ? hookedData.fields
          : filtersFields)
      }
    </>
  );
};

export default ISTFiltersList;
