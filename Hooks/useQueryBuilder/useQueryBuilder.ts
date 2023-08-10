import queryString from "query-string";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface dataT {
  cartSelected: Array<string>;
}

/**
 * Warning: Please only pass types (type) instead of interfaces for T.
 *
 * @template {Record<any, string | number | string[] | number[]>} T - The data type to be used as the argument.
 * @param {queryString.StringifyOptions} [parseOptions] - Query string parsing options.
 */
export const useQueryBuilder = <
  T extends Record<string, string | number | string[] | number[]>
>(
  parseOptions?: queryString.StringifyOptions
) => {
  const router = useRouter();

  const [_parseOptions] = useState<queryString.StringifyOptions>(
    parseOptions
      ? parseOptions
      : {
          arrayFormat: "bracket-separator",
          arrayFormatSeparator: "|",
          skipNull: true,
        }
  );

  const getQuery = useCallback(
    (data: T): string => {
      return queryString.stringify({ ...data }, { ..._parseOptions });
    },
    [_parseOptions]
  );

  const pushToQuery = useCallback(
    (data: T, additionalPath?: string): Promise<boolean> => {
      const newQuery = getQuery(data);
      return newQuery
        ? router.push(
            additionalPath ? `${additionalPath}/?${newQuery}` : `?${newQuery}`,
            undefined,
            { shallow: false }
          )
        : router.push(``, undefined, { shallow: false });
    },
    [getQuery, router]
  );

  const parseQuery = useCallback((): T => {
    const parsedUrl = queryString.parseUrl(router?.asPath, {
      ..._parseOptions,
    });

    if (parsedUrl?.query) return parsedUrl.query as unknown as T;

    return;
  }, [_parseOptions, router?.asPath]);

  return { parseQuery, getQuery, pushToQuery, router };
};
