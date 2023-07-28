import queryString from "query-string"
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { arrayBuffer } from "stream/consumers";


export const useQueryBuilder = <T extends string | number | string[] | number[] = string>(
    parseOptions?: queryString.StringifyOptions,

) => {

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
    
    query
      ? router.push(`?${query}`)
      : router.push(``);
      

},[_parseOptions, router])


const getQueryAsArray = useCallback(()=> {

    return queryString.parseUrl(
        router.asPath, {..._parseOptions}
    )

}, [_parseOptions, router?.asPath])
    
  return {setQueryAsArray, getQueryAsArray}
}