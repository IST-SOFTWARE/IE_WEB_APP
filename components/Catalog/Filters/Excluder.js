import { excluded_product } from "../ReducerGlobalBoilerplates";

export default function Excluder(filter1, filter2, filter3, OutputList, setFiltered){
    let local_outputList = Array.from(OutputList);
    
    const getStateById = (list, id, param) =>{
        let state = false;
        list.map(item=>{
            if(item.id === id){
                state = item[param];
            }
        })

        return state;
    }

    local_outputList.map(item=>{
        if(
            !(getStateById(filter1, item.id, excluded_product)) &&
            !(getStateById(filter2, item.id, excluded_product)) &&
            !(getStateById(filter3, item.id, excluded_product))
        ){
            item[excluded_product] = false;
        }
        else
            item[excluded_product] = true;
    });

    // if(searchVal.length > 0){
    //     console.log(searchVal);
    // }
    // if(searchVal.length > 0){
    //     let sercherList = Array.from(local_outputList);
    //     sercherList = OutputList.filter(p => p.product_name_ru.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0 
    //     || p.vend_code.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0);
        
    // }
    // else{
    //     setFiltered(local_outputList);
    // }
    

    setFiltered(local_outputList);
    // console.log(filter1, filter2)
}