import { 
    Search_BP,
    ToggleCatalog, 
    SetAvailability_BP, 
    SetElevator_BP, 
    SetEscalator_BP,
    SetMFG_BP,
    SetTypes_BP,
    SetUnits_BP
} from "./boilerplates"

export default function reducer(state, action){
    switch(action.type){
        case ToggleCatalog:
            return{
                ...state,
                isOpen: action.payload
            }    
        case Search_BP:
            return{
                ...state,
                Search: action.payload
            }              
        case SetAvailability_BP:
            return{
                ...state,
                Availability: action.payload
            }
        case SetElevator_BP:
            return{
                ...state,
                ForLift: action.payload
            }
        case SetEscalator_BP:
            return{
                ...state,
                ForEscalator: action.payload
            }

        case SetMFG_BP:
            return{
                ...state,
                Manufacturers: action.payload
            }
        case SetTypes_BP:
            return{
                ...state,
                Types: action.payload
            }
        case SetUnits_BP:
            return{
                ...state,
                Units: action.payload
            }
        }
    }