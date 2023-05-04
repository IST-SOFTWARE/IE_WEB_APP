import {useCallback, useEffect, useState} from "react";
import {ICheckBoxItem, IST_HookedData} from "../common";

const useISTFiltersList = (
    initialState?: ICheckBoxItem[]
):[IST_HookedData, boolean] =>{

    const[filters, filtersUpdater] = useState<ICheckBoxItem[]>(
initialState ?
            initialState:
            []
    )

    const[hasActives, setActives] = useState<boolean>(false);

    const HasActives = useCallback(():boolean =>{
        return !!filters.find(el => el.isActive)
    }, [filters])


    useEffect(()=>{
        if(filters)
            setActives(HasActives);
    },[filters])


    return[
        {
            fields: filters,
            fieldsSetter: filtersUpdater
        } as IST_HookedData,
        hasActives
    ]
}

export default useISTFiltersList