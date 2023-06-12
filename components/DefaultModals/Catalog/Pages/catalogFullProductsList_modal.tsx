import React, {useCallback, useState} from "react";
import styles from "../../../../styles/Modals/catalog/catalogProducts/catalogFullProductsList.module.scss";
import {useAppSelector} from "../../../../Hooks/reduxSettings";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {ICatalogFiltersType} from "../../../../store/slices/common/catalogFiltersType";
import {useDispatch} from "react-redux";
import {onFilterSwitchCustom_t} from "../../../UI/hooks/ISTFiltersHook/common";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../helpers/Catalog/filters";
import {addNewFilter} from "../../../../store/slices/catalogSlices/catalogSlice";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import {CatalogWrapper} from "../../../ProductsWrapper/catalogWrapper/catalogWrapper";



const CatalogFullProductsListModal = ({}) => {

    const [search, setSearch] = useState<string>("");
    const filtersList = useAppSelector((state) => state.filtersList);


    // Filters state
    const [mfg_filter, mfg_active, mfg_designation] =
        useISTFiltersList<ICatalogFiltersType>(
            "mfg"
        );

    const [types_filter, types_active, types_designation] =
        useISTFiltersList<ICatalogFiltersType>(
            "type"
        );

    const [units_filter, units_active, units_designation] =
        useISTFiltersList<ICatalogFiltersType>(
            "unit"
        );


    // Redux catalog state & dispatch
    const dispatch = useDispatch();
    const catalog = useAppSelector(state => state.catalog);

    // add/remove function (Catalog)
    const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> = useCallback((
        idx,
        state,
        name,
        options
    ) => {

        if (!catalog || !catalog.filters || !options)
            return

        const newFilters =
            filterSetter_filtersHelper(catalog.filters, options, name);

        dispatch(addNewFilter({
            key: options,
            filter: newFilters
        }))

    }, [dispatch, catalog])


    return (
        <>
            {/*Filters bock*/}
            <div className={"col-4 position-relative p-0 pl-2 d-none d-lg-flex"}>
                <div className={styles.catalogFilter_Block}>

                    {/*Производители*/}

                    <ISTFiltersWrapper
                        title={"Производители"}
                        isOpened={true}
                        hasActives={mfg_active}
                        mobileSettings={{
                            type: "dropdown",
                            mobileSizeTrigger: "LG_992"
                        }}
                    >
                        <ISTFiltersList
                            fields={
                                filtersList?.mfg?.map(el => {
                                    return ({
                                        fieldName: el,
                                        isCheckBox: true,
                                        isActive: isActiveNow_filtersHelper(
                                            catalog?.filters,
                                            "mfg",
                                            el),
                                    })
                                })
                            }


                            hookedData={mfg_filter}

                            switcherOptions={{
                                onSwitch: switchFilter,
                                filterDesignation: mfg_designation
                            }}
                        />

                    </ISTFiltersWrapper>

                    {/*Типы*/}

                    <ISTFiltersWrapper
                        title={"Типы"}
                        isOpened={false}
                        hasActives={types_active}
                        mobileSettings={{
                            onTransfer: () => {
                            },
                            type: "transfer",
                            mobileSizeTrigger: "LG_992"
                        }}
                    >

                        <ISTFiltersList
                            fields={
                                filtersList?.type?.map(el => {
                                    return ({
                                        fieldName: el,
                                        isCheckBox: true,
                                        isActive: isActiveNow_filtersHelper(
                                            catalog?.filters,
                                            "type",
                                            el),
                                    })
                                })
                            }


                            hookedData={types_filter}

                            switcherOptions={{
                                onSwitch: switchFilter,
                                filterDesignation: types_designation
                            }}
                        />

                    </ISTFiltersWrapper>

                    {/*Узлы*/}


                    <ISTFiltersWrapper
                        title={"Узлы"}
                        isOpened={false}
                        hasActives={units_active}
                        mobileSettings={{
                            onTransfer: () => {
                            },
                            type: "transfer",
                            mobileSizeTrigger: "LG_992"
                        }}
                    >

                        <ISTFiltersList fields={[
                            {
                                isActive: false,
                                fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                                isCheckBox: true
                            },
                            {isActive: false, fieldName: "Field 2", isCheckBox: true},
                            {isActive: false, fieldName: "Field 3", isCheckBox: true},
                            {isActive: false, fieldName: "Field 4", isCheckBox: true},
                        ]}
                                        hookedData={units_filter}

                                        switcherOptions={{
                                            onSwitch: switchFilter,
                                            filterDesignation: units_designation
                                        }}
                        />
                    </ISTFiltersWrapper>


                </div>
            </div>

            {/*Products bock*/}


            <div className={"col-12 col-lg-8 p-0 pl-lg-2 d-flex flex-wrap"}>
                <CatalogWrapper
                    itemWrapper_ClassName={styles.productCardVariant_Block}
                    search={search}
                    cartID={"9cfa4d6a-f2e9-400c-b0a9-4c85ab777272"}
                    additionalForwarding={""}
                />
            </div>

        </>
    );
};

export default CatalogFullProductsListModal;
