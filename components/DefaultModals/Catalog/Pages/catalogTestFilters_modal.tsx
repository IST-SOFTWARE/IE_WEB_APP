import React, {FC, useCallback, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";
import {IST_HookedData, onFilterSwitch_t} from "../../../UI/ISTFiltersList/common";
import {useDispatch} from "react-redux";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {useAppSelector} from "../../../../Hooks/reduxSettings";
import {useQuery} from "@apollo/client";
import {GET_MFG_CATEGORY_LIST, ICategoryMFG_Q} from "../../../../queries/categories/MFG/mfgCategoryQuery";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../helpers/Catalog/filters";
import {CartWrapper} from "../../../ProductsWrapper/cartWrapper";


const CatalogTestFiltersModal: FC = () => {

    const dispatch = useDispatch();
    const catalog = useAppSelector(state => state.catalog);

    const [firstFilter, firstActive] = useISTFiltersList();

    const {data} = useQuery<ICategoryMFG_Q>(
        GET_MFG_CATEGORY_LIST,
    )


    const [cartSelector, setCartSelector] = useState<string[]>([])

    const switchFilter: onFilterSwitch_t = useCallback((
        idx,
        state,
        name) => {

            if(!catalog || !catalog.filters)
                return

            const newFilters =
                filterSetter_filtersHelper(catalog.filters, "mfg", name);

            dispatch(addNewFilter({
                key: "mfg",
                filter: newFilters
            }))

    },[dispatch, catalog])

    return (
        <>
            <div
                style={{
                    width: "350px",
                    height: "450px"
                }}
            >

                <ISTFiltersWrapper
                    title={"FILTER TEST"}
                    hasActives={firstActive}
                    mobileSettings={{
                        type: "dropdown",
                        mobileSizeTrigger: "LG_992",
                    }}

                    isOpened={true}
                >
                    {data && data?.manufacturer_category ? (
                        <ISTFiltersList
                            fields={
                                data?.manufacturer_category?.map(el=>{
                                    return({
                                        fieldName: el.manufacturer_name,
                                        isCheckBox: true,
                                        isActive: isActiveNow_filtersHelper(
                                            catalog?.filters,
                                            "mfg",
                                            el.manufacturer_name),
                                    })
                                })
                            }

                            hookedData={firstFilter}
                            onFilterSwitch={switchFilter}
                        />
                    ) : null}

                </ISTFiltersWrapper>
            </div>

            <div>
                <CartWrapper
                    cartID={"e0a9d860-c0f9-4b6a-ace4-04ecf56b0f0c"}
                    currency={{
                        currency: "RU"
                    }}
                    cartSelector={{
                        selectedState: cartSelector,
                        setSelectedState: setCartSelector
                    }}

                    mobileTriggerSize={"LG_992"}
                    itemStyles={{
                        style: {
                            fill: true,
                            margin: "10px 0"
                        }
                    }}

                    wrapperStyles={{
                        width: "500px",
                        height: "1200px"
                    }}
                />
            </div>
        </>

    );
};

export default CatalogTestFiltersModal;