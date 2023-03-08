import { excluded_product, ForLift_FilterReducer, ForEscalator_FilterReducer, Availability_FilterReducer} from "../ReducerGlobalBoilerplates";

export default function BooleanFilter(reducer, products, filters, OutputList){


    let local_outputList = Array.from(OutputList);
    let filtersResults = new Object();
    let FilteredList = new Array();


    products.map(prod=> {
        filters.map(filter=>{
            OutputList.map(outItem =>{
                if(prod.id === outItem.id){
                    // console.log("reducer: " + filter + " - " + reducer[filter]);
                    // console.log("Prod: " + filter + " - " + prod[filter] + `[${prod.id}]`);

                    if(reducer[filter]){
                        if(prod[filter])
                            filtersResults[filter] = true;
                        else
                            filtersResults[filter] = false;
                    }
                        
                }
            })
        })


        local_outputList.map(item => {

            //Specific options for [ForLift[*]][ForEscalator[*]] displaying
            if(
                (item.id === prod.id) &&
                (reducer[ForLift_FilterReducer] && reducer[ForEscalator_FilterReducer]) &&
                (prod[ForLift_FilterReducer] || prod[ForEscalator_FilterReducer]))
            {
                if(reducer[Availability_FilterReducer] && !prod[Availability_FilterReducer]){
                    FilteredList.push({
                        "id": prod.id,
                        [excluded_product]: true
                    })
                }
                else{
                    FilteredList.push({
                        "id": prod.id,
                        [excluded_product]: false
                    })
                }
            }
            //-------------------------------------------------------------


            
            else if((item.id === prod.id) && Object.values(filtersResults).includes(false)){
                    FilteredList.push({
                        "id": prod.id,
                        [excluded_product]: true
                    })
                    
            }
            else if((item.id === prod.id) && !Object.values(filtersResults).includes(false)){
                FilteredList.push({
                    "id": prod.id,
                    [excluded_product]: false
                })
                
            }

 
            // console.log("Lift: ", reducer[ForLift_FilterReducer], "Esc: " , reducer[ForEscalator_FilterReducer])
        })
    
    })

    return FilteredList;
}