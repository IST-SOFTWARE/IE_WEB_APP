import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import queryString from "query-string";
import {useAppSelector} from "../hooks";
import {ICatalogQueries} from "../../components/Catalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/catalogSlice/catalogFiltersType";

export const useISTCatalog = <T extends ICatalogQueries<any>>() => {

    const router = useRouter();
    const[currentState, setCurrentState] = useState<T>(null);

    useEffect(()=>{
        const query = location.search;
        const outObj = queryString.parse(query, {
                parseBooleans: true,
                parseNumbers: true,
            }
        )
        setCurrentState(outObj as T);

    },[router.query])



    const pushQuery = useCallback((q: T) => {
        if(router){

            const outQuery = {
                catalog: q.catalog,
                search: q.search,
            }

            for (const [key, value] of Object.entries(q.filters)) {
                outQuery[key] = value;
            }

            const query = queryString.stringify(outQuery, {
                arrayFormat: 'bracket-separator',
                arrayFormatSeparator: '|'
            })

            console.log(query);

            router.push(`?${query}`,
                undefined,
                {shallow: true})
        }
    },[router])


    return{
        pushQuery,
        currentState
    }
}