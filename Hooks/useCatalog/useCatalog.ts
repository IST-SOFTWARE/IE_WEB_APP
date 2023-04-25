import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import queryString from "query-string";
import {useAppSelector} from "../reduxSettings";
import {ICatalogQueries} from "./ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/catalogSlice/catalogFiltersType";

export const useCatalog = <T extends ICatalogQueries<FT>, FT = any>(
    parseOptions?: queryString.StringifyOptions,
    deepOptions?: {
        option: keyof T,
        params: Array<keyof FT>
    }
) => {

    const router = useRouter();
    const[currentState, setCurrentState] = useState<T>(null);

    const [_parseOptions] = useState<queryString.StringifyOptions>(
        parseOptions ? parseOptions : {
            arrayFormat: "bracket-separator",
            arrayFormatSeparator: "|"
        }
    )


    useEffect(()=>{
        const query = location.search;
        const parsed = queryString.parse(query, {
                parseBooleans: true,
                parseNumbers: true,
                ...parseOptions
            }
        )

        let outObj = {} as T
        for (const [key, value] of Object.entries(parsed)){

            let fountKey;
            if(deepOptions)
                fountKey = deepOptions.params.find(el => el.toString() === key)

            if(fountKey){
                outObj[deepOptions.option] = {
                    ...outObj[deepOptions.option],
                    [key]: value
                }
            }
            else
                outObj[key] = value
        }

        setCurrentState(outObj);

    },[router])


    const pushQuery = useCallback((q: T) => {
        if(router){
            const outQuery = {
                catalog: q.catalog,
                search: q.search,
            }

            if(q && q?.filters)
                for (const [key, value] of Object.entries(q.filters))
                    outQuery[key] = value;


            const query = queryString.stringify(outQuery, {..._parseOptions})

            router.push(`?${query}`,
                undefined,
                {shallow: true}).catch(
                    ex => console.warn("Routing error: ", ex)
            )
        }
    },[router])


    return{
        pushQuery,
        currentState,
        // getCurrentState
    }
}