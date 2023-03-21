import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import queryString from "query-string";
import {useAppSelector} from "../hooks";
import {ICatalogQueries} from "../../components/ISTCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/catalogSlice/catalogFiltersType";

export const useCatalog = <T extends ICatalogQueries<any>>(
    parseOptions?: queryString.StringifyOptions
) => {

    const router = useRouter();
    const[currentState, setCurrentState] = useState<T>(null);

    useEffect(()=>{
        const query = location.search;
        const outObj = queryString.parse(query, {
                parseBooleans: true,
                parseNumbers: true,
                ...parseOptions
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

            const query = queryString.stringify(outQuery, {...parseOptions})

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