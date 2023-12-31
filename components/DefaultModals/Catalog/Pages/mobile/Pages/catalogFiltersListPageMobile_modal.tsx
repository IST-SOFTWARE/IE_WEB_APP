import React, {FC, useCallback} from 'react';
import ISTFiltersWrapper from "../../../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import {ICatalogFiltersType} from "../../../../../../store/slices/common/catalogFiltersType";
import useISTFiltersList from "../../../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {useAppSelector} from "../../../../../../Hooks/reduxSettings";
import {listHasActives_filtersHelper} from "../../../../../../helpers/Catalog/filters";
import { useRouter } from 'next/router';
import ru from '../../../../../../locales/filters/ru';
import en from '../../../../../../locales/filters/en';
import { IFiltersLocale } from '../../../../../../locales/filters/filtersLocale'
import { EN_LOCALE, RU_LOCALE } from '../../../../../../locales/locales'
import { useTransition } from '../../../../../../Hooks/useTranslation/useTranslation'

interface ICatalogFiltersListPageMobileModal{
    onTransfer: (designation: keyof ICatalogFiltersType) => void;
}

const CatalogFiltersListPageMobileModal:FC<ICatalogFiltersListPageMobileModal>= ({
    onTransfer
}) => {

    const catalog = useAppSelector(selector => selector.catalog);

    const [mfg, mfg_active, mfg_des] =
        useISTFiltersList<ICatalogFiltersType>("mfg");
    const [units, units_active, units_des] =
        useISTFiltersList<ICatalogFiltersType>("unit");
    const [types, types_active, types_des] =
        useISTFiltersList<ICatalogFiltersType>("type");
    const [av, av_active, av_des] =
        useISTFiltersList<ICatalogFiltersType>("available");
    // const [eq_type, eq_type_active, eq_type_des] =
    //     useISTFiltersList<ICatalogFiltersType>("mfg");

    const currentTranslation = useTransition<IFiltersLocale>([
        {locale: RU_LOCALE, translation: ru},
        {locale: EN_LOCALE, translation: en}
    ]);

    return(
        <div style={{
            paddingTop: "15px"
        }}>
            <ISTFiltersWrapper
                title={currentTranslation.translation.namesOfFiltersList.manufacturer}
                hasActives={listHasActives_filtersHelper(catalog, "mfg")}
                mobileSettings={{
                    type: "transfer",
                    onTransfer: ()=>{onTransfer(mfg_des)},
                    mobileSizeTrigger: "XXL_1400",
                }}
                isOpened={false}
            />

            <ISTFiltersWrapper
                title={currentTranslation.translation.namesOfFiltersList.unit}
                hasActives={listHasActives_filtersHelper(catalog, "unit")}
                mobileSettings={{
                    type: "transfer",
                    onTransfer: ()=>{onTransfer(units_des)},
                    mobileSizeTrigger: "XXL_1400",
                }}
                isOpened={false}
            />

            <ISTFiltersWrapper
                title={currentTranslation.translation.namesOfFiltersList.type}
                hasActives={listHasActives_filtersHelper(catalog, "type")}
                mobileSettings={{
                    type: "transfer",
                    onTransfer: ()=>{onTransfer(types_des)},
                    mobileSizeTrigger: "XXL_1400",
                }}
                isOpened={false}
            />

            <ISTFiltersWrapper
                title={currentTranslation.translation.namesOfFiltersList.available}
                hasActives={listHasActives_filtersHelper(catalog, "available")}
                mobileSettings={{
                    type: "transfer",
                    onTransfer: ()=>{onTransfer(av_des)},
                    mobileSizeTrigger: "XXL_1400",
                }}
                isOpened={false}
            />

        </div>
    )
}

export default CatalogFiltersListPageMobileModal;