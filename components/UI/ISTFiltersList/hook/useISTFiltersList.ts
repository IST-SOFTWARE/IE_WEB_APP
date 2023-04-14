import {useCallback, useEffect, useState} from "react";
import {ICheckBoxItem, IST_HookedData} from "../common";

const useISTFiltersList = () =>{
    const[filters, filtersUpdater] = useState<ICheckBoxItem[]>([])
    const[hasActives, setActives] = useState<boolean>(false);

    const HasActives = useCallback(():boolean =>{
        return !!filters.find(el => el.isActive)
    }, [filters])


    useEffect(()=>{
        if(filters)
            setActives(HasActives);
    },[filters])


    return{
        hookedData: {
            fields: filters,
            fieldsSetter: filtersUpdater
        } as IST_HookedData,
        
        hasActives
    }
}

export default useISTFiltersList