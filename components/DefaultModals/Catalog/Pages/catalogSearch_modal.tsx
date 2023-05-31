import React, {useCallback, useEffect, useRef, useState} from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import IstInput, {inputTypesVars} from "../../../UI/ISTInput/ISTInput";
import ISTCategoryHints from "../../../UI/ISTCategoryHints/ISTCategoryHints";
import Image from "next/image";
import cloudSearch from "../../../../public/Modals/Catalog/cloudSearch.svg";
import ISTButtonN from "../../../UI/ISTButton/ISTButtonN";
import styles from "../../../../styles/Modals/catalog/catalogSearch/catalogSearch.module.scss";
import useISTFiltersList from "../../../UI/hooks/ISTFiltersHook/useISTFiltersList";

import {onFilterSwitchCustom_t} from "../../../UI/hooks/ISTFiltersHook/common";
import {addNewFilter} from "../../../../store/slices/catalogSlice/catalogSlice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../Hooks/reduxSettings";
import {useQuery} from "@apollo/client";
import {
    GENERAL_CATEGORY_QUERY,
    IGeneralCategoryQuery,
} from "../../../../queries/categories/generalCategoryQuery";
import {IQuerySearchVariables} from "../../../../queries/common";
import {getHintsList_hintsHelper} from "../../../../helpers/Catalog/hints";
import {ICatalogFiltersType} from "../../../../store/slices/common/catalogFiltersType";

type ICategoryItem = {
    id: number;
    itemName: string;
};

type ICategoryCollection = {
    actionName: string;
    collectionName: string;
    collectionOfItems: Array<ICategoryItem>;
};

type IProductItem = {
    title: string;
    price: string;
    vendCode: string;
};

const defCategoryHints: ICategoryCollection[] = [];

const defProdItems: IProductItem[] = [];

const CatalogSearchModal = ({}) => {
    const [searchState, setSearchState] = useState<string>("");

    const {data, loading, error} = useQuery<
        IGeneralCategoryQuery,
        IQuerySearchVariables
    >(GENERAL_CATEGORY_QUERY, {variables: {search: searchState}});

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const catalog = useAppSelector((state) => state.catalog);
    const filters = useAppSelector((state) => state.filtersList);

    const [searchResults_categories, setSearchResults_categories] = useState<
        ICategoryCollection[] | null
    >(defCategoryHints);

    const [searchResults_products, setSearchResults_products] =
        useState<IProductItem[]>(defProdItems);

    const [mfgFilter, ha_mfg, mfg_designation] =
        useISTFiltersList<ICatalogFiltersType>("mfg");

    const [unitFilter, ha_unit, unit_designation] =
        useISTFiltersList<ICatalogFiltersType>("unit");

    const [typeFilter, ha_type, type_designation] =
        useISTFiltersList<ICatalogFiltersType>("type");

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const switchFilter: onFilterSwitchCustom_t<keyof ICatalogFiltersType> =
        useCallback(
            (idx, state, name, options) => {
                if (!catalog || !catalog.filters || !options) return;

                dispatch(
                    addNewFilter({
                        key: options,
                        filter: [name],
                    })
                );
            }, [catalog, dispatch]);

    return (
        <>
            {/*Filters bock*/}
            <div
                className={`d-none d-lg-block col-0 col-lg-6 ${styles.catalogFiltersModal_comp}`}
            >
                <div className={styles.headerContainer}>
                    <header className={styles.header}>Поиск</header>
                </div>

                <div className={styles.inputAndHints_block}>
                    <IstInput
                        ref={inputRef}
                        inputType={inputTypesVars.any_string}
                        placeholder={"Enter your request"}
                        required={true}
                        outDataSetter={setSearchState}
                        actualData={searchState}
                        style={{
                            height: "50px",
                            borderRadius: "15px",
                        }}
                    />

                    <div className={styles.hints_block}>
                        <ISTCategoryHints
                            hintsLimit={3}
                            hintsList={getHintsList_hintsHelper([
                                filters.mfg, filters.type, filters.unit
                            ])}
                            hintsCategoryCollection={[
                                {
                                    collectionName: "Производители",
                                    listedHintsId: 0,
                                    switcherOptions: {
                                        onSwitch: switchFilter,
                                        filterDesignation: mfg_designation,
                                    },
                                },
                                {
                                    collectionName: "Узлы",
                                    listedHintsId: 2,
                                    switcherOptions: {
                                        onSwitch: switchFilter,
                                        filterDesignation: unit_designation,
                                    },
                                },
                                {
                                    collectionName: "Типы",
                                    listedHintsId: 1,
                                    switcherOptions: {
                                        onSwitch: switchFilter,
                                        filterDesignation: type_designation,
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/*Products bock*/}
            <div
                className={`col-12 col-lg-6 h-100 pl-0 pl-lg-3 pr-0 pr-lg-3 ${styles.catalogFiltersModal_comp}`}
            >
                <div
                    className={styles.headerContainer}
                    style={{justifyContent: "space-between"}}
                >
                    <header className={styles.header}>Товары</header>

                    {searchResults_products && (
                        <div style={{width: "180px", alignSelf: "center"}}>
                            <ISTButtonN
                                title={{caption: "Все результаты"}}
                                dark={{
                                    solid: false,
                                    style: {
                                        borderRadius: "15px",
                                        fillContainer: true,
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>

                {searchResults_products ? (
                    //PRODUCTS LIST OUT

                    <div
                        className={`
                ${styles.catalogItems_block} 
                ${searchResults_products?.length > 6 ? styles.longList : ""}`}
                    >
                        {searchResults_products.map((el, i) => {
                            return (
                                <div
                                    className={styles.productCardVariant_Block}
                                    key={`productItem_${i}_u_key`}
                                >
                                    <ISTProductItem
                                        currency={"RU"}
                                        itemType={{
                                            productType: "catalog",
                                            parameters: {
                                                inline: false,
                                            },
                                            data: {
                                                id: i,
                                                title: "Product Item",
                                                price: "200",
                                                vendCode: "IST000001",
                                            },
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    //EMPTY RESULT
                    <div className={styles.noResultsBlock}>
                        <Image
                            src={cloudSearch}
                            alt={"not result"}
                            width={176}
                            height={176}
                            fill={false}
                            style={{
                                objectFit: "contain",
                            }}
                        />
                        <div className={styles.noResultsText}>
                            Start typing a query to search for a product
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CatalogSearchModal;
