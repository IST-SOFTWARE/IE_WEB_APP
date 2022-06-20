import { Search_BP, ToggleCatalog, UPD_UTM_BP} from "./boilerplates"

export const ToggleCatalogGenerator = (payload) =>{
    return{
        type: ToggleCatalog,
        payload,
    }
}

export const SearchCatalogGenerator = (payload) =>{
    return{
        type: Search_BP,
        payload,
    }
}

export const UpdateUTM = (mfg, types, units) => {
    return{
        type: UPD_UTM_BP,
        mfg,
        types,
        units
    }
}
