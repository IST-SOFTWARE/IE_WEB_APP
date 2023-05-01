import React, {FC, useCallback, useEffect, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import {ICatalogFiltersType} from "../../../../store/slices/catalogSlice/catalogFiltersType";
import {IST_HookedData} from "../../../UI/ISTFiltersList/common";
import {useDispatch} from "react-redux";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {ICartItem, ICartItem_properties} from "../../../UI/ISTProductItem/ICartTypes";

const CatalogTestFiltersModal:FC = () => {

  const dispatch = useDispatch();

  const [firstFilter, firstActive] = useISTFiltersList()

  const getActiveFilters = (data: IST_HookedData): string[] => {
    const outData = [];
    if(data && data.fields)
      data.fields.map((el, i) => {
        if(el.isActive)
          outData.push(el.fieldName);
      })

    return outData;
  }

  const handleClick = useCallback(()=>{
    dispatch(addNewFilter({
      key: "mfg",
      filter: getActiveFilters(firstFilter)
    }))
  },[firstFilter])

  return (
      <>
        <div
            style={{
              width: "350px",
              height: "450px"
            }}
        >

          <button
              onClick={()=>
                  handleClick()
              }
          >
            Add
          </button>

          <ISTFiltersWrapper
              title={"FILTER TEST"}
              isOpened={true}
              hasActives={firstActive}
              mobileSettings={{
                type: "dropdown",
                mobileSizeTrigger: "LG_992",
              }}
          >

            <ISTFiltersList fields={[
              {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                isCheckBox: true},
              {isActive: false, fieldName: "Field 2", isCheckBox: true},
              {isActive: false, fieldName: "Field 3", isCheckBox: true},
              {isActive: false, fieldName: "Field 4", isCheckBox: true},
            ]}

            hookedData={firstFilter}
            />

          </ISTFiltersWrapper>

        </div>
      </>

  );
};

export default CatalogTestFiltersModal;