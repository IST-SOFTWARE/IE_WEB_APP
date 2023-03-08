import { excluded_product } from "../ReducerGlobalBoilerplates";

export default function Filter(reducer, products, filters, OutputList){

    // let ProdList = Array.from(filteredProducts); 

    let filtersResults = new Object();
    let localReducerFilters = new Object();

    let local_outputList = Array.from(OutputList);
    
    let FilteredList = new Array();

    const IncludesCheck = (arr1, arr2) => {
        let res = false;
        arr1.map(elem => {
            if(arr2.includes(elem)) {
                res = true;
            }
        })
        return res;
    }

    // const clearFilterd = () =>{
    //     filters.map(filter=>{
    //         filtersResults[filter] = true;
    //     })
    // }

    filters.map(filter => {
        let buffer = new Array();
        const ReducerFilters = reducer[filter];
        ReducerFilters.map(reducerFilter => {
            let reducerFilterId = reducerFilter.id;
            buffer.push(reducerFilterId);
        })
        localReducerFilters[filter] = buffer;
    });

 
    products.map(prod => {
        filters.map(filter =>{
            let localProdCategories = prod[filter];
            let localReducerFilter = localReducerFilters[filter];
            if(localReducerFilter.length > 0){
                let localRes = IncludesCheck(localProdCategories, localReducerFilter);
                filtersResults[filter] = localRes;
            }
            else if(localReducerFilter.length === 0){
                // clearFilterd();
            }
        })

        // console.log(prod.id,":")
        // console.log(Object.values(filtersResults));

        local_outputList.map(item => {
            if((item.id === prod.id) && Object.values(filtersResults).includes(false)){
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
        })
    })

    return FilteredList;

    // console.log(filter, prod[filter] + " - " + prod.id + ": ");

        // console.log("FilteredList", filtersResults);
        // console.log("Filters", localReducerFilters);
        // console.log("Product", products, "Prod from list:");
 
}