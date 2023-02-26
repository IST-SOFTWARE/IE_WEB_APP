import {useRouter} from "next/router";
import {Dispatch, useCallback, useEffect, useState} from "react";


interface ICatalog{
    catalogStateSetter?: Dispatch<boolean>;
}


interface ICatalogOptions{
    catalogBP: string
}

const defaultCatalogOptions = {
    catalogBP: "catalog"
} as ICatalogOptions

export const useCatalog = (catalogData: ICatalog) => {

    const router = useRouter();
    const [currentOptions, setCurrentOptions] =
        useState<ICatalogOptions>(defaultCatalogOptions)

    const [catalogIsOpened, setCatalogOpened] =
        useState<boolean>(false);

    // CATALOG STATE HANDLERS

    const catalogSwitcher = (sate: boolean) => {
        router.push(`?${currentOptions.catalogBP}=${sate}`,
            undefined,
            {shallow: true}).then(() => {
                setCatalogOpened(sate);
            })
            .catch((ex) =>
                console.warn("Catalog switcher err: ", ex));
    }


    const openCatalog = () => {
       catalogSwitcher(true);
    }


    const closeCatalog = () => {
        catalogSwitcher(false);
    }

    useEffect(() => {
        const catalog = router.query[currentOptions.catalogBP]
        if(catalog !== undefined)
            catalogData?.catalogStateSetter ?
            catalogData.catalogStateSetter(
                JSON.parse(catalog.toString().toLowerCase())
            ) : null
    }, [router.query])

    //



    return{
        openCatalog,
        closeCatalog,
        catalogIsOpened
    }

}