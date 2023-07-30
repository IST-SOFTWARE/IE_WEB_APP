import queryString from "query-string"
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { arrayBuffer } from "stream/consumers";


export const useQueryBuilder = <T extends string | number | string[] | number[] = string>(
    parseOptions?: queryString.StringifyOptions,

) => {

const [currentQuery, setCurrentQuery ] = useState<string>()

const router = useRouter();

const [_parseOptions] = useState<queryString.StringifyOptions>(
    parseOptions ? parseOptions : {
        arrayFormat: "bracket-separator",
        arrayFormatSeparator: "|"
    }
)

const setQueryAsArray = useCallback((data: T[] ) => {

    const query = queryString.stringify(
      { cartSelected: data },
      {..._parseOptions}
    );
    
    // query
    //   ? router.push(`?${query}`)
    //   : router.push(``);
      

},[_parseOptions, router])



const getQueryAsArray = useCallback(()  => {

    const parsedQuery = queryString.parse(
        router.asPath, {..._parseOptions}
    )
    return  typeof(parsedQuery) === "object" ? parsedQuery : []

}, [_parseOptions, router?.asPath])
    
  return {setQueryAsArray, getQueryAsArray}
}