export default function BooleanFilter(reducer, products, filters, OutputList){

    const excluded_product = "excluded"
    
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
                            filtersResults[filter] = false;
                        else
                            filtersResults[filter] = true;
                    }
                        
                }
            })
        })


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
}