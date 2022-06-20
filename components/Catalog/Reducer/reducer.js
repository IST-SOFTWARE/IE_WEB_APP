import { Search_BP, ToggleCatalog, UPD_UTM_BP} from "./boilerplates"

export default function reducer(satate, action){
    switch(action.type){
        case ToggleCatalog:
            return{
                ...satate,
                isOpen: action.payload
            }    
        case Search_BP:
            return{
                ...satate,
                Search: action.payload
            }              
        case UPD_UTM_BP:
            return{
                ...satate,
                Manufacturers: action.payload
            }
        }
    }