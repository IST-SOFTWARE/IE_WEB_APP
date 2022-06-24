export default function Excluder(filter1, filter2, OutputList, setFiltered){

    const excluded_product = "excluded"
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
        if(!(getStateById(filter1, item.id, excluded_product)) && !(getStateById(filter2, item.id, excluded_product))){
            item[excluded_product] = false;
        }
        else
            item[excluded_product] = true;
    });

    setFiltered(local_outputList);
    // console.log(filter1, filter2)
}