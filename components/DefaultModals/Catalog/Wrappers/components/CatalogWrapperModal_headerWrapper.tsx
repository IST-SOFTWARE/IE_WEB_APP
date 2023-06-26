import React, {FC} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../../Hooks/reduxSettings";
import {setCatalogState, setSearch} from "../../../../../store/slices/catalogSlices/catalogSlice";
import HeaderCatalog from "../../../../Catalog/HeaderCatalog/HeaderCatalog";
import {toc_catalog_search} from "../../../table_of_contents/Catalog/toc_catalog_search";
import {ICatalogWrapper} from "../common";

const CatalogWrapperModal_headerWrapper: FC<
    Omit<ICatalogWrapper, "children">> = ({
        data,
        searching
     }) => {

    const dispatch = useDispatch();
    const catalog = useAppSelector((selector) => selector.catalog);

    const setSearch_helper = (val: string) => {
        dispatch(setSearch(val));
    };


    return (
        <>
            <HeaderCatalog
                logo={{ logoSrc: "/Logo/w_logo_svg.svg", forwardingPath: "./main" }}

                onClose={() => {
                    dispatch(setCatalogState(false));
                }}

                searchingElement={{
                    focus: searching,
                    searchField: !data?.isCurrentModal(toc_catalog_search.typeName),
                    searchSetter: setSearch_helper,
                    searchValue: catalog?.search,
                }}
            />
        </>

    );
};

export default CatalogWrapperModal_headerWrapper;