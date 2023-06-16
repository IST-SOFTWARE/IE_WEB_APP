import React, {FC, useCallback} from 'react';
import ISTFiltersWrapper from "../../../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import {toc_filtersList_page_mobile} from "../../../../table_of_contents/Catalog/mobile/toc_filtersList_page_mobile";
import ISTFiltersList from "../../../../../UI/ISTFiltersList/components/ISTFiltersList";
import {filterSetter_filtersHelper, isActiveNow_filtersHelper} from "../../../../../../helpers/Catalog/filters";
import {onFilterSwitchCustom_t} from "../../../../../UI/hooks/ISTFiltersHook/common";
import {ICatalogFiltersType} from "../../../../../../store/slices/common/catalogFiltersType";
import {addNewFilter} from "../../../../../../store/slices/catalogSlices/catalogSlice";
import {useAppSelector} from "../../../../../../Hooks/reduxSettings";
import useISTFiltersList from "../../../../../UI/hooks/ISTFiltersHook/useISTFiltersList";
import {useDispatch} from "react-redux";

interface ICatalogFiltersListPageMobileModal{
    onTransfer: (designation: keyof ICatalogFiltersType) => void;
}

const CatalogFiltersListPageMobileModal:FC<ICatalogFiltersListPageMobileModal>= ({
    onTransfer
}) => {

    const [mfg, mfg_active, mfg_des] =
        useISTFiltersList<ICatalogFiltersType>("mfg");

    return(
        <>
            <ISTFiltersWrapper
                title={"FILTER TEST"}
                hasActives={mfg_active}
                mobileSettings={{
                    type: "transfer",
                    onTransfer: ()=>{onTransfer(mfg_des)},
                    mobileSizeTrigger: "XXL_1400",
                }}
                isOpened={false}
            />
        </>
    )
}

export default CatalogFiltersListPageMobileModal;