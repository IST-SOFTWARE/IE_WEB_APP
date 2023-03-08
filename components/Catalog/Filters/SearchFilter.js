import * as GlobalBP from "../ReducerGlobalBoilerplates"

export default function SearchFilter(reducer, products, OutputList){
    const searchReq = reducer[GlobalBP.Search_FilterReducer];
    let local_outputList = Array.from(OutputList);

    let findedIds = new Array();

    let FilteredList = new Array();
    let Filtered = new Array();

    Filtered = products.filter(p => p[GlobalBP.ProdName_SearchFilter].toLowerCase().indexOf(searchReq.toLowerCase()) >= 0 ||
    p[GlobalBP.ProdDesc_SearchFilter].toLowerCase().indexOf(searchReq.toLowerCase()) >= 0 || 
    p[GlobalBP.ProdVendCode_SearchFilter].toLowerCase().indexOf(searchReq.toLowerCase()) >= 0);


    Filtered.map(finded => {
        findedIds.push(finded.id);
    });

    local_outputList.map((prod) =>{
        if(findedIds.includes(prod.id))
            FilteredList.push({
                "id": prod.id,
                [GlobalBP.excluded_product]: false
            })
        else
            FilteredList.push({
                "id": prod.id,
                [GlobalBP.excluded_product]: true
            })
        
    });

    // console.log(searchReq, ": ", FilteredList);
    return FilteredList;
}