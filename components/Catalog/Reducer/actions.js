import { Search_BP, ToggleCatalog, SetAvailability_BP} from "./boilerplates"

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

export const SetNewFilterGenerator = (type, payload) => {
    return{
        type,
        payload,
    }
}
